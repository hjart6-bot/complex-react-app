(self["webpackChunkcomplex_react_app"] = self["webpackChunkcomplex_react_app"] || []).push([["app_components_EditPost_js"],{

/***/ "./app/components/EditPost.js":
/*!************************************!*\
  !*** ./app/components/EditPost.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var use_immer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-immer */ "./node_modules/use-immer/dist/use-immer.module.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page */ "./app/components/Page.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoadingDotsIcon */ "./app/components/LoadingDotsIcon.js");
/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../StateContext */ "./app/StateContext.js");
/* harmony import */ var _DispatchContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DispatchContext */ "./app/DispatchContext.js");
/* harmony import */ var _NotFound__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NotFound */ "./app/components/NotFound.js");










function EditPost(props) {
  const appState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_StateContext__WEBPACK_IMPORTED_MODULE_5__.default);
  const appDispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DispatchContext__WEBPACK_IMPORTED_MODULE_6__.default);
  const originalState = {
    title: {
      value: "",
      hasErrors: false,
      message: ""
    },
    body: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isFetching: true,
    isSaving: false,
    id: (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)().id,
    sendCount: 0,
    notFound: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;

      case "titleChange":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        return;

      case "bodyChange":
        draft.body.hasErrors = false;
        draft.body.value = action.value;
        return;

      case "submitRequest":
        if (!draft.title.hasErrors && !draft.body.hasErrors) {
          draft.sendCount++;
        }

        return;

      case "saveRequestStarted":
        draft.isSaving = true;
        return;

      case "saveRequestFinished":
        draft.isSaving = false;
        return;

      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasErrors = true;
          draft.title.message = "You must provide a title.";
        }

        return;

      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasErrors = true;
          draft.body.message = "You must provide body content.";
        }

        return;

      case "notFound":
        draft.notFound = true;
        return;
    }
  }

  const [state, dispatch] = (0,use_immer__WEBPACK_IMPORTED_MODULE_1__.useImmerReducer)(ourReducer, originalState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({
      type: "titleRules",
      value: state.title.value
    });
    dispatch({
      type: "bodyRules",
      value: state.body.value
    });
    dispatch({
      type: "submitRequest"
    });
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default().CancelToken.source();

    async function fetchPost() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_3___default().get(`/post/${state.id}`, {
          cancelToken: ourRequest.token
        });

        if (response.data) {
          dispatch({
            type: "fetchComplete",
            value: response.data
          });

          if (appState.user.username != response.data.author.username) {
            appDispatch({
              type: "flashMessage",
              value: "You do not have permission to edit that post."
            }); //redirect to homepage

            props.history.push("/");
          }
        } else {
          dispatch({
            type: "notFound"
          });
        }
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      }
    }

    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (state.sendCount) {
      dispatch({
        type: "saveRequestStarted"
      });
      const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default().CancelToken.source();

      async function fetchPost() {
        try {
          const response = await axios__WEBPACK_IMPORTED_MODULE_3___default().post(`/post/${state.id}/edit`, {
            title: state.title.value,
            body: state.body.value,
            token: appState.user.token
          }, {
            cancelToken: ourRequest.token
          });
          dispatch({
            type: "saveRequestFinished"
          });
          appDispatch({
            type: "flashMessage",
            value: "Post was updated."
          });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }

      fetchPost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.notFound) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_NotFound__WEBPACK_IMPORTED_MODULE_7__.default, null);
  }

  if (state.isFetching) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_2__.default, {
    title: "loading..."
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_4__.default, null));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_2__.default, {
    title: "Edit Post"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link, {
    className: "small font-weight-bold",
    to: `/post/${state.id}`
  }, "\xAB Back to post permalink"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    className: "mt-3",
    onSubmit: submitHandler
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "post-title",
    className: "text-muted mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", null, "Title")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onBlur: e => dispatch({
      type: "titleRules",
      value: e.target.value
    }),
    onChange: e => dispatch({
      type: "titleChange",
      value: e.target.value
    }),
    value: state.title.value,
    autoFocus: true,
    name: "title",
    id: "post-title",
    className: "form-control form-control-lg form-control-title",
    type: "text",
    placeholder: "",
    autoComplete: "off"
  }), state.title.hasErrors && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "alert alert-danger small liveValidateMessage"
  }, state.title.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "post-body",
    className: "text-muted mb-1 d-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", null, "Body Content")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    onBlur: e => dispatch({
      type: "bodyRules",
      value: e.target.value
    }),
    onChange: e => dispatch({
      type: "bodyChange",
      value: e.target.value
    }),
    name: "body",
    id: "post-body",
    className: "body-content tall-textarea form-control",
    type: "text",
    value: state.body.value
  }), state.body.hasErrors && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "alert alert-danger small liveValidateMessage"
  }, state.body.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "btn btn-primary",
    disabled: state.isSaving
  }, state.isSaving ? "Saving..." : "Save Updates")));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.withRouter)(EditPost));

/***/ }),

/***/ "./app/components/NotFound.js":
/*!************************************!*\
  !*** ./app/components/NotFound.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page */ "./app/components/Page.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");




function NotFound() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__.default, {
    title: "Not Found"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Whoops, we cannot find that page."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "lead text-muted"
  }, "You can always visit the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
    to: "/"
  }, "homepage"), " to get a fresh start.")));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFound);

/***/ })

}]);
//# sourceMappingURL=app_components_EditPost_js.bundled.js.map