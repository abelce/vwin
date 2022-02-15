import ImageLoader from './image-loader';
import { ActionDataType } from './types/action';
import {
  ImageViewerModuleType,
  ImageViewerProps,
  ImageViewerType,
} from './types/imageViewer';
import ImageUtils from './utils/imageUtils';

export default class ImageViewer implements ImageViewerType {
  private container?: HTMLElement = undefined;
  // canvas数据
  private canvas?: HTMLCanvasElement = undefined;
  // canvas ctx
  private canvasCtx: CanvasRenderingContext2D | null = null;
  // src列表
  private srcList: Array<string> = [];
  private actionData: Array<ActionDataType> = []; // 操作数据数据
  private modules: Array<ImageViewerModuleType> = [];
  private currentModuleName?: string; // 选中的操作模块

  constructor(props: ImageViewerProps) {
    // container is reqired
    if (!props.container) {
      return;
    }
    this.init(props);
    this.run();
  }

  private init(props: ImageViewerProps) {
    this.container = props.container;
    this.srcList = Array.isArray(props.srcList) ? props.srcList : [];
    // 删除container下面的所有内容
    this.container.innerHTML = '';

    this.createCanvas();
  }

  // 处理相关逻辑
  private async run() {
    // 加载图片
    // await this.loadImages();
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

  public addModule(module: ImageViewerModuleType): void {} // 添加插件

  public render(): void {} // 渲染函数

  public onChange(data: any): void {} // 每次修改后的回调

  //  获取操作数据列表
  public getActions(): Array<ActionDataType> {
    return [];
  }

  // 获取绘制后的最终图片
  public getImages(): Array<any> {
    return [];
  }
}
