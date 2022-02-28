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

@autobind
@ModuleWrapper(ModuleNames.ActionModule)
export default class ActionModule extends BaseModule {
  private actionManager: ActionManager;

  private selectedActionName?: ActionNames; // 选中的action name

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
      actions: [ScaleAction],
      getSelectActionData: this.actionDataModule.getSelectActionData,
      updateActionData: this.actionDataModule.updateActionData,
      addActionData: this.actionDataModule.addActionData,
      deleteActionData: this.actionDataModule.deleteActionData,
      getActionsDataByName: this.actionDataModule.getActionsDataByName,
    });
  };

  public getSelectedAction(): BaseAction | undefined {
    if (!this.selectedActionName) {
      return undefined;
    }
    this.actionManager.getActionByName(this.selectedActionName);
  }

  public render(ctx: IContext, actionData: ActionDataType) {
    this.actionManager.render(
      ctx,
      actionData,
      actionData.name === this.selectedActionName,
    );
  }
}
