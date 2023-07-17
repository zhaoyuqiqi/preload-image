# 预加载你的图片，或者你的静态资源

使用方法：

```ts
import PreloadImage from "preload-image2";
const preloadImage = new PreloadImage({
  imageUrls: ["foo.png", "bar.jpg"],
  onLoaded() {
    console.log("全部加载完成");
  },
  onProgress(count) {
    console.log(`当前加载了${count}`);
  },
  /**
   * 自定义加载器，如果是web可以省略，如果是小程序可以用类似于如下的示例，只要返回一个promise即可
   * 也可以使用定时器模拟加载loading也是支持的
   */
  customLoader(url) {
    // 这个位置会把imageUrls中的每一项打印一次
    console.log(url);
    return new Promise((resolve) => {
      wx.getImageInfo({
        success: resolve,
      });
      // setTimeout(resolve, 500);
    });
  },
});

preloadImage.start();
```

- `imageUrls` 代表要预加载的资源地址
- `onLoaded` 是资源全部加载完毕的 `callback`
- `onProgress` 是资源加载过程中的 `callback`，其中的参数 `count` 代表当前加载的资源的数量，可以通过 `count` 与 `imageUrls` 数组的长度求得当前的进度
- `isSerial` 是否串行加载，开启串行加载后，资源会串行加载，即加载完一个后加载下一个，缺省时默认为 `false。`
- `maxConcurrencyCount` 最大并行加载数量，默认为 `6`，仅在并行加载时生效。
- `customLoader` 自定义加载器，如果是 `web` 可以省略该可选参数，如果是小程序可以用类似于如下的示例，只要返回一个 `promise` 即可，也可以使用定时器模拟加载 `loading` 也是支持的
