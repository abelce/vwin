import { ActionDataType } from "./action";

// 插件类型
export interface ImageViewerModuleType {
    
    name: string; // 插件名称, 必须唯一

    /**
     * 
     * @param data : 上下文信息
     */
    onCanvasRender(data: any): void; // 绘制canvas的回调

    /**
     * 
     * @param data : 上下文信息
     */
    onElementRender(data: any): void; // 渲染插件的html元素， 在操作时不需要绘制到canvas上，只需要使用html元素，方便操作
}

// ImageViewer class 
export interface ImageViewerType {

    container?: HTMLElement; // 容器元素

    images?: Array<string>; // 原始图片数组

    actionData: Array<ActionDataType>; // 操作数据数据

    modules: Array<ImageViewerModuleType>;

    currentModuleName?: string; // 选中的操作模块

    addModule(module: ImageViewerModuleType): void; // 添加插件

    render(): void; // 渲染函数

    onChange(data: any): void; // 每次修改后的回调

    //  获取操作数据列表
    getActions(): Array<ActionDataType>;

    // 获取绘制后的最终图片
    getImages(): Array<any>;
}

export interface ImageViewerProps {
    container: HTMLElement; // 容器元素
    images?: Array<string>; // 原始图片数组
}