//参数
var setting = {
	// server_url : 'http://182.92.194.42:8081/',
	server_url : 'http://www.boluomi1314.com:8081/',
	regist_url : 'v1/register/signup'
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
	register : function(account,code,password,repassword,callback){
		var url = setting.server_url + setting.regist_url;
		var data = {account:account,code:code,password:password,repassword:repassword};
		util.$post(url,data,callback);
	}
};


//对象
var $obj = {
	submit_btn : $('#submit_btn'),
	ipt_s : $('.ipt'),
	get_code : $('#get_code')
};

var myEvent = {
	bind : function(){
		//点击注册
		//$obj.submit_btn.on('click',handler.submit_btnClick);

		//输入框获得焦点、失去焦点
		//$obj.ipt_s.on('focus',handler.ipt_sFocus);

		//后台获取验证码
		//$obj.get_code.on('click',handler.get_codeClick);
	}
};

var handler = {
	get_codeClick : function(){
		var _this = $(this);
		var ipts = _this.siblings('.ipt-zone').find('.ipt');

		//获取数据
		var phone = ipts.eq(0).val();
		var code = ipts.eq(1).val();
		var password = ipts.eq(2).val();
		var confirmpassword = ipts.eq(3).val();

		//校验手机号
		if(G.isEmpty( phone ) ){
			alert('手机号不能为空');
			return false;
		}
		if(!G.isMobile(phone)){
			alert('手机号有误');
			return false;
		}

		angular.element('#registerForm').scope().getPasscode();
	},
	ipt_sFocus : function(){

		$(this).siblings('.error').fadeOut();

	},
	submit_btnClick : function(){

		//收集注册信息
		var moblie = $obj.ipt_s.eq(0).val();
		var code = $obj.ipt_s.eq(1).val();
		var password = $obj.ipt_s.eq(2).val();
		var confirm_password = $obj.ipt_s.eq(3).val();
		var bOff = true;
		var backCode = '';//服务器返回的验证码

		// 验证信息  是否填写
		$obj.ipt_s.each(function(){
			var _this = $(this);
			if(G.isEmpty(_this.val())){
				_this.siblings('.error').html(_this.attr('data-empty')).fadeIn();
				bOff = false;
				return false;
			}
		})
		// 验证信息  是否填写正确
		if(bOff){
			$obj.ipt_s.each(function(idx){
				var _this = $(this);
				if(idx == 0 && !G.isMobile( _this.val() ) ){//手机号
					_this.siblings('.error').html(_this.attr('data-error')).fadeIn();
					bOff = false;
					return false;
				}
				if(idx == 1 && code != code){//验证码
					_this.siblings('.error').html(_this.attr('data-error')).fadeIn();
					bOff = false;
					return false;
				}
				if( idx == 3  && password != confirm_password){
					_this.siblings('.error').html(_this.attr('data-error')).fadeIn();
					bOff = false;
					return false;
				}

			})
		}
		if(bOff){
			//TODO调用接口
			angular.element('#registerForm').scope().register();
			/*server.register(moblie,code,password,confirm_password,regist_callback);
			function regist_callback(data){
				if(data.type == 2){
					//获取id auth_key值  用作完善商家信息用作参数
					G.setCookie('id',data.result.id,365);
					G.setCookie('auth_key',data.result.auth_key,365);

					// 页面跳转，完善商家信息
					window.location.href = './finishbrandinfo.html';
				}else{
					alert('注册失败，请待会再试！')
				}
			}*/
		}
	}
};

$(myEvent.bind);