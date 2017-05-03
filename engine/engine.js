var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var math;
(function (math) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    math.Point = Point;
    var Rectangle = (function () {
        function Rectangle() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }
        Rectangle.prototype.isPointInRect = function (point) {
            if (point.x > this.x
                && point.y > this.y
                && point.x < this.x + this.width
                && point.y < this.y + this.height) {
                return true;
            }
            else {
                return false;
            }
        };
        return Rectangle;
    }());
    math.Rectangle = Rectangle;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    math.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    math.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    math.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            this.a = Math.cos(skewY) * scaleX;
            this.b = Math.sin(skewY) * scaleX;
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        return Matrix;
    }());
    math.Matrix = Matrix;
})(math || (math = {}));
var halcyon;
(function (halcyon) {
    var Ticker = (function () {
        function Ticker() {
            this.listeners = [];
        }
        Ticker.getInstance = function () {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return this.instance;
        };
        Ticker.prototype.register = function (listener) {
            this.listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
        };
        Ticker.prototype.notify = function (deltaTime) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(deltaTime);
            }
        };
        return Ticker;
    }());
    halcyon.Ticker = Ticker;
})(halcyon || (halcyon = {}));
var halcyon;
(function (halcyon) {
    /**
     * 定义一个鼠标事件
     */
    var _TouchEvent = (function () {
        function _TouchEvent(Mouse_Event, listener, useCapture) {
            /**
             * 是否开启捕捉
             */
            this.useCapture = false;
            this.Mouse_Event = Mouse_Event;
            this.listener = listener;
            if (useCapture) {
                this.useCapture = useCapture;
            }
        }
        return _TouchEvent;
    }());
    halcyon._TouchEvent = _TouchEvent;
    /**
     * 鼠标事件枚举类型
     */
    var MOUSE_EVENT;
    (function (MOUSE_EVENT) {
        MOUSE_EVENT[MOUSE_EVENT["mousedown"] = 1] = "mousedown";
        MOUSE_EVENT[MOUSE_EVENT["mousemove"] = 2] = "mousemove";
        MOUSE_EVENT[MOUSE_EVENT["mouseup"] = 3] = "mouseup";
        MOUSE_EVENT[MOUSE_EVENT["click"] = 4] = "click";
    })(MOUSE_EVENT = halcyon.MOUSE_EVENT || (halcyon.MOUSE_EVENT = {}));
    /**
     * DisplayObject类型枚举
     */
    var DISPLAYOBJECT_TYPE;
    (function (DISPLAYOBJECT_TYPE) {
        DISPLAYOBJECT_TYPE[DISPLAYOBJECT_TYPE["Bitmap"] = 1] = "Bitmap";
        DISPLAYOBJECT_TYPE[DISPLAYOBJECT_TYPE["TextField"] = 2] = "TextField";
        DISPLAYOBJECT_TYPE[DISPLAYOBJECT_TYPE["Shape"] = 3] = "Shape";
        DISPLAYOBJECT_TYPE[DISPLAYOBJECT_TYPE["MovieClip"] = 4] = "MovieClip";
        DISPLAYOBJECT_TYPE[DISPLAYOBJECT_TYPE["Container"] = 5] = "Container";
    })(DISPLAYOBJECT_TYPE = halcyon.DISPLAYOBJECT_TYPE || (halcyon.DISPLAYOBJECT_TYPE = {}));
    var Dispatcher = (function () {
        function Dispatcher() {
        }
        /**
         * 执行事件队列
         */
        Dispatcher.doEventList = function (e) {
            for (var _i = 0, _a = Dispatcher.doEventOrderList; _i < _a.length; _i++) {
                var i = _a[_i];
                i.listener(e);
            }
            Dispatcher.doEventOrderList = [];
        };
        /**
         * 派发对应type的鼠标事件
         */
        Dispatcher.dispatchChain = function (allEvents, type) {
            for (var i = 0; i < allEvents.length; i++) {
                if (type == allEvents[i].Mouse_Event) {
                    if (allEvents[i].useCapture) {
                        Dispatcher.doEventOrderList.unshift(allEvents[i]);
                    }
                    else {
                        Dispatcher.doEventOrderList.push(allEvents[i]);
                    }
                }
            }
        };
        return Dispatcher;
    }());
    /**
     * 本次鼠标事件需要执行的事件队列，按照捕获后的顺序
     */
    Dispatcher.doEventOrderList = [];
    halcyon.Dispatcher = Dispatcher;
    var DisplayObject = (function () {
        function DisplayObject() {
            /**
             * addEventListener添加的所有事件存储在此数组
             */
            this.selfEvents = [];
            this.x = 0;
            this.y = 0;
            this.globalAlpha = 1;
            /**
             * 透明度
             */
            this.alpha = 1;
            this.ScaleX = 1;
            this.ScaleY = 1;
            /**
             *旋转(角度制)
             */
            this.rotation = 0;
            /**
             * 是否检测碰撞
             */
            this.touchEnable = true;
        }
        /**
         * 计算矩阵。
         */
        DisplayObject.prototype.calculate = function (context) {
            if (this.analysisMatrix(context)) {
                if (!this.parent) {
                    this.globalAlpha = this.alpha;
                }
                else {
                    this.globalAlpha = this.alpha * this.parent.globalAlpha;
                }
            }
            else {
                console.log("container wrong!");
                return;
            }
        };
        /**
         * 添加事件侦听器
         */
        DisplayObject.prototype.addEventListener = function (type, react, useCapture) {
            var selfEvent;
            if (useCapture) {
                selfEvent = new _TouchEvent(type, react, useCapture);
            }
            else {
                selfEvent = new _TouchEvent(type, react);
            }
            this.selfEvents.push(selfEvent);
        };
        /**
         * 删除事件侦听器
         */
        DisplayObject.prototype.removeEventListener = function (eventType, listener, useCapture) {
            for (var i = 0; i < this.selfEvents.length; i++) {
                var compare = this.selfEvents[i];
                if (compare.Mouse_Event == eventType
                    && compare.listener == listener
                    && compare.useCapture == useCapture) {
                    this.selfEvents.splice(i, 1);
                    console.log("remove success!");
                    break;
                }
            }
        };
        /**
         * 判断是否存在事件侦听器
         */
        DisplayObject.prototype.hasEventListener = function () {
            return this.selfEvents && this.selfEvents.length == 0 ? false : true;
        };
        /**
         * 根据是否开启捕获，发送事件到事件队列头或尾
         */
        DisplayObject.prototype.dispatchEvent = function (type) {
            Dispatcher.dispatchChain(this.selfEvents, type);
            var father = this.parent;
            if (father) {
                father.dispatchEvent(type);
            }
        };
        /**
         * 计算全局矩阵和本地矩阵,成功则返回true,并且将自己加入渲染数组。
         */
        DisplayObject.prototype.analysisMatrix = function (context) {
            this.localMatrix = new math.Matrix();
            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.ScaleX, this.ScaleY, this.rotation);
            if (!this.parent) {
                this.globalMatrix = this.localMatrix;
            }
            else {
                this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
            }
            //计算矩阵后加入渲染组。
            DisplayObject.renderList.push(this);
            return true;
        };
        return DisplayObject;
    }());
    /**
     * 需要画出的显示对象组
     */
    DisplayObject.renderList = [];
    halcyon.DisplayObject = DisplayObject;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            /**
             * 显示列表
             */
            _this.children = [];
            _this.type = DISPLAYOBJECT_TYPE.Container;
            return _this;
        }
        /**
         * 添加一个现实对象，成功返回true
         */
        DisplayObjectContainer.prototype.addChild = function (newElement) {
            this.children.push(newElement);
            newElement.parent = this;
            return true;
        };
        /**
         * 删除指定子容器
         */
        DisplayObjectContainer.prototype.removeChild = function (deleteElement) {
            var index = this.indexOfChildren(deleteElement);
            if (index == -1) {
                console.log("no element found!!");
                return false;
            }
            else {
                this.children.splice(index, 1);
                deleteElement.parent = null;
                return true;
            }
        };
        /**
         * 交换两个子物体，成功返回true，失败返回false
         */
        DisplayObjectContainer.prototype.swapChildren = function (object1, object2) {
            var object1Index = this.indexOfChildren(object1);
            var object2Index = this.indexOfChildren(object2);
            if (object1Index == -1 || object2Index == -1) {
                return false;
            }
            else {
                var temp = this.children[object1Index];
                this.children[object1Index] = this.children[object2Index];
                this.children[object2Index] = temp;
                return true;
            }
        };
        /**
         * 判断是否存在传入的子物体，存在则返回子物体位置，否则返回-1
         */
        DisplayObjectContainer.prototype.indexOfChildren = function (object) {
            var goalNumber = 0;
            var ifExist = false;
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var del = _a[_i];
                if (del == object) {
                    ifExist = true;
                    break;
                }
                goalNumber++;
            }
            return ifExist ? goalNumber : -1;
        };
        /**
         * 覆写父类的calculate方法，除了计算自己的矩阵外，还需要遍历children
         * 调用children的calculate方法。
         */
        DisplayObjectContainer.prototype.calculate = function (context) {
            if (this.analysisMatrix(context)) {
                if (!this.parent) {
                    this.globalAlpha = this.alpha;
                }
                else {
                    this.globalAlpha = this.alpha * this.parent.globalAlpha;
                }
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].calculate(context);
                }
            }
            else {
                console.log("container wrong!");
                return;
            }
        };
        /**
         * container的hitTest方法会遍历children的hitTest方法
         * 如子物体的hitTest检测成功，则返回被点击到的子物体
         */
        DisplayObjectContainer.prototype.hitTest = function (hitPoint) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var child = this.children[i];
                var invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
                var pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
                var hitTestResult = child.hitTest(pointBaseOnChild);
                if (hitTestResult) {
                    return hitTestResult;
                }
            }
            return null;
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    halcyon.DisplayObjectContainer = DisplayObjectContainer;
    /**
     * 舞台
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(stageX, stageY) {
            var _this = _super.call(this) || this;
            _this.stageW = stageX;
            _this.stageH = stageY;
            _this.type = DISPLAYOBJECT_TYPE.Container;
            return _this;
        }
        return Stage;
    }(DisplayObjectContainer));
    halcyon.Stage = Stage;
    /**
     * 图形(暂时为矩形)
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            var _this = _super.call(this) || this;
            /**
             * 图形宽度
             */
            _this.width = 0;
            /**
             * 图形高度
             */
            _this.height = 0;
            /**
             * 图形颜色
             */
            _this.color = "#000000";
            _this.type = DISPLAYOBJECT_TYPE.Shape;
            return _this;
        }
        /**
         * 检测是否点击到Shape
         */
        Shape.prototype.hitTest = function (hitPoint) {
            var rect = new math.Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            var invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        };
        return Shape;
    }(DisplayObject));
    halcyon.Shape = Shape;
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            var _this = _super.call(this) || this;
            /**
             * 文本内容
             */
            _this.text = "";
            /**
             * 文本颜色
             */
            _this.color = "#000000";
            /**
             * 文本格式，例如"15px Arial"
             */
            _this.font = "15px Arial";
            /**
             * 测量文本宽度
             */
            _this._measureTextWidth = 0;
            _this.type = DISPLAYOBJECT_TYPE.TextField;
            return _this;
        }
        /**
         * 判断是否点击到文字
         */
        TextField.prototype.hitTest = function (hitPoint) {
            var rect = new math.Rectangle();
            rect.width = this._measureTextWidth;
            rect.height = 20;
            var invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        };
        return TextField;
    }(DisplayObject));
    halcyon.TextField = TextField;
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            var _this = _super.call(this) || this;
            /**
             * 图片的资源代理类
             */
            _this.img = new halcyon.RES.ImageResource();
            _this.type = DISPLAYOBJECT_TYPE.Bitmap;
            return _this;
        }
        /**
         * 改变bitmap
         */
        Bitmap.prototype.changeBitmap = function (name) {
            this.img = halcyon.RES.getRES(name);
        };
        /**
         * 判断是否点击到图片
         */
        Bitmap.prototype.hitTest = function (hitPoint) {
            var rect = new math.Rectangle();
            rect.width = this.img.width;
            rect.height = this.img.height;
            var invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnChild = math.pointAppendMatrix(hitPoint, invertChildLocalMatrix);
            return rect.isPointInRect(pointBaseOnChild) && this.touchEnable ? this : null;
        };
        return Bitmap;
    }(DisplayObject));
    halcyon.Bitmap = Bitmap;
    /**
     * 动画
     */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data) {
            var _this = _super.call(this) || this;
            _this.advancedTime = 0;
            _this.TOTAL_FRAME = 0;
            _this.data = { name: "", frames: [] };
            _this.ticker = function (deltaTime) {
                _this.advancedTime += deltaTime;
                if (_this.advancedTime >= MovieClip.FRAME_TIME * _this.TOTAL_FRAME) {
                    _this.advancedTime -= MovieClip.FRAME_TIME * _this.TOTAL_FRAME;
                }
                _this.currentFrameIndex = Math.floor(_this.advancedTime / MovieClip.FRAME_TIME);
                var data = _this.data;
                var frameData = data.frames[_this.currentFrameIndex];
                var newUrl = frameData.image;
                _this.changeBitmap(newUrl);
            };
            _this.type = DISPLAYOBJECT_TYPE.MovieClip;
            _this.setMovieClipData(data);
            _this.play();
            return _this;
        }
        MovieClip.prototype.play = function () {
            halcyon.Ticker.getInstance().register(this.ticker);
        };
        MovieClip.prototype.stop = function () {
            halcyon.Ticker.getInstance().unregister(this.ticker);
        };
        MovieClip.prototype.setMovieClipData = function (data) {
            this.data = data;
            var totalFrame = data.frames.length;
            this.TOTAL_FRAME = totalFrame;
            this.currentFrameIndex = 0;
            for (var i = 0; i < totalFrame; i++) {
                var image = halcyon.RES.getRES(data.frames[i].image);
                image.load();
            }
        };
        return MovieClip;
    }(Bitmap));
    MovieClip.FRAME_TIME = 60;
    halcyon.MovieClip = MovieClip;
    /**
     * 生成MovieClipData的工厂类，构造函数传入每一帧的图片名称，再调用generateMovieClipData方法，
     * 传入一个动画名称，生成对应的MovieClipData。
     */
    var MovieClipFrameDataFactory = (function () {
        function MovieClipFrameDataFactory(animJsonUrl) {
            if (!animJsonUrl) {
                console.log("no names");
                return;
            }
            this.animJsonUrl = animJsonUrl;
        }
        /**
         * 传入动画名称，生成对应的MovieClipData
         */
        MovieClipFrameDataFactory.prototype.generateMovieClipData = function (animationName) {
            var animNames = halcyon.RES.AnimationLoader.loadAnimationConfig(this.animJsonUrl, animationName);
            var result = { name: "", frames: [] };
            result.name = animationName;
            for (var urlIndex = 0; urlIndex < animNames.length; urlIndex++) {
                var movieClipFrameData = { image: "" };
                movieClipFrameData.image = animNames[urlIndex];
                result.frames.push(movieClipFrameData);
            }
            return result;
        };
        return MovieClipFrameDataFactory;
    }());
    halcyon.MovieClipFrameDataFactory = MovieClipFrameDataFactory;
})(halcyon || (halcyon = {}));
var halcyon;
(function (halcyon) {
    var RES;
    (function (RES) {
        /**
         * 异步读取JSON文件。
         */
        function loadConfig(url, callback) {
            var result;
            var type = getTypeByURL(url);
            if (type != "text") {
                console.error("not a JSON!");
            }
            else {
                var processer = createProcessor(type);
                if (processer != null) {
                    processer.load(url, function (jsonText) {
                        result = JSON.parse(jsonText);
                        callback(result);
                    });
                }
            }
        }
        RES.loadConfig = loadConfig;
        /**
         * 预加载resources.json中的资源。
         */
        function preload(url, callback) {
            var json;
            loadConfig(url, function (json) {
                var resources = json.resources;
                for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                    var res = resources_1[_i];
                    load(res.url, function (d) {
                    });
                }
            });
            setTimeout(function () {
                callback();
            }, 500);
            // console.log(cache);
            // console.log(get("resource/animation.json"));
            // console.log(cache["resource/S12.png"]);
        }
        RES.preload = preload;
        /**
         * 图片Processor
         */
        var ImageProcessor = (function () {
            function ImageProcessor() {
            }
            ImageProcessor.prototype.load = function (url, callback) {
                var image = document.createElement("img");
                image.src = url;
                image.onload = function () {
                    var imageResource = new RES.ImageResource();
                    imageResource.height = image.height;
                    imageResource.width = image.width;
                    imageResource.url = url;
                    imageResource.bitmapData = image;
                    callback(imageResource);
                };
            };
            return ImageProcessor;
        }());
        RES.ImageProcessor = ImageProcessor;
        /**
         * 文字Processor
         */
        var TextProcessor = (function () {
            function TextProcessor() {
            }
            TextProcessor.prototype.load = function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open("get", url);
                xhr.send();
                xhr.onload = function () {
                    callback(xhr.responseText);
                };
            };
            return TextProcessor;
        }());
        RES.TextProcessor = TextProcessor;
        /**
         * 类型筛选器可替换。
         */
        function mapTypeSelector(typeSelector) {
            getTypeByURL = typeSelector;
        }
        RES.mapTypeSelector = mapTypeSelector;
        /**
         * 预加载后，所有resources.json文件中的资源加载到此。
         */
        var cache = {};
        /**
         * 真实加载一个资源。
         */
        function load(url, callback) {
            var type = getTypeByURL(url);
            var processor = createProcessor(type);
            if (processor != null) {
                processor.load(url, function (data) {
                    cache[url] = data;
                    callback(data);
                });
            }
        }
        RES.load = load;
        /**
         * 根据url得到cache中的资源。
         */
        function get(url) {
            return cache[url];
        }
        RES.get = get;
        /**
         * 根据url判断资源类型，并返回类型字符串。
         */
        var getTypeByURL = function (url) {
            if (url.indexOf(".jpg") >= 0 || url.indexOf(".png") >= 0) {
                return "image";
            }
            else if (url.indexOf(".mp3") >= 0) {
                return "sound";
            }
            else if (url.indexOf(".json") >= 0) {
                return "text";
            }
        };
        /**
         * 使用哈希图存储各种资源加载器。
         */
        var hashMap = {
            "image": new ImageProcessor(),
            "text": new TextProcessor()
        };
        /**
         * 根据type字符串，返回hashMap中已有的processor
         * 若无该类型的processor则返回null。
         */
        function createProcessor(type) {
            var processor = hashMap[type];
            return processor;
        }
        RES.createProcessor = createProcessor;
        /**
         * 允许添加自定义类型的processor。
         */
        function map(type, processor) {
            hashMap[type] = processor;
        }
        RES.map = map;
    })(RES = halcyon.RES || (halcyon.RES = {}));
})(halcyon || (halcyon = {}));
var halcyon;
(function (halcyon) {
    var RES;
    (function (RES) {
        var AnimationLoader = (function () {
            function AnimationLoader() {
            }
            /**
             * 读取动画配置文件，返回每一帧url字符串组成的字符串组。
             */
            AnimationLoader.loadAnimationConfig = function (url, animationName) {
                //获取所有动画配置文件
                var alljson = JSON.parse(RES.get(url));
                var animationJson = alljson["mc"];
                //根据动画名称读取所需的动画配置
                var neededJson;
                neededJson = animationJson[animationName];
                var urls = [];
                var totalResourceNumber = neededJson.length;
                //将图片资源代理存入imageResourcesMap
                for (var _i = 0, neededJson_1 = neededJson; _i < neededJson_1.length; _i++) {
                    var config = neededJson_1[_i];
                    var imageData = new ImageResource();
                    imageData.height = config.height;
                    imageData.width = config.width;
                    imageData.url = config.url;
                    urls.push(imageData.url);
                    AnimationLoader.imageResourcesMap[imageData.url] = imageData;
                }
                return urls;
            };
            return AnimationLoader;
        }());
        AnimationLoader.imageResourcesMap = {};
        RES.AnimationLoader = AnimationLoader;
        /**
         * 真实加载一个资源
         */
        function loadRes(url) {
            var resource = getRES(url);
            resource.load();
        }
        RES.loadRes = loadRes;
        /**
         * 获取配置文件里的资源
         */
        function getRES(key) {
            if (!AnimationLoader.imageResourcesMap[key]) {
                AnimationLoader.imageResourcesMap[key] = new ImageResource();
            }
            return AnimationLoader.imageResourcesMap[key];
        }
        RES.getRES = getRES;
        /**
        * 图片资源代理
        */
        var ImageResource = (function () {
            function ImageResource() {
                this.bitmapData = new Image();
            }
            ImageResource.prototype.load = function () {
                var _this = this;
                if (!this.url) {
                    console.error("no url!!!!!!");
                }
                var realResource = document.createElement("img");
                realResource.src = this.url;
                realResource.onload = function () {
                    _this.bitmapData = realResource;
                };
            };
            return ImageResource;
        }());
        RES.ImageResource = ImageResource;
    })(RES = halcyon.RES || (halcyon.RES = {}));
})(halcyon || (halcyon = {}));
var halcyon;
(function (halcyon) {
    halcyon.run = function (canvas) {
        var stage = new halcyon.Stage(canvas.width, canvas.height);
        var context2D = canvas.getContext("2d");
        var canvasRender = new canvas2DRenderer(context2D, stage);
        var react = function (e, type) {
            var x = e.offsetX;
            var y = e.offsetY;
            var target = stage.hitTest(new math.Point(x, y));
            if (target) {
                target.dispatchEvent(type);
                halcyon.Dispatcher.doEventList(e);
            }
        };
        window.onmousedown = function (e) {
            react(e, halcyon.MOUSE_EVENT.mousedown);
            var initx = e.offsetX;
            var inity = e.offsetY;
            console.log("mouse down");
            window.onmousemove = function (e) {
                react(e, halcyon.MOUSE_EVENT.mousemove);
                console.log("mouse move");
            };
            window.onmouseup = function (e) {
                react(e, halcyon.MOUSE_EVENT.mouseup);
                var resultX = e.offsetX - initx;
                var resultY = e.offsetY - inity;
                if (Math.abs(resultX) < 10 && Math.abs(resultY) < 10) {
                    react(e, halcyon.MOUSE_EVENT.click);
                    console.log("click");
                }
                console.log("mouse up");
                window.onmousemove = function () {
                };
                window.onmouseup = function () {
                };
            };
        };
        var lastNow = Date.now();
        var frameHandler = function () {
            var now = Date.now();
            var deltaTime = now - lastNow;
            halcyon.Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 1200, 1200);
            context2D.save();
            canvasRender.draw();
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        };
        window.requestAnimationFrame(frameHandler);
        return stage;
    };
    /**
     * cancas2D渲染器
     */
    var canvas2DRenderer = (function () {
        function canvas2DRenderer(context2D, stage) {
            this.canvas2DContext = context2D;
            this.stage = stage;
        }
        canvas2DRenderer.prototype.draw = function () {
            var context2D = this.canvas2DContext;
            this.canvas2DContext.clearRect(0, 0, 1200, 1200);
            halcyon.DisplayObject.renderList = [];
            this.stage.calculate(context2D);
            for (var _i = 0, _a = halcyon.DisplayObject.renderList; _i < _a.length; _i++) {
                var displayObject = _a[_i];
                var type = displayObject.type;
                context2D.globalAlpha = displayObject.globalAlpha;
                var a = displayObject.globalMatrix.a;
                var b = displayObject.globalMatrix.b;
                var c = displayObject.globalMatrix.c;
                var d = displayObject.globalMatrix.d;
                var tx = displayObject.globalMatrix.tx;
                var ty = displayObject.globalMatrix.ty;
                context2D.setTransform(a, b, c, d, tx, ty);
                if (type == halcyon.DISPLAYOBJECT_TYPE.Bitmap || type == halcyon.DISPLAYOBJECT_TYPE.MovieClip) {
                    this.renderBitmapAndMovieClip(displayObject);
                }
                else if (type == halcyon.DISPLAYOBJECT_TYPE.Shape) {
                    this.renderShape(displayObject);
                }
                else if (type == halcyon.DISPLAYOBJECT_TYPE.TextField) {
                    this.renderTextField(displayObject);
                }
            }
        };
        /**
         * 渲染图片或动画
         */
        canvas2DRenderer.prototype.renderBitmapAndMovieClip = function (bitmap) {
            this.canvas2DContext.globalAlpha = bitmap.globalAlpha;
            this.canvas2DContext.drawImage(bitmap.img.bitmapData, 0, 0, bitmap.img.width, bitmap.img.height);
        };
        /**
         * 渲染文字
         */
        canvas2DRenderer.prototype.renderTextField = function (textField) {
            //透明度
            this.canvas2DContext.globalAlpha = textField.globalAlpha;
            //填充颜色
            this.canvas2DContext.fillStyle = textField.color;
            //文本格式
            this.canvas2DContext.font = textField.font;
            //绘制文本
            this.canvas2DContext.fillText(textField.text, 0, 0);
            //计算文本宽度
            textField._measureTextWidth = this.canvas2DContext.measureText(textField.text).width;
        };
        /**
         * 渲染图形
         */
        canvas2DRenderer.prototype.renderShape = function (shape) {
            //透明度
            this.canvas2DContext.globalAlpha = shape.globalAlpha;
            //填充颜色
            this.canvas2DContext.fillStyle = shape.color;
            //绘制矩形
            this.canvas2DContext.fillRect(0, 0, shape.width, shape.height);
        };
        return canvas2DRenderer;
    }());
    halcyon.canvas2DRenderer = canvas2DRenderer;
})(halcyon || (halcyon = {}));
