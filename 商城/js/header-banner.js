/**
 * Created by lx on 2017/9/11.
 */
var bigbg=document.querySelector(".big-top-banner");
var smallbg=document.querySelector(".small-top-banner");
var ofold=document.querySelector(".top-banner-fold");
var flag=false;
ofold.onclick=function(){
    flag=!flag;
    if(flag===true){
        bigbg.style.height=400+"px";
        bigbg.style.display="block";
        smallbg.style.height=0+"px";
        ofold.innerText="收起";
        ofold.className="down";
    }else{
        bigbg.style.height=60+"px";
        bigbg.style.display="none";
        smallbg.style.height=60+"px";
        ofold.innerText="展开";
        ofold.className="top-banner-fold";
    }

};