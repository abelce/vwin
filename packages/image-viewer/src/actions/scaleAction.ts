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
export default class ScaleAction extends BaseAction {
  public name: string = ActionNames.ScaleAction;
  public actionPhase: ActionPhase = ActionPhase.BeforeDrawImage;

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
      // scale的数据肯定是存在的，每次渲染新的图片时都会自动加一个scale数据
      const actionDataArr = this.options.getActionsDataByName(
        ActionNames.ScaleAction,
      );
      const newScale =
        this.scale.data +
        deltaY / ACTION_SCALE_BASE / this.options.canvasElement.height;
      console.log(newScale, this.scale.data);
      if (actionDataArr.length) {
        const oldScale = actionDataArr[0];
        const scale = { ...oldScale, data: { ...oldScale.data } };
        scale.data.data = Math.max(newScale, 0, this.minScale);
        this.options.updateActionData(scale, true);
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
      ctx.canvasCtx.scale(data.data, data.data);
    }
  }
}