import ImageLoader from './image-loader';
import ImageUtils from './utils/imageUtils';

// 图片管理器
export interface ImageManagerOptions {
  srcList: string[];
}
export default class ImageManager {
  // 加载后的图片对象列表
  private images: Array<ImageLoader> = [];
  constructor(private options: ImageManagerOptions) {}

  public async run() {
    await this.loadImages();
  }

  private async loadImages() {
    const data = await ImageUtils.loadImages(this.options.srcList);
    this.images = data;
  }
}
