import { ActionNames } from 'packages/image-viewer/src/actions/actionNames';
import ImageViewer from 'packages/image-viewer/src/ImageViewer';

export interface ActionOption {
  actionKey: ActionNames; // key
  actionName: string; // 操作名称
  actionIcon: string; // 图标
  cursorIcon: string; //鼠标图标
  // 分组：有些操作点开后有多个可选项，默认选中第一个
  group?: Array<ActionOption>;
}

export interface ActionItemProps {
  action: ActionOption;
  currentActionName?: string;
  onClick: (actionName: string, action: ActionOption) => void; // 按钮点击事件
}

export interface ActionBarProps {
  imageViewer: ImageViewer;
}
