# 介绍

1. 基于原生JS做的一个轮播轮子
2. 支持三种动画效果 
fade 渐隐效果
zoom 放大消失
zoomOut 缩小从随机方向消失


## 基本用法

1. HTML
```
<link rel="stylesheet" href="./style.css">
<body>
    /* 如需要切换动画效果 */
    <div class="select"> <span>选择轮播效果</span>
        <select>
            <option value="fade">fade</option>
            <option value="zoom">zoom</option>
            <option value="zoomOut">zoomOut</option>
        </select>
    </div>

    <div class="carousel">
        <div class="panels">
            <a href=""><img src="./img/1.jpg"></a>
            <a href=""><img src="./img/2.jpg"></a>
            <a href=""><img src="./img/3.jpg"></a>
            <a href=""><img src="./img/4.jpg"></a>
        </div>
        <div class="action">
            <span class="pre">上一页</span>
            <span class="next">下一页</span>
            <div class="dots">
                <span class="active"></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <script src="./main.js"></script>
    </body>
```
2. JS
```
...
const carousel = new Carousel(document.querySelector('.carousel'),Animation.fade(300)) //默认400
//其他两种动画方式的调用方法.做了一个400毫秒的函数防抖，超过400连续点击的话，默认参数如下
//const carousel = new Carousel(document.querySelector('.carousel'),Animation.zoom(5,1000))   
//const carousel = new Carousel(document.querySelector('.carousel'),Animation.zoomOut(0.01,1000))

/* 如果需要切换动画效果 需配合HTML使用*/
document.querySelector('select').onchange = function (e) { 
    carousel.setAnimation(Animation[this.value]())
}
```
