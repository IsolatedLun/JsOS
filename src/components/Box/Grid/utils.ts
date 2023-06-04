import { GRID_CHILD_STR } from "../../../consts/consts";

/**
 * @param gridEl
 * @summary Selects all grid children and sets the indices according to their position and returns the indices.
 */
export function autoIndexGridChildren(gridEl: HTMLElement) {
    const gridChildren = gridEl.querySelectorAll('.grid-area-child') as NodeListOf<HTMLElement>;
    let children = []
    for(let i = 0; i < gridChildren.length; i++) {
        children.push(GRID_CHILD_STR + (i + 1))
        gridChildren[i].style.gridArea = GRID_CHILD_STR + (i + 1);
    }

    return children
}

/**
 * @param gridEl
 * @summary Converts a list of numbers into a grid area row. Example: [1, 2] => "child-1 child-2"
 */
export function createGridRow(row: number[]) {
    return `"${GRID_CHILD_STR + row.join(' ' + GRID_CHILD_STR)}"`
}