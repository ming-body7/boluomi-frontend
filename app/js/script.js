//add small map
var map2 = new BMap.Map("smallMap");          // 创建地图实例
var point2 = new BMap.Point(116.404, 39.915);  // 创建点坐标
map2.centerAndZoom(point2, 15);                 // 初始化地图，设置中心点坐标和地图级别
map2.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
map2.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
