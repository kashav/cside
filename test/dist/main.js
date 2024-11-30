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
      // We can also inspect the input field and decide if this is a
      // sensitive field based on various heuristics.
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
                href: window.location.href,
                src: src || "inline script",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUN3SixRQUFRLENBQUNRLFVBQVUsQ0FBQyxDQUFDO0VBQ3ZCLENBQUMsQ0FBQztBQUNKOzs7Ozs7VUM5QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjJFO0FBQ1c7QUFDaEI7QUFFdEVoTCx3RkFBNkIsQ0FBQyxDQUFDO0FBQy9CNkgsbUdBQWtDLENBQUMsQ0FBQztBQUNwQ2hILG1GQUEwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2RldGVjdC1kYXRhLWV4ZmlsdHJhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy8uL2NsaWVudC9kZXRlY3QtZXZlbnQtbGlzdGVuZXJzLmpzIiwid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2RldGVjdC1pbmxpbmUtc2NyaXB0LWluamVjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy8uL2NsaWVudC91dGlscy5qcyIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2VjdXJpdHktZGV0ZWN0aW9uLW1ldGhvZHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zZWN1cml0eS1kZXRlY3Rpb24tbWV0aG9kcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlY3VyaXR5LWRldGVjdGlvbi1tZXRob2RzLy4vY2xpZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlY29yZElucHV0RWxlbWVudFZhbHVlUmVhZChpbnB1dEVsZW1lbnQsIHZhbHVlKSB7XG4gIGNvbnNvbGUudGFibGUoe1xuICAgIHR5cGU6IFwiREVURUNURURfREFUQV9FWEZJTFRSQVRJT05cIixcbiAgICBlbGVtZW50OiBpbnB1dEVsZW1lbnQub3V0ZXJIVE1MLFxuICAgIGVsZW1lbnRWYWx1ZTogdmFsdWUsXG4gIH0pO1xufVxuXG4vLyBEZXRlY3QgYW55IGRhdGEgZXhmaWx0cmF0aW9uIGF0dGVtcHRzIHRvIGNvbW1vbiBzZW5zaXRpdmUgZmllbGRzIHN1Y2ggYXNcbi8vIGNyZWRpdCBjYXJkIGlucHV0IGZpZWxkcywgbG9naW4gY3JlZGVudGlhbHMsXG5leHBvcnQgZnVuY3Rpb24gaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24oKSB7XG4gIGNvbnN0IG9yaWdpbmFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsXG4gICAgXCJ2YWx1ZVwiLFxuICApO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsRGVzY3JpcHRvci5nZXQuY2FsbCh0aGlzKTtcbiAgICAgIC8vIFdlIGNhbiBhbHNvIGluc3BlY3QgdGhlIGlucHV0IGZpZWxkIGFuZCBkZWNpZGUgaWYgdGhpcyBpcyBhXG4gICAgICAvLyBzZW5zaXRpdmUgZmllbGQgYmFzZWQgb24gdmFyaW91cyBoZXVyaXN0aWNzLlxuICAgICAgcmVjb3JkSW5wdXRFbGVtZW50VmFsdWVSZWFkKHRoaXMsIHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICBvcmlnaW5hbERlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgbmV3VmFsdWUpO1xuICAgIH0sXG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVjb3JkRXZlbnRMaXN0ZW5lckFkZGVkKGVsZW1lbnQsIGV2ZW50VHlwZSkge1xuICBjb25zb2xlLnRhYmxlKHtcbiAgICB0eXBlOiBcIkRFVEVDVEVEX05FV19FVkVOVF9MSVNURU5FUlwiLFxuICAgIGVsZW1lbnQ6IGVsZW1lbnQub3V0ZXJIVE1MLFxuICAgIGV2ZW50VHlwZSxcbiAgfSk7XG59XG5cbi8vIERldGVjdCB3aGVuIGphdmFzY3JpcHQgYWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byBhIERPTSBpdGVtLlxuZXhwb3J0IGZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVyRGV0ZWN0aW9uKCkge1xuICBjb25zdCBvcmlnaW5hbEFkZEV2ZW50TGlzdGVuZXIgPSBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoXG4gICAgdHlwZSxcbiAgICBsaXN0ZW5lcixcbiAgICB1c2VDYXB0dXJlID0gZmFsc2UsXG4gICkge1xuICAgIHJlY29yZEV2ZW50TGlzdGVuZXJBZGRlZCh0aGlzLCB0eXBlKTtcbiAgICBvcmlnaW5hbEFkZEV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBvYnNlcnZlTmV3U2NyaXB0Tm9kZXNJbkRvY3VtZW50IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgTE9HX1VSTCA9IFwiaHR0cHM6Ly9rYXNoYXYuY2EvY3NpZGUvaW5qZWN0ZWQtc2NyaXB0c1wiO1xuXG4vLyBEZXRlY3RzIGFuZCByZXBvcnRzIGlubGluZS1zY3JpcHQgaW5qZWN0aW9uLiBBbHNvIHVwbG9hZCB0aGUgY29udGVudCB0byBhblxuLy8gZW5kcG9pbnQgdmlhIGEgYmVhY29uLlxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJbmxpbmVTY3JpcHRJbmplY3Rpb25EZXRlY3Rpb24oKSB7XG4gIG9ic2VydmVOZXdTY3JpcHROb2Rlc0luRG9jdW1lbnQoYXN5bmMgKHNjcmlwdE5vZGUpID0+IHtcbiAgICBsZXQgc2NyaXB0Q29udGVudCA9IG51bGw7XG4gICAgbGV0IHNyYyA9IG51bGw7XG4gICAgbGV0IGlzRXh0ZW5zaW9uU2NyaXB0ID0gZmFsc2U7XG4gICAgbGV0IGlzSW5saW5lU2NyaXB0ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzcmNBdHRyID0gc2NyaXB0Tm9kZS5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShcInNyY1wiKTtcbiAgICBpZiAoc3JjQXR0cikge1xuICAgICAgc3JjID0gc3JjQXR0ci52YWx1ZTtcblxuICAgICAgLy8gRmV0Y2ggdGhlIGNvbnRlbnQgb2YgdGhlIHJlbW90ZSBzY3JpcHQuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHNyYyk7XG4gICAgICBzY3JpcHRDb250ZW50ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgICAvLyBEaWZmZXJlbnRpYXRlIGEgY2xpZW50LXNpZGUgc2NyaXB0IGluamVjdGVkIGJ5IGEgYnJvd3NlciBleHRlbnNpb24gZnJvbVxuICAgICAgLy8gYSBzY3JpcHQgdGhhdCB3YXMgbG9hZGVkIGFzIGEgcmVzdWx0IG9mIHRoZSBzZXJ2ZXIgc2lkZSBjb2RlLlxuICAgICAgaXNFeHRlbnNpb25TY3JpcHQgPSAhIXNyYy5tYXRjaCgvKGNocm9tZS1leHRlbnNpb258bW96LWV4dGVuc2lvbilcXDpcXC9cXC8vKTtcbiAgICB9IGVsc2UgaWYgKHNjcmlwdE5vZGUuY2hpbGROb2Rlcz8uWzBdPy5kYXRhKSB7XG4gICAgICBzY3JpcHRDb250ZW50ID0gc2NyaXB0Tm9kZS5jaGlsZE5vZGVzWzBdLmRhdGE7XG4gICAgICBpc0lubGluZVNjcmlwdCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVXBsb2FkIHRoZSBzY3JpcHQgY29udGVudC5cbiAgICBpZiAoc2NyaXB0Q29udGVudCkge1xuICAgICAgY29uc29sZS50YWJsZSh7XG4gICAgICAgIHR5cGU6IFwiREVURUNURURfU0NSSVBUX0lOSkVDVElPTlwiLFxuICAgICAgICBzcmMsXG4gICAgICAgIGlzSW5saW5lU2NyaXB0LFxuICAgICAgICBpc0V4dGVuc2lvblNjcmlwdCxcbiAgICAgICAgc2NyaXB0Q29udGVudCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgc3JjOiBzcmMgfHwgXCJpbmxpbmUgc2NyaXB0XCIsXG4gICAgICAgIHNjcmlwdDogc2NyaXB0Q29udGVudCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtwYXlsb2FkXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX1VSTCwgYmxvYik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZShub2RlLCBmb3VuZFNjcmlwdENhbGxiYWNrKSB7XG4gIGlmIChub2RlLm5vZGVOYW1lID09PSBcIlNDUklQVFwiKSB7XG4gICAgZm91bmRTY3JpcHRDYWxsYmFjayhub2RlKTtcbiAgfSBlbHNlIGlmIChub2RlLmNoaWxkTm9kZXMgIT09IG51bGwpIHtcbiAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICByZWN1cnNpdmVseVNlYXJjaENoaWxkTm9kZXNGb3JTY3JpcHROb2RlKGNoaWxkTm9kZSwgZm91bmRTY3JpcHRDYWxsYmFjayk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVOZXdTY3JpcHROb2Rlc0luRG9jdW1lbnQoZm91bmRTY3JpcHROb2RlQ2FsbGJhY2spIHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XG4gICAgbXV0YXRpb25MaXN0LmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgcmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZShub2RlLCBmb3VuZFNjcmlwdE5vZGVDYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24gfSBmcm9tIFwiLi9kZXRlY3QtZGF0YS1leGZpbHRyYXRpb25cIjtcbmltcG9ydCB7IGluaXRJbmxpbmVTY3JpcHRJbmplY3Rpb25EZXRlY3Rpb24gfSBmcm9tIFwiLi9kZXRlY3QtaW5saW5lLXNjcmlwdC1pbmplY3Rpb25cIjtcbmltcG9ydCB7IGluaXRFdmVudExpc3RlbmVyRGV0ZWN0aW9uIH0gZnJvbSBcIi4vZGV0ZWN0LWV2ZW50LWxpc3RlbmVyc1wiO1xuXG5pbml0RGF0YUV4ZmlsdHJhdGlvbkRldGVjdGlvbigpO1xuaW5pdElubGluZVNjcmlwdEluamVjdGlvbkRldGVjdGlvbigpO1xuaW5pdEV2ZW50TGlzdGVuZXJEZXRlY3Rpb24oKTtcbiJdLCJuYW1lcyI6WyJyZWNvcmRJbnB1dEVsZW1lbnRWYWx1ZVJlYWQiLCJpbnB1dEVsZW1lbnQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJ0YWJsZSIsInR5cGUiLCJlbGVtZW50Iiwib3V0ZXJIVE1MIiwiZWxlbWVudFZhbHVlIiwiaW5pdERhdGFFeGZpbHRyYXRpb25EZXRlY3Rpb24iLCJvcmlnaW5hbERlc2NyaXB0b3IiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJIVE1MSW5wdXRFbGVtZW50IiwicHJvdG90eXBlIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJjYWxsIiwic2V0IiwibmV3VmFsdWUiLCJyZWNvcmRFdmVudExpc3RlbmVyQWRkZWQiLCJldmVudFR5cGUiLCJpbml0RXZlbnRMaXN0ZW5lckRldGVjdGlvbiIsIm9yaWdpbmFsQWRkRXZlbnRMaXN0ZW5lciIsIkVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImFyZyIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIm9ic2VydmVOZXdTY3JpcHROb2Rlc0luRG9jdW1lbnQiLCJMT0dfVVJMIiwiaW5pdElubGluZVNjcmlwdEluamVjdGlvbkRldGVjdGlvbiIsIl9yZWYiLCJfY2FsbGVlIiwic2NyaXB0Tm9kZSIsIl9zY3JpcHROb2RlJGNoaWxkTm9kZSIsInNjcmlwdENvbnRlbnQiLCJzcmMiLCJpc0V4dGVuc2lvblNjcmlwdCIsImlzSW5saW5lU2NyaXB0Iiwic3JjQXR0ciIsInJlc3BvbnNlIiwicGF5bG9hZCIsImJsb2IiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiYXR0cmlidXRlcyIsImdldE5hbWVkSXRlbSIsImZldGNoIiwidGV4dCIsIm1hdGNoIiwiY2hpbGROb2RlcyIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiaHJlZiIsIndpbmRvdyIsImxvY2F0aW9uIiwic2NyaXB0IiwiQmxvYiIsIm5hdmlnYXRvciIsInNlbmRCZWFjb24iLCJlcnJvciIsIl94IiwicmVjdXJzaXZlbHlTZWFyY2hDaGlsZE5vZGVzRm9yU2NyaXB0Tm9kZSIsIm5vZGUiLCJmb3VuZFNjcmlwdENhbGxiYWNrIiwibm9kZU5hbWUiLCJjaGlsZE5vZGUiLCJmb3VuZFNjcmlwdE5vZGVDYWxsYmFjayIsInRhcmdldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uTGlzdCIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZGlzY29ubmVjdCJdLCJzb3VyY2VSb290IjoiIn0=