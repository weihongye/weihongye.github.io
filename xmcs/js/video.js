webpackJsonp([4],{

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {/**
	 * Created by yiwei on 16/7/12.
	 * @desc 自定义touch指令
	 *       解决滑动时触发 touch* 事件
	 */
	Vue.directive('touch', {
	    //指定一个特性列表，Vue 编译器将自动提取绑定元素的这些特性
	    params: ['touch'],
	
	    // 可以让自定义指令接受内联语句，这样就可以传入一个函数进行处理
	    acceptStatement: true,
	
	    //只调用一次，在指令第一次绑定到元素上时调用
	    bind: function () {},
	
	    //在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值
	    update: function (fn) {
	        // 钩子内 this 指向这个指令对象
	        var self = this;
	        self.touchObj = {};
	        if (typeof fn !== 'function') {
	            return console.error ('The param of directive "v-touch" must be a function!');
	        }
	        // 监听touchstart
	        self.el.addEventListener('touchstart', function (ev) {
	            if (self.modifiers.stop) { // 获取指定修饰符
	                ev.stopPropagation();
	            }
	            if (self.modifiers.prevent) { // 获取指定修饰符
	                ev.preventDefault();
	            }
	            self.touchstart(ev, self);
	        }, false);
	        // 监听touchend
	        self.el.addEventListener('touchmove', function (ev) {
	            self.touchmove(ev,self);
	        }, false);
	        // 监听touchend
	        self.el.addEventListener('touchend', function (ev) {
	            self.touchend(ev,self,fn);
	        }, false);
	
	        self.handler = function(ev, _fn) {
	            _fn.call(self,ev);
	        };
	    },
	
	    /**
	     * @desc 判断是否触发事件
	     * @returns {boolean}
	     */
	    isTap : function() {
	        var self = this;
	        if(self.el.disabled){
	            return false;
	        }
	        var touchObj = self.touchObj;
	        var params = self.params.touch;
	        return self.time < (params && params.intervals || 150) && Math.abs(touchObj.distanceX) < (params && params.distanceX || 2) && Math.abs(touchObj.distanceY) < (params && params.distanceY || 2);
	    },
	
	    /**
	     * @desc 监听touchstart
	     * @param ev 事件对象
	     * @param self 指令对象
	     */
	    touchstart: function (ev, self) {
	        var touch = ev.touches[0] || ev.changedTouches[0];
	        var touchObj = self.touchObj;
	        touchObj.startX = touch.pageX;
	        touchObj.startY = touch.pageY;
	        touchObj.transX = 0;
	        touchObj.transY = 0;
	    },
	    /**
	     * @method touch_move
	     * @param e
	     * @desc 触摸滑动方法
	     */
	    touchmove : function(e,self){
	        if(!event.touches.length) return;
	        var touchObj = self.touchObj;
	        var touch = event.touches[0];
	        touchObj.transX = touchObj.startX-touch.pageX;
	        touchObj.transY = touchObj.startY-touch.pageY;
	        //this._config.moving && this._config.moving(this.transX,this.transY);
	    },
	    /**
	     * @desc 监听touchend
	     * @param ev 事件对象
	     * @param self 指令对象
	     * @param fn 指令参数表达式
	     * @returns {number}
	     */
	    touchend : function(ev, self, fn) {
	        var touchObj = self.touchObj,
	            absX = Math.abs(touchObj.transX),
	            absY = Math.abs(touchObj.transY);
	        if(absX < 2 && absY < 2){
	            Vue.nextTick(function () {
	                self.handler(ev, fn);
	            });
	        }
	
	    },
	
	    //只调用一次，在指令从元素上解绑时调用
	    unbind: function () {}
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, $) {/**
	 * Created by zhangxinxin5 on 16/10/31.
	 */
	__webpack_require__(41);
	(function () {
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            loadFlag :true,
	            moduleFlag:{
	                actFlag: false,//活动模块flag
	                ggFlag: false,//公告模块flag
	                tjFlag: true  //推荐模块flag
	            }
	        },
	        methods: {
	            playVideo:function(e){
	                var $this = $(e.target),
	                    src = $this.attr('data-vid');
	                console.log(src);
	                if(!src){
	                    alert('不存在播放地址哦');
	                    return;
	                }
	                $('#video-player').attr('src',src);
	                $('#video-player')[0].play();
	                $('#video_wrapper').show();
	            },
	            jumpUrl:function(e){
	                var $this = $(e.target),
	                    href = $this.attr('data-href');
	                if(href)window.location.href = href;
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
	            'v-touch': __webpack_require__(46),
	            'v-xmcs-bd-statistic': __webpack_require__(25)
	        },
	        ready:function(){
	
	        }
	    });
	    $('#video_wrapper .close').on('touchend', function () {
	        $('.video-alert').hide();
	        $('#video-player')[0].pause();
	
	        $('.download').css('pointer-events', 'none');
	        setTimeout(function(){
	            $('.download').css('pointer-events', 'auto');
	        }, 400);
	    });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ },

/***/ 41:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=xmcs_video_entry.7db909f9.js.map