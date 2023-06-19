<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import type { OS_Unit } from "../../stores/types";
	import TxtUnit from "./Extensions/TxtUnit.svelte";
	import BinUnit from "./Types/BinUnit.svelte";
	import FileUnit from "./Types/FileUnit.svelte";
	import RecycleUnit from "./Types/RecycleUnit.svelte";
	import { createComponentName } from "./utils";

    export let parentUuid: string;
</script>

<div class="[ unit-grid ] [ grid gap-1 height-max-content ]">
    {#each $JsOS.units.filter(x => x.parent === parentUuid) as unit}
        <svelte:component this={eval(createComponentName(unit.type))} props={unit} />
    {/each}
</div>