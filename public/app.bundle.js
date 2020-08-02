/** *** */ (function (modules) { // webpackBootstrap
/** *** */ 	// The module cache
/** *** */ 	const installedModules = {};
  /** *** */
  /** *** */ 	// The require function
  /** *** */ 	function __webpack_require__(moduleId) {
    /** *** */
    /** *** */ 		// Check if module is in cache
    /** *** */ 		if (installedModules[moduleId]) {
      /** *** */ 			return installedModules[moduleId].exports;
      /** *** */ 		}
    /** *** */ 		// Create a new module (and put it into the cache)
    /** *** */ 		const module = installedModules[moduleId] = {
      /** *** */ 			i: moduleId,
      /** *** */ 			l: false,
      /** *** */ 			exports: {},
      /** *** */ 		};
    /** *** */
    /** *** */ 		// Execute the module function
    /** *** */ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /** *** */
    /** *** */ 		// Flag the module as loaded
    /** *** */ 		module.l = true;
    /** *** */
    /** *** */ 		// Return the exports of the module
    /** *** */ 		return module.exports;
    /** *** */ 	}
  /** *** */
  /** *** */
  /** *** */ 	// expose the modules object (__webpack_modules__)
  /** *** */ 	__webpack_require__.m = modules;
  /** *** */
  /** *** */ 	// expose the module cache
  /** *** */ 	__webpack_require__.c = installedModules;
  /** *** */
  /** *** */ 	// define getter function for harmony exports
  /** *** */ 	__webpack_require__.d = function (exports, name, getter) {
    /** *** */ 		if (!__webpack_require__.o(exports, name)) {
      /** *** */ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /** *** */ 		}
    /** *** */ 	};
  /** *** */
  /** *** */ 	// define __esModule on exports
  /** *** */ 	__webpack_require__.r = function (exports) {
    /** *** */ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /** *** */ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /** *** */ 		}
    /** *** */ 		Object.defineProperty(exports, '__esModule', { value: true });
    /** *** */ 	};
  /** *** */
  /** *** */ 	// create a fake namespace object
  /** *** */ 	// mode & 1: value is a module id, require it
  /** *** */ 	// mode & 2: merge all properties of value into the ns
  /** *** */ 	// mode & 4: return value when already ns object
  /** *** */ 	// mode & 8|1: behave like require
  /** *** */ 	__webpack_require__.t = function (value, mode) {
    /** *** */ 		if (mode & 1) value = __webpack_require__(value);
    /** *** */ 		if (mode & 8) return value;
    /** *** */ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /** *** */ 		const ns = Object.create(null);
    /** *** */ 		__webpack_require__.r(ns);
    /** *** */ 		Object.defineProperty(ns, 'default', { enumerable: true, value });
    /** *** */ 		if (mode & 2 && typeof value !== 'string') for (const key in value) __webpack_require__.d(ns, key, (key => value[key]).bind(null, key));
    /** *** */ 		return ns;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// getDefaultExport function for compatibility with non-harmony modules
  /** *** */ 	__webpack_require__.n = function (module) {
    /** *** */ 		const getter = module && module.__esModule
    /** *** */ 			? function getDefault() { return module.default; }
    /** *** */ 			: function getModuleExports() { return module; };
    /** *** */ 		__webpack_require__.d(getter, 'a', getter);
    /** *** */ 		return getter;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// Object.prototype.hasOwnProperty.call
  /** *** */ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /** *** */
  /** *** */ 	// __webpack_public_path__
  /** *** */ 	__webpack_require__.p = '/';
  /** *** */
  /** *** */
  /** *** */ 	// Load entry module and return exports
  /** *** */ 	return __webpack_require__(__webpack_require__.s = 0);
/** *** */ }({

  /** */ './src/App.jsx':
  /*! *********************!*\
  !*** ./src/App.jsx ***!
  \******************** */
  /*! no static exports found */
  /** */ (function (module, exports) {
    throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\src\\App.jsx: Support for the experimental syntax 'jsx' isn't currently enabled (15:3):\n\n  13 | \n  14 | const element = (\n> 15 |   <Router>\n     |   ^\n  16 |     <Page />\n  17 |   </Router>\n  18 | );\n\nAdd @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.\n    at Parser._raise (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:762:17)\n    at Parser.raiseWithData (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:755:17)\n    at Parser.expectOnePlugin (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:8928:18)\n    at Parser.parseExprAtom (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:10244:22)\n    at Parser.parseExprSubscripts (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9759:23)\n    at Parser.parseMaybeUnary (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9739:21)\n    at Parser.parseExprOps (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9609:23)\n    at Parser.parseMaybeConditional (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9582:23)\n    at Parser.parseMaybeAssign (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9545:21)\n    at Parser.parseParenAndDistinguishExpression (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:10387:28)\n    at Parser.parseExprAtom (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:10116:21)\n    at Parser.parseExprSubscripts (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9759:23)\n    at Parser.parseMaybeUnary (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9739:21)\n    at Parser.parseExprOps (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9609:23)\n    at Parser.parseMaybeConditional (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9582:23)\n    at Parser.parseMaybeAssign (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:9545:21)\n    at Parser.parseVar (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11948:26)\n    at Parser.parseVarStatement (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11757:10)\n    at Parser.parseStatementContent (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11351:21)\n    at Parser.parseStatement (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11284:17)\n    at Parser.parseBlockOrModuleBlockBody (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11864:25)\n    at Parser.parseBlockBody (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11850:10)\n    at Parser.parseTopLevel (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:11215:10)\n    at Parser.parse (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:12922:10)\n    at parse (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\parser\\lib\\index.js:12975:38)\n    at parser (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\core\\lib\\parser\\index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:99:38)\n    at normalizeFile.next (<anonymous>)\n    at run (C:\\Users\\duyqu\\Documents\\CS5610\\GroupProject_Croissant_UI\\ui\\node_modules\\@babel\\core\\lib\\transformation\\index.js:31:50)");
    /** */ }),

  /** */ 0:
  /*! ***************************!*\
  !*** multi ./src/App.jsx ***!
  \************************** */
  /*! no static exports found */
  /** */ (function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(/*! ./src/App.jsx */'./src/App.jsx');
    /** */ }),

/** *** */ }));
// # sourceMappingURL=app.bundle.js.map
