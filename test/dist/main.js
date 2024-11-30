/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/detect-data-exfiltration.js":
/*!********************************************!*\
  !*** ./client/detect-data-exfiltration.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initDataExfiltrationDetection: () => (/* binding */ initDataExfiltrationDetection)
/* harmony export */ });
function recordInputElementValueRead(inputElement, value) {
  console.table({
    type: "DETECTED_DATA_EXFILTRATION",
    element: inputElement.outerHTML,
    elementValue: value
  });
}

// Detect any data exfiltration attempts to common sensitive fields such as
// credit card input fields, login credentials,
function initDataExfiltrationDetection() {
  var originalDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  Object.defineProperty(HTMLInputElement.prototype, "value", {
    get: function get() {
      var value = originalDescriptor.get.call(this);
      recordInputElementValueRead(this, value);
      return value;
    },
    set: function set(newValue) {
      originalDescriptor.set.call(this, newValue);
    }
  });
}

/***/ }),

/***/ "./client/detect-event-listeners.js":
/*!******************************************!*\
  !*** ./client/detect-event-listeners.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initEventListenerDetection: () => (/* binding */ initEventListenerDetection)
/* harmony export */ });
function recordEventListenerAdded(element, eventType) {
  console.table({
    type: "DETECTED_NEW_EVENT_LISTENER",
    element: element.outerHTML,
    eventType: eventType
  });
}

// Detect when javascript adds an event listener to a DOM item.
function initEventListenerDetection() {
  var originalAddEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function (type, listener) {
    var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    recordEventListenerAdded(this, type);
    originalAddEventListener.call(this, type, listener, useCapture);
  };
}

/***/ }),

/***/ "./client/detect-inline-script-injection.js":
/*!**************************************************!*\
  !*** ./client/detect-inline-script-injection.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initInlineScriptInjectionDetection: () => (/* binding */ initInlineScriptInjectionDetection)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./client/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var LOG_URL = "https://kashav.ca/cside/injected-scripts";

// Detects and reports inline-script injection. Also upload the content to an
// endpoint via a beacon.
function initInlineScriptInjectionDetection() {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.observeNewScriptNodesInDocument)(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(scriptNode) {
      var _scriptNode$childNode;
      var scriptContent, src, isExtensionScript, isInlineScript, srcAttr, response, payload, blob;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            scriptContent = null;
            src = null;
            isExtensionScript = false;
            isInlineScript = false;
            srcAttr = scriptNode.attributes.getNamedItem("src");
            if (!srcAttr) {
              _context.next = 16;
              break;
            }
            src = srcAttr.value;

            // Fetch the content of the remote script.
            _context.next = 9;
            return fetch(src);
          case 9:
            response = _context.sent;
            _context.next = 12;
            return response.text();
          case 12:
            scriptContent = _context.sent;
            // Differentiate a client-side script injected by a browser extension from
            // a script that was loaded as a result of the server side code.
            isExtensionScript = !!src.match(/(chrome-extension|moz-extension)\:\/\//);
            _context.next = 17;
            break;
          case 16:
            if ((_scriptNode$childNode = scriptNode.childNodes) !== null && _scriptNode$childNode !== void 0 && (_scriptNode$childNode = _scriptNode$childNode[0]) !== null && _scriptNode$childNode !== void 0 && _scriptNode$childNode.data) {
              scriptContent = scriptNode.childNodes[0].data;
              isInlineScript = true;
            }
          case 17:
            // Upload the script content.
            if (scriptContent) {
              console.table({
                type: "DETECTED_SCRIPT_INJECTION",
                src: src,
                isInlineScript: isInlineScript,
                isExtensionScript: isExtensionScript,
                scriptContent: scriptContent
              });
              payload = JSON.stringify({
                src: src || "inline_script",
                script: scriptContent
              });
              blob = new Blob([payload], {
                type: "application/json"
              });
              try {
                navigator.sendBeacon(LOG_URL, blob);
              } catch (error) {
                console.error(error);
              }
            }
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

/***/ }),

/***/ "./client/utils.js":
/*!*************************!*\
  !*** ./client/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeNewScriptNodesInDocument: () => (/* binding */ observeNewScriptNodesInDocument)
