export function fixWindowBounds(el: HTMLElement) {
    if (!el) {
        return;
    }

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
}

export function overlapWindow(windowEl: HTMLElement) {
    (document.querySelectorAll('.window') as NodeListOf<HTMLElement>)
        .forEach(el => el.style.zIndex = '9'.repeat(3));

    windowEl.style.zIndex = '9'.repeat(4);
}

export function expandWindow(windowEl: HTMLElement) {
    const windowContent = windowEl.querySelector('.window__content')! as HTMLElement;
    
    windowContent.style.width = window.innerWidth + 'px';
    windowContent.style.height = window.innerHeight + 'px';
}

export function moveWindow(el: HTMLElement, mouse: MouseEvent) {    
    el.style.top = el.offsetTop + mouse.movementY * 1.05 + 'px';
    el.style.left = el.offsetLeft + mouse.movementX * 1.05 + 'px';

    fixWindowBounds(el);
}

export const createWindowId = (unit_uuid: string) => `window-${unit_uuid}`
export function getWindowById(unit_uuid: string) {
    return document.querySelector('.' + createWindowId(unit_uuid))! as HTMLElement;
}