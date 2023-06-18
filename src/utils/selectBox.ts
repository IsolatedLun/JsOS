import { ATTR_SYSTEM_FILE } from "../consts/consts";

export function drawSelectBox(
	mouseStart: MouseEvent,
	mouse: MouseEvent,
	containerEl: HTMLElement,
	boxEl: HTMLElement
): string[] {
	const containerRect = containerEl.getBoundingClientRect();

	const startX = mouseStart.clientX - containerRect.left;
    const startY = mouseStart.clientY - containerRect.top;

	const currentX = mouse.clientX - containerRect.left;
    const currentY = mouse.clientY - containerRect.top;

	// ChatGPT
	// Calculate the dimensions of the selection box
	const minX = Math.min(startX, currentX);
	const minY = Math.min(startY, currentY);
	const maxX = Math.max(startX, currentX);
	const maxY = Math.max(startY, currentY);
	const width = maxX - minX;
	const height = maxY - minY;

	// Update the position and size of the selection box
	boxEl.style.left = minX + 'px';
	boxEl.style.top = minY + 'px';
	boxEl.style.width = width + 'px';
	boxEl.style.height = height + 'px';

	const selectedUnitUuids: string[] = [];
	(document.querySelectorAll('.unit') as NodeListOf<HTMLElement>).forEach((unit) => {
		if (doElementsIntersect(boxEl, unit) && unit.getAttribute(ATTR_SYSTEM_FILE) !== 'true') {
			selectedUnitUuids.push(unit.id);
			unit.setAttribute('data-selected', String(true));
		} else {
			unit.setAttribute('data-selected', String(false));
		}
	});

	return selectedUnitUuids;
}

export function deselectUnits() {
	(document.querySelectorAll('.unit') as NodeListOf<HTMLElement>).forEach((unit) =>
		unit.setAttribute('data-selected', String(false))
	);
}

function doElementsIntersect(a: HTMLElement, b: HTMLElement) {
	const rectA = a.getBoundingClientRect();
	const rectB = b.getBoundingClientRect();

	// https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
	return !(
		rectA.right < rectB.left ||
		rectA.left > rectB.right ||
		rectA.bottom < rectB.top ||
		rectA.top > rectB.bottom
	);
}
