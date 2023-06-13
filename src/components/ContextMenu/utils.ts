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

export function positionContextMenu(el: HTMLElement, mouse: MouseEvent) {
    el.style.left = mouse.clientX + 'px';
    el.style.top = mouse.clientY + 'px';

    fixContextMenuBounds(el, mouse);

    el.focus()
}