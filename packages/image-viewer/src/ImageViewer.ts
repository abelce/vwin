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

export default class ImageViewer implements ImageViewerType {
  private container?: HTMLElement = undefined;
  // canvas数据
  private canvas: HTMLCanvasElement;
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

  constructor(props: ImageViewerProps) {
    if (!props.container) {
      return;
    }
    this.initDom(props);
    this.initModules();
    this.initEvents(); // 初始化事件
    this.applyModules();
  }

  private initDom(props: ImageViewerProps) {
    this.container = props.container;
    this.srcList = Array.isArray(props.srcList) ? props.srcList : [];
    // 删除container下面的所有内容
    this.container.innerHTML = '';
    this.createCanvas();
  }

  // init canvas
  private createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.container?.appendChild(canvas);
    this.canvas = canvas;
    this.canvasCtx = this.canvas.getContext('2d');
    // @TODO: 添加页面大小改变时的resize监听
  }

  // 初始化模块
  private initModules() {
    this.modules = new ModuleManager({
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

  private applyModules() {
    const ctx = this.getContext();
    this.modules.apply(ctx);
  }

  private initEvents() {
    this.getModule(ModuleNames.EventModule).on(EventNames.ImagesLoaded, () => {
      this.getModule(ModuleNames.CanvasModule).render(this.getContext());
    });
  }

  public getModule(moduleName: string) {
    return this.modules.get(moduleName);
  }

  public render(): void {} // 渲染函数

  //  获取操作数据列表
  public getActions(): Array<ActionDataType> {
    return [];
  }

  // 图片处理

  // 上下文
  private getContext(): IContext {
    return {
      // 图片地址列表
      srcList: this.srcList,
      // 当前图片index
      currentImageIndex: this.getModule(ModuleNames.ImageModule).getIndex(),
      // 当前图片
      currentImage: this.getModule(ModuleNames.ImageModule).getCurrentImage(),
      // 操作数据
      canvasElement: this.canvas,
      canvasCtx: this.canvas.getContext('2d'),
    };
  }
}
