import { fixBounds } from "../../utils/window";

export function positionContextMenu(el: HTMLElement, mouse: MouseEvent) {
    el.style.left = mouse.x + 'px';
    el.style.top = mouse.y + 'px';

    fixBounds(el, mouse);

    el.focus()
}