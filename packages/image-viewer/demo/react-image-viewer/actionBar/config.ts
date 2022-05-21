import { ActionNames } from '../../../src/actions/actionNames';
import { ActionOption } from './types';

export const actionsConfig: Array<ActionOption> = [
  {
    actionKey: ActionNames.ScaleAction,
    actionName: '缩放',
    actionIcon: 'icon-suofangda',
    cursorIcon: 'zoom-in',
  },
  {
    actionKey: ActionNames.TranslateAction,
    actionName: '移动',
    actionIcon: 'icon-yidong',
    cursorIcon: 'move',
  },
  {
    actionKey: ActionNames.TextAction,
    actionName: '文本',
    actionIcon: 'icon-text',
    cursorIcon: 'text',
  },
];
