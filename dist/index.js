/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function isOriginPath(url) {
    return /^http?s:\/\/.*/.test(url);
}

var PreloadImage = /** @class */ (function () {
    function PreloadImage(options) {
        this.count = 0;
        this.options = options;
    }
    PreloadImage.prototype.createLoadTask = function (imageUrls) {
        var _this = this;
        return imageUrls.map(function (url) { return function () {
            if (!isOriginPath(url)) {
                throw new Error("资源地址不为网络地址，请使用自定义加载器自定义加载方法");
            }
            return _this.options.customLoader
                ? _this.options.customLoader(url)
                : _this.loader(url);
        }; });
    };
    PreloadImage.prototype.execTasks = function (tasks, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var pool, _loop_1, _i, tasks_1, task;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pool = new Set();
                        _loop_1 = function (task) {
                            var promise;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        promise = task();
                                        pool.add(promise);
                                        promise.then(function () {
                                            var _a, _b;
                                            (_b = (_a = _this.options).onProgress) === null || _b === void 0 ? void 0 : _b.call(_a, ++_this.count);
                                            pool.delete(promise);
                                        });
                                        if (!(pool.size >= limit)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Promise.race(pool)];
                                    case 1:
                                        _b.sent();
                                        _b.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, tasks_1 = tasks;
                        _a.label = 1;
                    case 1:
                        if (!(_i < tasks_1.length)) return [3 /*break*/, 4];
                        task = tasks_1[_i];
                        return [5 /*yield**/, _loop_1(task)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, Promise.all(pool)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreloadImage.prototype.execTasksWithSerial = function (tasks) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, tasks_2, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, tasks_2 = tasks;
                        _a.label = 1;
                    case 1:
                        if (!(_i < tasks_2.length)) return [3 /*break*/, 4];
                        task = tasks_2[_i];
                        return [4 /*yield*/, task()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreloadImage.prototype.loader = function (url) {
        return new Promise(function (resolve) {
            var img = new Image();
            img.addEventListener("load", function () { return resolve(); });
            img.addEventListener("error", function () { return resolve(); });
            img.src = url;
        });
    };
    PreloadImage.prototype.start = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var tasks;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tasks = this.createLoadTask(this.options.imageUrls);
                        if (!this.options.isSerial) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execTasksWithSerial(tasks)];
                    case 1:
                        _e.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.execTasks(tasks, (_a = this.options.maxConcurrencyCount) !== null && _a !== void 0 ? _a : 6)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        (_c = (_b = this.options).onLoaded) === null || _c === void 0 ? void 0 : _c.call(_b);
                        return [2 /*return*/];
                }
            });
        });
    };
    return PreloadImage;
}());

export { PreloadImage, PreloadImage as default };
