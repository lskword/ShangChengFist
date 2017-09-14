/**
 * Created by lx on 2017/9/12.
 */
var salePromotion=document.querySelector(".sale-promotion");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
    {cat_id:69,
        page:2
    },
    function(error,responseText){
        var json = JSON.parse(responseText);
        var data = json.data;
        //判断如果没有数据，则显示空的提示
        if (data.length === 0) {
            salePromotion.innerHTML = "<center>后端程序员跑路了</center>";
            return;
        }
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            salePromotion.innerHTML += `<li class="goods">
            <div class="sale-adv-word"><p class="shoptitle">${obj.goods_name}</p>
            <p class="shopprice">${obj.price}</p></div>
<a href="../web/goods.html?goods_id=${obj.goods_id}" class="salepic">
          <img src="${obj.goods_thumb}" /></a></li>`;
        }
    });
var hotsalelist=document.querySelector(".hotsalelist");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id=55',
    {},
    function(error,responseText){
        var json = JSON.parse(responseText);
        var data = json.data;
        //判断如果没有数据，则显示空的提示
        if (data.length === 0) {
            hotsalelist.innerHTML = "<center>后端程序员跑路了</center>";
            return;
        }
        for (var j = 0; j < 5; j++) {
            var obj = data[j];
            hotsalelist.innerHTML += `<li class="hotgoods">
            <div class="shopimg"><a href="../web/goods.html?goods_id=${obj.goods_id}">
                <img src="${obj.goods_thumb}" /></a>
            </div>
            <div class="shopinfo">
                <div class="icon icon${j}"></div>
                <p class="contontshop"><a href="../zujian/goods.html?goods_id=${obj.goods_id}">${obj.goods_name}</a></p>
                <p class="numbershop">
                    <span class="hotprice">￥${obj.price}</span>
                    <span class="joinnum">已售<em class="salenum">${parseInt(obj.price)*10}</em></span>
                </p>
            </div>
          </li>`;
        }
    });
var modsalelist=document.querySelector(".modsalelist");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id=62',
    {},
    function(error,responseText){
        var json = JSON.parse(responseText);
        var data = json.data;
        //判断如果没有数据，则显示空的提示
        if (data.length === 0) {
            modsalelist.innerHTML = "<center>后端程序员跑路了</center>";
            return;
        }
        for (var k = 0; k < 5; k++) {
            var obj = data[k];
            modsalelist.innerHTML += `<li><div class="goodimg">
<a href="../web/goods.html?goods_id=${obj.goods_id}">
          <img src="${obj.goods_thumb}" /></a></div>
            <p class="goodtitle">${obj.goods_name}</p>
            <p class="gooddescribe">${obj.price}</p>
</li>`;
        }
    });