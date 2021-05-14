(self["webpackChunkcomplex_react_app"] = self["webpackChunkcomplex_react_app"] || []).push([["app_components_Chat_js"],{

/***/ "./app/components/Chat.js":
/*!********************************!*\
  !*** ./app/components/Chat.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StateContext */ "./app/StateContext.js");
/* harmony import */ var _DispatchContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DispatchContext */ "./app/DispatchContext.js");
/* harmony import */ var use_immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-immer */ "./node_modules/use-immer/dist/use-immer.module.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/wrapper.mjs");







function Chat() {
  const socket = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const appState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_StateContext__WEBPACK_IMPORTED_MODULE_1__.default);
  const appDispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DispatchContext__WEBPACK_IMPORTED_MODULE_2__.default);
  const chatField = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const chatLog = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [state, setState] = (0,use_immer__WEBPACK_IMPORTED_MODULE_3__.useImmer)({
    fieldValue: "",
    chatMessages: []
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (appState.isChatOpen) {
      chatField.current.focus();
      appDispatch({
        type: "clearUnreadChatCount"
      });
    }
  }, [appState.isChatOpen]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    socket.current = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__.default)("http://localhost:8080");
    socket.current.on("chatFromServer", message => {
      setState(draft => {
        draft.chatMessages.push(message);
      });
    });
    return () => socket.current.disconnect();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight;

    if (state.chatMessages.length && !appState.isChatOpen) {
      appDispatch({
        type: "incrementUnreadChatCount"
      });
    }
  }, [state.chatMessages]); //event target value (e)

  function handleFieldChange(e) {
    const value = e.target.value;
    setState(draft => {
      draft.fieldValue = value;
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // Send message to chat server

    socket.current.emit("chatFromBrowser", {
      message: state.fieldValue,
      token: appState.user.token
    });
    setState(draft => {
      // Add message to state collection of messages
      draft.chatMessages.push({
        message: draft.fieldValue,
        username: appState.user.username,
        avatar: appState.user.avatar
      });
      draft.fieldValue = "";
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "chat-wrapper",
    className: "chat-wrapper shadow border-top border-left border-right " + (appState.isChatOpen ? "chat-wrapper--is-visible" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "chat-title-bar bg-primary"
  }, "Chat", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    onClick: () => appDispatch({
      type: "closeChat"
    }),
    className: "chat-title-bar-close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fas fa-times-circle"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "chat",
    className: "chat-log",
    ref: chatLog
  }, state.chatMessages.map((message, index) => {
    if (message.username == appState.user.username) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        key: index,
        className: "chat-self"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "chat-message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "chat-message-inner"
      }, message.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
        className: "chat-avatar avatar-tiny",
        src: message.avatar
      }));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      key: index,
      className: "chat-other"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
      to: `/profile/${message.username}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      className: "avatar-tiny",
      src: message.avatar
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "chat-message"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "chat-message-inner"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
      to: `/profile/${message.username}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, message.username, ": ")), message.message)));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit,
    id: "chatForm",
    className: "chat-form border-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    value: state.fieldValue,
    onChange: handleFieldChange,
    ref: chatField,
    type: "text",
    className: "chat-field",
    id: "chatField",
    placeholder: "Type a message\u2026",
    autoComplete: "off"
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chat);

/***/ })

}]);
//# sourceMappingURL=app_components_Chat_js.bundled.js.map