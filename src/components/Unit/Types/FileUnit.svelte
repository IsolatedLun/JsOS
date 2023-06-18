<script lang="ts">
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
	<div slot="contextmenu" />

	<div slot="window-contextmenu">
		<ContextMenuItem
			action={() => {
				JsOS.renameUnit(props, 'New text File.txt');
				return true;
			}}>Convert to text file</ContextMenuItem
		>
	</div>
</Unit>
