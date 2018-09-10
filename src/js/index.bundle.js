/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/graphql.js":
/*!***************************!*\
  !*** ./src/js/graphql.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-request */ \"./node_modules/graphql-request/dist/src/index.js\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nvar client = null;\r\n\r\n// 初始化GraphQLClient，设置header\r\nfunction init (token) {\r\n  console.log('init gql');\r\n  client = new graphql_request__WEBPACK_IMPORTED_MODULE_0__[\"GraphQLClient\"]('https://api.github.com/graphql', {\r\n    headers: {\r\n      Authorization: 'Bearer ' + token\r\n    }\r\n  });\r\n};\r\n\r\n// 抓取用户信息\r\nfunction fetchUserData (login) {\r\n  var query = `{\r\n    ${ !login ? 'viewer' : 'user(login:\"${login}\")' } {\r\n      avatarUrl(size: 200)\r\n      bio\r\n      company\r\n      createdAt\r\n      email\r\n      followers {\r\n        totalCount\r\n      }\r\n      following {\r\n        totalCount\r\n      }\r\n      isHireable\r\n      issueComments {\r\n        totalCount\r\n      }\r\n      issues {\r\n        totalCount\r\n      }\r\n      location\r\n      login\r\n      name\r\n      organizations(first:100) {\r\n        totalCount\r\n        nodes {\r\n          avatarUrl(size:35)\r\n          members {\r\n            totalCount\r\n          }\r\n          name\r\n          url\r\n        }\r\n      }\r\n      pinnedRepositories(first:6) {\r\n        nodes {\r\n          description\r\n          forks {\r\n            totalCount\r\n          }\r\n          issues {\r\n            totalCount\r\n          }\r\n          isFork\r\n          languages(first:1) {\r\n            nodes {\r\n              color\r\n              name\r\n            }\r\n          }\r\n          name\r\n          stargazers {\r\n            totalCount\r\n          }\r\n          url\r\n        }\r\n      }\r\n      pullRequests {\r\n        totalCount\r\n      }\r\n      repositories(first:6, affiliations:OWNER, orderBy:{field:STARGAZERS, direction: DESC}) {\r\n        totalCount\r\n        nodes {\r\n          description\r\n          forks {\r\n            totalCount\r\n          }\r\n          issues {\r\n            totalCount\r\n          }\r\n          isFork\r\n          languages(first:1) {\r\n            nodes {\r\n              color\r\n              name\r\n            }\r\n          }\r\n          name\r\n          stargazers {\r\n            totalCount\r\n          }\r\n          url\r\n        }\r\n      }\r\n      repositoriesContributedTo {\r\n        totalCount\r\n      }\r\n      starredRepositories {\r\n        totalCount\r\n      }\r\n      url\r\n      viewerCanFollow\r\n      viewerIsFollowing\r\n      websiteUrl\r\n    }\r\n  }`\r\n  return client.request(query);\r\n};\r\n\r\n// 抓取用户repos\r\nfunction fetchUserRepos (login) {\r\n  var query = `query ($login: String!) {\r\n    user(login: $login) {\r\n      repositories(first:6, affiliations:OWNER, orderBy:{field:PUSHED_AT, direction:DESC}) {\r\n        nodes {\r\n          description\r\n          forks {\r\n            totalCount\r\n          }\r\n          issues {\r\n            totalCount\r\n          }\r\n          isFork\r\n          languages(first:1) {\r\n            nodes {\r\n              color\r\n              name\r\n            }\r\n          }\r\n          name\r\n          stargazers {\r\n            totalCount\r\n          }\r\n          url\r\n        }\r\n        pageInfo {\r\n          endCursor\r\n          hasNextPage\r\n        }\r\n      }\r\n    }\r\n  }`;\r\n\r\n  var variables = {\r\n    login: login\r\n  };\r\n\r\n  return client.request(query, variables);\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ client, init, fetchUserData, fetchUserRepos });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ3JhcGhxbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9ncmFwaHFsLmpzP2I1ZmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTENsaWVudCB9IGZyb20gJ2dyYXBocWwtcmVxdWVzdCdcclxuXHJcbnZhciBjbGllbnQgPSBudWxsO1xyXG5cclxuLy8g5Yid5aeL5YyWR3JhcGhRTENsaWVudO+8jOiuvue9rmhlYWRlclxyXG5mdW5jdGlvbiBpbml0ICh0b2tlbikge1xyXG4gIGNvbnNvbGUubG9nKCdpbml0IGdxbCcpO1xyXG4gIGNsaWVudCA9IG5ldyBHcmFwaFFMQ2xpZW50KCdodHRwczovL2FwaS5naXRodWIuY29tL2dyYXBocWwnLCB7XHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIEF1dGhvcml6YXRpb246ICdCZWFyZXIgJyArIHRva2VuXHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyDmipPlj5bnlKjmiLfkv6Hmga9cclxuZnVuY3Rpb24gZmV0Y2hVc2VyRGF0YSAobG9naW4pIHtcclxuICB2YXIgcXVlcnkgPSBge1xyXG4gICAgJHsgIWxvZ2luID8gJ3ZpZXdlcicgOiAndXNlcihsb2dpbjpcIiR7bG9naW59XCIpJyB9IHtcclxuICAgICAgYXZhdGFyVXJsKHNpemU6IDIwMClcclxuICAgICAgYmlvXHJcbiAgICAgIGNvbXBhbnlcclxuICAgICAgY3JlYXRlZEF0XHJcbiAgICAgIGVtYWlsXHJcbiAgICAgIGZvbGxvd2VycyB7XHJcbiAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICB9XHJcbiAgICAgIGZvbGxvd2luZyB7XHJcbiAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICB9XHJcbiAgICAgIGlzSGlyZWFibGVcclxuICAgICAgaXNzdWVDb21tZW50cyB7XHJcbiAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICB9XHJcbiAgICAgIGlzc3VlcyB7XHJcbiAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICB9XHJcbiAgICAgIGxvY2F0aW9uXHJcbiAgICAgIGxvZ2luXHJcbiAgICAgIG5hbWVcclxuICAgICAgb3JnYW5pemF0aW9ucyhmaXJzdDoxMDApIHtcclxuICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgbm9kZXMge1xyXG4gICAgICAgICAgYXZhdGFyVXJsKHNpemU6MzUpXHJcbiAgICAgICAgICBtZW1iZXJzIHtcclxuICAgICAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHBpbm5lZFJlcG9zaXRvcmllcyhmaXJzdDo2KSB7XHJcbiAgICAgICAgbm9kZXMge1xyXG4gICAgICAgICAgZGVzY3JpcHRpb25cclxuICAgICAgICAgIGZvcmtzIHtcclxuICAgICAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaXNzdWVzIHtcclxuICAgICAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaXNGb3JrXHJcbiAgICAgICAgICBsYW5ndWFnZXMoZmlyc3Q6MSkge1xyXG4gICAgICAgICAgICBub2RlcyB7XHJcbiAgICAgICAgICAgICAgY29sb3JcclxuICAgICAgICAgICAgICBuYW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG5hbWVcclxuICAgICAgICAgIHN0YXJnYXplcnMge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcHVsbFJlcXVlc3RzIHtcclxuICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgIH1cclxuICAgICAgcmVwb3NpdG9yaWVzKGZpcnN0OjYsIGFmZmlsaWF0aW9uczpPV05FUiwgb3JkZXJCeTp7ZmllbGQ6U1RBUkdBWkVSUywgZGlyZWN0aW9uOiBERVNDfSkge1xyXG4gICAgICAgIHRvdGFsQ291bnRcclxuICAgICAgICBub2RlcyB7XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblxyXG4gICAgICAgICAgZm9ya3Mge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpc3N1ZXMge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpc0ZvcmtcclxuICAgICAgICAgIGxhbmd1YWdlcyhmaXJzdDoxKSB7XHJcbiAgICAgICAgICAgIG5vZGVzIHtcclxuICAgICAgICAgICAgICBjb2xvclxyXG4gICAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgc3RhcmdhemVycyB7XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnRcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXBvc2l0b3JpZXNDb250cmlidXRlZFRvIHtcclxuICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgIH1cclxuICAgICAgc3RhcnJlZFJlcG9zaXRvcmllcyB7XHJcbiAgICAgICAgdG90YWxDb3VudFxyXG4gICAgICB9XHJcbiAgICAgIHVybFxyXG4gICAgICB2aWV3ZXJDYW5Gb2xsb3dcclxuICAgICAgdmlld2VySXNGb2xsb3dpbmdcclxuICAgICAgd2Vic2l0ZVVybFxyXG4gICAgfVxyXG4gIH1gXHJcbiAgcmV0dXJuIGNsaWVudC5yZXF1ZXN0KHF1ZXJ5KTtcclxufTtcclxuXHJcbi8vIOaKk+WPlueUqOaIt3JlcG9zXHJcbmZ1bmN0aW9uIGZldGNoVXNlclJlcG9zIChsb2dpbikge1xyXG4gIHZhciBxdWVyeSA9IGBxdWVyeSAoJGxvZ2luOiBTdHJpbmchKSB7XHJcbiAgICB1c2VyKGxvZ2luOiAkbG9naW4pIHtcclxuICAgICAgcmVwb3NpdG9yaWVzKGZpcnN0OjYsIGFmZmlsaWF0aW9uczpPV05FUiwgb3JkZXJCeTp7ZmllbGQ6UFVTSEVEX0FULCBkaXJlY3Rpb246REVTQ30pIHtcclxuICAgICAgICBub2RlcyB7XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblxyXG4gICAgICAgICAgZm9ya3Mge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpc3N1ZXMge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpc0ZvcmtcclxuICAgICAgICAgIGxhbmd1YWdlcyhmaXJzdDoxKSB7XHJcbiAgICAgICAgICAgIG5vZGVzIHtcclxuICAgICAgICAgICAgICBjb2xvclxyXG4gICAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgc3RhcmdhemVycyB7XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnRcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgICAgICBwYWdlSW5mbyB7XHJcbiAgICAgICAgICBlbmRDdXJzb3JcclxuICAgICAgICAgIGhhc05leHRQYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfWA7XHJcblxyXG4gIHZhciB2YXJpYWJsZXMgPSB7XHJcbiAgICBsb2dpbjogbG9naW5cclxuICB9O1xyXG5cclxuICByZXR1cm4gY2xpZW50LnJlcXVlc3QocXVlcnksIHZhcmlhYmxlcyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsaWVudCwgaW5pdCwgZmV0Y2hVc2VyRGF0YSwgZmV0Y2hVc2VyUmVwb3MgfTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/graphql.js\n");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graphql_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphql.js */ \"./src/js/graphql.js\");\n\r\n\r\nnew Vue({\r\n  el: '#app',\r\n  data: {\r\n    token: localStorage.getItem('token') || '',\r\n    pageLoading: 1,\r\n    isLogining: 0,\r\n    loginUser: null, // 登录用户\r\n    users: [], // 用户组\r\n    repos: {},\r\n    nodeType: '', // 当前类别\r\n    subjectType: '',\r\n    currentNodeData: null, // 当前数据节点\r\n    filterListData: {list: [], pageInfo: null} // 过滤列表\r\n  },\r\n  created: function () {\r\n    if (this.token) {\r\n      _graphql_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(this.token);\r\n      this.login();\r\n    }\r\n  },\r\n  methods: {\r\n\r\n    // 登录\r\n    login: function () {\r\n      var vm = this;\r\n      // 显示loading状态\r\n      this.isLogining = 1;\r\n      // 尝试请求用户数据\r\n      _graphql_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fetchUserData()\r\n        .then(function(data) {\r\n          // 请求成功，保存token\r\n          localStorage.setItem('token', vm.token);\r\n          vm.pageLoading = 0;\r\n          vm.loginUser = data.viewer;\r\n          vm.currentNodeData = data.viewer;\r\n          vm.nodeType = 'user';\r\n          vm.subjectType = 'user';\r\n        })\r\n        .catch(function(err){\r\n          var errors = err.response.errors;\r\n          errors.forEach(function(i){\r\n            console.error(i.message);\r\n          });\r\n          vm.isLogining = 0;\r\n        });\r\n    },\r\n\r\n    // 显示仓库列表\r\n    showRepos: function () {\r\n      var vm = this;\r\n      var login = this.currentNodeData.login;\r\n      var repos = this.repos;\r\n      var filterListData = this.filterListData;\r\n      if (repos[login]) {\r\n        console.log(repos[login]);\r\n        filterListData = repos[login];\r\n      } else {\r\n        repos[login] = {nodes: []};\r\n\r\n        _graphql_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fetchUserRepos(login)\r\n        .then(function(data) {\r\n          console.log(data);\r\n          var obj = data.user.repositories;\r\n          repos[login].pageInfo = obj.pageInfo;\r\n          repos[login].nodes = repos[login].nodes.concat(obj.nodes);\r\n          console.log('fetch end:');\r\n          console.log(repos[login]);\r\n          vm.$set(filterListData, 'pageInfo', repos[login].pageInfo);\r\n          vm.$set(filterListData, 'list', repos[login].nodes);\r\n        })\r\n        .catch(function(err){\r\n          var errors = err.response.errors;\r\n          errors.forEach(function(i){\r\n            console.error(i.message);\r\n          });\r\n        });\r\n      }\r\n    }\r\n  }\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/N2JhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ3FsIGZyb20gJy4vZ3JhcGhxbC5qcyc7XHJcblxyXG5uZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIGRhdGE6IHtcclxuICAgIHRva2VuOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSB8fCAnJyxcclxuICAgIHBhZ2VMb2FkaW5nOiAxLFxyXG4gICAgaXNMb2dpbmluZzogMCxcclxuICAgIGxvZ2luVXNlcjogbnVsbCwgLy8g55m75b2V55So5oi3XHJcbiAgICB1c2VyczogW10sIC8vIOeUqOaIt+e7hFxyXG4gICAgcmVwb3M6IHt9LFxyXG4gICAgbm9kZVR5cGU6ICcnLCAvLyDlvZPliY3nsbvliKtcclxuICAgIHN1YmplY3RUeXBlOiAnJyxcclxuICAgIGN1cnJlbnROb2RlRGF0YTogbnVsbCwgLy8g5b2T5YmN5pWw5o2u6IqC54K5XHJcbiAgICBmaWx0ZXJMaXN0RGF0YToge2xpc3Q6IFtdLCBwYWdlSW5mbzogbnVsbH0gLy8g6L+H5ruk5YiX6KGoXHJcbiAgfSxcclxuICBjcmVhdGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy50b2tlbikge1xyXG4gICAgICBncWwuaW5pdCh0aGlzLnRva2VuKTtcclxuICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG5cclxuICAgIC8vIOeZu+W9lVxyXG4gICAgbG9naW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgLy8g5pi+56S6bG9hZGluZ+eKtuaAgVxyXG4gICAgICB0aGlzLmlzTG9naW5pbmcgPSAxO1xyXG4gICAgICAvLyDlsJ3or5Xor7fmsYLnlKjmiLfmlbDmja5cclxuICAgICAgZ3FsLmZldGNoVXNlckRhdGEoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgIC8vIOivt+axguaIkOWKn++8jOS/neWtmHRva2VuXHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB2bS50b2tlbik7XHJcbiAgICAgICAgICB2bS5wYWdlTG9hZGluZyA9IDA7XHJcbiAgICAgICAgICB2bS5sb2dpblVzZXIgPSBkYXRhLnZpZXdlcjtcclxuICAgICAgICAgIHZtLmN1cnJlbnROb2RlRGF0YSA9IGRhdGEudmlld2VyO1xyXG4gICAgICAgICAgdm0ubm9kZVR5cGUgPSAndXNlcic7XHJcbiAgICAgICAgICB2bS5zdWJqZWN0VHlwZSA9ICd1c2VyJztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgdmFyIGVycm9ycyA9IGVyci5yZXNwb25zZS5lcnJvcnM7XHJcbiAgICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihpLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2bS5pc0xvZ2luaW5nID0gMDtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pi+56S65LuT5bqT5YiX6KGoXHJcbiAgICBzaG93UmVwb3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgdmFyIGxvZ2luID0gdGhpcy5jdXJyZW50Tm9kZURhdGEubG9naW47XHJcbiAgICAgIHZhciByZXBvcyA9IHRoaXMucmVwb3M7XHJcbiAgICAgIHZhciBmaWx0ZXJMaXN0RGF0YSA9IHRoaXMuZmlsdGVyTGlzdERhdGE7XHJcbiAgICAgIGlmIChyZXBvc1tsb2dpbl0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXBvc1tsb2dpbl0pO1xyXG4gICAgICAgIGZpbHRlckxpc3REYXRhID0gcmVwb3NbbG9naW5dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcG9zW2xvZ2luXSA9IHtub2RlczogW119O1xyXG5cclxuICAgICAgICBncWwuZmV0Y2hVc2VyUmVwb3MobG9naW4pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICB2YXIgb2JqID0gZGF0YS51c2VyLnJlcG9zaXRvcmllcztcclxuICAgICAgICAgIHJlcG9zW2xvZ2luXS5wYWdlSW5mbyA9IG9iai5wYWdlSW5mbztcclxuICAgICAgICAgIHJlcG9zW2xvZ2luXS5ub2RlcyA9IHJlcG9zW2xvZ2luXS5ub2Rlcy5jb25jYXQob2JqLm5vZGVzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdmZXRjaCBlbmQ6Jyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXBvc1tsb2dpbl0pO1xyXG4gICAgICAgICAgdm0uJHNldChmaWx0ZXJMaXN0RGF0YSwgJ3BhZ2VJbmZvJywgcmVwb3NbbG9naW5dLnBhZ2VJbmZvKTtcclxuICAgICAgICAgIHZtLiRzZXQoZmlsdGVyTGlzdERhdGEsICdsaXN0JywgcmVwb3NbbG9naW5dLm5vZGVzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgdmFyIGVycm9ycyA9IGVyci5yZXNwb25zZS5lcnJvcnM7XHJcbiAgICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihpLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/index.js\n");

/***/ })

/******/ });