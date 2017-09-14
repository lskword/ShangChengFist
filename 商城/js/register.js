var oUsername = document.querySelector('input[type=text]');
var oPassword1 = document.querySelector('input[name=password1]');
var oPassword2 = document.querySelector('input[name=password2]');
var oPrompt = document.querySelector('#prompt');
var oSubmit = document.querySelector('input[type=button]');
oSubmit.addEventListener('click', function() {
	// body...
	if (oPassword1.value === oPassword2.value) {
		oPrompt.innerText='';
		myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
			status: 'register',
			username: oUsername.value,
			password: oPassword1.value
		}, function(error, responText) {

			var json = JSON.parse(responText);
			console.log(json);
				json.message =json.message == '少传参数username'?
				 '请输入账户密码': json.message;
				 	oPrompt.innerText=json.message;
					if(json.code===0){
						oPrompt.innerText+='3秒后跳转登录页面...'
						var timer=setInterval(function () {
								location.href='login.html';
						},3000)
					}
		})
	}else{
		oPrompt.innerText = '';
		oPrompt.innerText = '两次密码输入的不一样';
	}
});
