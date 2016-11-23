webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, $) {/**
	 * Created by zhangxinxin5 on 16/10/10.
	 */
	__webpack_require__(26);
	(function () {
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            loadFlag :true
	        },
	        methods: {
	            jumpUrl:function(e){
	                var $this = $(e.target),
	                    href = $this.attr('data-href');
	                if(href)window.location.href = href;
	            }
	        },
	        components: {
	            'c-loading': __webpack_require__(12),
	            'c-footer': __webpack_require__(16),
	            'c-header': __webpack_require__(20)
	        },
	        directives: {
	            'v-xmcs-bd-statistic': __webpack_require__(25)
	        },
	        ready:function(){
	
	        }
	    });
	
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ },

/***/ 26:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=xmcs_detail_entry.4090fb92.js.map