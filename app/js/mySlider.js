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

	//data数据填充
	var data = [];
	//单张图片数据填充
	var serImg = ['1.jpg','2.jpg','3.jpg','4.jpg'];
	var brandImgNum = serImg.length;
	for(var i=0;i<serImg.length;i++){
		data.push({
			'content' : '<div class="section sec" style="background-image:url(images/'+ serImg[i] +');"><div>'
		})
	};
	//商家logo填充
	var logoImg = 'logo.png';
	var logoHtml = '<a class="logoWrap" href="infoC.html"><img class="logo" src="img/'+ logoImg +'" alt=""></a>';

	//商家列表图片填充
	var brandImg = ['listPic1.png','listPic2.png','listPic3.png','listPic4.png','listPic5.png','listPic6.png'];
	liHtml = '';
	for(var i=0;i<brandImg.length;i++){
		liHtml += '<li data-ani="bounceIn"><a href="infoB.html"><img src="img/'+ brandImg[i] +'" alt="" /></a></li>';
	};
	var brandHand = '<div class="section brandSec"><div class="edit_area">'+ logoHtml +'<a class="detailBtn" href="infoC.html">查看详情</a><i class="moonBg"></i><h2><em>该商家的其他作品</em></h2><ul>';
	var brandFoot = '</ul><p class="copyRight"><a href="infoA.html"></a></p></div><div>';
	var brandHtml = brandHand + liHtml + brandFoot;
	data.push({
		'content' : brandHtml
	});
	
	var	islider = new iSlider({
		type: 'dom',
	    data: data,
	    dom: document.getElementById("iSlider-wrapper"),
	    isVertical: true,
	    isLooping: true,
	    animateType: 'card',      //default, rotate, flip, depth, flow 和 card
	    onslidechange: function(idx) {
	    	idx = idx+1;
	    	if(idx == 1){
	    		liBounceInHide('.brandSec');
	    	}else if(idx == (brandImgNum+1)){
	    		liBounceInShow('.brandSec');
	    	}else if(idx == brandImgNum){
	    		liBounceInHide('.brandSec');
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
	var imgList = ['albumBg.png','light.png','btn_arrow.png','music-icon.png','loading.gif','copyRight.png','indexIcon.png','musicIcon.png','Sublogo.png','playingBg.png','workingIcon.png','cover.png'];
	//所有图片合并
	$.merge( $.merge(imgList,serImg,brandImg), brandImg);

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


	//划页
	var iNow = 0;
	//下一页
	$('#next_btn').on('click',next_btn_click);
	function next_btn_click(){
		iNow ++;
		if(iNow == brandImgNum+2){
			iNow = 1;
		}
		islider.slideTo(iNow);
	}

	//上一页
	$('#prev_btn').on('click',prev_btn_click);
	function prev_btn_click(){
		iNow --;
		if(iNow == -(brandImgNum+1)){
			iNow = 0;
		}
		console.log(iNow)
		islider.slideTo(iNow);
	}
});











    
