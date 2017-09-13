var oHotCrentBox=document.querySelector('#hot-crent-box');
var cat_id=getQueryString('cat_id');
var search_text=getQueryString('search_text');
if(cat_id===null){
  var pagesize=10;
}else {
  var pagesize=cat_id;
}
if (search_text===null) {
  myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',{
  cat_id:cat_id,
  pagesize:50
  },function (error,responseText) {
        var json=JSON.parse(responseText);
        var data=json.data;
        for(var i=0;i<data.length;i++){
          var obj=data[i];
          var oHotCrent=document.createElement('div');
          oHotCrent.id='hot-crent';
          oHotCrentBox.appendChild(oHotCrent);
          oHotCrent.innerHTML+=`<a href='goods.html?goods_id=${obj.goods_id}'><dl>
                                <dt><img src='${obj.goods_thumb}'/></dt>
                                <dd>${obj.goods_name}</dd>
                                <dd>
                                  <i>今日特卖</i>
                                </dd>
                                </dl>
                                <p>
                                  <span id='hot-crent-price'>￥${obj.price}</span>
                                  <span id='hot-crent-sell'>已售${obj.goods_id}</span>
                                </p>
                                </a>`

        }
        var b=document.querySelector('#hot-crent>a>dl');
        console.log(1)
  });
}else {
  myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',{
  search_text,
  pagesize:40
  },function (error,responseText) {
        var json=JSON.parse(responseText);
        var data=json.data;
        for(var i=0;i<data.length;i++){
          var obj=data[i];
          var oHotCrent=document.createElement('div');
          oHotCrent.id='hot-crent';
          oHotCrentBox.appendChild(oHotCrent);
          oHotCrent.innerHTML+=`<a href='goods.html?goods_id=${obj.goods_id}'><dl>
                                <dt><img src='${obj.goods_thumb}'/></dt>
                                <dd>${obj.goods_name}</dd>
                                <dd>
                                  <i>今日特卖</i>
                                </dd>
                                </dl>
                                <p>
                                  <span id='hot-crent-price'>￥${obj.price}</span>
                                  <span id='hot-crent-sell'>已售${obj.goods_id}</span>
                                </p>
                                </a>`

        }
  });
}
