var oResetBox=document.createElement('div');
oResetBox.id='reset-box';
oResetBox.style.display='none';
var oResetBoxP1=document.createElement('p');
oResetBoxP1.innerText='^';
var oResetBoxP2=document.createElement('p');
oResetBoxP2.innerText='Top';
var oSearchbox=document.querySelector('#searchbox');
var oNavWrap=document.querySelector('.nav-wrap');
document.body.appendChild(oResetBox);
oResetBox.appendChild(oResetBoxP1);
oResetBox.appendChild(oResetBoxP2);
window.onscroll=function(){
  var resetnum=
  document.documentElement.scrollTop||
  document.body.scrollTop;
  if(resetnum>100){
    oSearchbox.style.position='fixed';
    oSearchbox.style.top=0+'px';
    oSearchbox.style.backgroundColor='#fff';
    oNavWrap.style.position='fixed';
    oNavWrap.style.top=85+'px';
  }else if(resetnum<100){
    oSearchbox.style.position='';
    oSearchbox.style.top=0+'px';
    oSearchbox.style.backgroundColor='#fff';
    oNavWrap.style.position='';
    oNavWrap.style.top=0+'px';
  }
  if (resetnum>600) {
    oResetBox.style.display='block';
  }else if(resetnum<600) {
    oResetBox.style.display='none';
  }
};
oResetBox.onclick = function() {
  scrollAnimate(0, 600);
  // document.body.scrollTop = document.documentElement.scrollTop = 0;
};

function scrollAnimate(target, timer) {
  var interval = 20;
  var frame = 0;
  var frames = timer / interval;
  var start = document.body.scrollTop || document.documentElement.scrollTop;
  var distance = target - start;
  var timer;
  clearInterval(timer);
  timer = setInterval(function(){
    frame++;
    if (frame >= frames) {
      clearInterval(timer);
    }
    //第一个参数t表示当前帧
    //第二个b表示起始位置
    //第三个c表示变化量
    //第四个d表示总帧数
    document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
  }, interval);

function CubicEaseInOut(t,b,c,d){
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
}
