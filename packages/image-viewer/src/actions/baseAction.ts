import { ActionOptions } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { ActionNames } from './actionNames';

export default abstract class BaseAction {
  public abstract name: ActionNames;

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
}
