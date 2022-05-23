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
export default class RotateLeftAction extends BaseAction {
  public name: string = ActionNames.RotateLeftAction;
  public actionPhase: ActionPhase = ActionPhase.BeforeDrawImage;

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
      // 点击是获取到原始的scale
      const actionDataArr = this.options.getActionsDataByName(
        ActionNames.RotateLeftAction,
      );
      // degree * Math.PI / 180
      if (actionDataArr.length) {
        const oldData = actionDataArr[0].data;
      } else {
        this.options.createActionData(this.name, {
          data: -90,
        });
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
      ctx.canvasCtx.rotate(data.data, data.data);
    }
  }
}
