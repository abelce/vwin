import { autobind } from 'core-decorators';
import {
  BaseModule,
  BaseModuleOptions,
  ModuleApplyOptions,
} from './baseModule';
import { ModulePropertyWrapper, ModuleWrapper } from './moduleManager';
import { ModuleNames } from './moduleNames';
import BaseAction from '../actions/baseAction';
import ActionDataModule from './actionDataModule';
import { ActionNames } from '../actions/actionNames';
import ActionManager from '../actions/actionManager';
import ScaleAction from '../actions/scaleAction';
import { IContext } from '../types/context';
import { ActionDataType } from '../types/actionData';
import ImageLoader from '../image-loader';
import TranslateAction from '../actions/translateAction';

@autobind
@ModuleWrapper(ModuleNames.ActionModule)
export default class ActionModule extends BaseModule {
  private actionManager: ActionManager;

  // private selectedActionName?: ActionNames; // 选中的action name

  @ModulePropertyWrapper(ModuleNames.ActionDataModule)
  private actionDataModule: ActionDataModule;

  constructor(protected options: BaseModuleOptions) {
    super(options);
  }

  public async apply(options: ModuleApplyOptions) {
    this.initActions();
  }

  initActions = () => {
    this.actionManager = new ActionManager({
      canvasElement: this.options.canvasElement,
      actions: [ScaleAction, TranslateAction],
      getSelectActionData: this.actionDataModule.getSelectActionData,
      updateActionData: this.actionDataModule.updateActionData,
      createActionData: this.actionDataModule.createActionData,
      deleteActionData: this.actionDataModule.deleteActionData,
      getActionsDataByName: this.actionDataModule.getActionsDataByName,
      getCurrentImage: (): ImageLoader => {
        return this.options.getContext().getCurrentImage();
      },
    });
  };

  public getActionByName(name: ActionNames) {
    return this.actionManager.getActionByName(name);
  }

  public getSelectedAction(): BaseAction | undefined {
    const selectedActionName = this.actionManager.getSelectedActionName();
    if (!selectedActionName) {
      return undefined;
    }
    return this.actionManager.getActionByName(selectedActionName);
  }

  public changeActiveAction(actionName: ActionNames) {
    this.actionManager.changeActiveAction(actionName);
  }

  public render(ctx: IContext, actionData: ActionDataType) {
    const selectedActionName = this.actionManager.getSelectedActionName();
    this.actionManager.render(
      ctx,
      actionData,
      actionData.name === selectedActionName,
    );
  }
}
