import { autobind } from 'core-decorators';
import { ACTION_SCALE_BASE } from '../config';
import { CanvasEventOptions } from '../types/action';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

/**
 * 向上放大，向下缩小
 */
@autobind
export default class MoveAction extends BaseAction {
  public name: string = ActionNames.MoveAction;

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
    }
  }

  public onMouseUp(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseUp(e, options);
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
      const dataArr = this.options.getActionsDataByName(ActionNames.MoveAction);
      if (dataArr.length) {
        const oldData = dataArr[0];
        oldData.data.data = [currentPoint.x + deltaX, currentPoint.y - deltaY];

        this.options.updateActionData(oldData, true);
      } else {
        this.options.createActionData(
          ActionNames.MoveAction,
          {
            data: [currentPoint.x + deltaX, currentPoint.y - deltaY],
          },
          true,
        );
      }
    }
  }
}
