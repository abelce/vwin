import { ActionNames } from '../actions/actionNames';

// 所有数据应该是canvas没有前置的缩放、位移、翻转、旋转操作状态下的数据
export interface ActionDataType {
  id: string; // 操作id
  name: ActionNames; // 操作类型
  enable: boolean; // 是否启用该数据 ，默认true
  data: Record<string, any> | number | string; // 操作数据，key/value对象
}
