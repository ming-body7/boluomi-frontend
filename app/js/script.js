/**
 * Created by body7 on 11/11/15.
 */
function loadScript() {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=1.5&ak=5U8M51SeGixHSOHsMzKLt1NG";
    document.body.appendChild(script);




}



window.onload = loadScript;