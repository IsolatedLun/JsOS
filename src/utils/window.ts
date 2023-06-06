export function fixBounds(el: HTMLElement, mouse: MouseEvent) {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    if(mouse.x + el.offsetWidth > screenW) {
        el.style.left = (screenW - el.offsetWidth) + 'px'
    }

    if (mouse.y + el.offsetHeight > screenH) {
        el.style.top = (screenH - el.offsetHeight) + 'px'
    }
}

export function moveWindow(el: HTMLElement, mouse: MouseEvent) {
    el.style.top = mouse.y + 'px';
    el.style.left = mouse.x + 'px';

    fixBounds(el, mouse);
}