(function(){
var G = {
	inputChange : inputChange,
	setCookie : setCookie,
	getCookie : getCookie,
	isMobile : isMobile,
	getTimeStamp : getTimeStamp,
	getUrlValue : getUrlValue,
	makeObjS : makeObjS,
	makaObjC : makaObjC,
	isEmpty : isEmpty,
	differDay : differDay,
	deadlineFn : deadlineFn,
	iScrollTo : iScrollTo,
	hasValue : /^\s*(\S+)\s*$/,
	isEmail : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
};
/**(1)绑定input的change事件
@param
	oInput : 一个jquery对象
	fnInput : 绑定的事件处理函数
**/
function inputChange(oInput,fnInput){
	for(s in oInput[0]){
		if(s == 'oninput'){
			oInput.on('input',fnInput);
		}else if(s == 'onpropertychange'){
			oInput.on('propertychange',fnInput);
		};
	};
};

/**(2)设置cookie
@param
	c_name : cookie的key   →    str
 	value : cookie的value  →    str
 	expiredays : cookie的过期时间  →    number
**/
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

/**(3)获取cookie
@param
	c_name : cookie的key   →    str
**/
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
};

/**(4)手机号是否合法
@param
	txt : 手机号   →    number
**/
function isMobile(txt){
	return /^1{1}[3-9]{1}[0-9]{9}$/.test(txt);
}
/**(5)获取时间戳
@param
	D : '2015-6-6'   →    str
	T : '10'   →    str
**/
function getTimeStamp(D,T){
	var date = new Date();

	date.setFullYear(D.split("-")[0]);
	date.setMonth(D.split("-")[1]-1);
	date.setDate(D.split("-")[2]);
	date.setHours(T.split(":")[0]);
	return date.getTime();
};

/**(6)获取地址栏中的对应值
@param
	obj : '解析url后返回对一个对象'   →    obj
**/
function getUrlValue(){
	var url = window.location.href;
	if(url.indexOf('?') == -1){
		return '';
	}
	var idx = url.indexOf('?')+1;
		url = url.substring(idx);
	var obj = {};
	var arrUrl = url.split('&');
	for(var i=0;i<arrUrl.length;i++){
		obj[arrUrl[i].split('=')[0]] = arrUrl[i].split('=')[1];
	}
	return obj;
};

/**(7)判断输入框是否为空/空格
@param
	re : /\S/   →    RegExp
**/
function isEmpty(val){
	var re = /\S/;
	if(re.test(val)){//有内容
		return false;
	};
	return true;//没有内容或输入的是空格
}
/**(8)将数组转成对象(普通)
@param
	arr : [1, 2, 3, 4, 5]   →   arr
	
	转成 ： {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}  → obj
**/
function makeObjS(arr){
	var obj = {};
	for(var i=0,len = arr.length; i<len ;i++){
		obj[ arr[i] ] = arr[i];
	};
	return obj;
}
/**(9)将数组转成对象（复合型）
@param
	arr : ["name=jun", "age=27"]   →   arr
	spt : '='                      →   分割符号

	转成 ： {name: "jun", age: "27"}  → obj
**/
function makaObjC(arr,spt){
	var obj = {};
	for(var i=0,len=arr.length;i<len;i++){
		obj[ arr[i].split(spt)[0] ] = arr[i].split(spt)[1]
	};
	return obj;
};
/**(10)获取两个日期  返回计算后的日期差值(天数)
@param
	time1 : 2015-08-24     → 字符串   
	time2 : 2015.08.24     → 字符串


@传入时间格式说明：
	时间分隔符 任意字符都行
	例如 : 2015+08+24 /  2015*08*24  / 2015~08~24
**/
function differDay(time1,time2){
	var re = /\d+/g;
	//统一转换格式 
	time1 = time1.match( re ).join('/');
	time2 = time2.match( re ).join('/');
	var t1 = new Date(time1);		
	var t2 = new Date(time2);
	//返回日期相差天数
	return disDay = (t2 - t1)/86400000;
}

/**(11)倒计时
@param
	day      :   jquery对象  
	hour     :   jquery对象
	minute   :   jquery对象
	second   :   jquery对象
	deadTime :   字符串

@调用例子：
	deadlineFn({
		day : $('.time-zone strong:eq(0)'),
		hour : $('.time-zone strong:eq(1)'),
		minute : $('.time-zone strong:eq(2)'),
		second : $('.time-zone strong:eq(3)'),
		deadTime : '2015/9/10'
	});
**/
function deadlineFn(opts){
	//补零函数
	function toZero(num){
		if(num <= 9){
			return '0' + num;
		};
		return num;
	}
	var deadTime = new Date(opts.deadTime);
	function moveTime(){
		// 计算差值
		disTime = deadTime - new Date();
		//天
		opts.day.html(Math.floor(disTime/86400000))
		//小时
		opts.hour.html(toZero( Math.floor(disTime/3600000)%24 ))
		//分钟
		opts.minute.html(toZero( Math.floor(disTime/60000)%60 ))
		//秒
		opts.second.html(toZero( Math.floor((disTime/1000)%60) ))	
	}
	moveTime();
	setInterval(function(){
		moveTime();
	},1000)
}
/**(12)兼容移动端/PC的 touchstart 事件 click事件
@param
	touchstart      :   移动端touchstart事件  
	ele    			： 	jquery对象
	handler      	:   事件函数
@调用例子：
	touchstart($('a'),handler);
**/
function touchstart(ele,handler){
	ev = ('ontouchstart' in window) ? 'touchstart' : 'click';
	ele.on('touchstart',handler);
}
/**(13)滚动条滑到相应位置
@param
	pos  ： 500  → 时间毫秒
@调用例子：
	iScrollTo(500,800)
**/
function iScrollTo(pos,time){
	$('html,body').animate({scrollTop:pos},time)
};
/**(14)统计页面PV(页面被打开的次数) / 以及埋点统计
**/
;(function(){
	//发送统计代码功能
	function getREF() {
		//get refer information
		var referrer = '';
		try {
			referrer = window.top.document.referrer;
		} catch (_error) {
			if (window.parent) {
				try {
					referrer = window.parent.document.referrer;
				} catch (_error) {
					referrer = '';
				}
			}
		}
		if (referrer === '') {
			referrer = document.referrer;
		}
		return referrer;
	};
	var GIF = "http://static.xiaoliangkou.com/s.gif?r=" + encodeURIComponent(getREF()); //define public gif
	function sts($el, atr, q) {
		atr = atr || 'data-sts'
		var img, src, sts, tm;
		sts = q ? "&q=" + q : ($el != null ? $el.length : void 0) ? "&q=" + $el.attr(atr) : '';
		img = new Image();
		tm = (new Date()).getTime();
		src = GIF + sts + "&t=" + tm + Math.random();
		img.src = src;
	};

    //调用pv统计
    sts()
    //调用点击统计
	$('body').on('click.sts', '[data-sts]', function(){
		sts($(this));
	});
})();


//对外开放的接口
window.G = G;
})();












