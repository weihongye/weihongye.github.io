$(function(){
    var listAll = [];
    $.getJSON("js/news.json",function(data){
        $.extend(true, listAll, data);
        getList(listAll);
    });
    var $newsUl = $('.news-ul');
    function getList(listData){
        var liHtml='',len=listData.length;
        for(var i=0;i<len;i++){
            var liClass = '';
            if(i%2) liClass = 'even';
            liHtml += '<li class="'+ liClass+'"> ' +
                '<a href="detail.html?id='+ listData[i].id +'"> ' +
                '<div class="item-top"> ' +
                '<img src="img/news-s'+ listData[i].id +'.jpg"/> ' +
                '<div class="item-wrap"> ' +
                '<p class="title">'+ listData[i].title +'</p> ' +
                '<p class="desc">'+ listData[i].desc +'</p> ' +
                '</div> ' +
                '</div> ' +
                '<div class="item-bottom"> ' +
                '<div class="time">'+ listData[i].time +'</div> ' +
                '<div class="more">查看更多>></div> ' +
                '</div> ' +
                '</a> ' +
                '</li>';
        }
        $newsUl.html(liHtml);
    }
});