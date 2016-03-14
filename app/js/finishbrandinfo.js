//参数
var setting = {
	server_url : 'http://182.92.194.42:8081/',
	// server_url : 'http://boluomi.rjl.com/',
	regist_url : 'v1/business/add',
	img_type :　''
};

var util = {
		$post : function(url, data, callback){
	    	util.$ajax(url, data, "POST", callback);
	    },
		$get : function(url, params, callback){
			util.$ajax(url, params, "GET", callback);
		},
		$ajax : function(url, data, type, callback){
			$.ajax({
				url : url,
				type : type,
				data : data || {},
				dataType : "json",
				async : true,
				cache : false,
				success : function(rtn){
					callback && callback(rtn);
				},
				error : function(o, r, m){
					callback && callback(r);
				}
			});
		},
		code_on_off : true
};

var server = {
	submit_audit : function(id,auth_key,name,phone,logo,type,province,city,area,address,licence,location,callback){
		var url = setting.server_url + setting.regist_url;
		var data = {id:id,auth_key:auth_key,name:name,phone:phone,logo:logo,type:type,province:province,city:city,area:area,address:address,licence:licence,location:location};
		util.$post(url,data,callback);
	}
};


//对象
var $obj = {
	win : $(window),
	bd : $('body'),
	submit_audit : $('#submit_audit'),
	brand_name : $('#brand_name'),
	contact_phone : $('#contact_phone'),
	detail_address : $('#detail_address'),
	map_mark : $('#map_mark'),
	brand_type : $('#brand_type'),
	J_province : $('.J_province'),
	J_city : $('.J_city'),
	J_area : $('.J_area'),
	brand_logo : $('#brand_logo'),
	licence_pic : $('#licence_pic'),
	map_mark : $('#map_mark'),
	main_ipts : $('#main .ipt'),
	load_img_wrap : $('#load_img_wrap'),
	load_img_wrap_img : $('#load_img_wrap img'),
	mask : $('#mask'),
	progress : $('#progress'),
	cancle_btn : $('#cancle_btn'),
	//hidden_btn : $('#hidden_btn')
	smallMap: $('#smallMap')

};

var myEvent = {
	bind : function(){
		// 提交审核
		//$obj.submit_audit.on('click',handler.submit_audit_click);

		//地图标注
		//$obj.map_mark.on('click',handler.map_mark_click);

		//商家类型选择
		//$obj.brand_type.find('input').on('click',handler.brand_type_input_click);

		//input输入框获得焦点隐藏错误信息
		//$obj.main_ipts.on('focus',handler.main_ipts_focus);

		//上传logo
		//$obj.brand_logo.on('click',handler.brand_logo_click);

		//上传营业执照
		//$obj.licence_pic.on('click',handler.licence_pic_click);

		//图片上传控件渲染
		//handler.rander_load_img($obj.load_img_wrap)

		//取消上传
		//$obj.cancle_btn.on('click',handler.cancle_btn_click);

	}
};

