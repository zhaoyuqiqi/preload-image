function t(t,o,e,n){return new(e||(e=Promise))((function(s,i){function r(t){try{c(n.next(t));}catch(t){i(t);}}function a(t){try{c(n.throw(t));}catch(t){i(t);}}function c(t){var o;t.done?s(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o);}))).then(r,a);}c((n=n.apply(t,o||[])).next());}))}"function"==typeof SuppressedError&&SuppressedError;class o{constructor(t){this.count=0,this.options=t;}createLoadTask(t){return t.map((t=>()=>{if(!function(t){return /^http?s:\/\/.*/.test(t)}(t))throw new Error("资源地址不为网络地址，请使用自定义加载器自定义加载方法");return this.options.customLoader?this.options.customLoader(t):this.loader(t)}))}execTasks(o,e){return t(this,void 0,void 0,(function*(){const t=new Set;for(const n of o){const o=n();t.add(o),o.then((()=>{var e,n;null===(n=(e=this.options).onProgress)||void 0===n||n.call(e,++this.count),t.delete(o);})),t.size>=e&&(yield Promise.race(t));}yield Promise.all(t);}))}execTasksWithSerial(o){return t(this,void 0,void 0,(function*(){for(const t of o)yield t();}))}loader(t){return new Promise((o=>{const e=new Image;e.addEventListener("load",(()=>o())),e.addEventListener("error",(()=>o())),e.src=t;}))}start(){var o,e,n;return t(this,void 0,void 0,(function*(){const t=this.createLoadTask(this.options.imageUrls);this.options.isSerial?yield this.execTasksWithSerial(t):yield this.execTasks(t,null!==(o=this.options.maxConcurrencyCount)&&void 0!==o?o:6),null===(n=(e=this.options).onLoaded)||void 0===n||n.call(e);}))}}

const preloadImage = new o({
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
});

preloadImage.start();
