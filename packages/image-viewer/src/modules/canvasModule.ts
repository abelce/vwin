import { autobind } from 'core-decorators';
import { ActionNames } from '../actions/actionNames';
import ImageLoader from '../image-loader';
import { ActionPhase } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import ImageUtils from '../utils/imageUtils';
import ActionDataModule from './actionDataModule';
import ActionModule from './actionModule';
import {
  BaseModule,
  BaseModuleOptions,
  ModuleApplyOptions,
} from './baseModule';
import { EventNames } from './eventNames';
import { ModulePropertyWrapper, ModuleWrapper } from './moduleManager';
import { ModuleNames } from './moduleNames';

@autobind
@ModuleWrapper(ModuleNames.CanvasModule)
export default class CanvasModule extends BaseModule {
  @ModulePropertyWrapper(ModuleNames.ActionDataModule)
  private actionDataModule: ActionDataModule;

  @ModulePropertyWrapper(ModuleNames.ActionModule)
  private actionModule: ActionModule;

  @ModulePropertyWrapper(ModuleNames.EventModule)
  private eventModule: EventModule;

  public apply(ctx: IContext): Promise<void> {
    // 数据发生变化后需要重新绘制
    this.eventModule.on(EventNames.ActionDataChange, this.render);
    return Promise.resolve();
  }

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
    // this.scale(ctx);
    // ctx.canvasCtx.translate(100, 100);
    ctx.canvasCtx.drawImage(image, 0, 0);
  }

  scale(ctx: IContext) {
    const actionDataArr = this.actionDataModule.getActionsDataByName(
      ActionNames.ScaleAction,
    );
    if (actionDataArr.length) {
      const scale = actionDataArr[0].data.data as number;
      ctx.canvasCtx.scale(scale, scale);
    }
  }

  // 对数据按照执行阶段进行分组
  private groupActionData(): { [key: string]: Array<ActionDataType> } {
    const group: { [key: string]: Array<ActionDataType> } = {};
    this.actionDataModule.getActionsData().forEach(data => {
      const action = this.actionModule.getActionByName(data.name);
      if (action) {
        if (!group[action.actionPhase]) {
          group[action.actionPhase] = [];
        }
        group[action.actionPhase].push(data);
      }
    });
    return group;
  }

  renderBeforeDrawImage(ctx: IContext, actionsData: Array<ActionDataType>) {
    if (!actionsData) {
      return;
    }
    actionsData.forEach(item => {
      this.actionModule.render(ctx, item);
    });
  }

  renderAfterDrawImage(ctx: IContext, actionsData: Array<ActionDataType>) {
    if (!actionsData) {
      return;
    }
    actionsData.forEach(item => {
      this.actionModule.render(ctx, item);
    });
  }

  render() {
    const ctx = this.options.getContext();
    const groupData = this.groupActionData();
    this.clearCanvas();
    ctx.canvasCtx.save();
    this.renderBeforeDrawImage(ctx, groupData[ActionPhase.BeforeDrawImage]);
    this.drawImage();
    this.renderAfterDrawImage(ctx, groupData[ActionPhase.AfterDrawImage]);
    ctx.canvasCtx.restore();
  }
}
