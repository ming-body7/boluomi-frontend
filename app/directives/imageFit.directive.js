/**
 * Created by body7 on 16/6/22.
 */

angular.module('myApp').directive('imageFit', function () {
    return {
        restrict: 'EA',
        templateUrl: "views/loginForget.view.html",
        scope:false,
        link: function ($scope, element, attrs) {

            (element).css({
                "display": 'none'
            });

            element.bind("load" , function(e){

                // success, "onload" catched
                // now we can do specific stuff:
                imageFit(element);
            });
            function imageFit(img) {
                $timeout(function () {
                    layout_img(element, img.width, img.height);
                }, 0)

            }

            /**参数说明
             *	box : 是jquery对象 放图片的盒子
             *	img_w : 图片真实宽度
             *	img_h : 图片真实高度
             **/
            // -----------------调用方法实现图片居中--------------------

            function layout_img(box,img_w,img_h){
                var img = box.find('img');
                var box_w = box.width();
                var box_h = box.height();
                var real_w = img_w;
                var real_h = img_h;
                var scale = real_w/real_h;
                if(scale >= 1 ){//横图、等宽等高
                    box.find('img').css('marginLeft',- (real_w*(box_h/real_h))/2 ).addClass('m_h');
                }else if( scale < 1){//竖图
                    box.find('img').css('marginTop',- (real_h*(box_w/real_w))/2 ).addClass('m_s');
                }
            }

        }
    };
});