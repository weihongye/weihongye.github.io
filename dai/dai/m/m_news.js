webpackJsonp([4],{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    replace: true,
	    template: __webpack_require__(14),
	    methods: {
	    }
	};


/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = "<div class=\"footer-wrap clear\">\r\n    <div class=\"footer-fl\">\r\n        <ul class=\"clear\">\r\n            <li><a href=\"index.html\">首页</a></li>\r\n            <li><a href=\"cn.html\">超能模式</a></li>\r\n            <li><a href=\"contact.html\">联系我们</a></li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"footer-fr\">\r\n        <div class=\"phone-wrap center_y\"></div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, $) {__webpack_require__(29);
	(function () {
	    var listAll = [];
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            listData: listAll
	        },
	        components: {
	            'c-footer': __webpack_require__(13),
	            'c-header': __webpack_require__(15)
	        }
	    });
	    $.ajax({
	        type: 'GET',
	        url: 'noMD5/news.json',
	        data: {},
	        dataType: 'json',
	        timeout: 2000,
	        success: function (data, status, xhr) {
	            vm.listData = data;
	        },
	        error: function (xhr, type, error) {
	        }
	    });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(16)))

/***/ },

/***/ 29:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=m_news.js.map