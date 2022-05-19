import { autobind } from 'core-decorators';
import { ActionOptions, CanvasEventOptions } from '../types/action';
import { ActionDataType } from '../types/actionData';
import { IContext } from '../types/context';
import { ActionNames } from './actionNames';
import BaseAction from './baseAction';

export interface ActionManagerOptions extends ActionOptions {
  actions: Array<new (...data: any) => BaseAction>;
}

@autobind
export default class ActionManager {
  private actions: Array<BaseAction> = [];
  private actionMap: Map<ActionNames, BaseAction> = new Map();
  private selectedActionName?: ActionNames; // 选中的action name
  private isMousePressed: boolean = false; // 鼠标是否按下

  get canvasEventOptions(): CanvasEventOptions {
    return {
      isMousePressed: this.isMousePressed,
    };
  }

  constructor(private readonly options: ActionManagerOptions) {
    this.initActions();
    this.initCanvasEvent();
  }

  initActions = () => {
    this.options.actions.forEach(action => {
      const actionInstance = new action(this.options);
      this.actions.push(actionInstance);
      this.actionMap.set(actionInstance.name, actionInstance);
    });
  };

  public getActionByName(name: ActionNames): BaseAction | undefined {
    return this.actionMap.get(name);
  }

  public getSelectedActionName(): ActionNames | undefined {
    return this.selectedActionName;
  }

  // 获取选中的action
  public getSelectedAction(): BaseAction | undefined {
    return this.actions.find(action => action.name === this.selectedActionName);
  }

  public changeActiveAction(actionName: ActionNames) {
    if (!this.actionMap.has(actionName)) {
      throw new Error(`action "${actionName}" is not exist`);
    }
    this.selectedActionName = actionName;
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
  // 添加canvas鼠标事件
  private initCanvasEvent = () => {
    const canvasEle = this.options.canvasElement;
    canvasEle.addEventListener('mousedown', this._onMouseDown, false);
    canvasEle.addEventListener('mouseup', this._onMouseUp, false);
    canvasEle.addEventListener('mousemove', this._onMouseMove, false);
    canvasEle.addEventListener('mouseenter', this._onMouseEnter, false);
    canvasEle.addEventListener('mouseleave', this._onMouseLeave, false);

    canvasEle.addEventListener('keydown', this._onKeyDown, false);
    canvasEle.addEventListener('keyup', this._onKeyUp, false);
  };

  // 鼠标移入
  public _onMouseEnter(e: MouseEvent): void {
    this.isMousePressed = true;
    const action = this.getSelectedAction();
    if (action) {
      action?.onMouseEnter(e, this.canvasEventOptions);
    }
  }
  // 鼠标移出
  public _onMouseLeave(e: MouseEvent): void {
    this.isMousePressed = true;
    const action = this.getSelectedAction();
    if (action) {
      action?.onMouseLeave(e, this.canvasEventOptions);
    }
  }

  // 鼠标按下事件
  public _onMouseDown(e: MouseEvent): void {
    this.isMousePressed = true;
    const action = this.getSelectedAction();
    if (action) {
      action?.onMouseDown(e, this.canvasEventOptions);
    }
  }

  // 鼠标松开
  public _onMouseUp(e: MouseEvent): void {
    this.isMousePressed = false;
    const action = this.getSelectedAction();
    if (action) {
      action?.onMouseUp(e, this.canvasEventOptions);
    }
  }

  // 鼠标移动
  public _onMouseMove(e: MouseEvent): void {
    const action = this.getSelectedAction();
    if (action) {
      action?.onMouseMove(e, this.canvasEventOptions);
    }
  }

  // 键盘按下
  public _onKeyDown(e: KeyboardEvent): void {
    const action = this.getSelectedAction();
    if (action) {
      action?.onKeyDown(e, this.canvasEventOptions);
    }
  }

  // 键盘弹起
  public _onKeyUp(e: KeyboardEvent): void {
    const action = this.getSelectedAction();
    if (action) {
      action?.onKeyUp(e, this.canvasEventOptions);
    }
  }
}
