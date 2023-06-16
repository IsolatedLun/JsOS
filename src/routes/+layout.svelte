<script lang="ts">
	import { onMount } from 'svelte';
	import ContextMenu from '../components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '../components/ContextMenu/ContextMenuItem.svelte';
	import { positionContextMenu } from '../components/ContextMenu/utils';
	import Desktop from '../components/Desktop/Desktop.svelte';
	import { JsOS } from '../stores/os';
	import { OS_FileTypeEnum } from '../stores/types';
	import { createDefaultOsUnit } from '../utils/defaultCreates';
	import type { Some } from '../types';
	import { deselectUnits, drawSelectBox } from '../utils/selectBox';
	import { moveSelectedUnitsToBin } from '../stores/utils';

	onMount(() => {
		JsOS.createUnit(
			createDefaultOsUnit({
				type: OS_FileTypeEnum.RECYCLE,
				parent: 'root',
				uuid: 'recycleBin',
				name: 'Recycle Bin',
				isSystemFile: true
			})
		);
	});

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();

		const target = e.target as HTMLElement;
		if (target.classList.contains('unit-grid')) positionContextMenu(ctx, e);
	}

	function handleBackgroundInput(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const imgUrl = window.URL.createObjectURL(target.files[0]);
			document.body.style.backgroundImage = `url(${imgUrl})`;
		}
	}

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
			JsOS.setSelectedUnits(drawSelectBox(previousMouseEvent!, e, selectBoxEl));
		}
	}

	let layoutEl: HTMLElement;
	let selectBoxEl: HTMLElement;
	let ctx: HTMLElement;

	let isLeftClickDown = false;
	let previousMouseEvent: Some<MouseEvent> = null;
</script>

<div
	class="[ layout ]"
	bind:this={layoutEl}
	on:mouseup={handleMouseUp}
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}
	on:contextmenu={handleContextMenu}
>
	<Desktop />

	<ContextMenu bind:instance={ctx}>
		<ContextMenuItem
			action={() => {
				JsOS.createUnit(createDefaultOsUnit({ type: OS_FileTypeEnum.FILE }));
				return true;
			}}
		>
			Create File
		</ContextMenuItem>
		<ContextMenuItem
			action={() => {
				JsOS.createUnit(createDefaultOsUnit({ type: OS_FileTypeEnum.BIN }));
				return true;
			}}
		>
			Create Folder
		</ContextMenuItem>
		<ContextMenuItem
			action={() => {
				JsOS.changeBackground();
				return true;
			}}
		>
			Change Background
		</ContextMenuItem>

		{#if $JsOS.selectedUnitUuids.length > 0}
			<ContextMenuItem
				action={() => {
					JsOS.setSelectedUnits(moveSelectedUnitsToBin($JsOS.selectedUnitUuids));
					return true;
				}}
			>
				Move selected to bin
			</ContextMenuItem>
		{/if}
	</ContextMenu>
</div>

<input
	on:change={handleBackgroundInput}
	id="background-input"
	type="file"
	accept="image/*"
	hidden={true}
/>

<div bind:this={selectBoxEl} class="[ select-box ] [ pos-absolute pointers-none border-radius-bevelled ]"></div>

<style>
	@import url('../../static/posty.css');
</style>
