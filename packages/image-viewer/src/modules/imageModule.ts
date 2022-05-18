import { autobind } from 'core-decorators';
import ImageLoader from '../image-loader';
import ImageUtils from '../utils/imageUtils';
import {
  BaseModule,
  BaseModuleOptions,
  ModuleApplyOptions,
} from './baseModule';
import { EventModule } from './eventModule';
import { EventNames } from './eventNames';
import { ModulePropertyWrapper, ModuleWrapper } from './moduleManager';
import { ModuleNames } from './moduleNames';

// 图片管理器
export interface ImageManagerOptions {
  srcList: string[];
}

@autobind
@ModuleWrapper(ModuleNames.ImageModule)
export default class ImageModule extends BaseModule {
  @ModulePropertyWrapper(ModuleNames.EventModule)
  private eventModule: EventModule;
  // 加载后的图片对象列表
  private images: Array<ImageLoader> = [];

  // 当前选中的图片的索引
  private index: number = -1;

  public async apply(options: ModuleApplyOptions) {
    await this.loadImages(options);
    this.index = 0;
    this.eventModule.dispatch(EventNames.ImagesLoaded, { images: this.images });
  }

  private async loadImages(options: ModuleApplyOptions) {
    const data = await ImageUtils.loadImages(options.srcList);
    this.images = data;
  }

  // 获取当前选中的图片
  public getCurrentImage() {
    return this.images[this.index];
  }

  public getIndex() {
    return this.index;
  }

  /**
   * 改变选中的图片
   * @param index
   */
  public setIndex(index: number) {
    this.index = index;
    this.eventModule?.dispatch(EventNames.ChangeImage);
  }
}
