exports.id = "server";
exports.modules = {

/***/ "./server/template.js":
/*!****************************!*\
  !*** ./server/template.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return template; });
function template(body) {
  return `< !DOCTYPE html >
        <html>
        <head>
           <meta charset="utf-8">
           <title>Inventory Management</title>
           <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">

                            <style>
                                table.table-hover tr {
                                    cursor: pointer;
        }
        .panel-title a {
                                    display: block;
            width: 100%;
            cursor: pointer;
        }
    </style>
</head>
                        <body>
                            <!-- Page generated from template. -->
                            <div id="content">${body}</div>
                            <script src="/env.js"></script>
                            <script src="/vendor.bundle.js"></script>
                            <script src="/app.bundle.js"></script>
                        </body>
</html>
`;
}

/***/ })

};
//# sourceMappingURL=server.9c6d33d2c97a03e1e7b7.hot-update.js.map