webpackJsonp([3],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*!
	 * An jQuery | zepto plugin for lazy loading images.
	 * author -> jieyou
	 * see https://github.com/jieyou/lazyload
	 * use some tuupola's code https://github.com/tuupola/jquery_lazyload (BSD)
	 * use component's throttle https://github.com/component/throttle (MIT)
	 */
	;(function(factory){
	    //if(typeof define === 'function' && define.amd){ // AMD
	        // you may need to change `define([------>'jquery'<------], factory)` 
	        // if you use zepto, change it rely name, such as `define(['zepto'], factory)`
	        //define(['jquery'], factory)
	         //define([Zepto], factory(Zepto))
	    //}else{ // Global
	        factory($);
	    //}
	})(function($,undefined){
	    var w = window,
	        $window = $(w),
	        defaultOptions = {
	            threshold                   : 0,
	            failure_limit               : 0,
	            event                       : 'scroll',
	            effect                      : 'show',
	            effect_params               : null,
	            container                   : w,
	            data_attribute              : 'original',
	            data_srcset_attribute       : 'original-srcset',
	            skip_invisible              : true,
	            appear                      : emptyFn,
	            load                        : emptyFn,
	            vertical_only               : false,
	            check_appear_throttle_time  : 300,
	            url_rewriter_fn             : emptyFn,
	            no_fake_img_loader          : false,
	            placeholder_data_img        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
	            // for IE6\7 that does not support data image
	            placeholder_real_img        : 'http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png'
	            // todo : 将某些属性用global来配置，而不是每次在$(selector).lazyload({})内配置
	        },
	        type // function
	
	    function emptyFn(){}
	
	    type = (function(){
	        var object_prototype_toString = Object.prototype.toString
	        return function(obj){
	            // todo: compare the speeds of replace string twice or replace a regExp
	            return object_prototype_toString.call(obj).replace('[object ','').replace(']','')
	        }
	    })()
	
	    function belowthefold($element, options){
	        var fold
	        if(options._$container == $window){
	            fold = ('innerHeight' in w ? w.innerHeight : $window.height()) + $window.scrollTop()
	        }else{
	            fold = options._$container.offset().top + options._$container.height()
	        }
	        return fold <= $element.offset().top - options.threshold
	    }
	
	    function rightoffold($element, options){
	        var fold
	        if(options._$container == $window){
	            // Zepto do not support `$window.scrollLeft()` yet.
	            fold = $window.width() + ($.fn.scrollLeft?$window.scrollLeft():w.pageXOffset)
	        }else{
	            fold = options._$container.offset().left + options._$container.width()
	        }
	        return fold <= $element.offset().left - options.threshold
	    }
	
	    function abovethetop($element, options){
	        var fold
	        if(options._$container == $window){
	            fold = $window.scrollTop()
	        }else{
	            fold = options._$container.offset().top
	        }
	        // console.log('abovethetop fold '+ fold)
	        // console.log('abovethetop $element.height() '+ $element.height())
	        return fold >= $element.offset().top + options.threshold  + $element.height()
	    }
	
	    function leftofbegin($element, options){
	        var fold
	        if(options._$container == $window){
	            // Zepto do not support `$window.scrollLeft()` yet.
	            fold = $.fn.scrollLeft?$window.scrollLeft():w.pageXOffset
	        }else{
	            fold = options._$container.offset().left
	        }
	        return fold >= $element.offset().left + options.threshold + $element.width()
	    }
	
	    function checkAppear($elements, options){
	        var counter = 0
	        $elements.each(function(i,e){
	            var $element = $elements.eq(i)
	            if(($element.width() <= 0 && $element.height() <= 0) || $element.css('display') === 'none'){
	                return
	            }
	            function appear(){
	                $element.trigger('_lazyload_appear')
	                // if we found an image we'll load, reset the counter 
	                counter = 0
	            }
	            // If vertical_only is set to true, only check the vertical to decide appear or not
	            // In most situations, page can only scroll vertically, set vertical_only to true will improve performance
	            if(options.vertical_only){
	                if(abovethetop($element, options)){
	                    // Nothing. 
	                }else if(!belowthefold($element, options)){
	                    appear()
	                }else{
	                    if(++counter > options.failure_limit){
	                        return false
	                    }
	                }
	            }else{
	                if(abovethetop($element, options) || leftofbegin($element, options)){
	                    // Nothing. 
	                }else if(!belowthefold($element, options) && !rightoffold($element, options)){
	                    appear()
	                }else{
	                    if(++counter > options.failure_limit){
	                        return false
	                    }
	                }
	            }
	        })
	    }
	
	    // Remove image from array so it is not looped next time. 
	    function getUnloadElements($elements){
	        return $elements.filter(function(i,e){
	            return !$elements.eq(i)._lazyload_loadStarted
	        })
	    }
	
	    // throttle : https://github.com/component/throttle , MIT License
	    function throttle (func, wait) {
	        var ctx, args, rtn, timeoutID // caching
	        var last = 0
	
	        return function throttled () {
	            ctx = this
	            args = arguments
	            var delta = new Date() - last
	            if (!timeoutID)
	                if (delta >= wait) call()
	                else timeoutID = setTimeout(call, wait - delta)
	            return rtn
	        }
	
	        function call () {
	            timeoutID = 0
	            last = +new Date()
	            rtn = func.apply(ctx, args)
	            ctx = null
	            args = null
	        }
	    }
	
	    if(!$.fn.hasOwnProperty('lazyload')){
	
	        $.fn.lazyload = function(options){
	            var $elements = this,
	                isScrollEvent,
	                isScrollTypeEvent,
	                throttleCheckAppear
	
	            if(!$.isPlainObject(options)){
	                options = {}
	            }
	
	            $.each(defaultOptions,function(k,v){
	                if($.inArray(k,['threshold','failure_limit','check_appear_throttle_time']) != -1){ // these params can be a string
	                    if(type(options[k]) == 'String'){
	                        options[k] = parseInt(options[k],10)
	                    }else{
	                        options[k] = v
	                    }
	                }else if(k == 'container'){ // options.container can be a seletor string \ dom \ jQuery object
	                    if(options.hasOwnProperty(k)){
	                        if(options[k] == w || options[k] == document){
	                            options._$container = $window
	                        }else{
	                            options._$container = $(options[k])
	                        }
	                    }else{
	                        options._$container = $window
	                    }
	                    delete options.container
	                }else if(defaultOptions.hasOwnProperty(k) && (!options.hasOwnProperty(k) || (type(options[k]) != type(defaultOptions[k])))){
	                    options[k] = v
	                }
	            })
	
	            isScrollEvent = options.event == 'scroll'
	            throttleCheckAppear = options.check_appear_throttle_time == 0?
	                checkAppear
	                :throttle(checkAppear,options.check_appear_throttle_time)
	
	            // isScrollTypeEvent cantains custom scrollEvent . Such as 'scrollstart' & 'scrollstop'
	            // https://github.com/search?utf8=%E2%9C%93&q=scrollstart
	            isScrollTypeEvent = isScrollEvent || options.event == 'scrollstart' || options.event == 'scrollstop'
	
	            $elements.each(function(i,e){
	                var element = this,
	                    $element = $elements.eq(i),
	                    placeholderSrc = $element.attr('src'),
	                    originalSrcInAttr = $element.attr('data-'+options.data_attribute), // `data-original` attribute value
	                    originalSrc = options.url_rewriter_fn == emptyFn?
	                        originalSrcInAttr:
	                        options.url_rewriter_fn.call(element,$element,originalSrcInAttr),
	                    originalSrcset = $element.attr('data-'+options.data_srcset_attribute),
	                    isImg = $element.is('img')
	
	                if($element._lazyload_loadStarted == true || placeholderSrc == originalSrc){
	                    $element._lazyload_loadStarted = true
	                    $elements = getUnloadElements($elements)
	                    return
	                }
	
	                $element._lazyload_loadStarted = false
	
	                // If element is an img and no src attribute given, use placeholder. 
	                if(isImg && !placeholderSrc){
	                    // For browsers that do not support data image.
	                    $element.one('error',function(){ // `on` -> `one` : IE6 triggered twice error event sometimes
	                        $element.attr('src',options.placeholder_real_img)
	                    }).attr('src',options.placeholder_data_img)
	                }
	
	                // When appear is triggered load original image. 
	                $element.one('_lazyload_appear',function(){
	                    var effectParamsIsArray = $.isArray(options.effect_params),
	                        effectIsNotImmediacyShow
	                    function loadFunc(){
	                        // In most situations, the effect is immediacy show, at this time there is no need to hide element first
	                        // Hide this element may cause css reflow, call it as less as possible
	                        if(effectIsNotImmediacyShow){
	                            // todo: opacity:0 for fadeIn effect
	                            $element.hide()
	                        }
	                        if(isImg){
	                            // attr srcset first
	                            if(originalSrcset){
	                                $element.attr('srcset', originalSrcset)
	                            }
	                            if(originalSrc){
	                                $element.attr('src', originalSrc)
	                            }
	                        }else{
	                            $element.css('background-image','url("' + originalSrc + '")')
	                        }
	                        if(effectIsNotImmediacyShow){
	                            $element[options.effect].apply($element,effectParamsIsArray?options.effect_params:[])
	                        }
	                        $elements = getUnloadElements($elements)
	                    }
	                    if(!$element._lazyload_loadStarted){
	                        effectIsNotImmediacyShow = (options.effect != 'show' && $.fn[options.effect] && (!options.effect_params || (effectParamsIsArray && options.effect_params.length == 0)))
	                        if(options.appear != emptyFn){
	                            options.appear.call(element, $element, $elements.length, options)
	                        }
	                        $element._lazyload_loadStarted = true
	                        if(options.no_fake_img_loader || originalSrcset){
	                            if(options.load != emptyFn){
	                                $element.one('load',function(){
	                                    options.load.call(element, $element, $elements.length, options)
	                                })
	                            }
	                            loadFunc()
	                        }else{
	                            $('<img />').one('load', function(){ // `on` -> `one` : IE6 triggered twice load event sometimes
	                                loadFunc()
	                                if(options.load != emptyFn){
	                                    options.load.call(element, $element, $elements.length, options)
	                                }
	                            }).attr('src',originalSrc)
	                        }
	                    }
	                })
	
	                // When wanted event is triggered load original image 
	                // by triggering appear.                              
	                if (!isScrollTypeEvent){
	                    $element.on(options.event, function(){
	                        if (!$element._lazyload_loadStarted){
	                            $element.trigger('_lazyload_appear')
	                        }
	                    })
	                }
	            })
	
	            // Fire one scroll event per scroll. Not one scroll event per image. 
	            if(isScrollTypeEvent){
	                options._$container.on(options.event, function(){
	                    throttleCheckAppear($elements, options)
	                })
	            }
	
	            // Check if something appears when window is resized. 
	            // Force initial check if images should appear when window is onload. 
	            $window.on('resize load', function(){
	                throttleCheckAppear($elements, options)
	            })
	
	            // Force initial check if images should appear. 
	            $(function(){
	                throttleCheckAppear($elements, options)
	            })
	
	            return this
	        }
	    }
	})
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },

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

	/* WEBPACK VAR INJECTION */(function(Vue, $) {__webpack_require__(23);
	const Swipe = __webpack_require__(27);
	__webpack_require__(28);
	(function () {
	    var vm = new Vue({
	        el: '#main',
	        data: {
	            loadFlag: true
	        },
	        methods: {},
	        events: {
	            swipeImg: function () {
	                var $screenshots = $('#shots');
	                var mySwipe = Swipe($screenshots[0], {
	                    speed: 400,
	                    auto: 3000,
	                    continuous: true,
	                    stopPropagation: true,
	                    callback: function (index, elem) {
	                        slideTab(index);
	                        changeDecs(index);
	                    },
	                    transitionEnd: function (index, elem) {
	                    }
	                });
	                //点击数字跳转到相应的面板
	                var bullets = $('.shots-tool .btn').find('li');
	                for (var i = 0; i < bullets.length; i++) {
	                    var elem = bullets[i];
	                    elem.setAttribute('data-tab', i);
	                    elem.onclick = function () {
	                        mySwipe.slide(parseInt(this.getAttribute('data-tab'), 10), 500);
	                    }
	                }
	                //数字导航on
	                function slideTab(index) {
	                    var i = bullets.length, len = i;
	                    while (i--) {
	                        bullets[i].className = bullets[i].className.replace('on', ' ');
	                    }
	                    try {
	                        bullets[index].className = 'on';
	                    } catch (ex) {
	                        bullets[index - len].className = 'on';
	                    }
	                }
	
	                setTimeout(function () {
	                    $screenshots.find('li').removeClass('hidden');
	                }, 1000);
	                var $decs = $('.shots-desc ul').find('li');
	
	                function changeDecs(index) {
	                    $decs.eq(index).addClass('on').siblings().removeClass('on');
	                }
	            }
	        },
	        components: {
	            'c-footer': __webpack_require__(13),
	            'c-header': __webpack_require__(15)
	        },
	        directives: {},
	        ready: function () {
	        }
	    });
	    vm.$emit('swipeImg');
	
	    $('.lazy').lazyload({
	        event: "loadImg",
	        skip_invisible: false
	    });
	})();
	$(window).bind("load", function () {
	    var timeout = setTimeout(function () {
	        $('.lazy').trigger("loadImg");
	    }, 50);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(16)))

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function Swipe(container, options) {
	
	    "use strict";
	
	    // utilities
	    var noop = function () {
	    }; // simple no operation function
	    var offloadFn = function (fn) {
	        setTimeout(fn || noop, 0)
	    }; // offload a functions execution
	
	    // check browser capabilities
	    var browser = {
	        addEventListener: !!window.addEventListener,
	        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
	        transitions: (function (temp) {
	            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
	            for (var i in props) if (temp.style[props[i]] !== undefined) return true;
	            return false;
	        })(document.createElement('swipe'))
	    };
	
	    // quit if no root element
	    if (!container) return;
	    var element = container.children[0];
	    var slides, slidePos, width, length;
	    options = options || {};
	    var index = parseInt(options.startSlide, 10) || 0;
	    var speed = options.speed || 300;
	    options.continuous = options.continuous !== undefined ? options.continuous : true;
	
	    function setup() {
	
	        // cache slides
	        slides = element.children;
	        length = slides.length;
	
	        // set continuous to false if only one slide
	        if (slides.length < 2) options.continuous = false;
	
	        //special case if two slides
	        if (browser.transitions && options.continuous && slides.length < 3) {
	            element.appendChild(slides[0].cloneNode(true));
	            element.appendChild(element.children[1].cloneNode(true));
	            slides = element.children;
	        }
	
	        // create an array to store current positions of each slide
	        slidePos = new Array(slides.length);
	
	        // determine width of each slide
	        width = container.getBoundingClientRect().width || container.offsetWidth;
	
	        element.style.width = (slides.length * width) + 'px';
	
	        // stack elements
	        var pos = slides.length;
	        while (pos--) {
	
	            var slide = slides[pos];
	
	            slide.style.width = width + 'px';
	            slide.setAttribute('data-index', pos);
	
	            if (browser.transitions) {
	                slide.style.left = (pos * -width) + 'px';
	                move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
	            }
	
	        }
	
	        // reposition elements before and after index
	        if (options.continuous && browser.transitions) {
	            move(circle(index - 1), -width, 0);
	            move(circle(index + 1), width, 0);
	        }
	
	        if (!browser.transitions) element.style.left = (index * -width) + 'px';
	
	        container.style.visibility = 'visible';
	
	    }
	
	    function prev() {
	
	        if (options.continuous) slide(index - 1);
	        else if (index) slide(index - 1);
	
	    }
	
	    function next() {
	
	        if (options.continuous) slide(index + 1);
	        else if (index < slides.length - 1) slide(index + 1);
	
	    }
	
	    function circle(index) {
	
	        // a simple positive modulo using slides.length
	        return (slides.length + (index % slides.length)) % slides.length;
	
	    }
	
	    function slide(to, slideSpeed) {
	
	        // do nothing if already on requested slide
	        if (index == to) return;
	
	        if (browser.transitions) {
	
	            var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward
	
	            // get the actual position of the slide
	            if (options.continuous) {
	                var natural_direction = direction;
	                direction = -slidePos[circle(to)] / width;
	
	                // if going forward but to < index, use to = slides.length + to
	                // if going backward but to > index, use to = -slides.length + to
	                if (direction !== natural_direction) to = -direction * slides.length + to;
	
	            }
	
	            var diff = Math.abs(index - to) - 1;
	
	            // move all the slides between index and to in the right direction
	            while (diff--) move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
	
	            to = circle(to);
	
	            move(index, width * direction, slideSpeed || speed);
	            move(to, 0, slideSpeed || speed);
	
	            if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
	
	        } else {
	
	            to = circle(to);
	            animate(index * -width, to * -width, slideSpeed || speed);
	            //no fallback for a circular continuous if the browser does not accept transitions
	        }
	
	        index = to;
	        offloadFn(options.callback && options.callback(index, slides[index]));
	    }
	
	    function move(index, dist, speed) {
	
	        translate(index, dist, speed);
	        slidePos[index] = dist;
	
	    }
	
	    function translate(index, dist, speed) {
	
	        var slide = slides[index];
	        var style = slide && slide.style;
	
	        if (!style) return;
	
	        style.webkitTransitionDuration =
	            style.MozTransitionDuration =
	                style.msTransitionDuration =
	                    style.OTransitionDuration =
	                        style.transitionDuration = speed + 'ms';
	
	        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
	        style.msTransform =
	            style.MozTransform =
	                style.OTransform = 'translateX(' + dist + 'px)';
	
	    }
	
	    function animate(from, to, speed) {
	
	        // if not an animation, just reposition
	        if (!speed) {
	
	            element.style.left = to + 'px';
	            return;
	
	        }
	
	        var start = +new Date;
	
	        var timer = setInterval(function () {
	
	            var timeElap = +new Date - start;
	
	            if (timeElap > speed) {
	
	                element.style.left = to + 'px';
	
	                if (delay) begin();
	
	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
	
	                clearInterval(timer);
	                return;
	
	            }
	
	            element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
	
	        }, 4);
	
	    }
	
	    // setup auto slideshow
	    var delay = options.auto || 0;
	    var interval;
	
	    function begin() {
	
	        interval = setTimeout(next, delay);
	
	    }
	
	    function stop() {
	
	        //delay = 0;
	        delay = options.auto > 0 ? options.auto : 0;
	        clearTimeout(interval);
	
	    }
	
	
	    // setup initial vars
	    var start = {};
	    var delta = {};
	    var isScrolling;
	
	    // setup event capturing
	    var events = {
	
	        handleEvent: function (event) {
	
	            switch (event.type) {
	                case 'touchstart':
	                    this.start(event);
	                    break;
	                case 'touchmove':
	                    this.move(event);
	                    break;
	                case 'touchend':
	                    offloadFn(this.end(event));
	                    break;
	                case 'webkitTransitionEnd':
	                case 'msTransitionEnd':
	                case 'oTransitionEnd':
	                case 'otransitionend':
	                case 'transitionend':
	                    offloadFn(this.transitionEnd(event));
	                    break;
	                case 'resize':
	                    offloadFn(setup);
	                    break;
	            }
	
	            if (options.stopPropagation) event.stopPropagation();
	
	        },
	        start: function (event) {
	
	            var touches = event.touches[0];
	
	            // measure start values
	            start = {
	
	                // get initial touch coords
	                x: touches.pageX,
	                y: touches.pageY,
	
	                // store time to determine touch duration
	                time: +new Date
	
	            };
	
	            // used for testing first move event
	            isScrolling = undefined;
	
	            // reset delta and end measurements
	            delta = {};
	
	            // attach touchmove and touchend listeners
	            element.addEventListener('touchmove', this, false);
	            element.addEventListener('touchend', this, false);
	
	        },
	        move: function (event) {
	
	            // ensure swiping with one touch and not pinching
	            if (event.touches.length > 1 || event.scale && event.scale !== 1) return
	
	            if (options.disableScroll) event.preventDefault();
	
	            var touches = event.touches[0];
	
	            // measure change in x and y
	            delta = {
	                x: touches.pageX - start.x,
	                y: touches.pageY - start.y
	            }
	
	            // determine if scrolling test has run - one time test
	            if (typeof isScrolling == 'undefined') {
	                isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
	            }
	
	            // if user is not trying to scroll vertically
	            if (!isScrolling) {
	
	                // prevent native scrolling
	                event.preventDefault();
	
	                // stop slideshow
	                stop();
	
	                // increase resistance if first or last slide
	                if (options.continuous) { // we don't add resistance at the end
	
	                    translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
	
	                } else {
	                    //去除首页向右或者末页向左滑动的回弹效果
	                    if (!index && delta.x > 0 || index == slides.length - 1 && delta.x < 0) {
	                        return;
	                    }
	
	                    delta.x =
	                        delta.x /
	                        ( (!index && delta.x > 0               // if first slide and sliding left
	                            || index == slides.length - 1        // or if last slide and sliding right
	                            && delta.x < 0                       // and if sliding at all
	                        ) ?
	                            ( Math.abs(delta.x) / width + 1 )      // determine resistance level
	                            : 1 );                                 // no resistance if false
	
	                    // translate 1:1
	                    translate(index - 1, delta.x + slidePos[index - 1], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(index + 1, delta.x + slidePos[index + 1], 0);
	                }
	
	            }
	
	        },
	        end: function (event) {
	
	            // measure duration
	            var duration = +new Date - start.time;
	
	            // determine if slide attempt triggers next/prev slide
	            var isValidSlide =
	                Number(duration) < 250               // if slide duration is less than 250ms
	                && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
	                || Math.abs(delta.x) > width / 2;      // or if slide amt is greater than half the width
	
	            // determine if slide attempt is past start and end
	            var isPastBounds =
	                !index && delta.x > 0                            // if first slide and slide amt is greater than 0
	                || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0
	
	            if (options.continuous) isPastBounds = false;
	
	            // determine direction of swipe (true:right, false:left)
	            var direction = delta.x < 0;
	
	            // if not scrolling vertically
	            if (!isScrolling) {
	
	                if (isValidSlide && !isPastBounds) {
	
	                    if (direction) {
	
	                        if (options.continuous) { // we need to get the next in this direction in place
	
	                            move(circle(index - 1), -width, 0);
	                            move(circle(index + 2), width, 0);
	
	                        } else {
	                            move(index - 1, -width, 0);
	                        }
	
	                        move(index, slidePos[index] - width, speed);
	                        move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
	                        index = circle(index + 1);
	
	                    } else {
	                        if (options.continuous) { // we need to get the next in this direction in place
	
	                            move(circle(index + 1), width, 0);
	                            move(circle(index - 2), -width, 0);
	
	                        } else {
	                            move(index + 1, width, 0);
	                        }
	
	                        move(index, slidePos[index] + width, speed);
	                        move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
	                        index = circle(index - 1);
	
	                    }
	
	                    options.callback && options.callback(index, slides[index]);
	
	                } else {
	
	                    if (options.continuous) {
	
	                        move(circle(index - 1), -width, speed);
	                        move(index, 0, speed);
	                        move(circle(index + 1), width, speed);
	
	                    } else {
	
	                        move(index - 1, -width, speed);
	                        move(index, 0, speed);
	                        move(index + 1, width, speed);
	                    }
	
	                }
	
	            }
	
	            // kill touchmove and touchend event listeners until touchstart called again
	            element.removeEventListener('touchmove', events, false)
	            element.removeEventListener('touchend', events, false)
	
	        },
	        transitionEnd: function (event) {
	
	            if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
	
	                if (delay) begin();
	
	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
	
	            }
	
	        }
	
	    }
	
	    // trigger setup
	    setup();
	
	    // start auto slideshow if applicable
	    if (delay) begin();
	
	
	    // add event listeners
	    if (browser.addEventListener) {
	
	        // set touchstart event on element
	        if (browser.touch) element.addEventListener('touchstart', events, false);
	
	        if (browser.transitions) {
	            element.addEventListener('webkitTransitionEnd', events, false);
	            element.addEventListener('msTransitionEnd', events, false);
	            element.addEventListener('oTransitionEnd', events, false);
	            element.addEventListener('otransitionend', events, false);
	            element.addEventListener('transitionend', events, false);
	        }
	
	        // set resize event on window
	        window.addEventListener('resize', events, false);
	
	    } else {
	
	        window.onresize = function () {
	            setup()
	        }; // to play nice with old IE
	
	    }
	
	    // expose the Swipe API
	    return {
	        setup: function () {
	
	            setup();
	
	        },
	        slide: function (to, speed) {
	
	            // cancel slideshow
	            stop();
	
	            slide(to, speed);
	
	        },
	        prev: function () {
	
	            // cancel slideshow
	            stop();
	
	            prev();
	
	        },
	        next: function () {
	
	            // cancel slideshow
	            stop();
	
	            next();
	
	        },
	        stop: function () {
	
	            // cancel slideshow
	            stop();
	
	        },
	        getPos: function () {
	
	            // return current index position
	            return index;
	
	        },
	        getNumSlides: function () {
	
	            // return total number of slides
	            return length;
	        },
	        kill: function () {
	
	            // cancel slideshow
	            stop();
	
	            // reset element
	            element.style.width = '';
	            element.style.left = '';
	
	            // reset slides
	            var pos = slides.length;
	            while (pos--) {
	
	                var slide = slides[pos];
	                slide.style.width = '';
	                slide.style.left = '';
	
	                if (browser.transitions) translate(pos, 0, 0);
	
	            }
	
	            // removed event listeners
	            if (browser.addEventListener) {
	
	                // remove current event listeners
	                element.removeEventListener('touchstart', events, false);
	                element.removeEventListener('webkitTransitionEnd', events, false);
	                element.removeEventListener('msTransitionEnd', events, false);
	                element.removeEventListener('oTransitionEnd', events, false);
	                element.removeEventListener('otransitionend', events, false);
	                element.removeEventListener('transitionend', events, false);
	                window.removeEventListener('resize', events, false);
	
	            }
	            else {
	
	                window.onresize = null;
	
	            }
	
	        }
	    }
	
	}
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        "use strict";
	        return function (ele, params) {
	            return new Swipe(ele, params);
	        }
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
	    (function ($) {
	        module.exports = function (ele, params) {
	            return new Swipe(ele, params);
	        }
	    })(window.jQuery || window.Zepto)
	} else {
	    if (window.jQuery || window.Zepto) {
	        (function ($) {
	            $.fn.Swipe = function (params) {
	                return this.each(function () {
	                    $(this).data('Swipe', new Swipe($(this)[0], params));
	                });
	            }
	        })(window.jQuery || window.Zepto)
	    }
	}


/***/ },

/***/ 23:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=dai_index.js.map