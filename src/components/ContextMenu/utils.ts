export function positionContextMenu(el: HTMLElement, mouse: MouseEvent) {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    if(mouse.x + el.offsetWidth > screenW) {
        el.style.left = (screenW - el.offsetWidth) + 'px'
    }
    
    else {
        el.style.left = mouse.x + 'px';
    }

    if (mouse.y + el.offsetHeight > screenH) {
        el.style.top = (screenH - el.offsetHeight) + 'px'
    }

    else {
        el.style.top = mouse.y + 'px'; 
    }

    window.setTimeout(() => el.focus(), 0);
}