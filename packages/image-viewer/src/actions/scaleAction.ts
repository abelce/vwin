import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

export default class ScaleAction extends BaseAction {
  public name: string = ActionNames.ScaleAction;

  public onChange(): void {}
}
