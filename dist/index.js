function t(t,o,e,n){return new(e||(e=Promise))((function(r,s){function i(t){try{c(n.next(t))}catch(t){s(t)}}function a(t){try{c(n.throw(t))}catch(t){s(t)}}function c(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(i,a)}c((n=n.apply(t,o||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;class o{constructor(t){this.count=0,this.options=t}createLoadTask(t){return t.map((t=>()=>{if(!function(t){return/^http?s:\/\/.*/.test(t)}(t))throw new Error("资源地址不为网络地址，请使用自定义加载器自定义加载方法");const o=this.options.customLoader?this.options.customLoader(t):this.loader(t);if("object"!=typeof(e=o)||null===e||"function"!=typeof e.then)throw new Error("自定义加载器 customLoader 的返回值必须为 Promise, 但是得到一个"+typeof o);var e;return o}))}execTasks(o,e){return t(this,void 0,void 0,(function*(){const t=new Set;for(const n of o){const o=n();t.add(o),o.then((()=>{var e,n;null===(n=(e=this.options).onProgress)||void 0===n||n.call(e,++this.count),t.delete(o)})),t.size>=e&&(yield Promise.race(t))}yield Promise.all(t)}))}execTasksWithSerial(o){var e,n;return t(this,void 0,void 0,(function*(){for(const t of o)yield t(),null===(n=(e=this.options).onProgress)||void 0===n||n.call(e,++this.count)}))}loader(t){return new Promise((o=>{const e=new Image;e.addEventListener("load",(()=>o())),e.addEventListener("error",(()=>o())),e.src=t}))}start(){var o,e,n;return t(this,void 0,void 0,(function*(){const t=this.createLoadTask(this.options.imageUrls);this.options.isSerial?yield this.execTasksWithSerial(t):yield this.execTasks(t,null!==(o=this.options.maxConcurrencyCount)&&void 0!==o?o:6),null===(n=(e=this.options).onLoaded)||void 0===n||n.call(e)}))}}export{o as PreloadImage,o as default};
