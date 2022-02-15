import ImageLoader from '../image-loader';

export default class ImageUtils {
  // 加载图片
  static loadImages(list: string[] = []): Promise<Array<ImageLoader>> {
    // 加载好的图片数量
    let result: ImageLoader[] = [];

    return new Promise((resolve, reject) => {
      const callback = () => {
        if (result.every(item => !!item)) {
          resolve(result);
        }
      };
      list.forEach((src, index) => {
        const item = new ImageLoader(
          src,
          () => {
            result[index] = item;
            callback();
          },
          () => {
            result[index] = item;
            callback();
          },
        );
      });
    });
  }

  static drawImage(
    ctx: CanvasRenderingContext2D,
    imageData: ImageData,
    x: number,
    y: number,
  ) {
    ctx.putImageData(imageData, x, y);
  }
}
