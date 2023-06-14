<script lang="ts">
	import { onMount } from 'svelte';
	import ContextMenu from '../components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '../components/ContextMenu/ContextMenuItem.svelte';
	import { positionContextMenu } from '../components/ContextMenu/utils';
	import Desktop from '../components/Desktop/Desktop.svelte';
	import { JsOS } from '../stores/os';
	import { OS_FileTypeEnum } from '../stores/types';
	import { createDefaultOsUnit } from '../utils/defaultCreates';

	onMount(() => {
		JsOS.createUnit(
			createDefaultOsUnit({
				type: OS_FileTypeEnum.BIN,
				parent: 'root',
				uuid: 'recycleBin',
				name: 'Recycle Bin'
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

	let ctx: HTMLElement;
</script>

<div class="[ layout ]" on:contextmenu={handleContextMenu}>
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
	</ContextMenu>
</div>

<input
	on:change={handleBackgroundInput}
	id="background-input"
	type="file"
	accept="image/*"
	hidden={true}
/>

<style>
	@import url('../../static/posty.css');
</style>
