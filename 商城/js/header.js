var oLogin=document.querySelector('#login');
var oName=document.querySelector('#username');
var oEit=document.querySelector('#eit');
if (localStorage.username) {
	 oName.style.display='block';
	 oEit.style.display='block';
	 oName.innerText=localStorage.username;
	 oLogin.style.display='none';
}
