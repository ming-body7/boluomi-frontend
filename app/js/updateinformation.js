/**
 * Created by body7 on 15/12/9.
 */
var $obj = {
    win : $(window),
    bd : $('body'),
    map_mark : $('#map_mark')
};

var myEvent = {
    bind : function(){
        //地图标注
        $obj.map_mark.on('click',handler.map_mark_click);
    }
};
var handler = {
    map_mark_click : function(){
        //var _this = $(this);
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

    }

};

$(myEvent.bind);