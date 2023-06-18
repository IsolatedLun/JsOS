<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import type { Some } from "../../types";
	import { drawSelectBox } from "../../utils/selectBox";

    function handleMouseDown(e: MouseEvent) {
		previousMouseEvent = e;
		isLeftClickDown = true;
	}

	function handleMouseUp() {
		isLeftClickDown = false;
		selectBoxEl.hidden = true;
	}

	function handleMouseMove(e: MouseEvent) {
		if(isLeftClickDown) {
			selectBoxEl.hidden = false;
			JsOS.setSelectedUnits(drawSelectBox(previousMouseEvent!, e, dragBoxEl, selectBoxEl));
		}
	}

    let dragBoxEl: HTMLElement;
	let selectBoxEl: HTMLElement;

	let isLeftClickDown = false;
	let previousMouseEvent: Some<MouseEvent> = null;
</script>

<div class="[ drag-box-container ] [ pos-relative width-100 height-100 overflow-hidden ]" 
    bind:this={dragBoxEl}
	on:mouseup={handleMouseUp}
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}>
    <slot />
    <div bind:this={selectBoxEl} class="[ select-box ] [ pos-absolute pointers-none border-radius-bevelled ]"></div>
</div>