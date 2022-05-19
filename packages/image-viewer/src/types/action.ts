import { ActionNames } from '../actions/actionNames';
import ImageLoader from '../image-loader';
import { ActionDataType } from './actionData';
import { IContext } from './context';
import { ImageViewerType } from './imageViewer';

export interface IAction {
  // 操作的名称
  name: string;
  // 渲染action数据的回调
  // render(ctx: IContext): void;

  // 选择该操作的回调
  // onSelect(name: string): void;
  // 编辑时的回调, 编辑时使用html绘制，减少所有数据绘制在canvas，提高效率
  // onEdit(ctx: IContext): void;
  // 保存时的回调，保存时绘制在canvas上
  // onSave(ctx: IContext): void;
}

export interface ActionOptions {
  canvasElement: HTMLCanvasElement;
  // imageViewer: ImageViewerType;
  // 获取选中的数据
  getSelectActionData(): ActionDataType | undefined;
  // 更新数据
  updateActionData(data: ActionDataType, shouldUpdate?: boolean): void;
  // 添加数据
  createActionData(
    name: ActionNames,
    data: ActionDataType,
    shouldUpdate?: boolean,
  ): void;
  // 删除数据
  deleteActionData(id: string): boolean;
  // 获取某种名称的所有数据
  getActionsDataByName(name: string): Array<ActionDataType>;
  // 获取当前的图片信息
  getCurrentImage(): ImageLoader;
}

export interface CanvasEventOptions {
  isMousePressed: boolean; // 鼠标是否按住
}
