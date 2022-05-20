import { autobind } from 'core-decorators';
import { ACTION_SCALE_BASE } from '../config';
import { ActionPhase, CanvasEventOptions } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

/**
 * 向上放大，向下缩小
 */
@autobind
export default class TranslateAction extends BaseAction {
  public name: string = ActionNames.TranslateAction;
  public actionPhase: ActionPhase = ActionPhase.BeforeDrawImage;
  private scale: number = 0;

  private translate?: ActionDataType;

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
      // scale用于将距离的还原
      const scaleDataArr = this.options.getActionsDataByName(
        ActionNames.ScaleAction,
      );
      if (scaleDataArr.length) {
        this.scale = scaleDataArr[0].data.data as number;
      }

      const translateDataArr = this.options.getActionsDataByName(
        ActionNames.TranslateAction,
      );
      if (translateDataArr.length) {
        this.translate = translateDataArr[0];
      } else {
        this.translate = this.options.createActionData(
          ActionNames.TranslateAction,
          {
            data: [0, 0],
          },
        );
      }
    }
  }

  public onMouseUp(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseUp(e, options);
      this.translate = undefined;
    }
  }

  // 鼠标移动
  public onMouseMove(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e) && this.isMouseDown && this.startPoint) {
      const currentPoint = {
        x: e.clientX,
        y: e.clientY,
      };
      const deltaX = currentPoint.x - this.startPoint.x;
      const deltaY = currentPoint.y - this.startPoint.y;
      const dataArr = this.options.getActionsDataByName(
        ActionNames.TranslateAction,
      );
      if (dataArr.length && this.translate) {
        const oldData = this.translate;
        const newTranslateData = [
          oldData.data.data[0] + deltaX,
          oldData.data.data[1] + deltaY,
        ];
        this.options.updateActionData(
          {
            ...oldData,
            data: {
              ...oldData.data,
              data: newTranslateData,
            },
          },
          true,
        );
      }
    }
  }

  public render(
    ctx: IContext,
    actionData: ActionDataType,
    dataIsEditing?: boolean,
  ): void {
    const { name, data } = actionData;
    if (name === this.name) {
      ctx.canvasCtx.translate(data.data[0], data.data[1]);
    }
  }
}
