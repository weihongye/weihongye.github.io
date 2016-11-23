webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, $) {/**
	 * Created by zhangxinxin5 on 16/10/10.
	 */
	__webpack_require__(8);
	(function () {
	    var _tab =mi.util.getQueryVal('tab')||'tj';
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            loadFlag :true,
	            moduleFlag:{
	                actFlag: _tab=='hd'?true:false,//活动模块flag
	                ggFlag:  _tab=='gg'?true:false,//公告模块flag
	                tjFlag:  _tab=='tj'?true:false  //推荐模块flag
	            }
	        },
	        methods: {
	            jumpUrl:function(e){
	                var $this = $(e.target),
	                    href = $this.attr('data-href');
	                if(href)window.location.href = href;
					document.getElementsByClassName()
	            },
	            changeTab:function(e){
	                var $this = $(e.target);
	                if($this.hasClass('active'))return;
	                //$this.addClass('active').siblings().removeClass('active activeprev')&&$this.prev().addClass('activeprev');
	                this.moduleFlag.actFlag = false;
	                this.moduleFlag.ggFlag = false;
	                this.moduleFlag.tjFlag = false;
	                this.moduleFlag[$this.attr('data-module')+'Flag'] = true;
	            },
	            openWxMask:function(){
	                $('.container').css('overflow-y','hidden');
	                $('.weixin-mask').show();
	            },
	            hideMask:function(){
	                $('.weixin-mask').hide();
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

/***/ 8:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=xmcs_act_entry.01bc2561.js.map