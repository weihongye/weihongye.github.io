if (/nokia|iphone|android|ipad|ipod|windows phone/i.test(navigator.userAgent)) {
    var strUrl = window.location.href,
        arrUrl = strUrl.split("/"),
        strPage = arrUrl[arrUrl.length - 1];
    window.location.href = "m/"+strPage + window.location.search;
}