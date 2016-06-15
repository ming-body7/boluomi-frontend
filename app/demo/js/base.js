function to_pc(){
	var system ={};  
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	/*if(system.win||system.mac||system.xll){//电脑
		window.location.href = '/demo/pc/web_share.html?pid='+ getQueryString('pid');
	}else{
		//设置页面固定显示宽度320;
		setDeviceW();
	}*/
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		setDeviceW();
	}else{
		window.location.href = '/demo/pc/web_share.html?pid='+ getQueryString('pid');
	}
}

//见设备是PC的  跳转到 www.boluomi1314.com/demo/pc/web_share.html?pid=18 
// to_pc();

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



function getQueryString(key){
   var search=window.location.search.substring(1).split('&');
   for (var i=0; i<search.length; i++){
       if (search[i].split('=')[0]==key){
           return decodeURI(search[i].split('=')[1]);
       }
   }
   return undefined;
}

