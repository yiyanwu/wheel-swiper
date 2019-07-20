const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

let tagA = $$('.carousel .panels a')
let tagSpan = $$('.carousel .action .dots span')



$('.carousel .action .dots').onclick = function (e) {
    if(e.target.tagName !== 'SPAN') return
    let index = Array.from(tagSpan).indexOf(e.target)

    setZIndex(index)
    setActive(index)
}

$('.carousel .action .pre').onclick = function (e) {
    let index = Array.from(tagSpan).indexOf($('.carousel .action .active'))
    let preIndex = (index - 1 + tagA.length) % tagA.length
    
    setZIndex(preIndex)
    setActive(preIndex)
}

$('.carousel .action .next').onclick = function (e) {
    let index = Array.from(tagSpan).indexOf($('.carousel .action .active'))
    let nextIndex = (index + 1) % tagA.length

    setZIndex(nextIndex)
    setActive(nextIndex)
}




/* helper */

function setZIndex(index) {
    tagA.forEach(a => a.style.zIndex = 1)
    tagA[index].style.zIndex = 10
}

function setActive(index) {
    tagSpan.forEach(dot => dot.classList.remove('active'))
    tagSpan[index].classList.add('active')
}