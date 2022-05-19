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

  private translate?: ActionDataType;

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
      const actionDataArr = this.options.getActionsDataByName(
        ActionNames.TranslateAction,
      );
      if (actionDataArr.length) {
        this.translate = actionDataArr[0];
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
      console.log(deltaX, deltaY);
      const dataArr = this.options.getActionsDataByName(
        ActionNames.TranslateAction,
      );
      if (dataArr.length) {
        const oldData = dataArr[0];
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
      console.log(data.data);
      ctx.canvasCtx.translate(data.data[0], data.data[1]);
    }
  }
}
