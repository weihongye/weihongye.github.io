(function () {

	swipeImg();

	function swipeImg(){
		var $screenshots = $('#screenshots');
		var mySwipe = Swipe($screenshots[0], {
			//startSlide: 0,
			speed: 400,
			auto: 3000,
			continuous: true,
			stopPropagation: true,
			callback: function(index, elem) {
				slideTab(index);
			},
			transitionEnd: function(index, elem) {}
		});
		//点击数字跳转到相应的面板
		var bullets = $('.shots-tool .btn').find('li');
		for (var i=0; i < bullets.length; i++) {
			var elem = bullets[i];
			elem.setAttribute('data-tab', i);
			elem.onclick = function(){
				mySwipe.slide(parseInt(this.getAttribute('data-tab'), 10), 500);
			}
		}
		//点击数字导航
		function slideTab(index){
			var i = bullets.length, len = i;
			while (i--) {
				bullets[i].className = bullets[i].className.replace('on',' ');
			}
			try{
				bullets[index].className = 'on';
			}catch (ex){
				bullets[index-len].className = 'on';
			}
		}
		setTimeout(function () {
			$screenshots.find('li').removeClass('hidden');
		}, 1000);
	}

})();
function changeCode(e){
	var $this = $(e.currentTarget),
		index = $this.index();
	if($this.hasClass('active'))return;
	$this.addClass('active').siblings().removeClass('active');
	$('.code-wrap').find('.code').eq(index).show().siblings().hide();
}