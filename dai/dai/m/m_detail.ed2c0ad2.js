webpackJsonp([2],{13:function(a,n,e){a.exports={replace:!0,template:e(14),methods:{}}},14:function(a,n){a.exports='<div class="footer-wrap clear"> <div class=footer-fl> <ul class=clear> <li><a href=index.html>首页</a></li> <li><a href=cn.html>超能模式</a></li> <li><a href=contact.html>联系我们</a></li> </ul> </div> <div class=footer-fr> <div class="phone-wrap center_y"></div> </div> </div>'},0:function(a,n,e){(function(a,n){e(21),function(){function t(a){var n=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(n);return null!=e?e[2]:""}var o=[],c=parseInt(t("id"))-1;a.ajax({type:"GET",url:"noMD5/news.json",data:{},dataType:"json",timeout:2e3,success:function(a,n,e){i.newsData=a[c]},error:function(a,n,e){}}),a(".img-wrap img").attr("src","noMD5/news-b"+(c+1)+".jpg");var i=new n({el:"#main",data:{newsData:o},components:{"c-footer":e(13),"c-header":e(15)},ready:function(){}})}()}).call(n,e(16),e(1))},21:function(a,n){}});