import { ActionDataType } from "./types/action";
import { ImageViewerModuleType, ImageViewerProps, ImageViewerType } from "./types/imageViewer";

export default class ImageViewer implements ImageViewerType {
    private container?: HTMLElement = undefined;
    private images: Array<string> = [];
    private actionData: Array<ActionDataType> = []; // 操作数据数据
    private modules: Array<ImageViewerModuleType> = [];
    private currentModuleName?: string; // 选中的操作模块

    constructor(props: ImageViewerProps) {
        // container is reqired
        if (!props.container) {
            return;
        }
        this.init(props);
    }

    private init(props: ImageViewerProps) {
        this.container = props.container;
        this.images = Array.isArray(props.images) ?  props.images : [];
    }


    public addModule(module: ImageViewerModuleType): void {

    } // 添加插件

    public render(): void {

    } // 渲染函数

    public onChange(data: any): void{

    } // 每次修改后的回调

    //  获取操作数据列表
    public getActions(): Array<ActionDataType> {
        return []
    }

    // 获取绘制后的最终图片
    public getImages(): Array<any> {
        return [];
    }
}