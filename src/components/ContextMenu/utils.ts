import { fixContextMenuBounds } from "../../utils/window";

export function positionContextMenu(el: HTMLElement, mouse: MouseEvent) {
    el.style.left = mouse.offsetX + 'px';
    el.style.top = mouse.offsetY + 'px';

    fixContextMenuBounds(el, mouse);

    el.focus()
}