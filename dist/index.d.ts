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
export declare class PreloadImage {
    private options;
    constructor(options: PreloadImageOptions);
    private count;
    protected createLoadTask(imageUrls: string[]): (() => Promise<void>)[];
    protected execTasks(tasks: (() => Promise<void>)[], limit: number): Promise<void>;
    protected execTasksWithSerial(tasks: (() => Promise<void>)[]): Promise<void>;
    protected loader(url: string): Promise<void>;
    start(): Promise<void>;
}
export default PreloadImage;
