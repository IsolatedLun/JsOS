<script lang="ts">
	import { onMount } from 'svelte';
	import { JsOS } from '../../../stores/os';
	import type { OS_Unit } from '../../../stores/types';
	import Flex from '../../Box/Flex/Flex.svelte';
	import ContextMenuItem from '../../ContextMenu/ContextMenuItem.svelte';
	import Unit from '../Unit.svelte';

	function handleFileSave() {
		if (fileContentEl) {
			const value = fileContentEl.textContent!;
			JsOS.saveFile(props, value);

			return true;
		}

		return false;
	}

	export let props: OS_Unit;

	let fileContentEl: HTMLElement;
</script>

<Unit {props}>
	<div slot="contextmenu">
		
	</div>

	<article
		bind:this={fileContentEl}
		slot="window-content"
		contenteditable="true"
		spellcheck="false"
		class="[ width-100 height-100 outline-none ]"
	>
		{props.contents}
	</article>

	<div slot="window-contextmenu">
		<ContextMenuItem action={handleFileSave}>Save</ContextMenuItem>
	</div>
</Unit>