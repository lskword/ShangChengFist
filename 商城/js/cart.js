var oTable=document.querySelector('#cart-table');
var oLogin=document.querySelector('#login');
var oName=document.querySelector('#username');
var oEit=document.querySelector('#eit');
if (localStorage.username) {
	 oName.style.display='block';
	 oEit.style.display='block';
	 oName.innerText=localStorage.username;
	 oLogin.style.display='none';
}

var goodsSum=[];
var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {token: localStorage.token}, function(err, responseText){
	var json = JSON.parse(responseText);
	// console.log(json);
	var data = json.data;
	// console.log(data);
	// window.data=data;
	for (var i = 0; i < data.length; i++) {
		var obj = data[i];
		//一件商品的总价
		oTable.innerHTML += `
											<tr>
												<td name="goods_id">${obj.goods_id}</td>
												<td><img src="${obj.goods_thumb}" ></td>
												<td>${obj.goods_name}</td>
												<td><input data-id="${obj.goods_id}" type="number" name="number" min="1" max="10" value="${obj.goods_number}" /></td>
												<td>${obj.goods_price}</td>
												<td name="sum" class='lsk'>
												${obj.goods_price * obj.goods_number}</td>
												<td><input data-id="${obj.goods_id}" type="button" name="delete" value="删除" style='widght:40px;height:40px;color:red;'></td>
											</tr>
											`;
											obj.goods_sum = obj.goods_price * obj.goods_number;
											goodsSum.push(obj.goods_sum);
											obj.goods_sum+=obj.goods_sum;
	// getSum()
}
// console.log(goodsSum);
		qiuhe(goodsSum);
			function qiuhe() {
				var goodsSums=0;
				for (var i = 0; i < goodsSum.length; i++) {
					goodsSums+=goodsSum[i];
				}
				// console.log(goodsSums)
       oSum.innerText=goodsSums;
		 }
// console.log(goodsSum);
// return window.goodsSum=goodsSum;
// getSum1(goodsSum);
});

oTable.onchange = function(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	if (target.name === 'number') {
		//如果输入的内容不是数字，我们默认改成1
		if (isNaN(parseInt(target.value))) {
			target.value = 1;
		}
		// console.log(target.value, target.dataset.id);
		//得到商品的ID
		var goods_id = target.dataset.id;
		//得到商品的数量
		var number = target.value;
		//请求api修改购买的商品数量
		myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
		{goods_id, number},
		function(err, responseText) {
			var json = JSON.parse(responseText);
			// console.log(json);
			if (json.code === 0) {
				// alert('更新购物车成功');
				//修改总价和小计
				//得到当前商品的价格
				var goods_price = parseInt(target.parentNode.nextElementSibling.innerText);
				//修改单个商品的总价：数量 * 价格
				var sh=
				target.parentNode.nextElementSibling.nextElementSibling.innerText = parseInt(target.value) * parseInt(goods_price);
				// console.log(sh);
				location.reload();
				qiuhe(goodsSum);
				//显示总价
			}
		})
	}
}
oTable.addEventListener('click', function(event){
	event = event || window.event;
	var target = event.target || event.srcElement;
	if (target.name === 'delete') {
		// if (!confirm('主人，您确定不要我了吗？')) { //当你选择的是取消则不执行任何事情
		// 	return;
		// }
		var PromptBtn=target;
		// console.log(PromptBtn);
		// console.log(Prompts);
		var fun2=function() {
			// document.body.style.backgroundColor='red';
			var goods_id = target.dataset.id;
			var number = 0;
			myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
			{goods_id, number},
			(err, responseText) => {
				var json = JSON.parse(responseText);
				// console.log(json);
				if (json.code === 0) {
					// alert('更新购物车成功');
					//删除整个TR
					var tr = target.parentNode.parentNode;
					tr.parentNode.removeChild(tr);
					//显示总价
					// getSum1();
				qiuhe(goodsSum);
				}
			})
			location.reload();
		};
		var fun1=function() {
			// document.body.style.backgroundColor='green';
			return;
			// document.body.removeChild()
		};
		Prompts('亲，确认要删除我吗？',fun1,fun2,PromptBtn);
		//得到商品ID

	}
});
var oClearCart = document.querySelector('#clear-cart');
oClearCart.onclick = () => {
	// if (!confirm('确认要清空整个购物车吗？')) {
	// 	return;
	// }
	var fun1=function () {
		return;
	}
	var fun2=function () {
		oSum.innerText='0';
		//得到所有的商品ID
		var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
		for (var i = 0; i < oGoodsIds.length; i++) {
			var td = oGoodsIds[i];
			var goods_id = parseInt(td.innerText);
			var number = 0;
			(function(td){
				myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
				{goods_id, number},
				(err, responseText) => {
					var json = JSON.parse(responseText);
					// console.log(json);
					if (json.code === 0) {
						// toasts('更新购物车成功');
						//删除整个TR
						var tr = td.parentNode;
						tr.parentNode.removeChild(tr);
						//显示总价
						// getSum1();
				qiuhe(goodsSum);
					}
				});
			})(td);
		}
	}
	Prompts('亲，确认要清空购物车吗？',fun1,fun2,oClearCart);
};
// }

function Prompts(str,fun1,fun2) {
	// console.log(oPromptBtn);
  // oPromptBtn=function (){
	// event=event||window.event;
	var oPromptDiv=document.createElement('div');
	document.body.appendChild(oPromptDiv);
	oPromptDiv.id='oprompts';
	oPromptDiv.innerHTML=`
							<p>'${str}'</p>
							<button id="confirm">确定</button>
							<button id='cancel'>取消</button>
								`
		var oConfirm=document.querySelector('#confirm');
		var oCancel=document.querySelector('#cancel');
		oCancel.onclick=function () {
			document.body.removeChild(oPromptDiv);
			fun1();
		}
		oConfirm.onclick=function () {
			document.body.removeChild(oPromptDiv);
			fun2();
		}
	// };
}
// var fun2=function() {
// 	document.body.style.backgroundColor='red';
// };
// var fun1=function() {
// 	document.body.style.backgroundColor='green';
// };
