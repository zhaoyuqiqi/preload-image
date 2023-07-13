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
});

preloadImage.start();
```

- imageUrls 代表要预加载的资源地址
- onLoaded 是资源全部加载完毕的 callback
- onProgress 是资源加载过程中的 callback，其中的参数 count 代表当前加载的资源的数量，可以通过 count 与 imageUrls 数组的长度求得当前的进度
