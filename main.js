class Carousel {
    constructor(root,animation) {
        this.animation = animation || ((fromNode,toNode,finish) => finish())
        this.root = root
        this.dotsCt = root.querySelector('.dots')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')

        this.bind()
    }

    get index (){
        return this.dots.indexOf(this.dotsCt.querySelector('.active'))
    }
    get preIndex (){
        return (this.index - 1 + this.panels.length) % this.panels.length
    }
    get nextIndex (){
        return (this.index + 1) % this.panels.length
    }

    bind() {
        this.dotsCt.onclick = this.debounce((e) => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)
            this.setPanels(index, this.index)
            this.setDots(index)
        })

        this.pre.onclick = this.debounce((e) => {
            this.setPanels(this.preIndex, this.index)
            this.setDots(this.preIndex)  //Dots会发生变化，所以先设置其他的，最后设置Dots
        })

        this.next.onclick = this.debounce((e) => {
            this.setPanels(this.nextIndex, this.index)
            this.setDots(this.nextIndex)
        })
    }

    /* 操作图片*/
    setPanels(toIndex, fromIndex) {
        this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
            this.panels.forEach(a => a.style.zIndex = 0)
            this.panels[toIndex].style.zIndex = 10
        })
    }

    /* 操作下标点*/
    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')   
    }

    setAnimation(animation) {
        this.animation = animation
    }

    debounce(fn, interval = 400) { //做一个函数防抖，防止点击过快，轮播不好看
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
}


const Animation = (function () {
    let setStyle = (node, styles) => Object.entries(styles).forEach(([key,value]) => node.style[key] = value)
    let reset = node => node.style = ''  
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    return {
        fade (during = 400) {
            return function (from,to,finish) {
                setStyle(from,{   //初始变化的两个节点的style
                    opacity:1,
                    zIndex:10
                })
                setStyle(to,{
                    opacity:0,
                    zIndex:9 //变化时 对比其他的z-index为1的，这张显示在第二层
                })

                setTimeout(() => {
                    setStyle(from,{
                        opacity:0,
                        transition: `all ${during/1000}s`
                    })
                    setStyle(to,{
                        opacity:1,
                        transition: `all ${during/1000}s`
                    })
                },100)

                setTimeout(() => {
                    reset(from) //动画结束时，重置style，观察DOM变化明白为啥要加这个reset
                    reset(to)
                    finish && finish()
                }, during);
            }
        },

        zoom(scale = 5, during = 1000) {
            return function (from, to, onFinish) {
                setStyle(from, {
                    opacity: 1,
                    transform: `scale(1)`,
                    transition: `all ${during / 1000}s`,
                    zIndex: 10
                })
                setStyle(to, {
                    zIndex: 9
                })

                setTimeout(() => {
                    setStyle(from, {
                        opacity: 0,
                        transform: `scale(${scale})`
                    })

                }, 100)


                setTimeout(() => {
                    reset(from)
                    reset(to)
                    onFinish && onFinish()
                }, during)

            }
        },

        zoomOut(scale = 0.01, during = 1000) {
            return function (from, to, onFinish) {
                let number1 = random(-100,100) //生成一个随机数 
                let number2 = random(-100, 100)
                setStyle(from, {
                    opacity: 1,
                    transform: `scale(1) translate(0,0)`,
                    transition: `all ${during / 1000}s`,
                    zIndex: 10
                })
                setStyle(to, {
                    zIndex: 9
                })

                setTimeout(() => {
                    setStyle(from, {
                        opacity: 0,
                        transform: `scale(${scale}) translate(${number1}%,${number2}%)` //每次都是不一样的translate方位
                    })

                }, 100)


                setTimeout(() => {
                    reset(from)
                    reset(to)
                    onFinish && onFinish()
                }, during)

            }
        }
    }

})()



const carousel = new Carousel(document.querySelector('.carousel'),Animation.fade(300)) //默认400
//其他两种动画方式的调用方法.做了一个400毫秒的函数防抖，超过400连续点击的话，默认参数如下
//const carousel = new Carousel(document.querySelector('.carousel'),Animation.zoom(5,1000))   
//const carousel = new Carousel(document.querySelector('.carousel'),Animation.zoomOut(0.01,1000))

document.querySelector('select').onchange = function (e) {
    carousel.setAnimation(Animation[this.value]())
}