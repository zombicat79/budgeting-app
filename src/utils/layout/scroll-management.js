function scrollBlock(element) {
    document.querySelector(element).style.overflow = "hidden";
}

function scrollUnblock(element) {
    document.querySelector(element).style.overflow = "initial";
}

function goTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

export { scrollBlock, scrollUnblock, goTop };