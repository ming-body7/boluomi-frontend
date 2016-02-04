//设置页面固定显示宽度320;
setDeviceW();
function setDeviceW(){
	var w = $(window);
	var h = w.height();
	var g = w.width();
	var e , d;
	if(g / h >= 320 / 486 ){
		f = h / 486;
		d = (g / f - 320) / 2;
	}else{
		f = g / 320;
		e = (h / f - 486) / 2;
	}
	$("#eqMobileViewport").attr("content", "width=320, initial-scale=" + f + ", maximum-scale=" + f + ", user-scalable=no");
	e && $(".edit_area").css({marginTop: e});
	d && $(".edit_area").css({marginLeft: d});
};		

$(function(){
	var data = [{
				    'content' : '<div class="section sec1"><div class="edit_area"><img class="pic1" src="img/sec1Pic1.jpg" alt="" data-ani="slideInDown"/><img class="text1"  src="img/sec1Text.png" alt="" data-ani="slideInUp"/></div><div>'
				},{
				    'content' : '<div class="section sec2"><div class="edit_area"><img class="pic1" src="img/sec2Pic1.jpg" alt="" data-ani="zoomInDown" /><img class="text1" src="img/sec2Text.png" alt="" data-ani="fadeIn"/></div><div>'
				},{
				    'content' : '<div class="section sec3"><div class="edit_area"><img class="pic1" src="img/sec3Pic1.jpg" alt="" data-ani="bounceInLeft" /><img class="pic2" src="img/sec3Pic2.jpg" data-ani="bounceInRight" alt="" /><img class="text1" src="img/sec3Text.png" alt="" data-ani="fadeIn"/></div><div>'
				},{
				    'content' : '<div class="section sec4"><div class="edit_area"><img class="pic1" src="img/sec4Pic1.jpg" alt="" data-ani="fadeIn"/><img class="text1" src="img/sec4Text.png" alt="" data-ani="bounceInDown"/></div><div>'
				},{
				    'content' : '<div class="section sec5"><div class="edit_area"><img class="pic1" src="img/sec5Pic1.jpg" alt="" data-ani="slideInLeft"/><img class="pic2" src="img/sec5Pic2.jpg" alt="" data-ani="slideInRight"/><img class="text1" src="img/sec5Text.png" alt=""  data-ani="fadeIn"/></div><div>'
				},{
				    'content' : '<div class="section sec6"><div class="edit_area"><img class="pic1" src="img/sec6Pic1.jpg" alt="" data-ani="fadeInUp"/><img class="text1" src="img/sec6Text.png" alt="" data-ani="fadeInDown"/></div><div>'
				},{
				    'content' : '<div class="section sec7"><div class="edit_area"><img class="pic1" src="img/sec7Pic1.jpg" alt="" data-ani="fadeInLeft"/><img class="pic2" src="img/sec7Pic2.jpg" alt="" data-ani="rotateInDownRight"/><img class="pic3" src="img/sec7Pic3.jpg" alt="" data-ani="rotateInUpLeft"/><img class="text1" src="img/sec7Text.png" alt="" data-ani="flipInX"/></div><div>'
				},{
				    'content' : '<div class="section sec8"><div class="edit_area"><a class="logoWrap" href="http://192.168.1.144/album1/infoC.html"><img class="logo" src="img/logo.png" alt="" /></a><a class="detailBtn" href="http://192.168.1.144/album1/infoC.html">查看详情</a><i class="moonBg"></i><h2><em>该商家的其他作品</em></h2><ul><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic1.png" alt="" /></a></li><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic2.png" alt="" /></a></li><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic3.png" alt="" /></a></li><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic4.png" alt="" /></a></li><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic5.png" alt="" /></a></li><li data-ani="bounceIn"><a href="http://192.168.1.144/album1/infoB.html"><img src="img/listPic6.png" alt="" /></a></li></ul><p class="copyRight"><a href="http://192.168.1.144/album1/infoA.html"></a></p></div><div>'
				}];
	
	var	islider = new iSlider({
		type: 'dom',
	    data: data,
	    dom: document.getElementById("iSlider-wrapper"),
	    isVertical: true,
	    isLooping: true,
	    animateType: 'card',      //default, rotate, flip, depth, flow 和 card
	    onslidechange: function(idx) {
	    	idx = idx+1;
	    	switch(idx){
	    		case 1:
	    			show('.sec1');
	    			hide('.sec2');
	    			liBounceInHide('.sec8');
	    		break;
	    		case 2:
	    			show('.sec2');
	    			hide('.sec1');
	    			hide('.sec3');
	    		break;
	    		case 3:
	    			show('.sec3');
	    			hide('.sec1');
	    			hide('.sec2');
	    			hide('.sec4');
	    		break;
	    		case 4:
	    			show('.sec4');
	    			hide('.sec3');
	    			hide('.sec5');
	    		break;
	    		case 5:
	    			show('.sec5');
	    			hide('.sec4');
	    			hide('.sec6');
	    		break;
	    		case 6:
	    			show('.sec6');
	    			hide('.sec5');
	    			hide('.sec7');
	    		break;
	    		case 7:
	    			show('.sec7');
	    			hide('.sec6');
	    			liBounceInHide('.sec8');
	    		break;
	    		case 8:
	    			liBounceInShow('.sec8');
	    			hide('.sec7');
	    			hide('.sec1');
	    		break;
	    	}
	    }
	});
	function show(sec){
		var child = $(sec).find('.edit_area').children();
		$.each(child,function(){
			$(this).addClass( $(this).attr('data-ani') );
		});
	};
	function hide(sec){
		var child = $(sec).find('.edit_area').children();
		$.each(child,function(){
			$(this).removeClass( $(this).attr('data-ani') );
		})
	};

	//音乐播放控制
	var audio = document.getElementById('audio');
	var audio_btn = document.getElementById('audio_btn');
	audio_btn.addEventListener('touchstart', function() {

		if (audio.paused) {
			audio.play();
			audio_btn.className = 'audio-on';
		} else {
			audio.pause();
			audio_btn.className = 'audio-off';
		}

	}, false);

	//无法自动播放音乐情况下通过触发document事件来触发
	document.addEventListener('touchstart', handFn, false);
	function handFn(){
		audio.play();
		audio_btn.className = 'audio-on';
		document.removeEventListener('touchstart',handFn,false);
	};


	//图片预加载
	var imgList = ['albumBg.png','sec1Pic1.jpg','sec1Text.png','sec2Pic1.jpg','sec2Text.png','sec3Pic1.jpg','sec3Pic2.jpg','sec3Text.png','sec4Pic1.jpg','sec4Text.png','sec5Pic1.jpg','sec5Pic2.jpg','sec5Text.png','sec6Pic1.jpg','sec6Text.png','sec7Pic1.jpg','sec7Pic2.jpg','sec7Pic3.jpg','sec7Text.png','logo.png','listPic1.png','listPic2.png','listPic3.png','listPic4.png','listPic5.png','listPic6.png','light.png','btn_arrow.png','music-icon.png','loading.gif','cotyRight.png','indexIcon.png','musicIcon.png','Sublogo.png','playingBg.png','workingIcon.png','cover.png'];
	loadImg(imgList);
	function loadImg(list){
		var num = list.length;
		var iNow = 0;
		$.each(list,function(idx,ele){
			var oImg = new Image();
			oImg.onload = function(){
				iNow++;
				if(iNow == num){
					$('.loading').remove();
					show('.sec1');
				}
			}
			oImg.src = './img/' + ele;
		})
	};

	//飞图片
	function touchImg(){
		var stage = $('.stage');
		var startDot = null;
		var moveDot = null;
		var stageLeft = stage.position().left;
		var bOff = true;

		stage.on('touchstart',function(e){
			startDot = e.originalEvent.changedTouches[0].pageX - stageLeft;

			stage.on('touchmove',function(e){
				moveDot = e.originalEvent.changedTouches[0].pageX - stageLeft;
	
				if(moveDot - startDot > 30){//右划
					if(bOff){
						flyTo('flyRight');
					}
				}else if(moveDot - startDot < -30){//左划
					if(bOff){
						flyTo('flyLeft');
					}
				}
			})
		})

		function flyTo(dirFly){
			bOff = false;
			var first = stage.find('i').eq(0);
			first.addClass(dirFly);

			first.on('webkitTransitionEnd',function(){
				first.removeClass(dirFly).appendTo(stage);
				bOff = true;
				first.off('webkitTransitionEnd');
			})
		}
	}

	function liBounceInShow(sec){
		var sec = $(sec);
		var aniName = sec.find('li').eq(0).attr('data-ani');
		
		sec.find('li').each(function(){
			$(this).addClass(aniName);
		})
	}
	function liBounceInHide(sec){
		var sec = $(sec);
		var aniName = sec.find('li').eq(0).attr('data-ani');
		
		sec.find('li').each(function(){
			$(this).removeClass(aniName);
		})	
	}
})




    
