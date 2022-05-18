import { autobind } from 'core-decorators';
import { ActionNames } from '../actions/actionNames';
import ImageLoader from '../image-loader';
import { IContext } from '../types/context';
import ImageUtils from '../utils/imageUtils';
import ActionDataModule from './actionDataModule';
import ActionModule from './actionModule';
import {
  BaseModule,
  BaseModuleOptions,
  ModuleApplyOptions,
} from './baseModule';
import { ModulePropertyWrapper, ModuleWrapper } from './moduleManager';
import { ModuleNames } from './moduleNames';

@autobind
@ModuleWrapper(ModuleNames.CanvasModule)
export default class CanvasModule extends BaseModule {
  @ModulePropertyWrapper(ModuleNames.ActionDataModule)
  private actionDataModule: ActionDataModule;

  @ModulePropertyWrapper(ModuleNames.ActionModule)
  private actionModule: ActionModule;

  // 清空画布
  clearCanvas() {
    const ctx = this.options.getContext();
    ctx.canvasCtx.clearRect(
      0,
      0,
      ctx.canvasElement.width,
      ctx.canvasElement.height,
    );
  }

  // 通过将当前状态放入栈中，保存 canvas 全部状态的方法。
  // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save
  saveCanvas(ctx: IContext) {
    ctx.canvasCtx.save();
  }

  restoreCanvas(ctx: IContext) {
    ctx.canvasCtx.restore();
  }

  drawImage() {
    const ctx = this.options.getContext();
    const image = ctx.getCurrentImage().image;
    // 缩放
    this.scale(ctx);
    ctx.canvasCtx.drawImage(image, 0, 0);
  }

  scale(ctx: IContext) {
    const actionDataArr = this.actionDataModule.getActionsDataByName(
      ActionNames.ScaleAction,
    );
    if (actionDataArr.length) {
      const scale = actionDataArr[0].data as number;
      ctx.canvasCtx.scale(scale, scale);
    }
  }

  gourpData() {
    this.actionDataModule.getActionsData();
  }

  renderActionData() {
    const ctx = this.options.getContext();
    const actionsData = this.actionDataModule.getActionsData();
    // @TODO: 这里要过滤掉scale的数据，scale要在drawImage前设置
    actionsData.forEach(item => {
      this.actionModule.render(ctx, item);
    });
  }

  render() {
    const ctx = this.options.getContext();
    this.clearCanvas();
    // this.saveCanvas(ctx);
    this.drawImage();
    this.renderActionData(ctx);
    // this.restoreCanvas(ctx);
  }
}
