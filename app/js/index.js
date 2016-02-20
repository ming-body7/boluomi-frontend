//参数
var setting = {
	// server_url : 'http://182.92.194.42:8081/',
	server_url : 'http://www.boluomi1314.com:8081/',
	login_url : 'v1/register/login',
	forget_pass : 'v1/register/resetpassword'
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
	login : function(account,password,rememberMe,callback){
		var url = setting.server_url + setting.login_url;
		var data = {account:account,password:password,rememberMe:rememberMe};
		util.$post(url,data,callback);

	},
	forget_login : function(account,code,password,repassword,callback){
		var url = setting.server_url + setting.forget_pass;
		var data = {account:account,code:code,password:password,repassword:repassword};
		util.$post(url,data,callback);

	}
};

var $obj = {
	sign_in_btn : $('#sign_in_btn'),
	login_zone : $('#login_zone'),
	login_close_btn : $('#login_zone .J_close_btn'),
	login_btn : $('#login_zone .J_login_btn'),
	mask : $('#mask'),
	remember_me : $('#remember_me'),
	forget_link : $('#forget_link'),
	forget_zone : $('#forget_zone'),
	forget_close_btn : $('#forget_zone .J_close_btn'),
	forget_code_btn : $('.get-code'),
	finish_btn : $('#finish_btn'),
	free_btn : $('#free_btn'),
	link_box : $('#link-box'),
	link_box_know : $('#link-box .J_i-know')

};

var myEvent = {
	bind : function(){
		//弹出登录浮层
		$obj.sign_in_btn.on('click',handler.sign_in_btn_click);

		//登录窗口关闭按钮
		$obj.login_close_btn.on('click',handler.login_close_btn_click);

		//登录按钮
		$obj.login_btn.on('click',handler.login_btn_click);

		//忘记密码
		$obj.forget_link.on('click',handler.forget_link_click);

		$obj.forget_code_btn.on('click', handler.forget_code_click);

		//忘记密码弹窗确定按钮
		$obj.finish_btn.on('click',handler.finish_btn_click);

		//忘记密码关闭按钮
		$obj.forget_close_btn.on('click',handler.forget_close_btn_click);

		//移动尺寸下 免费试用按钮
		$obj.free_btn.on('click',handler.free_btn_click);

		//移动端’我知道了‘按钮
		$obj.link_box_know.on('click',handler.link_box_know_click);
	}
}

var handler = {
	link_box_know_click : function(){
		$obj.link_box.fadeOut();
		$obj.mask.fadeOut();
	},
	free_btn_click : function(){
		$obj.link_box.fadeIn();
		$obj.mask.fadeIn();
	},
	forget_close_btn_click : function(){
		$obj.forget_zone.fadeOut();
		$obj.mask.fadeOut();
	},
	finish_btn_click : function(){
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

		//校验验证码
		if(G.isEmpty( code )){
			alert('请输入验证码');
			return false;
		}

		//校验密码
		if(G.isEmpty( password )){
			alert('请输入密码');
			return false;
		}
		if(G.isEmpty( confirmpassword )){
			alert('请输入确定密码');
			return false;
		}

		if(password != confirmpassword){
			alert('两次密码不一致');
			return false;
		}

		if(!isValid(password)){
			alert("请输入6-20位字母或者数字的密码");
			return false;
		}
		function isValid(pw) {

			if (/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,20}/.test(pw)) {
				return false;
			}
			return true;
		}
		angular.element('#forget_zone').scope().resetPassword();
		//校验通过 请求接口
		/*server.forget_login(phone,code,password,confirmpassword,function(data){
			console.log(data)
			if(data.type == 2){//修改成功

				$obj.forget_zone.fadeOut();

				$obj.login_zone.fadeIn();

			}else {//失败 后台返回失败原因
				var msg = data.msg.account[0];

				alert(msg)
			}
		});*/

	},
	forget_link_click : function(){
		//关闭登录弹窗
		$obj.login_zone.fadeOut();

		//弹出忘记密码弹窗
		$obj.forget_zone.fadeIn();
	},
	forget_code_click : function(){
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

		angular.element('#forget_zone').scope().getPasscode();

	},
	login_btn_click : function(){
		var _this = $(this);
		var account = _this.siblings('.J_account').val();
		var password = _this.siblings('.J_password').val();
		var rememberMe = $obj.remember_me.is(':checked') ? 1 : 0;

		

		//校验
		if(G.isEmpty(account)){
			alert('请填写手机号');
			return false;
		}
		if(!G.isMobile(account)){
			alert('请填写正确手机号~');
			return false;
		}
		if(G.isEmpty(password)){
			alert('请填写密码');
			return false;
		}


		//通过验证
		//登陆的逻辑我在angular里面实现啦，这块需要调用angular的登陆
		angular.element('#loginForm').scope().login();
		/*
		server.login(account,password,rememberMe,function(data){
			console.log(data)
			if(data.type == 0){//账号或密码错误
				alert('账号或密码错误')
			}else{//登录成功

				//获取id auth_key值  用作完善商家信息用作参数
				G.setCookie('id',data.result.id,365);
				G.setCookie('auth_key',data.result.auth_key,365);

				var status = data.result.status;
				switch(status){
					case 9: //信息未完成  去完善信息
						window.location.href = './finishbrandinfo.html';
					break;
					case -1: //已删除
						alert('你的信息已删除！');
					break;
					case 0: //未审批
						window.location.href = './audit.html';
					break;
					case 1: //已通过
						//TODO登录成功的跳转页面待定
						alert('登录成功')
					break;
				};
			}
		})
		*/

	},
	login_close_btn_click : function(){
		$obj.login_zone.fadeOut();
		$obj.mask.fadeOut();
	},
	sign_in_btn_click : function(){
		var loginStatus = angular.element('#loginForm').scope().checkLoginStatus();
		if(loginStatus == false){
			$obj.login_zone.fadeIn();
			$obj.mask.fadeIn();
		}

	}
}

$(myEvent.bind);