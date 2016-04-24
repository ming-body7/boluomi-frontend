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
				// console.log(data)
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
					pic : '1.jpg'
				}
				,{
					width : 640,
					height : 960,
					pic : '3.jpg'
				},{
					width : 640,
					height : 960,
					pic : '2.jpg'
				}
				],
				logoImg : 'brand_log.png',
				brandName : '商家名称',
				brandAddress: '望京soho',
				brand_type : '商家类型',
				animateType : '2',
				musical : 'img/marry you.mp3',
				location :'116.470981,40.003265',
				tel : 18575562180,
				detail_url : './seeDetails.html' //无值返回 null
			}
		};

		//临时模拟数据d  正常情况是ajax返回的data
		def.resolve(d);

	

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
				'content' : '<div class="section sec '+ clas +'" style="background-image:url(./img/'+ serImg_data[i].pic +');'+ bg_size +'"><div>'
			})
		};
		
		//商家logo填充
		var logoImg = d.logoImg;
		var logoHtml = '<a class="logoWrap" href="javascript:;"><img class="logo" src="./img/'+ logoImg +'" alt=""></a>';

		//商家名称
		var brandName = d.brandName;
		brandNameHtml = '<span class="brand_name">'+ brandName +'</span>'

		//商家地址
		var brandAddress = d.brandAddress;
		var brandAddressHtml = '<em id="brand_address" class="brand_address" data-pos="'+ d.location +'">'+ brandAddress +'</em>';

		//商家类型
		var brand_type = d.brand_type;
		var brandHtml = '<i class="brand_type">类型：'+ brand_type +'</i>';

		//商家详情
		var brand_detail = d.detail_url ? '<a class="detailBtn txt_col" href="'+ d.detail_url +'">详细信息</a>' : '';

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
		var tel = d.tel;


		var brandHand = '<div class="section brandSec new_b"><div class="edit_area"><p class="fix_box">'+ logoHtml +brandNameHtml + brandAddressHtml + brandHtml + brand_detail +'<a class="detailBtn" href="tel:'+ tel +'">联系商家</a></p><ul>';
		var brandFoot = '</ul></div><div>';
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
		    
		    }
		});


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
		var imgList = [serImg_data[0].pic,'albumBg.png','light.png','btn_arrow.png','music-icon.png','loading.gif','cotyRight.png','indexIcon.png','musicIcon.png','Sublogo.png','playingBg.png','workingIcon.png','cover.png'];

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

						//加载更多图片
						load_more();

						$('#audio_btn').show();
					}
				}
				oImg.src = './img/' + ele;
			})
		};

		//加载更多图片
		function load_more(){
			for(var i=0;i<serImg_data.length;i++){
				var oImg = new Image();
				oImg.src = './img/'+serImg_data[i].pic;
			}
		}
	});


	// 失败
	def.fail(function(data){
		console.log(data)
	})

	var bd = $('body');
	//点击加载商家地图
	bd.on('touchstart','#brand_address',function(){
		var _this = $(this);
		var la = _this.attr('data-pos').split(',')[0];
		var lo = _this.attr('data-pos').split(',')[1];
		
		
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
			    var point = new BMap.Point(la,lo);
			    map.centerAndZoom(point,14);
			    map.enableScrollWheelZoom(true);


			    //添加控件和比例尺
			    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
			    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件

			    map.addControl(top_left_control);        
			    map.addControl(top_left_navigation);   

			    // （1）依据坐标值定位  
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
			      }else{
			      	mapZ.fadeOut().remove();
			      	oMask.fadeOut().remove();
			        alert("您选择地址没有解析到结果!");
			      }
			    
			    // // （2）依据地址名称定位 创建地址解析器实例
			    // var address = $(this).html();
			    // var myGeo = new BMap.Geocoder();
			    // // 将地址解析结果显示在地图上,并调整地图视野
			    // myGeo.getPoint(address, function(point){
			    //   if (point) {
			    //     map.centerAndZoom(point, 16);
			    //     var marker = new BMap.Marker(point);

			    //     map.addOverlay(marker);
			    //     marker.enableDragging();

			    //     marker.addEventListener("mouseup",attribute);
			    //     function attribute(){
			    //         var p = marker.getPosition();  //获取marker的经纬度值位置
			    //         myGeo.getLocation(p, function(rs){//通过经纬度解析地址
			    //           var addComp = rs.addressComponents;
			    //               address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;

			    //               // 移动了坐标点重新赋值
			    //               _this.attr('data-position', p.lng+',' + p.lat)
			    //         }); 
			    //       }

			    //     // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			    //   }else{
			    //   	mapZ.fadeOut().remove();
			    //   	oMask.fadeOut().remove();
			    //     alert("您选择地址没有解析到结果!");
			    //   }
			    // }, "北京市");
			}
			taggingClick();


	})	
});











    
