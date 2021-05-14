(self["webpackChunkcomplex_react_app"] = self["webpackChunkcomplex_react_app"] || []).push([["app_components_CreatePost_js"],{

/***/ "./app/components/CreatePost.js":
/*!**************************************!*\
  !*** ./app/components/CreatePost.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page */ "./app/components/Page.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _DispatchContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DispatchContext */ "./app/DispatchContext.js");
/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../StateContext */ "./app/StateContext.js");







function CreatePost(props) {
  const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [body, setBody] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const appDispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DispatchContext__WEBPACK_IMPORTED_MODULE_3__.default);
  const appState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_StateContext__WEBPACK_IMPORTED_MODULE_4__.default);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //Use state defined on top of function and value saved from inputs
      const response = await axios__WEBPACK_IMPORTED_MODULE_2___default().post("/create-post", {
        title,
        body,
        token: appState.user.token
      }); //Redirect to new post url

      appDispatch({
        type: "flashMessage",
        value: "Congrats, you created a new post!"
      });
      props.history.push(`/post/${response.data}`);
      console.log("New post was created");
    } catch (e) {
      console.log("There was a problem");
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__.default, {
    title: "Create Post"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "post-title",
    className: "text-muted mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", null, "Title")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: e => setTitle(e.target.value),
    autoFocus: true,
    name: "title",
    id: "post-title",
    className: "form-control form-control-lg form-control-title",
    type: "text",
    placeholder: "",
    autoComplete: "off"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "post-body",
    className: "text-muted mb-1 d-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", null, "Body Content")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    onChange: e => setBody(e.target.value),
    name: "body",
    id: "post-body",
    className: "body-content tall-textarea form-control",
    type: "text"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "btn btn-primary"
  }, "Save New Post")));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.withRouter)(CreatePost));

/***/ })

}]);
//# sourceMappingURL=app_components_CreatePost_js.bundled.js.map