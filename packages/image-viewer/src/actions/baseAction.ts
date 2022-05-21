import {
  ActionOptions,
  ActionPhase,
  CanvasEventOptions,
} from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { Coordinate } from '../types/coordinate';
import { ActionNames } from './actionNames';

export default abstract class BaseAction {
  public abstract name: ActionNames;
  public actionPhase: ActionPhase = ActionPhase.AfterDrawImage; // 默认drawImage之后执行

  public isMouseDown: boolean = false;
  public isMouseMove: boolean = false;
  public startPoint?: Coordinate;

  constructor(public readonly options: ActionOptions) {}
  /**
   * onChange: 数据改变后
   */
  public abstract onChange(): void;

  // 渲染函数
  /**
   *
   * @param ctx
   * @param actionData
   * @param dataIsEditing : 数据是否在编辑中
   */
  public render(
    ctx: IContext,
    actionData: ActionDataType,
    dataIsEditing?: boolean,
  ): void {}

  // // html渲染函数
  // public htmlRender(ctx: IContext, actionData: ActionDataType): void {

  // }

  // // 通过canvas渲染函数
  // public canvasRender(ctx: IContext, actionData: ActionDataType): void {

  // }

  public isEventOnCanvas(e: Event) {
    return e.target === this.options.canvasElement;
  }

  // 鼠标移入
  public onMouseEnter(e: MouseEvent, options: CanvasEventOptions): void {}
  // 鼠标移出
  public onMouseLeave(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      this.isMouseDown = false;
      this.startPoint = undefined;
    }
  }
  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      const rect = this.options.canvasElement.getBoundingClientRect();
      switch (e.button) {
        case 0:
          this.isMouseDown = true;
          this.startPoint = {
            clientX: e.clientX,
            clientY: e.clientY,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          break;
      }
    }
  }
  // 鼠标松开
  public onMouseUp(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.startPoint = undefined;
    }
  }
  // 鼠标移动
  public onMouseMove(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e) && this.isMouseMove) {
    }
  }
  // 键盘按下
  public onKeyDown(e: KeyboardEvent, options: CanvasEventOptions): void {}
  // 键盘松开
  public onKeyUp(e: KeyboardEvent, options: CanvasEventOptions): void {}
  // // 键盘按住
  // public onkeyPress(e: KeyboardEvent): void {

  // }
}
