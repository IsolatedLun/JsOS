<script lang="ts">
	import { onMount } from 'svelte';
	import { JsOS } from '../../../stores/os';
	import type { OS_Unit } from '../../../stores/types';
	import Flex from '../../Box/Flex/Flex.svelte';
	import ContextMenuItem from '../../ContextMenu/ContextMenuItem.svelte';
	import Unit from '../Unit.svelte';

	export let props: OS_Unit;
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
