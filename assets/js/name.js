window.onload = function () {

    var tips = {
        yu: "你的审美已经无药可救！再见！",
        defult: "你的审美让人无语！",
        why: "你的审美赞赞赞！",
        gou: "世上第二好看！你的审美不错！"
    };
    var btnTxts = {
        defult: "回炉再造吧",
        die: "拼死往前一试！",
        why: "马上送福利！！"
    };
    var btnClasses = {
        defult: 'defult-btn',
        die: 'die-btn',
        why: "why-btn"
    };

    var $resultWrap =  $('.result-wrap');
    var $firstWrap =  $('.first-wrap');

    $('.name').click(function () {
        var $this = $(this);
        $this.addClass('selected');
    });

    $('.closed').click(function () {
        $('.selected').removeClass('selected');
        $firstWrap.show() && $resultWrap.hide() ;
        toBig();
    });

    function verify(){
        var $selected = $('.selected'),len=$selected.length, name='';
        for(var i=0; i<len; i++){
            name += $selected.eq(i).html();
        }
        if(!name) name = '没人';
        $('.best-name').html(name);
        var btnClass = btnClasses.defult,
            btnTxt = btnTxts.defult,
            tip = tips.defult;
        if(name == '韦红叶'){
            btnTxt = btnTxts.why;
            btnClass = btnClasses.why;
            tip = tips.why;
        }else if(name == '白熊头'){
            btnTxt = btnTxts.gou;
            btnClass = btnClasses.why;
            tip = tips.gou;
        }else if(name == '狗'){
            btnTxt = btnTxts.gou;
            btnClass = btnClasses.why;
            tip = tips.gou;
        }else if(name == '黑熊头'){
            btnClass = btnClasses.die;
            btnTxt = btnTxts.die;
            tip = tips.yu;
        }else if(name == '鱼'){
            btnClass = btnClasses.die;
            btnTxt = btnTxts.die;
            tip = tips.yu;
        }
        $resultWrap.find('.btn').unbind("click").removeClass().addClass('btn '+btnClass).html(btnTxt);
        $resultWrap.find('p').html(tip);

        $('.defult-btn').click(function(){
            $('.closed').click();
        });
        $('.why-btn').click(function(){
            window.location.href = 'photoalbum/demo1/index.html';
            //window.location.href = 'html/card/animation.html';
        });
        $('.die-btn').click(function(){
            window.location.href = 'html/cure.html';
        });
    }

    //扇形效果
    var btn = document.getElementById('btn');
    var imgs = document.querySelectorAll('.name');
    var imgsLen = imgs.length;
    var canClicked = true;

    btn.onclick = function () {
        if (!canClicked)return;
        canClicked = false;
        var endNum = 0;//运动完成的图片数量
        for (var i = 0; i < imgsLen; i++) {
            (function (i) {//函数声明的形式，便于传递和引用i
                setTimeout(function () {
                    montion(imgs[i], '10ms', function () {
                        //第一个运动：变小并消失
                        this.style.transform = 'scale(0)';
                    }, function () {//两条属性，所以transitionend会执行lenth*2次
                        //第二个运动：变大
                        montion(this, '1s', function () {
                            this.style.transform = 'scale(1)';
                            this.style.opacity = 0;
                        }, function () {
                            endNum++;
                            if (endNum == imgsLen) {//所有图片第二次运动完成
                                //toBig();
                                verify();
                                $resultWrap.show() && $firstWrap.hide() ;
                            }
                        });
                    });
                }, Math.random() * 1000);
            })(i);
        }
    };

    //第三次运动效果
    function toBig() {
        //坐标轴： x平行于地面，y垂直地面，z轴垂直屏幕
        for (var i = 0; i < imgsLen; i++) {
            var allNum = 0;
            imgs[i].style.transition = '';
            //想要一个物体有css3的一些变化，需要给初始值
            imgs[i].style.transform = 'rotateY(0) translateZ(-' + Math.random() * 500 + 'px)';
            (function (i) {
                setTimeout(function () {
                    montion(imgs[i], '2s', function () {
                        this.style.opacity = 1;
                        this.style.transform = 'rotateY(360deg) translateZ(0)';
                    }, function () {
                        allNum++;
                        if (allNum == imgsLen) {//所有图片运动完成
                            canClicked = true;
                            verify();
                        }
                    });
                }, Math.random() * 1000);
            })(i);
        }
    }

    //运动函数：运动的对象，运动的时间，运动的属性函数，运动完的callback
    function montion(obj, time, doFn, cb) {
        obj.style.transition = time;
        doFn.call(obj); //调用函数，并把this指向obj   //使montion()里的this都是指向obj
        var called = false;//解决transitionend调用2次的问题
        obj.addEventListener('transitionend', function () {
            if (!called) {
                cb && cb.call(obj);
                called = true;
            }
        }, false);
    }
    //验证审美观
};