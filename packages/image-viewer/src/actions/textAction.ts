import { autobind } from 'core-decorators';
import { ACTION_SCALE_BASE } from '../config';
import { ActionPhase, CanvasEventOptions } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

const PADDING = 4;

/**
 * 向上放大，向下缩小
 */
@autobind
export default class TextAction extends BaseAction {
  public name: string = ActionNames.TextAction;
  public actionPhase: ActionPhase = ActionPhase.AfterDrawImage;
  private defafultColor: string = '#ff0000'; // 默认颜色
  private scale: number = 0;
  private text = '';

  private textActionData?: ActionDataType;

  // 鼠标按下
  public onMouseDown(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      super.onMouseDown(e, options);
      // 删除已经存在的node节点

      // 开始新的节点
      const scaleDataArr = this.options.getActionsDataByName(
        ActionNames.ScaleAction,
      );
      if (scaleDataArr.length) {
        this.scale = scaleDataArr[0].data.data as number;
      }
      this.textActionData = this.options.createActionData(
        ActionNames.TextAction,
        {
          color: this.defafultColor,
          data: '',
          x: this.startPoint?.x,
          y: this.startPoint?.y,
          fontSize: 20, // 默认20px，然后根据图片进行自适应
        },
        true,
      );
    }
  }

  public onMouseUp(e: MouseEvent, options: CanvasEventOptions): void {
    if (this.isEventOnCanvas(e)) {
      this.isMouseDown = false;
    }
  }
  private onchange(e: HTMLDivElement) {
    this.text = e.target.innerText;
  }
  // 失去光标后认为编辑结束
  private onEditorBlur(e: MouseEvent, actionData: ActionDataType) {
    // 更新数据
    if (actionData) {
      actionData.data.data = this.text;
      this.options.updateActionData(actionData, true);
    }

    const node = e.target;
    if (this.options.canvasElement.parentElement?.contains(node)) {
      this.options.canvasElement.parentElement?.removeChild(node);
    }
    if (this.textActionData?.id === actionData.id) {
      this.textActionData = undefined;
      this.text = '';
    }
  }

  public renderDom(ctx: IContext, actionData: ActionDataType) {
    if (!actionData) {
      return;
    }

    const { id, data } = actionData;
    let node: HTMLDivElement = document.getElementById(id);
    if (!node) {
      node = document.createElement('div');
      node.id = id;
      node.style.position = 'absolute';
      node.style.left = data.x - 5 + 'px';
      node.style.top = data.y - 5 + 'px';
      node.style.minHeight = data.fontSize * this.scale + 'px';
      node.style.minWidth = data.fontSize * this.scale + 'px';
      node.style.border = '1px solid #ff0000';
      node.style.zIndex = '10';
      node.style.color = this.defafultColor;
      node.style.fontSize = data.fontSize * this.scale + 'px';
      node.style.padding = PADDING * this.scale + 'px';
      node.setAttribute('contenteditable', 'true'); // 可以编辑
      node.setAttribute('data-id', id as string); // 可以编辑
      node.onblur = (e: MouseEvent): void => this.onEditorBlur(e, actionData);
      node.oninput = this.onchange;
      ctx.canvasElement.parentElement?.appendChild(node);
      setTimeout(() => {
        node.focus();
      }, 0);
    } else {
      node.textContent = actionData.data.data;
    }
  }

  public renderCanvas(ctx: IContext, actionData: ActionDataType) {
    const { data } = actionData;
    ctx.canvasCtx.font = `${data.fontSize}px serif`;
    ctx.canvasCtx.fillStyle = String(data.color);
    ctx.canvasCtx.textAlign = 'left';
    const blocks = data.data.replace(/\r/g, '\n').split('\n');
    blocks.forEach((block: string, index: number) => {
      ctx.canvasCtx.fillText(block, data.x, data.y + index * data.fontSize);
    });
  }

  public render(ctx: IContext, actionData: ActionDataType): void {
    const { name } = actionData;
    if (name === this.name) {
      if (actionData.id === this.textActionData?.id) {
        this.renderDom(ctx, actionData);
      } else {
        this.renderCanvas(ctx, actionData);
      }
    }
  }
}
