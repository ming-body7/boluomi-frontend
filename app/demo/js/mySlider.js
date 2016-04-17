$(function(){
	var viewScale = $(window).width()/$(window).height();
	var def = $.Deferred();


	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

	var pid = getUrlParameter('pid');

	//h5首页数据接口
	 $.ajax({
		 	url : 'http://www.boluomi1314.com:8083/info/data/view',
		 	type : 'GET',
		 	dataType : 'json',
		 	data : {pid : pid},
		 	success : function(data){
				console.log(data)
				def.resolve(data);
		 	},
		 	error : function(data){
		 		def.reject(data);
		 	}
	 });
	var d = {
			result : {
				serImg : [{
					width : 640,
					height : 960,
					pic : './img/1.jpg'
				},{
					width : 640,
					height : 960,
					pic : './img/3.jpg'
				},{
					width : 640,
					height : 960,
					pic : './img/2.jpg'
				}
				],
				logoImg : './img/brand_log.png',
				brandName : '商家名称',
				brandAddress: '望京soho',
				brand_type : '商家类型',
				animateType : '2',
				musical : './img/marry you.mp3'
			}
		};

		//临时模拟数据d  正常情况是ajax返回的data
		//def.resolve(d);

	

	//后台返回h5数据
	def.done(function(d){
		d = d.result;
		//data数据填充
		var data = [];

		

		//单张图片数据填充
		var serImg_data = d.serImg;
		var serImg_num = serImg_data.length;

		for(var i=0;i<serImg_num;i++){

			//判断横竖图
			var clas = '';//横图
			var bg_size = '';

			if(serImg_data[i].height > serImg_data[i].width){//竖图
				var scale = serImg_data[i].width/serImg_data[i].height;
				if(scale/viewScale <=1 ){
					clas = 'sec_bg_size';
				}else{
					bg_size = 'background-size:'+ Math.ceil(scale/viewScale*100) +'% auto';
				}
			}

	

			// console.log(serImg_data)
			data.push({
				'content' : '<div class="section sec '+ clas +'" style="background-image:url('+ serImg_data[i].pic +');'+ bg_size +'"><div>'
			})
		};
		
		//商家logo填充
		var logoImg = d.logoImg;;
		var logoHtml = '<a class="logoWrap" href="infoC.html"><img class="logo" src="'+ logoImg +'" alt=""></a>';

		//商家名称
		var brandName = d.brandName;
		brandNameHtml = '<span class="brand_name">'+ brandName +'</span>'

		//商家地址
		var brandAddress = d.brandAddress;
		var brandAddressHtml = '<em id="brand_address" class="brand_address">'+ brandAddress +'</em>';

		//商家类型
		var brand_type = d.brand_type;
		var brandHtml = '<i class="brand_type">类型：'+ brand_type +'</i>';

		// 动画类型
		var n = d.animateType;
		var animateType = '';

		switch(n){
			case '0':
			animateType = 'default';
			break;
			case '1':
			animateType = 'card';
			break;
			case '2':
			animateType = 'rotate';
			break;
			default:
			animateType = 'card';
			break;
		}

		// 配置音乐
		var musical =  d.musical;
		$('#audio').attr('src', musical);

		//商家电话
		var tel = 18575562180;

		//商家列表图片填充
		// var brandImg = ['listPic1.png','listPic2.png','listPic3.png','listPic4.png','listPic5.png','listPic6.png'];
		// liHtml = '';
		// for(var i=0;i<brandImg.length;i++){
		// 	liHtml += '<li data-ani="bounceIn"><a href="infoB.html"><img src="img/'+ brandImg[i] +'" alt="" /></a></li>';
		// };

		// var brandHand = '<div class="section brandSec"><div class="edit_area"><p class="fix_box">'+ logoHtml +brandNameHtml + brandAddressHtml + brandHtml +'<a class="detailBtn" href="./seeDetails.html">查看详情</a></p><i class="moonBg"></i><h2><em>该商家的其他作品</em></h2><ul>';
		var brandHand = '<div class="section brandSec new_b"><div class="edit_area"><p class="fix_box">'+ logoHtml +brandNameHtml + brandAddressHtml + brandHtml +'<a class="detailBtn txt_col" href="./seeDetails.html">详细信息</a><a class="detailBtn" href="tel:'+ tel +'">联系商家</a></p><ul>';
		var brandFoot = '</ul></div><div>';
		// var brandHtml = brandHand + liHtml + brandFoot;
		var brandHtml = brandHand + brandFoot;
		data.push({
			'content' : brandHtml
		});


		
		var	islider = new iSlider({
			type: 'dom',
		    data: data,
		    dom: document.getElementById("iSlider-wrapper"),
		    isVertical: true,
		    isLooping: true,
		    animateType: animateType,      //default, rotate, flip, depth, flow 和 card
		    onslidechange: function(idx) {
		    	idx = idx+1;
		    	if(idx == 1){
		    		liBounceInHide('.brandSec');
		    	}else if(idx == (serImg_data+1)){
		    		liBounceInShow('.brandSec');
		    	}else if(idx == serImg_data){
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
		var imgList = ['albumBg.png','light.png','btn_arrow.png','music-icon.png','loading.gif','cotyRight.png','indexIcon.png','musicIcon.png','Sublogo.png','playingBg.png','workingIcon.png','cover.png'];
		//所有图片合并
		// $.merge( $.merge(imgList,serImg,brandImg), brandImg);
		// $.merge( imgList, serImg);

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
	});


	// 失败
	def.fail(function(data){
		console.log(data)
	})

	

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
		if(iNow == serImg_data+2){
			iNow = 1;
		}
		islider.slideTo(iNow);
	}

	//上一页
	$('#prev_btn').on('click',prev_btn_click);
	function prev_btn_click(){
		iNow --;
		if(iNow == -(serImg_data+1)){
			iNow = 0;
		}
		console.log(iNow)
		islider.slideTo(iNow);
	}

	var bd = $('body');
	//点击加载商家地图
	bd.on('touchstart','#brand_address',function(){
		var address = $(this).html();
		
			function taggingClick(){//地图标注
		   		var mapZ = $('<div id="allmap" class="allmap">map</div>');
		   		var closeBtn = $('<i id="closeBtn" class="closeBtn"></i>');
		   		var oMask = $('<div id="mask" class="mask"></div>')
			
			 
			  mapZ.appendTo(bd);
			  bd.append(oMask).append(closeBtn);

			  closeBtn.on('click',function(){
			  		mapZ.remove();
			  		oMask.remove();
			  		$(this).remove();
			  })

			  // 百度地图API功能
			    var map = new BMap.Map("allmap");
			    var point = new BMap.Point(116.331398,39.897445);
			    map.centerAndZoom(point,14);
			    map.enableScrollWheelZoom(true);


			    //添加控件和比例尺
			    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
			    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件

			    map.addControl(top_left_control);        
			    map.addControl(top_left_navigation);     

			    // 创建地址解析器实例
			    var myGeo = new BMap.Geocoder();
			    // 将地址解析结果显示在地图上,并调整地图视野
			    myGeo.getPoint(address, function(point){
			      if (point) {
			        map.centerAndZoom(point, 16);
			        var marker = new BMap.Marker(point);

			        map.addOverlay(marker);
			        marker.enableDragging();

			        marker.addEventListener("mouseup",attribute);
			        function attribute(){
			            var p = marker.getPosition();  //获取marker的经纬度值位置
			            myGeo.getLocation(p, function(rs){//通过经纬度解析地址
			              var addComp = rs.addressComponents;
			                  address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;

			                  // 移动了坐标点重新赋值
			                  _this.attr('data-position', p.lng+',' + p.lat)
			            }); 
			          }

			        // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			      }else{
			      	mapZ.fadeOut().remove();
			      	oMask.fadeOut().remove();
			        alert("您选择地址没有解析到结果!");
			      }
			    }, "北京市");
			}
			taggingClick();


	})	
});











    
