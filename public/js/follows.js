/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/follows.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/follows.js":
/*!***************************!*\
  !*** ./src/js/follows.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var follows = (function () {\r\n  var followed_channels = [];\r\n  var live_streams = [];\r\n  var followed_count = 0;\r\n  var user_id;\r\n  var $searchForm;\r\n  var $userIdInput;\r\n  var $liveCheckBoxes;\r\n  var chunked_user_logins = [];\r\n\r\n  function init() {\r\n    cacheDom();\r\n    bindEvents();\r\n  };\r\n\r\n  function cacheDom() {\r\n    $searchForm = $(\"#form\");\r\n    $userIdInput = $(\"#user-id-input\");\r\n  };\r\n\r\n  function bindEvents(){\r\n    $searchForm.on(\"submit\", handleSearchFormSubmit);\r\n  };\r\n\r\n  function handleSearchFormSubmit(evt){\r\n    evt.preventDefault();\r\n    resetData();\r\n    user_id = $userIdInput.val();\r\n\r\n    fetchFollowedChannels(user_id, \"\");\r\n  }\r\n\r\n  function resetData(){\r\n    followed_channels = [];\r\n    live_streams = [];\r\n    followed_count = 0;\r\n    user_id = 0;\r\n  }\r\n\r\n  function fetchFollowedChannels(id, after) {\r\n    var url = `${undefined}/follows?from_id=${id}`;\r\n\r\n    if(after) {\r\n      url += `&after=${after}`;\r\n    }\r\n\r\n    return $.ajax({\r\n      url: url,\r\n    })\r\n    .done(function(response) {\r\n      followed_channels = [...followed_channels, ...response.data];\r\n\r\n      if(response.data.length == 20) {\r\n        var pagination_cursor = response.pagination.cursor;\r\n        fetchFollowedChannels(id, pagination_cursor);\r\n      }\r\n      else {\r\n        fetchLiveStreams();\r\n      }\r\n\r\n    })\r\n    .fail(function(response) {\r\n      console.log(response);\r\n      alert( \"error\" );\r\n    });\r\n  };\r\n\r\n  function fetchLiveStreams(){\r\n    var user_logins = followed_channels.map(x => x.to_name);\r\n    chunked_user_logins = chunk(user_logins, 100);\r\n    requestStreams();\r\n  }\r\n\r\n  function chunk (arr, len) {\r\n    var chunks = [],\r\n        i = 0,\r\n        n = arr.length;\r\n\r\n    while (i < n) {\r\n      chunks.push(arr.slice(i, i += len));\r\n    }\r\n\r\n    return chunks;\r\n  }\r\n\r\n  function requestStreams()\r\n  {\r\n    if(chunked_user_logins.length > 0) {\r\n      var user_query_string = chunked_user_logins[0].join(\"&user_login=\");\r\n      var url = `${undefined}/streams?user_login=${user_query_string}`;\r\n\r\n      $.ajax({\r\n        url: url\r\n      })\r\n      .done(function(response) {\r\n        live_streams = [...live_streams, ...response.data];\r\n        chunked_user_logins.shift();\r\n        requestStreams();\r\n      })\r\n      .fail(function(response) {\r\n        console.log(response);\r\n        alert( \"error\" );\r\n      });\r\n    }\r\n    else {\r\n      processLiveStreams();\r\n    }\r\n  }\r\n\r\n  function processLiveStreams()\r\n  {\r\n    live_streams.sort((a, b) => (a.viewer_count > b.viewer_count) ? -1 : 1);\r\n\r\n    getGames()\r\n    .then(function(response){\r\n      mapGamesToStreams(response.data);\r\n      renderLive();\r\n      renderMultiTwitchLink();\r\n      cacheLiveDom();\r\n      bindLiveEvents();\r\n    })\r\n  }\r\n\r\n  function getGames() {\r\n    var games = live_streams.map(x => x.game_id);\r\n    var game_ids = games.join(\"&id=\");\r\n    var url = `${undefined}/games?id=${game_ids}`;\r\n\r\n    return $.ajax({\r\n      url: url,\r\n    });\r\n  }\r\n\r\n  function mapGamesToStreams(games){\r\n    games.forEach(x => {\r\n      var streams = live_streams.filter(obj => {\r\n        return obj.game_id == x.id;\r\n      })\r\n\r\n      streams.forEach(y => y.game_name = x.name);\r\n    });\r\n  }\r\n\r\n  function cacheLiveDom(){\r\n    $liveCheckBoxes = $(\".live-stream-checkbox\");\r\n    $createLinksButton = $(\"#createLinksButton\");\r\n    $multiTwitchField = $(\"#multiTwitchField\");\r\n    $multiTwitchLink = $(\"#multiTwitchLink\");\r\n  }\r\n\r\n  function bindLiveEvents() {\r\n    $createLinksButton.on(\"click\", handleCreateLinksButtonClick);\r\n  }\r\n\r\n  function handleCreateLinksButtonClick(evt){\r\n    var selectedChannels = getSelectedChannels();\r\n\r\n    $multiTwitchField.removeClass(\"is-hidden\");\r\n\r\n    var multiTwitchLink = `http://www.multitwitch.tv/${selectedChannels.join('/')}`;\r\n    $multiTwitchLink.attr('href', multiTwitchLink);\r\n\r\n    renderChatLinks();\r\n  }\r\n\r\n  function getSelectedChannels()\r\n  {\r\n    var selectedCheckboxes =\r\n      $liveCheckBoxes\r\n      .filter(function(i, el){\r\n        return el.checked\r\n      });\r\n\r\n    var selectedCheckBoxArray =\r\n      $.makeArray(selectedCheckboxes);\r\n\r\n    var selectedChannels =\r\n      selectedCheckBoxArray\r\n      .map(x => x.value);\r\n\r\n    return selectedChannels;\r\n  }\r\n\r\n  function renderLive() {\r\n    var template = `\r\n    <div class=\"card\">\r\n      <header class=\"card-header\">\r\n        <p class=\"card-header-title\">\r\n          Live Streams\r\n        </p>\r\n      </header>\r\n      <div class=\"card-content\">\r\n        <table class='table is-narrow is-striped'>\r\n          <thead>\r\n            <tr>\r\n              <th>Name</th>\r\n              <th>Game</th>\r\n              <th>Title</th>\r\n              <th>Viewers</th>\r\n              <th>Add to List</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            ${makeLiveTemplate(live_streams)}\r\n          </tbody>\r\n        </table>\r\n\r\n        <div class=\"field\">\r\n          <div class=\"control\">\r\n            <button class=\"button is-link\" id=\"createLinksButton\">Create Links</button>\r\n          </div>\r\n        </div>\r\n        <div id=\"multi-twitch-target\" class=\"content\"></div>\r\n        <div id=\"live-chat-links\" class=\"content\"></div>\r\n      </div>\r\n    </div>\r\n    `;\r\n\r\n    $(\"#live-target\").html(template);\r\n  };\r\n\r\n  function renderMultiTwitchLink(){\r\n\r\n    var template = `\r\n    <div class=\"field is-hidden\" id=\"multiTwitchField\">\r\n      <label class=\"label\">MultiTwitch</label>\r\n      <div class=\"control\">\r\n        <a id=\"multiTwitchLink\">MultiTwitch Link</a>\r\n      </div>\r\n    </div>\r\n    `\r\n\r\n    $(\"#multi-twitch-target\").html(template);\r\n  }\r\n\r\n  function makeLiveTemplate(data){\r\n    let baseUrl = \"https://www.twitch.tv/\"\r\n    let newList = '';\r\n    data.forEach(function(object){\r\n      newList += `<tr>\r\n                  <td>\r\n                    <a href=\"${baseUrl + object.user_name}\">\r\n                      ${object.user_name}\r\n                    </a>\r\n                  </td>\r\n                  <td>${object.game_name}</td>\r\n                  <td>${object.title}</td>\r\n                  <td class=\"has-text-right\">${object.viewer_count}</td>\r\n                  <td class=\"has-text-right\">\r\n                    <label class=\"checkbox\">\r\n                      <input\r\n                        type=\"checkbox\"\r\n                        class=\"live-stream-checkbox\"\r\n                        value=\"${object.user_name}\"\r\n                      >\r\n                    </label>\r\n                  </td>\r\n                  </tr>`\r\n    });\r\n    return newList;\r\n  }\r\n\r\n  function renderChatLinks(){\r\n    var template = `\r\n      <div class=\"field\">\r\n        <label class=\"label\">Chat Links</label>\r\n        <div class=\"control\">\r\n          ${makeChatLinksTemplate(getSelectedChannels())}\r\n        </div>\r\n      </div>\r\n    `;\r\n\r\n    $(\"#live-chat-links\").html(template);\r\n  }\r\n\r\n  function makeChatLinksTemplate(data){\r\n    let newList = '';\r\n    data.forEach(function(name){\r\n      newList += `\r\n      <div class=\"field is-grouped\">\r\n        <a\r\n          href=\"https://www.twitch.tv/popout/${name}/chat?darkpopout\"\r\n        >\r\n          ${name}\r\n        </a>\r\n      </div>\r\n      `\r\n    });\r\n    return newList;\r\n  }\r\n\r\n  return {\r\n    init: init\r\n  }\r\n})()\r\n\r\nfollows.init();\r\n\n\n//# sourceURL=webpack:///./src/js/follows.js?");

/***/ })

/******/ });