import { autobind } from 'core-decorators';
import { ACTION_SCALE_BASE } from '../config';
import { CanvasEventOptions } from '../types/action';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

/**
 * 向上放大，向下缩小
 */
@autobind
export default class ScaleAction extends BaseAction {
  public name: string = ActionNames.ScaleAction;
  private scale: number = 0;
  private minScale: number = Infinity; // 图片最小比例，这里按照缩小后宽高为一个像素作为基准

  // 设置最小的缩放比
  private setMinScale() {
    const imageLoader = this.options.getCurrentImage();
    this.minScale = Math.min(1 / imageLoader.width, 1 / imageLoader.height);
  }

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
      // 点击是获取到原始的scale
      const actionDataArr = this.options.getActionsDataByName(
        ActionNames.ScaleAction,
      );
      if (actionDataArr.length) {
        this.scale = actionDataArr[0].data as number;
      }
      this.setMinScale();
    }
  }

  public onMouseUp(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseUp(e, options);
      // 点击是获取到原始的scale
      this.scale = 0;
      this.minScale = Infinity;
    }
  }

  // 鼠标移动
  public onMouseMove(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e) && this.isMouseDown && this.startPoint) {
      const currentPoint = {
        x: e.clientX,
        y: e.clientY,
      };
      const deltaY = currentPoint.y - this.startPoint.y;
      const actionDataArr = this.options.getActionsDataByName(
        ActionNames.ScaleAction,
      );
      if (actionDataArr.length) {
        const scale = actionDataArr[0];
        console.log(deltaY, deltaY / ACTION_SCALE_BASE, this.scale);
        scale.data = Math.max(
          Math.max(this.scale + (deltaY / ACTION_SCALE_BASE) * 0.1, 0),
          this.minScale,
        );
        console.log(scale.data);
        this.options.updateActionData(scale);
      }
    }
  }
}
