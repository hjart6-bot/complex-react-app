(self["webpackChunkcomplex_react_app"] = self["webpackChunkcomplex_react_app"] || []).push([["app_components_Search_js"],{

/***/ "./app/components/Search.js":
/*!**********************************!*\
  !*** ./app/components/Search.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _DispatchContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DispatchContext */ "./app/DispatchContext.js");
/* harmony import */ var use_immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-immer */ "./node_modules/use-immer/dist/use-immer.module.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Post */ "./app/components/Post.js");







function Search() {
  const appDispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DispatchContext__WEBPACK_IMPORTED_MODULE_1__.default);
  const [state, setState] = (0,use_immer__WEBPACK_IMPORTED_MODULE_2__.useImmer)({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.addEventListener("keyup", searchKeyPressHandler);
    return () => document.removeEventListener("keyup", searchKeyPressHandler);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (state.searchTerm.trim()) {
      setState(draft => {
        draft.show = "loading";
      });
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++;
        });
      }, 750); //cleanup function to clear timeout

      return () => clearTimeout(delay);
    } else {
      setState(draft => {
        draft.show = "neither";
      });
    }
  }, [state.searchTerm]); //useEffect takes array for what it monitors

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (state.requestCount) {
      const ourRequest = axios__WEBPACK_IMPORTED_MODULE_3___default().CancelToken.source();

      async function fetchResults() {
        try {
          const response = await axios__WEBPACK_IMPORTED_MODULE_3___default().post("/search", {
            searchTerm: state.searchTerm
          }, {
            cancelToken: ourRequest.token
          });
          setState(draft => {
            draft.results = response.data;
            draft.show = "results";
          });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }

      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.requestCount]);

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      appDispatch({
        type: "closeSearch"
      });
    }
  }

  function handleInput(e) {
    const value = e.target.value;
    setState(draft => {
      draft.searchTerm = value;
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "search-overlay-top shadow-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container container--narrow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "live-search-field",
    className: "search-overlay-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fas fa-search"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: handleInput,
    autoFocus: true,
    type: "text",
    autoComplete: "off",
    id: "live-search-field",
    className: "live-search-field",
    placeholder: "What are you interested in?"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    onClick: () => appDispatch({
      type: "closeSearch"
    }),
    className: "close-live-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fas fa-times-circle"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "search-overlay-bottom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container container--narrow py-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "circle-loader " + (state.show == "loading" ? "circle-loader--visible" : "")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "live-search-results " + (state.show == "results" ? "live-search-results--visible" : "")
  }, Boolean(state.results.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "list-group shadow-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "list-group-item active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Search Results"), " (", state.results.length, " ", state.results.length > 1 ? "items" : "item", " found)"), state.results.map(post => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Post__WEBPACK_IMPORTED_MODULE_4__.default, {
      post: post,
      key: post._id,
      onClick: () => appDispatch({
        type: "closeSearch"
      })
    });
  })), !Boolean(state.results.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "alert alert-danger text-center shadow-sm"
  }, "Sorry, we could not find any results for that search.")))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ })

}]);
//# sourceMappingURL=app_components_Search_js.bundled.js.map