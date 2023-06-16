import { ATTR_SYSTEM_FILE } from "../consts/consts";

export function drawSelectBox(
	mouseStart: MouseEvent,
	mouse: MouseEvent,
	boxEl: HTMLElement
): string[] {
	boxEl.style.top = mouseStart.y + 'px';
	boxEl.style.left = mouseStart.x + 'px';

	const boxWidth = -mouseStart.x + mouse.x;
	const boxHeight = -mouseStart.y + mouse.y;

	boxEl.style.width = boxWidth + 'px';
	boxEl.style.height = boxHeight + 'px';

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
