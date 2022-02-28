import ImageLoader from '../image-loader';
import { ActionDataType } from './actionData';

export interface IContext {
  // 图片地址列表
  srcList: string[];
  // 当前图片index, 默认 -1
  currentImageIndex: number;
  // 当前图片
  currentImage: ImageLoader;

  canvasElement: HTMLCanvasElement;

  canvasCtx: CanvasRenderingContext2D;
}
