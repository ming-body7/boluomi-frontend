$(function(){
	var $obj = {
		bd : $('body'),
		win : $(window)
	};					

	var myEvent = {
		bind : function(){
			//显示地图
			$obj.bd.on('touchstart','.seeMap',handler.showMap);
			$obj.bd.on('touchstart','.seeMap2',handler.showMap);
		}
	};

	var handler = {
		showMap : function(){
			var _this = $(this);

			var x = _this.attr('data-position').split(',')[0];
			var y = _this.attr('data-position').split(',')[1];		

			var mapZ = $('<div id="allmap" class="allmap">map</div>');
			var closeBtn = $('<i class="closeBtn"></i>');

			mapZ.appendTo($obj.bd);
			closeBtn.appendTo($obj.bd);

			// 百度地图API功能
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(x,y);
			map.centerAndZoom(point,14);
			map.enableScrollWheelZoom(true);

			closeBtn.on('click',function(){
				$(this).remove();
				mapZ.remove();
			})
		}
		
	};
	//data数据填充
	var data = [];

	//商家logo填充
	var logoImg = 'logo_pic.png';
	var logoHtml = '<a class="logoWrap" href="infoC.html"><img class="logo" src="img/'+ logoImg +'" alt=""></a>';

	//商家名称
	var brandName = '聚焦摄影工作室';
	brandNameHtml = '<span class="brand_name">'+ brandName +'</span>'

	//商家地址
	var brandAddress = '北京市朝阳区海淀路小区2单元204';
	var brandAddressHtml = '<em class="brand_address">'+ brandAddress +'</em>';

	//商家类型
	var brand_type = '工作室';
	var brandHtml = '<i class="brand_type">'+ brand_type +'</i>';

	//商家列表图片填充
	var brandImg = ['listPic1.png','listPic2.png','listPic3.png','listPic4.png','listPic5.png','listPic6.png'];
	liHtml = '';
	for(var i=0;i<brandImg.length;i++){
		liHtml += '<li data-ani="bounceIn"><a href="infoB.html"><img src="img/'+ brandImg[i] +'" alt="" /></a></li>';		
	};

	//坐标值
	var x = 116.331;
	var y = 40.897;

	var brandHand = '<div class="section brandSec brandDetail"><div class="edit_area"><p class="fix_box">'+ logoHtml + brandNameHtml + brandAddressHtml + brandHtml +'<p class="tmp_zone"><a class="detailBtn seeMap" href="javascript:;" data-position="'+ x +','+ y +'">查看地图</a><a class="detailBtn concatBrand" href="javascript:;">联系商家</a></p class="tmp_zone"><i class="moonBg"></i><ul>';
	var brandFoot = '</ul><div class="brandInfo"><a href="javascript:;" class="seeMap2" data-position="'+ x +','+ y +'">查看地图</a><a href="javascript:;" class="concatBrand2">联系商家</a></p></div></div><div>';
	var brandHtml = brandHand + liHtml + brandFoot;
	data.push({
		'content' : brandHtml
	});
	
	var	islider = new iSlider({
		type: 'dom',
	    data: data,
	    dom: document.getElementById("iSlider-wrapper"),
	    isVertical: false
	});

	function show(sec){
		var child = $(sec).find('.edit_area').children();
		$.each(child,function(){
			$(this).addClass( $(this).attr('data-ani') );
		});
	};


	//图片预加载
	var imgList = ['albumBg.png','light.png','btn_arrow.png','music-icon.png','loading.gif','cotyRight.png','indexIcon.png','musicIcon.png','Sublogo.png','playingBg.png','workingIcon.png','cover.png'];
	//所有图片合并
	$.merge( $.merge(imgList,brandImg), brandImg);

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

	$(myEvent.bind);
});














    
