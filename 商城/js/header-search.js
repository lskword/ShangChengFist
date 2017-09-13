var oText=document.querySelector('#search-k>input[type=text]');
var oSubmit=document.querySelector('#search-k>input[type=submit]');
oSubmit.onclick=function () {
	myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?',{
	},function (error,responseText) {
		var json=JSON.parse(responseText)
		location.href='hotshop.html?search_text='+oText.value;
	})
}
