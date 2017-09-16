var oLogin = document.querySelector('#login');
var oName = document.querySelector('#username');
var oEit = document.querySelector('#eit');
if (localStorage.username) {
  oName.style.display = 'block';
  oEit.style.display = 'block';
  oName.innerText = localStorage.username;
  oLogin.style.display = 'none';
}
var oGoods = document.querySelector('#goods');
console.log(oGoods);
var goods_id = getQueryString('goods_id');
var outnum = 0;
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {
  // goods_id: goods_id ES5
  goods_id: goods_id,
  // number:outnum,//ES6
}, function(err, responseText) {
  var json = JSON.parse(responseText);
  var obj = json.data[0];
  // console.log(json);
  oGoods.innerHTML = `
<div class="clearfix">
	<div class="preview-pic">
			<img src="${obj.goods_thumb}" style='height:390px;'>
</div>
<div class="preview-main">
	<h3 class="detail-title">${obj.goods_name}</h3>
	<div class="detail-panel">
			<div class="detail-metatit">
				<label>促销价</label>
				<div class="promo-price">
					<em class="cinf">￥</em>
					<b>${obj.price}</b>
					<em class="tm-promo-type"><i></i>限时促销</em>
				</div>
		 </div>
		 <div class="detail-metatit">
				<label>价格</label>
				<div class="shopoldtitle">
					<span class="oldprice">￥${parseInt(obj.price)+100}</span>
				</div>
		 </div>
	</div>
	<div class="info-item">
	<label class="infolbl">数量</label>
	<div class="calnum">
	<input type="text" class="sumnum">
	<span class="amount-btn">
			<span class="addup"></span>
			<span class="adddown"></span>
	</span>
	</div>
	</div>
	<div>
	<button id="add-to-cart">
	<i class="icon-shopping-cart"></i>添加到购物车
	</button>
	<button id="add-to-cart1" style='color:#fff;'>立即购买</button>
	</div>
</div>
</div>
`;
  var oAddToCart1=document.querySelector('#add-to-cart1');
  var sumnum = document.querySelector(".sumnum");
  var addup = document.querySelector(".addup");
  var adddown = document.querySelector(".adddown");
  oAddToCart1.onclick=function () {
      if (!localStorage.token) {
        toasts('主人要先登录，才能购买哦！');
        //把当前商品的详细地址存储到localStorage.backurl
        localStorage.backurl = location.href;
        //跳转到登录页
        var timers=setTimeout(function(){
          location.href = "login.html";
        },3000);
        return;
      }
      if (nums === 0) {
        nums = 1;
      }
      myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
          goods_id: goods_id,
          number: nums
        },
        function(err, responseText) {
          // var json = JSON.parse(responseText);
          // console.log(json);
          // if (json.code === 0) {
          //   toasts_one('恭喜主人，宝贝已添加到购物车！');
          // } else if (json.code === 1004) {
          //   toasts('主人，请登录账户');
          // } else if (json.code === 1002) {
          //   toasts('账户过期，请从新登陆');
          //   setTimeout(function(){
          //     localStorage.username = '';
          //     location.reload();
          //   },3000);
          // }else if (json.code === 2) {
  				// 		toasts_one('主人，宝贝已经添加到购物车了！')
          // }
          toasts('添加成功！');
          setTimeout(function () {
            location.href='order.html';
          },1000);
  });


  };
  sumnum.value = 1;
  addup.onclick = function() {
    sumnum.value++;
    outnum = sumnum.value;
    vb();
  };
  adddown.onclick = function() {
    sumnum.value--;
    if (sumnum.value < 1) {
      sumnum.value = 1;
    }
    outnum = sumnum.value;
    vb();
  };

});
var nums = 0;

function vb() {
  nums = outnum;
}

myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
  goods_id: goods_id,
  number: nums
}, function(error, responseText) {
  var json = JSON.parse(responseText);

  console.log(json);
  // if (json.code===2) {
  // 	myajax.post('http://h6.duchengjiu.top/shop/api_user.php',{
  // 		status:'login',
  // 		username,
  // 		password
  // 	},function (error,responseText) {
  // 		var json=JSON.parse(responseText)
  // 		localStorage.token=json.token;
  // 	})
  // }

});

document.body.onclick = function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.id === 'add-to-cart') {
    if (!localStorage.token) {
      toasts('主人要先登录，才能购买哦！');
      //把当前商品的详细地址存储到localStorage.backurl
      localStorage.backurl = location.href;
      //跳转到登录页
      var timers=setTimeout(function(){
        location.href = "login.html";
      },3000);
      return;
    }
    if (nums === 0) {
      nums = 1;
    }
    myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
        goods_id: goods_id,
        number: nums
      },
      function(err, responseText) {
        var json = JSON.parse(responseText);
        console.log(json);
        if (json.code === 0) {
          toasts_one('恭喜主人，宝贝已添加到购物车！');
        } else if (json.code === 1004) {
          toasts('主人，请登录账户');
        } else if (json.code === 1002) {
          toasts('账户过期，请从新登陆');
          setTimeout(function(){
            localStorage.username = '';
            location.reload();
          },3000);
        }else if (json.code === 2) {
						toasts_one('主人，宝贝已经添加到购物车了！')
        }
});
  }
};
function toasts(str) {
  var oPrompt=document.createElement('div');
  document.body.appendChild(oPrompt);
  console.log(oPrompt);
  oPrompt.id='oprompts';
  oPrompt.innerText=str;
}
function toasts_one(str){
  var oPrompt=document.createElement('div');
  document.body.appendChild(oPrompt);
  // console.log(oPrompt);
  oPrompt.id='oprompts';
  oPrompt.innerHTML=`
                    <p>'${str}'</p>
                    <p>
                    <button id='see'><a href='hotshop.html'>再去看看</a></button>
                    <button id='gocart'><a href='cart.html'>前往购物车</a></button>
                    </p>
                    `
}
