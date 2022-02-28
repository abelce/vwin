import { ActionDataType } from '../types/actionData';
import { ClassBaseInterface } from '../types/classBase';
import { IContext } from '../types/context';
import { ILisenter } from './interface';

export interface BaseModuleOptions {
  canvas: HTMLCanvasElement;
  actionsData: Array<ActionDataType>;
}

export interface ModuleApplyOptions {
  srcList: string[];
}

export abstract class BaseModule implements ClassBaseInterface {
  protected listeners: Array<ILisenter> = [];

  constructor(protected options: BaseModuleOptions) {}

  // 模块执行函数, 一般把需要提前准备的操作放在apply方法中
  public apply(ctx: IContext): Promise<void> {
    return Promise.resolve();
  }

  public destructor() {
    // 销毁当前模块添加的监听器
    this.listeners.forEach(listener => listener && listener());
  }
}
