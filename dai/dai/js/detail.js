$(function(){
    var listAll = [],
        newsId = parseInt(getQueryString('id'))-1;
    $.getJSON("M/NOmd5/news.json",function(data){
        $.extend(true, listAll, data);
        getList(listAll);
    });
    var $content = $('.content');
    function getList(listData){
        var newsContent = '',len = listData[newsId].content.length;
        for( var i= 0;i<len;i++){
            newsContent += '<p>'+ listData[newsId].content[i] +'</p>';
        }
        $('.name').text(listData[newsId].title);
        $('.time').text(listData[newsId].time);
        $('.auth').html('文章出处：'+listData[newsId].auth);
        $('.img-wrap img').attr('src','img/news-b'+(newsId+1)+'.jpg');
        $('.txt-content').html(newsContent);
    }
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return '';
    }
});