class Carousel {
    constructor(root) {
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
            this.setPanels(index)
            this.setDots(index)
        }

        this.pre.onclick = (e) => {
            this.setPanels(this.preIndex)
            this.setDots(this.preIndex)  //Dots会发生变化，所以先设置其他的，最后设置Dots
        }

        this.next.onclick = (e) => {
            this.setPanels(this.nextIndex)
            this.setDots(this.nextIndex)
        }
    }

    setPanels(index) {
        this.panels.forEach(a => a.style.zIndex = 1)
        this.panels[index].style.zIndex = 10
    }

    setDots(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')
    }
}

document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))