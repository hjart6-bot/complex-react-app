(self["webpackChunkcomplex_react_app"] = self["webpackChunkcomplex_react_app"] || []).push([["app_components_ViewSinglePost_js"],{

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

/***/ }),

/***/ "./app/components/ViewSinglePost.js":
/*!******************************************!*\
  !*** ./app/components/ViewSinglePost.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page */ "./app/components/Page.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadingDotsIcon */ "./app/components/LoadingDotsIcon.js");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/lib/react-markdown.js");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
/* harmony import */ var _NotFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NotFound */ "./app/components/NotFound.js");
/* harmony import */ var _StateContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../StateContext */ "./app/StateContext.js");
/* harmony import */ var _DispatchContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../DispatchContext */ "./app/DispatchContext.js");











function ViewSinglePost(props) {
  const appState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_StateContext__WEBPACK_IMPORTED_MODULE_7__.default);
  const appDispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DispatchContext__WEBPACK_IMPORTED_MODULE_8__.default);
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useParams)();
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [post, setPost] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const ourRequest = axios__WEBPACK_IMPORTED_MODULE_2___default().CancelToken.source();

    async function fetchPost() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_2___default().get(`/post/${id}`, {
          cancelToken: ourRequest.token
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      }
    }

    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [id]);

  if (!isLoading && !post) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_NotFound__WEBPACK_IMPORTED_MODULE_6__.default, null);
  }

  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__.default, {
    title: "loading..."
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LoadingDotsIcon__WEBPACK_IMPORTED_MODULE_3__.default, null));
  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username;
    }

    return false;
  }

  async function deleteHandler() {
    const areYouSure = window.confirm("Do you really want to delete this post?");

    if (areYouSure) {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_2___default().delete(`/post/${id}`, {
          data: {
            token: appState.user.token
          }
        });

        if (response.data == "Success") {
          // 1. display a flash message
          appDispatch({
            type: "flashMessage",
            value: "Post was successfully deleted."
          }); //2. redirect back to the current user's profile

          props.history.push(`/profile/${appState.user.username}`);
        }
      } catch (e) {
        console.log("There was a problem.");
      }
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Page__WEBPACK_IMPORTED_MODULE_1__.default, {
    title: post.title
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, post.title), isOwner() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Link, {
    to: `/post/${post._id}/edit`,
    "data-tip": "Edit",
    "data-for": "edit",
    className: "text-primary mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fas fa-edit"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
    id: "edit",
    className: "custom-tooltip"
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    onClick: deleteHandler,
    "data-tip": "Delete",
    "data-for": "delete",
    className: "delete-post-button text-danger"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fas fa-trash"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
    id: "delete",
    className: "custom-tooltip"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-muted small mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Link, {
    to: `/profile/${post.author.username}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "avatar-tiny",
    src: post.author.avatar
  })), "Posted by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Link, {
    to: `/profile/${post.author.username}`
  }, post.author.username), " on ", dateFormatted), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "body-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_markdown__WEBPACK_IMPORTED_MODULE_4___default()), {
    source: post.body,
    allowedTypes: ["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.withRouter)(ViewSinglePost));

/***/ })

}]);
//# sourceMappingURL=app_components_ViewSinglePost_js.bundled.js.map