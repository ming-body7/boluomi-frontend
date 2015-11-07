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
				    'content' : '<div class="section sec1"><div class="edit_area"></div><div>'
				}];
	
	var	islider = new iSlider({
		type: 'dom',
	    data: data,
	    dom: document.getElementById("iSlider-wrapper"),
	    isVertical: true,
	    isLooping: true,
	    animateType: 'card'      //default, rotate, flip, depth, flow 和 card
	});
	//图片预加载
	var imgList = ['playingBg.png'];
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
				}
			}
			oImg.src = './img/' + ele;
		})
	};
})




    
