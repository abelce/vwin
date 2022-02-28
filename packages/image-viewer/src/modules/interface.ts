export type ILisenter = (...params: any) => void | Promise<any>;

export interface ModuleInterface {
  listeners: Array<ILisenter>;

  destructor(): void; // 析构函数
}
