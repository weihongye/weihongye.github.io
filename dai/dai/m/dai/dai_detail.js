webpackJsonp([2],{

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

	/* WEBPACK VAR INJECTION */(function($, Vue) {__webpack_require__(21);
	(function () {
	    var newsData = [],
	            newsId = parseInt(getQueryString('id'))-1;
	    $.ajax({
	        type: 'GET',
	        url: 'noMD5/news.json',
	        data: {},
	        dataType: 'json',
	        timeout: 2000,
	        success: function (data, status, xhr) {
	            vm.newsData = data[newsId];
	        },
	        error: function (xhr, type, error) {
	        }
	    });
	    $('.img-wrap img').attr('src','noMD5/news-b'+(newsId+1)+'.jpg');
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            newsData: newsData
	        },
	        components: {
	            'c-footer': __webpack_require__(13),
	            'c-header': __webpack_require__(15)
	        },
	        ready:function(){
	        }
	    });
	    function getQueryString(name) {
	        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) {
	            return r[2];
	        }
	        return '';
	    }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(1)))

/***/ },

/***/ 21:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=dai_detail.js.map