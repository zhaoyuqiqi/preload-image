import { isPromise, isOriginPath } from "./lib/index";

interface PreloadImageOptions {
  /** url 数组 */
  imageUrls: string[];
  /** 是否串行 */
  isSerial?: boolean;
  /** 最大并发数量，仅并行加载时有效 */
  maxConcurrencyCount?: number;
  /**
   * 资源加载进度
   * @param count 加载当前数量
   */
  onProgress?(count: number): any;
  /** 资源加载完成 */
  onLoaded?(): void;
  /**
   * 自定义加载器
   * 当平台不为web或图片地址不为网络地址时或资源不为图片时可使用该方法来重写加载器用来做预加载
   */
  customLoader?(url: string): Promise<void>;
}
export class PreloadImage {
  private options: PreloadImageOptions;
  constructor(options: PreloadImageOptions) {
    this.options = options;
  }
  private count = 0;

  protected createLoadTask(imageUrls: string[]) {
    return imageUrls.map((url) => () => {
      if (!isOriginPath(url)) {
        throw new Error(
          "资源地址不为网络地址，请使用自定义加载器自定义加载方法"
        );
      }
      const task = this.options.customLoader
        ? this.options.customLoader(url)
        : this.loader(url);
      if (!isPromise(task)) {
        throw new Error(
          `自定义加载器 customLoader 的返回值必须为 Promise, 但是得到一个${typeof task}`
        );
      }
      return task;
    });
  }
  protected async execTasks(tasks: (() => Promise<void>)[], limit: number) {
    const pool = new Set();
    for (const task of tasks) {
      const promise = task();
      pool.add(promise);
      promise.then(() => {
        this.options.onProgress?.(++this.count);
        pool.delete(promise);
      });
      if (pool.size >= limit) {
        await Promise.race(pool);
      }
    }
    await Promise.all(pool);
  }
  protected async execTasksWithSerial(tasks: (() => Promise<void>)[]) {
    for (const task of tasks) {
      await task();
      this.options.onProgress?.(++this.count);
    }
  }
  protected loader(url: string) {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.addEventListener("load", () => resolve());
      img.addEventListener("error", () => resolve());
      img.src = url;
    });
  }
  async start() {
    const tasks = this.createLoadTask(this.options.imageUrls);
    this.options.isSerial
      ? await this.execTasksWithSerial(tasks)
      : await this.execTasks(tasks, this.options.maxConcurrencyCount ?? 6);
    this.options.onLoaded?.();
  }
}
export default PreloadImage;
