import { autobind } from 'core-decorators';
import { ActionDataType } from '../types/actionData';
import { BaseModule, BaseModuleOptions } from './baseModule';
import { ModulePropertyWrapper, ModuleWrapper } from './moduleManager';
import { ModuleNames } from './moduleNames';
import { uuid } from 'uuidv4';
import { IContext } from '../types/context';
import { ActionNames } from '../actions/actionNames';
import { EventModule } from './eventModule';
import { EventNames } from './eventNames';

@autobind
@ModuleWrapper(ModuleNames.ActionDataModule)
export default class ActionDataModule extends BaseModule {
  private actionsData: Array<ActionDataType> = []; // 操作数据数据
  // private selectedActionName?: string; // 选中的action name
  private selectedActionDataId?: string; // 选中的action data id

  @ModulePropertyWrapper(ModuleNames.EventModule)
  private eventModule: EventModule;

  constructor(protected options: BaseModuleOptions) {
    super(options);
    this.actionsData = options.actionsData || [];
  }

  public apply(ctx: IContext): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 获取所有操作数据
   * @returns
   */
  public getActionsData() {
    return this.actionsData;
  }

  /**
   * get select action data by id
   * @returns
   */
  public getSelectActionData(): ActionDataType | undefined {
    if (!this.selectedActionDataId) {
      return undefined;
    }
    return this.getActionDataById(this.selectedActionDataId);
  }

  /**
   *
   * @param id : action id
   * @returns
   */
  public getActionDataById(id: string): ActionDataType | undefined {
    return this.actionsData.find(action => action.id === id);
  }

  /**
   *
   * @param 根据类型获取action 列表
   * @returns
   */
  public getActionsDataByName(name: string): Array<ActionDataType> {
    return this.actionsData.filter(action => action.name === name);
  }

  /**
   * create action data and return
   * @param name
   * @param data
   * @returns
   */
  public createActionData(
    name: ActionNames,
    data: any,
    shouldUpdate = false,
  ): ActionDataType {
    const newActionData: ActionDataType = {
      id: uuid(),
      name,
      data,
      enable: true,
    };
    this.actionsData.push(newActionData);
    if (shouldUpdate) {
      this.eventModule.dispatch(EventNames.ActionDataChange);
    }
    return newActionData;
  }

  /**
   * update action data by id, return true if update success
   * @param id
   * @param data
   * @returns
   */
  public updateActionData(data: any, shouldUpdate = false) {
    const index = this.actionsData.findIndex(action => action.id === data.id);
    if (index !== -1) {
      this.actionsData[index] = {
        ...this.actionsData[index],
        ...data,
      };
      if (shouldUpdate) {
        this.eventModule.dispatch(EventNames.ActionDataChange);
      }
    }
  }

  public addActionData(data: any): void {
    this.actionsData.push(data);
  }

  public deleteActionData(id: any): boolean {
    const index = this.actionsData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.actionsData.splice(index, 1);
      return true;
    }
    return false;
  }

  // 清空数据
  public clear(): void {
    this.actionsData = [];
    this.selectedActionDataId = undefined;
  }
}
