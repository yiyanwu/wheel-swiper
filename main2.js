class Carousel {
    constructor(root,animation) {
        this.animation = animation || ((fromNode,toNode,callback) => callback())
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
        this.dotsCt.onclick = (e) => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)
            this.setPanels(index, this.index)
            this.setDots(index)
        }

        this.pre.onclick = (e) => {
            this.setPanels(this.preIndex, this.index)
            this.setDots(this.preIndex)  //Dots会发生变化，所以先设置其他的，最后设置Dots
        }

        this.next.onclick = (e) => {
            this.setPanels(this.nextIndex, this.index)
            this.setDots(this.nextIndex)
        }
    }

    /* 操作图片*/
    setPanels(toIndex, fromIndex) {
        this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
            this.panels.forEach(a => a.style.zIndex = 1)
            this.panels[toIndex].style.zIndex = 10
        })
    }

    /* 操作下标点*/
    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')   
    }
}

function fade(fromNode,toNode,callback){    
    let opacityShow = 1
    let opacityHide = 0
    let step = 0.04
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 9
    
    function fromNodeAnimation () {
        if(opacityShow > 0){
            opacityShow -= step
            fromNode.style.opacity = opacityShow
            requestAnimationFrame(fromNodeAnimation)
        } else {
            opacityShow = 0
        }
    }
    function toNodeAnimation () {
        if(opacityHide < 1) {
            opacityHide += step
            toNode.style.opacity = opacityHide
            requestAnimationFrame(toNodeAnimation)
        } else {
            opacityHide = 1
            callback()
        }
    }
    
    fromNodeAnimation()
    toNodeAnimation()
}

document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel,fade))