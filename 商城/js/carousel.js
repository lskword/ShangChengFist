var index = 0;
var oRightBtn = document.getElementById('carousel_rightBtn');
var oLeftBtn = document.getElementById('carousel_leftBtn');
var oImagesLists = document.getElementById('imagesList').getElementsByTagName('li');
var oCirclesLists = document.getElementById('circles').getElementsByTagName('li');
oRightBtn.onclick = function(){
  index++;
  if (index >= oImagesLists.length) {
    index = 0;
  }
  move();
};
oLeftBtn.onclick = function(){
  index--;
  if (index < 0) {
    index = oImagesLists.length-1;
  }
  move();
};
for (var i = 0; i < oCirclesLists.length; i++) {
  (function(i){
    oCirclesLists[i].onmouseover = function() {
      index = i;
      move();
    };
  })(i);
}
function move() {
  for (var i = 0; i < oImagesLists.length; i++) {
    oImagesLists[i].className = '';
  }
  oImagesLists[index].className = 'current';

  for (var j = 0; j < oCirclesLists.length; j++) {
    oCirclesLists[j].className = '';
  }
  oCirclesLists[index].className = 'current';
}
(function(){
  var timer=setInterval(function functionName() {
       oRightBtn.onclick();
  },3000);
  var CarouselHref=[
    'http://mall.iqiyi.com/kszt/xuanyuan170822.html?innerPath=xuanyuan_20170822',
    'http://mall.iqiyi.com/kszt/applepros20170908.html?innerPath=apple_9.8',
    'http://mall.iqiyi.com/kszt/jdbeer20170908.html?innerPath=jdzq0908',
    'http://mall.iqiyi.com/kszt/textile170906.html?innerPath=zty_jf9.7',
    'http://mall.iqiyi.com/kszt/textile170906.html?innerPath=zty_jf9.7'];
    var Carousels=document.querySelectorAll('#imagesList>ul>li>a');
    for(var i=0;i<Carousels.length;i++){
        Carousels[i].href =CarouselHref[i];
    }
})();
