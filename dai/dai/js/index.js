/**
 * Created by hongye on 2017/1/23.
 */
$(window).bind("load", function () {
    var timeout = setTimeout(function () {
        $('.lazy').trigger("loadImg");
    }, 50);
});
$(function () {
    $('.lazy').lazyload({
        event: "loadImg",
        skip_invisible: false
    });
    var $header = $('.header');
    if ($(window).scrollTop() > 470) {
        $header.css('background','#c7010b');
    } else {
        $header.css('background','none');
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 470) {
            $header.css('background','#c7010b');
        } else {
            $header.css('background','none');
        }
    });
    //五张图的3d切换
    new rotate("pics_box");
});