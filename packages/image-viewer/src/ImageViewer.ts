import { autobind } from 'core-decorators';
import { ActionNames } from './actions/actionNames';
import ImageLoader from './image-loader';
import ActionDataModule from './modules/actionDataModule';
import ActionModule from './modules/actionModule';
import CanvasModule from './modules/canvasModule';
import { EventModule } from './modules/eventModule';
import { EventNames } from './modules/eventNames';
import ImageModule from './modules/imageModule';
import { ModuleManager } from './modules/moduleManager';
import { ModuleNames } from './modules/moduleNames';
import { ActionDataType } from './types/actionData';
import { IContext } from './types/context';
import { ImageViewerProps, ImageViewerType } from './types/imageViewer';
import ImageUtils from './utils/imageUtils';

@autobind
export default class ImageViewer implements ImageViewerType {
  private container?: HTMLElement = undefined;
  // canvas数据
  public canvas: HTMLCanvasElement;
  // canvas ctx
  private canvasCtx: CanvasRenderingContext2D | null = null;
  // src列表
  private srcList: Array<string> = [];
  private actionData: Array<ActionDataType> = []; // 操作数据数据
  // private modules: Array<ImageViewerModuleType> = [];
  // private currentModuleName?: string; // 选中的操作模块
  // 模块管理属性
  public modules: ModuleManager;
  // 操作管理
  public actions = [];

  constructor(private options: ImageViewerProps) {
    if (!options.container) {
      return;
    }
    this.initDom(options);
    this.initModules();
    this.initEvents(); // 初始化事件
  }

  private initDom(options: ImageViewerProps) {
    this.container = options.container;
    this.srcList = Array.isArray(options.srcList) ? options.srcList : [];
    // 删除container下面的所有内容
    this.container.innerHTML = '';
    this.createCanvas();
  }

  // init canvas
  private createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.width = this.options.width + 'px';
    canvas.style.height = this.options.height + 'px';
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    this.container?.appendChild(canvas);
    this.canvas = canvas;
    this.canvasCtx = this.canvas.getContext('2d');
    // @TODO: 添加页面大小改变时的resize监听
  }

  // 初始化模块
  private initModules() {
    this.modules = new ModuleManager({
      canvasElement: this.canvas,
      getContext: this.getContext,
      seeds: {},
      modules: [
        EventModule,
        ImageModule,
        CanvasModule,
        ActionDataModule,
        ActionModule,
      ],
    });
  }

  private initEvents() {
    const eventModule = this.getModule<EventModule>(ModuleNames.EventModule);
    eventModule.on(EventNames.ImagesLoaded, () => {
      // 显示第一张图片
      this.getModule<ImageModule>(ModuleNames.ImageModule).setIndex(0);
    });
    eventModule.on(EventNames.ChangeImage, this.changeImage);
  }

  public getModule<T>(moduleName: string): T {
    return (this.modules?.get(moduleName) as unknown) as T;
  }

  public render(): void {} // 渲染函数

  //  获取操作数据列表
  public getActions(): Array<ActionDataType> {
    return [];
  }

  public changeActiveAction(actionName: ActionNames) {
    const actionModule = this.getModule<ActionModule>(ModuleNames.ActionModule);
    actionModule.changeActiveAction(actionName);
  }

  public getActiveAction() {
    const actionModule = this.getModule<ActionModule>(ModuleNames.ActionModule);
    return actionModule.getSelectedAction();
  }

  // 上下文
  private getContext(): IContext {
    return {
      // 图片地址列表
      srcList: this.srcList,
      // // 当前图片index
      getCurrentImageIndex: this.getModule<ImageModule>(ModuleNames.ImageModule)
        ?.getIndex,
      // // 当前图片
      getCurrentImage: this.getModule<ImageModule>(ModuleNames.ImageModule)
        ?.getCurrentImage,
      // 操作数据
      canvasElement: this.canvas,
      canvasCtx: this.canvas.getContext('2d'),
    };
  }

  private changeImage() {
    this.initImage();
    // 绘制图片
    this.getModule<CanvasModule>(ModuleNames.CanvasModule).render();
  }

  // 初始化图片的大小，根据当前画布的大小进行缩放
  // 设置图片的缩放比
  private initImage() {
    const ctx = this.getContext();
    const image = ctx?.getCurrentImage();
    // const scale = Math.min(
    //   this.canvas.width / image.width,
    //   this.canvas.height / image.height,
    // ); // 获取图片的
    const scale = 1;
    this.getModule<ActionDataModule>(
      ModuleNames.ActionDataModule,
    ).createActionData(ActionNames.ScaleAction, { data: scale });
  }
}
