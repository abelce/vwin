import { ActionOptions } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

export interface ActionManagerOptions extends ActionOptions {
  actions: Array<new (...data: any) => BaseAction>;
}

export default class ActionManager {
  private actions: Array<BaseAction> = [];
  private actionMap: Map<ActionNames, BaseAction> = new Map();

  constructor(private readonly options: ActionManagerOptions) {
    this.initActions();
  }

  initActions = () => {
    this.options.actions.forEach(action => {
      const actionInstance = new action(this.options);
      this.actions.push(actionInstance);
      this.actionMap.set(actionInstance.name, actionInstance);
    });
  };

  public getActionByName(name: ActionNames): BaseAction | undefined {
    return this.actions.find(action => action.name === name);
  }

  public render(
    ctx: IContext,
    actionData: ActionDataType,
    dataIsEditing?: boolean,
  ) {
    if (actionData) {
      this.actionMap
        .get(actionData.name)
        ?.render(ctx, actionData, dataIsEditing);
    }
  }
}
