// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"rectangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var findCornerCoordinates = function findCornerCoordinates(x, y, midPointX, midPointY, rotationAngle) {
  // translate to reference (0, 0)
  var translatedX = x - midPointX;
  var translatedY = y - midPointY;
  var rotatedX = translatedX * Math.cos(rotationAngle) - translatedY * Math.sin(rotationAngle);
  var rotatedY = translatedX * Math.sin(rotationAngle) + translatedY * Math.cos(rotationAngle); // translate back to original reference (midPointX, midPointY)

  var finalX = rotatedX + midPointX;
  var finalY = rotatedY + midPointY;
  return {
    x: finalX,
    y: finalY
  };
};

var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle(x, y, width, height, rotationAngle) {
    _classCallCheck(this, Rectangle);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.midPointX = x + this.width / 2;
    this.midPointY = y + this.height / 2;
    this.rotationAngle = rotationAngle * Math.PI / 180;
    this.dX = 0;
    this.dY = 0;
  }

  _createClass(Rectangle, [{
    key: "topLeft",
    value: function topLeft() {
      return findCornerCoordinates(this.x, this.y, this.midPointX, this.midPointY, this.rotationAngle);
    }
  }, {
    key: "topRight",
    value: function topRight() {
      return findCornerCoordinates(this.x + this.width, this.y, this.midPointX, this.midPointY, this.rotationAngle);
    }
  }, {
    key: "bottomLeft",
    value: function bottomLeft() {
      return findCornerCoordinates(this.x, this.y + this.height, this.midPointX, this.midPointY, this.rotationAngle);
    }
  }, {
    key: "bottomRight",
    value: function bottomRight() {
      return findCornerCoordinates(this.x + this.width, this.y + this.height, this.midPointX, this.midPointY, this.rotationAngle);
    }
  }, {
    key: "updatePos",
    value: function updatePos() {
      this.x += this.dX;
      this.y += this.dY;
    }
  }]);

  return Rectangle;
}();

var _default = Rectangle;
exports.default = _default;
},{}],"collision_detection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// following this tutorial
// https://www.gamedev.net/articles/programming/general-and-gameplay-programming/2d-rotated-rectangle-collision-r2604
var projectCornerToAxis = function projectCornerToAxis(corner, axis) {
  var projectedX = (corner.x * axis.x + corner.y * axis.y) / (Math.pow(axis.x, 2) + Math.pow(axis.y, 2)) * axis.x;
  var projectedY = (corner.x * axis.x + corner.y * axis.y) / (Math.pow(axis.x, 2) + Math.pow(axis.y, 2)) * axis.y;
  return {
    projectedX: projectedX,
    projectedY: projectedY
  };
};

var scalarValues = function scalarValues(projectedCorners, axis) {
  return projectedCorners.map(function (corner) {
    var projectedX = corner.projectedX,
        projectedY = corner.projectedY;
    return projectedX * axis.x + projectedY * axis.y;
  });
};

var checkScalarForColision = function checkScalarForColision(scalar1, scalar2) {
  var min1 = Math.min.apply(Math, _toConsumableArray(scalar1));
  var max1 = Math.max.apply(Math, _toConsumableArray(scalar1));
  var min2 = Math.min.apply(Math, _toConsumableArray(scalar2));
  var max2 = Math.max.apply(Math, _toConsumableArray(scalar2));

  if (min2 <= max1 && min1 <= max2) {
    return true;
  }

  return false;
};

var isCollided = function isCollided(rect1, rect2) {
  var axis1 = {
    x: rect1.topRight().x - rect1.topLeft().x,
    y: rect1.topRight().y - rect1.topLeft().y
  };
  var axis2 = {
    x: rect1.topRight().x - rect1.bottomRight().x,
    y: rect1.topRight().y - rect1.bottomRight().y
  };
  var axis3 = {
    x: rect2.topLeft().x - rect2.bottomLeft().x,
    y: rect2.topLeft().y - rect2.bottomLeft().y
  };
  var axis4 = {
    x: rect2.topLeft().x - rect2.topRight().x,
    y: rect2.topLeft().y - rect2.topRight().y
  };
  var corners1 = [rect1.topRight(), rect1.topLeft(), rect1.bottomRight(), rect1.bottomLeft()];
  var corners2 = [rect2.topRight(), rect2.topLeft(), rect2.bottomRight(), rect2.bottomLeft()];
  var axes = [axis1, axis2, axis3, axis4];

  var _loop = function _loop(i) {
    var corners1ToAxis = corners1.map(function (corner) {
      return projectCornerToAxis(corner, axes[i]);
    });
    var corners2ToAxis = corners2.map(function (corner) {
      return projectCornerToAxis(corner, axes[i]);
    });
    var scalar1 = scalarValues(corners1ToAxis, axes[i]);
    var scalar2 = scalarValues(corners2ToAxis, axes[i]);

    if (checkScalarForColision(scalar1, scalar2) === false) {
      return {
        v: false
      };
    }
  };

  for (var i = 0; i < axes.length; i += 1) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return true;
};

var _default = isCollided;
exports.default = _default;
},{}],"canvas.js":[function(require,module,exports) {
"use strict";

var _rectangle = _interopRequireDefault(require("./rectangle"));

var _collision_detection = _interopRequireDefault(require("./collision_detection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.querySelector('canvas');
  canvas.width = 500;
  canvas.height = 500;
  var ctx = canvas.getContext('2d'); // new Rectangle(x, y, width, height, angle)

  var rotatedRect = new _rectangle.default(100, 100, 80, 20, 80);
  var testRect = new _rectangle.default(100, 100, 80, 20, 20);

  var draw = function draw(fps) {
    var fpsInterval = 1000 / fps;
    var then = performance.now();

    var drawRect = function drawRect(rect) {
      ctx.save();
      ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
      ctx.rotate(rect.rotationAngle);
      ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
      ctx.restore();
    };

    var animate = function animate() {
      requestAnimationFrame(animate);
      var now = performance.now();
      var elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - elapsed % fpsInterval;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect(rotatedRect);
        testRect.updatePos();

        if ((0, _collision_detection.default)(rotatedRect, testRect)) {
          ctx.fillStyle = 'red';
        } else {
          ctx.fillStyle = 'green';
        }

        drawRect(testRect);
      }
    };

    animate();
  };

  draw(60);
  document.addEventListener('keydown', function (_ref) {
    var key = _ref.key;

    if (key === 'w') {
      testRect.dY = -5;
    }

    if (key === 's') {
      testRect.dY = 5;
    }

    if (key === 'a') {
      testRect.dX = -5;
    }

    if (key === 'd') {
      testRect.dX = 5;
    }
  });
  document.addEventListener('keyup', function (_ref2) {
    var key = _ref2.key;

    if (key === 'w') {
      testRect.dY = 0;
    }

    if (key === 's') {
      testRect.dY = 0;
    }

    if (key === 'a') {
      testRect.dX = 0;
    }

    if (key === 'd') {
      testRect.dX = 0;
    }
  });
});
},{"./rectangle":"rectangle.js","./collision_detection":"collision_detection.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53327" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","canvas.js"], null)
//# sourceMappingURL=/canvas.00467ef7.map