export function fixWindowBounds(el: HTMLElement, mouse: MouseEvent) {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    if(el.offsetLeft + el.offsetWidth / 2 > screenW) {
        el.style.left = (screenW - el.offsetWidth / 2 )+ 'px'
    }

    if(el.offsetLeft - el.offsetWidth / 2 < 0) {
        el.style.left = el.offsetWidth / 2 + 'px';
    }

    if (el.offsetTop + el.offsetHeight / 2 > screenH) {
        el.style.top = (screenH - el.offsetHeight / 2) + 'px'
    }

    if (el.offsetTop - el.offsetHeight / 2 < 0) {
        el.style.top = el.offsetHeight / 2 + 'px'
    }
    

    console.log(el.offsetTop)
}

export function fixContextMenuBounds(el: HTMLElement, mouse: MouseEvent) {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    if(el.offsetLeft + el.offsetWidth > screenW) {
        el.style.left = (screenW - el.offsetWidth) + 'px'
    }

if (el.offsetTop + el.offsetHeight > screenH) {
        el.style.top = (screenH - el.offsetHeight) + 'px'
    }
}

export function moveWindow(el: HTMLElement, mouse: MouseEvent) {
    el.style.top = el.offsetTop + mouse.movementY + 'px';
    el.style.left = el.offsetLeft + mouse.movementX + 'px';

    fixWindowBounds(el, mouse);
}