// JavaScript Document
/*;(function(win,doc){
  function change(){
    doc.documentElement.style.fontSize=doc.documentElement.clientWidth/10+'px';        
  }
  win.addEventListener('resize',change,false);
  win.addEventListener('DOMContentLoaded',change,false);
})(window,document);*/


$(function(){
  /*window.onscroll = function(){
    return false;
  }*/
var obj = $("body");
var startY = 0;//手指按下时的坐标
var endY = 0;//手指离开时的坐标
var startY1 = 0;//职位滑动
var endY1 = 0;//职位滑动
var p_slide = 1;//职位滑动
var isgo =true;
var slide_index=0;//当前显示第几屏0-5
obj.on('touchstart', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
         // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        startY = touch.pageY;
        endY = startY;
        }
}, false);


obj.on('touchmove', function(event) {
  event.preventDefault();
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        endY = touch.pageY;
        }
}, false);


var ptimer = setInterval(function(){
    var $html = $(".o_active .showTime time").html();
    $html--;
    if($html=="0"){
      $html = "0";
      clearInterval(ptimer);
    }
    $(".showTime time").html($html);
  },1000);

obj.on('touchend', function(event) {
        if(isgo == true && !$('.index5').hasClass('active')){
        if(endY-startY>100 ){//上一屏
          isgo = false;
          //如果为第1屏 上一屏应该是4 不是0
          slide_index == 0?slide_index = 4:slide_index --;
          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings("div").css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');

          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');

          if($(".index1").hasClass("o_active")){
            clearInterval(ptimer);
            var $html = "60";
            ptimer = setInterval(function(){
              $html--;
              if($html=="0"){
                $html = "0";
                clearInterval(ptimer);
              }
              $(".showTime time").html($html);
            },1000);
          }

          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?4:slide_index-1).attr('id', 's');
            $(".o_slide").eq((slide_index+1)>4?0:slide_index+1).attr('id', 'x');
            isgo=true;
          },1000)
          
        }
        else if(startY-endY>100 ){//下一屏
          //如果为第4屏 下一屏应该是1 不是5
          isgo = false;
          slide_index == 4?slide_index = 0:slide_index ++;

          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings("div").css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');

          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');

          //$(".showTime time").html("60");
          if($(".index1").hasClass("o_active")){
            clearInterval(ptimer);
            var $html = "60";
            ptimer = setInterval(function(){
              $html--;
              if($html=="0"){
                $html = "0";
                clearInterval(ptimer);
              }
              $(".showTime time").html($html);
            },1000);
          }

          //$("#z .proLineLeft").addClass('animated bounceInLeft');
          
          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?4:slide_index-1).attr('id', 's');;
            $(".o_slide").eq((slide_index+1)>4?0:slide_index+1).attr('id', 'x');
            isgo = true;
          },1000)
          
        } 
      }
        startY =0;
        endY = 0;
}, false);


  //play music
  var music  = document.getElementById('music');
  var audios = document.querySelectorAll('.audio');
  audios[0].volume  -= 0.2;
  music.addEventListener('touchstart',function(){
    if(audios[0].paused){
      audios[0].play();
      audios[1].play();
      this.classList.add("musicPlay");
    }else{
      audios[0].pause();
      audios[1].pause();
      this.classList.remove("musicPlay");
    }
  });

});

