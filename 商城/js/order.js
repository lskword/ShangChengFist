
var oOrder = document.querySelector('#order');
myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {token: localStorage.token}, function(err, responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    var data = json.data;
    if (data.length === 0) {
        oOrder.innerHTML = "<h3>您的订单为空</h3>";
        return;
    }
    var toatlPrices=0;
    for (var i = 0; i < data.length; i++) {
        let obj = data[i];
        //遍历商品列表，拼装HTML
        let goodsHTML = '';
        for (let j = 0; j < obj.goods_list.length; j++) {
            let goods = obj.goods_list[j];
            goodsHTML += `
            <div>
              <p style='width:220px;float:left;height:100px;'>${goods.goods_name}</p>
              <img src="${goods.goods_thumb}" style='float:left;'>
              <dl style='float.left'>
                <dd>单价：${goods.goods_price}</dd>
                <dd>数量：${goods.goods_number}</dd>
                <dd>小计：${goods.goods_price * goods.goods_number}</dd>
              </dl>
            </div>

          `;
           toatlPrices+=goods.goods_price * goods.goods_number;

        }
        //一件商品的总价
        oOrder.innerHTML += `
                          <li>
                            <div class="title">
                              收货人：${obj.consignee}
                             总价:${toatlPrices}
                             <span data-id="${obj.order_id}" class="cancel-order">取消订单</span>
                             </div>
                            <div class="order-goods">
                            ${goodsHTML}
                            </div>
                          </li>
                          `;
    }
});

oOrder.onclick = function(event) {
    event = event || window.event;
    let target = event.target || event.srcElement;
    if (target.className === 'cancel-order') {
        if (!confirm('确认要取消订单吗?')) {
            return;
        }
        let order_id = target.dataset.id;
        myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
            let json = JSON.parse(responseText);
            if (json.code === 0) {
                var oli=target.parentNode.parentNode;
                oli.parentNode.removeChild(oli);
                alert('订单取消成功');
            }
        });
    }
};
var oSettelment=document.querySelector('#settlement>button');
var oWindo=document.querySelector('#windo');
var oWindos=document.querySelector('#windos');
oSettelment.onclick=function () {
  console.log(oWindo);
  console.log(oWindos);
  oWindo.style.display='none';
  oWindos.style.display='block';
};

var oZfbEit=document.querySelector('#zfb>button');
oZfbEit.onclick=function () {
  oWindo.style.display='block';
  oWindos.style.display='none';
};
