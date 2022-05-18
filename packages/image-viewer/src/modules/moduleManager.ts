import { ClassBaseInterface } from '../types/classBase';
import { IContext } from '../types/context';
import { BaseModule } from './baseModule';
import { ModuleInterface } from './interface';

/**
 * module管理
 *
 */

export interface IModuleManager {
  seeds: { [key: string]: any };
  modules: Array<typeof BaseModule>;
  canvasElement: HTMLCanvasElement;
  getContext: () => IContext;
}
export class ModuleManager {
  private modules: Map<
    string,
    {
      moduleName: string;
      moduleClass: any;
      moduleInstance: BaseModule | any; // @TODO: 暂时添加any， 在第二版时删除any
    }
  > = new Map();

  constructor(private options: IModuleManager) {
    this.initModules();
    this.wireModules();
    this.apply();
  }

  initModules() {
    const { modules } = this.options;
    modules.forEach((module: any) => {
      const options = {
        canvasElement: this.options.canvasElement,
        getContext: this.options.getContext,
      };
      const moduleProperty = getModuleProperty(module);
      this.modules.set(moduleProperty.moduleName, {
        moduleName: moduleProperty.moduleName,
        moduleClass: module,
        moduleInstance: new module(options),
      });
    });
  }

  private wireModules() {
    [...this.modules.keys()].forEach(moduleName => {
      const moduleData = this.modules.get(moduleName as string);
      if (moduleData) {
        const { moduleClass, moduleInstance } = moduleData;
        const { attributes = [] } = getModuleProperty(moduleClass);

        attributes.forEach((attr: ModulePropertyAttribute) => {
          moduleInstance[attr.attributeName] = this.lookupModuleProperty(
            attr.moduleName,
          );
        });
      }
    });
  }

  private lookupModuleProperty(lookupModuleName: string) {
    if (
      this.options.seeds &&
      this.options.seeds.hasOwnProperty(lookupModuleName)
    ) {
      //  如果传递下来的seeds中存在，直接返回
      return this.options.seeds[lookupModuleName];
    }
    // 没有的就从moduleManager中存在的modules中寻找
    // 需要注意尽量保证要获取的模块是存在的
    if (this.modules.has(lookupModuleName)) {
      return this.modules.get(lookupModuleName)?.moduleInstance;
    }

    console.error(`module ${lookupModuleName} is not exist`);
  }

  // 执行模块
  public apply() {
    const ctx = this.options.getContext();
    [...this.modules.values()].forEach(async item => {
      await item.moduleInstance?.apply(ctx);
    });
  }

  // 获取module实例
  public get(moduleName: string) {
    return this.modules.get(moduleName)?.moduleInstance as any;
  }
}

export const MODULE_PROPERTY_KEY = '$$image_helper_MODULE_PROPERTY_KEY';

export type ModulePropertyAttribute = {
  attributeName: string | symbol;
  moduleName: string;
};

// 每个Module都需要挂载的属性
export interface ModuleProperties {
  moduleName: string; // module的名称，唯一标识
  lunch: string; // 触发函数
  attributes: Array<ModulePropertyAttribute>;
  // @TODO:
}

/**
 * 包装module，向其中注入模块的名称
 * @param moduleName
 */
export const ModuleWrapper = (moduleName: string) => (module: any) => {
  getModuleProperty(module).moduleName = moduleName;
};

export const getModuleProperty = (target: Function) => {
  if (!target.prototype[MODULE_PROPERTY_KEY]) {
    target.prototype[MODULE_PROPERTY_KEY] = {};
  }
  return target.prototype[MODULE_PROPERTY_KEY];
};

export const ModulePropertyWrapper = (moduleName: string) => (
  target: any,
  propertyName: string,
) => {
  const moduleProperties = getModuleProperty(target.constructor);
  if (!moduleProperties.attributes) {
    moduleProperties.attributes = [];
  }

  moduleProperties.attributes.push({
    moduleName: moduleName, // 需要的模块的名称，
    attributeName: propertyName, // 当前module上对应的属性
  });
};
