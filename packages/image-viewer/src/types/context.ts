import ImageLoader from '../image-loader';
import { ActionDataType } from './actionData';

export interface IContext {
  // 图片地址列表
  srcList: string[];
  // 当前图片index, 默认 -1
  getCurrentImageIndex: () => void;
  // 当前图片
  getCurrentImage: () => ImageLoader;

  canvasElement: HTMLCanvasElement;

  canvasCtx: CanvasRenderingContext2D;
}
