import { PreloadImage } from "preload-image2";
const preloadImage = new PreloadImage({
  imageUrls: [
    "https://zhaoyuqiqi.github.io/zyq-docs/images/header-logo.jpg",
    "https://zhaoyuqiqi.github.io/zyq-docs/images/header-logo.jpg",
    "https://zhaoyuqiqi.github.io/zyq-docs/images/header-logo.jpg",
    "https://zhaoyuqiqi.github.io/zyq-docs/images/header-logo.jpg",
    "https://zhaoyuqiqi.github.io/zyq-docs/images/header-logo.jpg",
  ],
  onLoaded() {
    console.log("全部加载完成");
  },
  onProgress(count) {
    console.log(`当前加载了${count}`);
  },
  customLoader(url) {
    console.log(url);
    return new Promise((resolve) => {
      // wx.getImageInfo({
      //   success: resolve,
      // });
      setTimeout(resolve, 500);
    });
  },
});

preloadImage.start();