/* harmony export */ });
function recursivelySearchChildNodesForScriptNode(node, foundScriptCallback) {
  if (node.nodeName === "SCRIPT") {
    foundScriptCallback(node);
  } else if (node.childNodes !== null) {
    node.childNodes.forEach(function (childNode) {
      recursivelySearchChildNodesForScriptNode(childNode, foundScriptCallback);
    });
  }
}
function observeNewScriptNodesInDocument(foundScriptNodeCallback) {
  var target = document.documentElement || document.body;
  var observer = new MutationObserver(function (mutationList) {
    mutationList.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        recursivelySearchChildNodesForScriptNode(node, foundScriptNodeCallback);
      });
    });
  });
  observer.observe(target, {
    attributes: true,
    childList: true,
    subtree: true
  });
  window.addEventListener("beforeunload", function () {
    observer.disconnect();
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detect_data_exfiltration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detect-data-exfiltration */ "./client/detect-data-exfiltration.js");
/* harmony import */ var _detect_inline_script_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detect-inline-script-injection */ "./client/detect-inline-script-injection.js");
/* harmony import */ var _detect_event_listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detect-event-listeners */ "./client/detect-event-listeners.js");



(0,_detect_data_exfiltration__WEBPACK_IMPORTED_MODULE_0__.initDataExfiltrationDetection)();
(0,_detect_inline_script_injection__WEBPACK_IMPORTED_MODULE_1__.initInlineScriptInjectionDetection)();
(0,_detect_event_listeners__WEBPACK_IMPORTED_MODULE_2__.initEventListenerDetection)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjJFO0FBQ1c7QUFDaEI7QUFFdEU5Syx3RkFBNkIsQ0FBQyxDQUFDO0FBQy9CNkgsbUdBQWtDLENBQUMsQ0FBQztBQUNwQ2hILG1GQUEwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2RldGVjdC1kYXRhLWV4ZmlsdHJhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy8uL2NsaWVudC9kZXRlY3QtZXZlbnQtbGlzdGVuZXJzLmpzIiwid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2RldGVjdC1pbmxpbmUtc2NyaXB0LWluamVjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy8uL2NsaWVudC91dGlscy5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VjdXJpdHktZGV0ZWN0aW9uLW1ldGhvZHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlY29yZElucHV0RWxlbWVudFZhbHVlUmVhZChpbnB1dEVsZW1lbnQsIHZhbHVlKSB7XG4gIGNvbnNvbGUudGFibGUoe1xuICAgIHR5cGU6IFwiREVURUNURURfREFUQV9FWEZJTFRSQVRJT05cIixcbiAgICBlbGVtZW50OiBpbnB1dEVsZW1lbnQub3V0ZXJIVE1MLFxuICAgIGVsZW1lbnRWYWx1ZTogdmFsdWUsXG4gIH0pO1xufVxuXG4vLyBEZXRlY3QgYW55IGRhdGEgZXhmaWx0cmF0aW9uIGF0dGVtcHRzIHRvIGNvbW1vbiBzZW5zaXRpdmUgZmllbGRzIHN1Y2ggYXNcbi8vIGNyZWRpdCBjYXJkIGlucHV0IGZpZWxkcywgbG9naW4gY3JlZGVudGlhbHMsXG5leHBvcnQgZnVuY3Rpb24gaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24oKSB7XG4gIGNvbnN0IG9yaWdpbmFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsXG4gICAgXCJ2YWx1ZVwiLFxuICApO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsRGVzY3JpcHRvci5nZXQuY2FsbCh0aGlzKTtcbiAgICAgIHJlY29yZElucHV0RWxlbWVudFZhbHVlUmVhZCh0aGlzLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgb3JpZ2luYWxEZXNjcmlwdG9yLnNldC5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlY29yZEV2ZW50TGlzdGVuZXJBZGRlZChlbGVtZW50LCBldmVudFR5cGUpIHtcbiAgY29uc29sZS50YWJsZSh7XG4gICAgdHlwZTogXCJERVRFQ1RFRF9ORVdfRVZFTlRfTElTVEVORVJcIixcbiAgICBlbGVtZW50OiBlbGVtZW50Lm91dGVySFRNTCxcbiAgICBldmVudFR5cGUsXG4gIH0pO1xufVxuXG4vLyBEZXRlY3Qgd2hlbiBqYXZhc2NyaXB0IGFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBET00gaXRlbS5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RXZlbnRMaXN0ZW5lckRldGVjdGlvbigpIHtcbiAgY29uc3Qgb3JpZ2luYWxBZGRFdmVudExpc3RlbmVyID0gRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKFxuICAgIHR5cGUsXG4gICAgbGlzdGVuZXIsXG4gICAgdXNlQ2FwdHVyZSA9IGZhbHNlLFxuICApIHtcbiAgICByZWNvcmRFdmVudExpc3RlbmVyQWRkZWQodGhpcywgdHlwZSk7XG4gICAgb3JpZ2luYWxBZGRFdmVudExpc3RlbmVyLmNhbGwodGhpcywgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgb2JzZXJ2ZU5ld1NjcmlwdE5vZGVzSW5Eb2N1bWVudCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IExPR19VUkwgPSBcImh0dHBzOi8va2FzaGF2LmNhL2NzaWRlL2luamVjdGVkLXNjcmlwdHNcIjtcblxuLy8gRGV0ZWN0cyBhbmQgcmVwb3J0cyBpbmxpbmUtc2NyaXB0IGluamVjdGlvbi4gQWxzbyB1cGxvYWQgdGhlIGNvbnRlbnQgdG8gYW5cbi8vIGVuZHBvaW50IHZpYSBhIGJlYWNvbi5cbmV4cG9ydCBmdW5jdGlvbiBpbml0SW5saW5lU2NyaXB0SW5qZWN0aW9uRGV0ZWN0aW9uKCkge1xuICBvYnNlcnZlTmV3U2NyaXB0Tm9kZXNJbkRvY3VtZW50KGFzeW5jIChzY3JpcHROb2RlKSA9PiB7XG4gICAgbGV0IHNjcmlwdENvbnRlbnQgPSBudWxsO1xuICAgIGxldCBzcmMgPSBudWxsO1xuICAgIGxldCBpc0V4dGVuc2lvblNjcmlwdCA9IGZhbHNlO1xuICAgIGxldCBpc0lubGluZVNjcmlwdCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc3JjQXR0ciA9IHNjcmlwdE5vZGUuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oXCJzcmNcIik7XG4gICAgaWYgKHNyY0F0dHIpIHtcbiAgICAgIHNyYyA9IHNyY0F0dHIudmFsdWU7XG5cbiAgICAgIC8vIEZldGNoIHRoZSBjb250ZW50IG9mIHRoZSByZW1vdGUgc2NyaXB0LlxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzcmMpO1xuICAgICAgc2NyaXB0Q29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblxuICAgICAgLy8gRGlmZmVyZW50aWF0ZSBhIGNsaWVudC1zaWRlIHNjcmlwdCBpbmplY3RlZCBieSBhIGJyb3dzZXIgZXh0ZW5zaW9uIGZyb21cbiAgICAgIC8vIGEgc2NyaXB0IHRoYXQgd2FzIGxvYWRlZCBhcyBhIHJlc3VsdCBvZiB0aGUgc2VydmVyIHNpZGUgY29kZS5cbiAgICAgIGlzRXh0ZW5zaW9uU2NyaXB0ID0gISFzcmMubWF0Y2goLyhjaHJvbWUtZXh0ZW5zaW9ufG1vei1leHRlbnNpb24pXFw6XFwvXFwvLyk7XG4gICAgfSBlbHNlIGlmIChzY3JpcHROb2RlLmNoaWxkTm9kZXM/LlswXT8uZGF0YSkge1xuICAgICAgc2NyaXB0Q29udGVudCA9IHNjcmlwdE5vZGUuY2hpbGROb2Rlc1swXS5kYXRhO1xuICAgICAgaXNJbmxpbmVTY3JpcHQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFVwbG9hZCB0aGUgc2NyaXB0IGNvbnRlbnQuXG4gICAgaWYgKHNjcmlwdENvbnRlbnQpIHtcbiAgICAgIGNvbnNvbGUudGFibGUoe1xuICAgICAgICB0eXBlOiBcIkRFVEVDVEVEX1NDUklQVF9JTkpFQ1RJT05cIixcbiAgICAgICAgc3JjLFxuICAgICAgICBpc0lubGluZVNjcmlwdCxcbiAgICAgICAgaXNFeHRlbnNpb25TY3JpcHQsXG4gICAgICAgIHNjcmlwdENvbnRlbnQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgc3JjOiBzcmMgfHwgXCJpbmxpbmVfc2NyaXB0XCIsXG4gICAgICAgIHNjcmlwdDogc2NyaXB0Q29udGVudCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtwYXlsb2FkXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX1VSTCwgYmxvYik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZShub2RlLCBmb3VuZFNjcmlwdENhbGxiYWNrKSB7XG4gIGlmIChub2RlLm5vZGVOYW1lID09PSBcIlNDUklQVFwiKSB7XG4gICAgZm91bmRTY3JpcHRDYWxsYmFjayhub2RlKTtcbiAgfSBlbHNlIGlmIChub2RlLmNoaWxkTm9kZXMgIT09IG51bGwpIHtcbiAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICByZWN1cnNpdmVseVNlYXJjaENoaWxkTm9kZXNGb3JTY3JpcHROb2RlKGNoaWxkTm9kZSwgZm91bmRTY3JpcHRDYWxsYmFjayk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVOZXdTY3JpcHROb2Rlc0luRG9jdW1lbnQoZm91bmRTY3JpcHROb2RlQ2FsbGJhY2spIHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgbXV0YXRpb25MaXN0LmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgcmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZShub2RlLCBmb3VuZFNjcmlwdE5vZGVDYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24gfSBmcm9tIFwiLi9kZXRlY3QtZGF0YS1leGZpbHRyYXRpb25cIjtcbmltcG9ydCB7IGluaXRJbmxpbmVTY3JpcHRJbmplY3Rpb25EZXRlY3Rpb24gfSBmcm9tIFwiLi9kZXRlY3QtaW5saW5lLXNjcmlwdC1pbmplY3Rpb25cIjtcbmltcG9ydCB7IGluaXRFdmVudExpc3RlbmVyRGV0ZWN0aW9uIH0gZnJvbSBcIi4vZGV0ZWN0LWV2ZW50LWxpc3RlbmVyc1wiO1xuXG5pbml0RGF0YUV4ZmlsdHJhdGlvbkRldGVjdGlvbigpO1xuaW5pdElubGluZVNjcmlwdEluamVjdGlvbkRldGVjdGlvbigpO1xuaW5pdEV2ZW50TGlzdGVuZXJEZXRlY3Rpb24oKTtcbiJdLCJuYW1lcyI6WyJyZWNvcmRJbnB1dEVsZW1lbnRWYWx1ZVJlYWQiLCJpbnB1dEVsZW1lbnQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJ0YWJsZSIsInR5cGUiLCJlbGVtZW50Iiwib3V0ZXJIVE1MIiwiZWxlbWVudFZhbHVlIiwiaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24iLCJvcmlnaW5hbERlc2NyaXB0b3IiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJIVE1MSW5wdXRFbGVtZW50IiwicHJvdG90eXBlIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJjYWxsIiwic2V0IiwibmV3VmFsdWUiLCJyZWNvcmRFdmVudExpc3RlbmVyQWRkZWQiLCJldmVudFR5cGUiLCJpbml0RXZlbnRMaXN0ZW5lckRldGVjdGlvbiIsIm9yaWdpbmFsQWRkRXZlbnRMaXN0ZW5lciIsIkVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImFyZyIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIm9ic2VydmVOZXdTY3JpcHROb2Rlc0luRG9jdW1lbnQiLCJMT0dfVVJMIiwiaW5pdElubGluZVNjcmlwdEluamVjdGlvbkRldGVjdGlvbiIsIl9yZWYiLCJfY2FsbGVlIiwic2NyaXB0Tm9kZSIsIl9zY3JpcHROb2RlJGNoaWxkTm9kZSIsInNjcmlwdENvbnRlbnQiLCJzcmMiLCJpc0V4dGVuc2lvblNjcmlwdCIsImlzSW5saW5lU2NyaXB0Iiwic3JjQXR0ciIsInJlc3BvbnNlIiwicGF5bG9hZCIsImJsb2IiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiYXR0cmlidXRlcyIsImdldE5hbWVkSXRlbSIsImZldGNoIiwidGV4dCIsIm1hdGNoIiwiY2hpbGROb2RlcyIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5Iiwic2NyaXB0IiwiQmxvYiIsIm5hdmlnYXRvciIsInNlbmRCZWFjb24iLCJlcnJvciIsIl94IiwicmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZSIsIm5vZGUiLCJmb3VuZFNjcmlwdENhbGxiYWNrIiwibm9kZU5hbWUiLCJjaGlsZE5vZGUiLCJmb3VuZFNjcmlwdE5vZGVDYWxsYmFjayIsInRhcmdldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uTGlzdCIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwid2luZG93IiwiZGlzY29ubmVjdCJdLCJzb3VyY2VSb290IjoiIn0=