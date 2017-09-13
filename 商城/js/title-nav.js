/**
 * Created by lx on 2017/9/11.
 */
var oul = document.querySelector('.nav-box');
var cat_id=getQueryString('cat_id');
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText) {
    var json = JSON.parse(responseText);
    var data = json.data;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        oul.innerHTML += `<li><a href="hotshop.html?cat_id=${data[i].cat_id}">${data[i].cat_name}</a></li>`;
    }});
