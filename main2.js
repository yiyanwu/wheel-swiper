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

    bind() {
        this.dotsCt.onclick = (e) => {
            if (e.target.tagName !== 'SPAN') return
            let index = this.dots.indexOf(e.target)
            this.setZIndex(index)
            this.setActive(index)
        }

        this.pre.onclick = (e) => {
            let index = this.dots.indexOf(this.dotsCt.querySelector('.active'))
            let preIndex = (index - 1 + this.panels.length) % this.panels.length

            this.setZIndex(preIndex)
            this.setActive(preIndex)
        }

        this.next.onclick = (e) => {
            let index = this.dots.indexOf(this.dotsCt.querySelector('.active'))
            let nextIndex = (index + 1) % this.panels.length

            this.setZIndex(nextIndex)
            this.setActive(nextIndex)
        }
    }

    setZIndex(index) {
        this.panels.forEach(a => a.style.zIndex = 1)
        this.panels[index].style.zIndex = 10
    }

    setActive(index) {
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.dots[index].classList.add('active')
    }
}

document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))