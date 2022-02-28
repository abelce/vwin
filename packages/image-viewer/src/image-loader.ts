import { LoadingStatus } from './types/loadingStatus';
/**
 * 图片加载器
 */
export default class ImageLoader {
  private loadingStatus: LoadingStatus = LoadingStatus.None;
  public image: HTMLImageElement = new Image();
  constructor(
    private src: string,
    private onComplete?: () => void,
    private onFailed?: OnErrorEventHandler,
  ) {
    this.loadImage();
  }

  get width() {
    return this.image.width;
  }

  get height() {
    return this.image.height;
  }

  loadImage() {
    this.image.onload = () => {
      this.loadingStatus = LoadingStatus.Complete;
      this.onComplete && this.onComplete();
    };
    this.image.onerror = err => {
      this.loadingStatus = LoadingStatus.Failed;
      this.onFailed && this.onFailed(err);
    };
    this.loadingStatus = LoadingStatus.Loading;
    this.image.src = this.src;
  }
}
