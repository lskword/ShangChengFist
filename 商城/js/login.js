var oUsername = document.querySelector('input[type=text]');
var oPassword = document.querySelector('input[type=password]');
var oSubmit = document.querySelector('input[type=button]');
var oPrompt = document.querySelector('#prompt');
var oP = document.createElement('p');
var oEit=document.querySelector('#eit');
document.body.addEventListener('click',function () {

},true)

oSubmit.addEventListener('click', function(e) {
	// body..
oP.innerText='';
	event = event || window.event;
	myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
		status: 'login',
		username: oUsername.value,
		password: oPassword.value
	}, function(error, responseText) {
		var json = JSON.parse(responseText);
		console.log(json.code);
		if (json.code ===0) {
			localStorage.token=json.data.token;
			localStorage.username=json.data.username;
			var timer = setInterval(function() {
				location.href = 'index.html'
			}, 3000);
		} else {
			json.message=json.message==='少传参数username'?
			'请输入账户密码':json.message;
			oP.innerText = json.message;
			oPrompt.appendChild(oP);
		}
	})
});