var handler = {
	licence_pic_click : function(){
		//$obj.load_img_wrap.fadeIn();
		//$obj.mask.fadeIn();

		//用于 判断是上传logo还是 营业执照
		setting.img_type = 'licence_pic';
	},
	cancle_btn_click : function(){
		//$obj.hidden_btn.uploadify('cancel');
		$obj.load_img_wrap.fadeOut();
		$obj.mask.fadeOut();
		$obj.load_img_wrap_img.attr('src','');
	},
	rander_load_img : function(par){

		var upLoadPic = par.find("#hidden_btn");
		var oImg = par.find('img');
		var w = null;
		upLoadPic.uploadify({
			"formData":{
				"action" : 'uploadFile',
				"type"     : 'qg_question'
			},
			"fileTypeDesc":'*.JPG;*.JPEG;*.ICO;*.GIF;*.PNG;*.BMP;*.psd',
			"fileTypeExts":'*.JPG;*.JPEG;*.ICO;*.GIF;*.PNG;*.BMP;*.psd',
			"fileSizeLimit":"2MB",
			"swf"      : 'http://jic.qingguo.com/core/f/uploadify.swf',
			"uploader" : 'http://upload.qingguo.com/index.dfs.php',
			"width" : 120,
			"height" : 30,
			"fileObjName":'upfile',
			"progressData" : 'speed',  //speed percentage
			"auto":true,
			"queueSizeLimit":'1',
			"hideButton" : false,
			"rollover" : false,
			"buttonText" : '',
			"buttonCursor":'hand',
			"queueID":true,
			"removeCompleted":true,
			"requeueErrors":true,
			"onQueueFull": function(){
				alert("文件超了")
			},
			"onUploadProgress":function(obj, plan,size){
				var progress = Math.ceil(plan / size  * 100) == 0? 1 : Math.ceil(plan / size  * 100);
				
				//进度条
				$obj.progress.show().css('width' , progress  +'%')

			},

			"onUploadSuccess":function(obj, data, flg){
				data = $.parseJSON(data);
				console.log(data)
				var img_src = 'http://upload.qingguo.com/tmp/'+data.data.src;
				oImg.attr('src',img_src)

				//将不同的图片类型赋值到对应data数据上
				if(setting.img_type == 'logo'){
					$obj.brand_logo.attr('data-logo-src',img_src).text('上传成功');
				}else if(setting.img_type == 'licence_pic'){
					$obj.licence_pic.attr('data-licence-src', img_src).text('上传成功');
				}				

			},

			"onUploadComplete" : function(file) {
				$obj.progress.fadeOut(function(){
					$(this).css('width',0)
				})
			},
			"onSelectError" : function(file, errorCode, errorMsg){
				console.log(file)
				console.log(errorCode)
				console.log(errorMsg)
				switch(errorCode) {
					case -110:
						alert('上传出错 错误代码-110');
						break;
					case -120:
						alert("文件大小异常！");
						break;
					case -130:
						alert("文件类型不正确！");
						break;
				}
			}
		});




	},
	brand_logo_click : function(){
		//$obj.load_img_wrap.fadeIn();
		//$obj.mask.fadeIn();

		//用于 判断是上传logo还是 营业执照
		//setting.img_type = 'logo';
	},
	linkAge : function(){
		C.linkAge($('.J_province'),$('.J_city'),$('.J_area'));
	}(),
	main_ipts_focus : function(){
		$(this).siblings('.error').fadeOut();
	},
	brand_type_input_click : function(){
		$(this).parents('#brand_type').attr('data-type',$(this).attr('data-type'))
	},
	map_mark_click : function(){

		function getAddressFromAngular(){
			return angular.element(document.getElementById('map_mark')).scope().getAddress();
		}
		function setPointInAngular(point){
			angular.element(document.getElementById('map_mark')).scope().setPointFromMap(point);
		}
		function finishSetPoint(){
			angular.element(document.getElementById('map_mark')).scope().finishSetPoint();
		}
		//判断详细地址有没填写
		var address =  getAddressFromAngular();


		//var _this = $(this);
		//判断详细地址有没填写
		//var address =  $obj.detail_address.val();

		if( G.isEmpty( address )){
			alert('请先填写详细地址！');
			return false;
		};

		function taggingClick(){//地图标注
	   		var mapZ = $('<div id="allmap" class="allmap">map</div>');
	   		var closeBtn = $('<i id="closeBtn" class="closeBtn">确定</i>');
	   		var oMask = $('<div id="mask" class="mask"></div>')
		  		 
		  setMapPos(mapZ);
		  function setMapPos(mapZ){ //设置mapZ尺寸、位置
		    var winW = $obj.win.width();
		    var winH = $obj.win.height();
		    mapZ.css({
		      width:winW/2,
		      height:winH-2,
		      marginLeft : -(winW/2)/2
		    })
		    oMask.css({
		      height : winH
		    })
		  };
		 
		 
		  closeBtn.on('click',function(){
		  	$(this).remove();
		    mapZ.remove();
		    oMask.remove();
			finishSetPoint();

		  })
		  mapZ.appendTo($obj.bd);
		  $obj.bd.append(oMask).append(closeBtn);
		   $obj.win.on('resize',function(){//大小自适应
		   setMapPos(mapZ);
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
					// 赋值坐标
					//_this.attr('data-position', point.lng+',' + point.lat);
					setPointInAngular(point);


					map.addOverlay(marker);
					marker.enableDragging();

					marker.addEventListener("mouseup",attribute);
					function attribute(){
						var p = marker.getPosition();  //获取marker的经纬度值位置
						setPointInAngular(p);
						/*myGeo.getLocation(p, function(rs){//通过经纬度解析地址
						 var addComp = rs.addressComponents;
						 address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;

						 // 移动了坐标点重新赋值
						 final_point = new BMap.Point(p.lng, p.lat);

						 _this.attr('data-position', p.lng+',' + p.lat);

						 });*/
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

	},
	submit_audit_click : function(){

		// 数据收集
		var id = G.getCookie('id');
		var auth_key = G.getCookie('auth_key');
		var name = $obj.brand_name.val();
		var phone = $obj.contact_phone.val();
		var address = $obj.detail_address.val();
		var type = $obj.brand_type.attr('data-type');
		var province = $obj.J_province.find('option:checked').html() == '请选择' ? '' : $obj.J_province.find('option:checked').html();
		var city = $obj.J_city.find('option:checked').html() == '请选择' ? '' : $obj.J_city.find('option:checked').html();
		var area = $obj.J_area.find('option:checked').html() == '请选择' ? '' : $obj.J_area.find('option:checked').html();
		var logo = $obj.brand_logo.attr('data-logo-src');
		var licence = $obj.licence_pic.attr('data-licence-src');
		var location = $obj.map_mark.attr('data-position');

		// 校验数据
		if(G.isEmpty(name)){//商家名
			var error = $obj.brand_name.siblings('.error');
			error.html(error.attr('data-empty')).fadeIn();
			return false;
		}
		if(G.isEmpty(phone)){//手机号--未填
			var error = $obj.contact_phone.siblings('.error');
			error.html(error.attr('data-empty')).fadeIn();
			return false;
		}
		if(!G.isMobile(phone)){//手机号--有误
			var error = $obj.contact_phone.siblings('.error');
			error.html(error.attr('data-error')).fadeIn();
			return false;
		}
		if( G.isEmpty(logo) ){//logo未上传
			alert('请上传logo');
			return false;
		}
		if(G.isEmpty(type)){//商家类型
			alert('请选择商家类型');
			return false;
		}
		if(G.isEmpty(province)){//商家地址
			alert('请选择商家地址');
			return false;
		}

		if(G.isEmpty(address)){//商家详细地址
			alert('请填写商家详细地址');
			return false;
		}
		if(G.isEmpty(location)){//地图标注
			alert('请标注地图');
			return false;
		}
		if(G.isEmpty(licence)){//营业执照
			alert('请上传营业执照');
			return false;
		}

		//通过校验
		angular.element('#brandForm').scope().addBrandInfo();
		/*server.submit_audit(id,auth_key,name,phone,logo,type,province,city,area,address,licence,location,function(data){
			if(data.type == 2){
				// 页面跳转，完善商家信息
				window.location.href = './audit.html';
			}else{
				alert('有未填写项，请检查后在提交')
			}
		}); */


	}
	
};

/*var newPoint = angular.element(document.getElementById('map_mark')).scope().getLocation();
if(newPoint!=null){
	var map2 = new BMap.Map("smallMap");          // 创建地图实例
	//var point2 = new BMap.Point(116.404, 39.915);  // 创建点坐标
	map2.centerAndZoom(new_point, 15);                 // 初始化地图，设置中心点坐标和地图级别
	//map2.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	final_marker = new BMap.Marker(new_point);
	map2.addOverlay(final_marker);
} */
$(myEvent.bind);




