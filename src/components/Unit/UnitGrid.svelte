<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import type { OS_Unit } from "../../stores/types";
	import BinUnit from "./BinUnit.svelte";
    import FileUnit from "./FileUnit.svelte";
	import { createComponentName } from "./utils";

    export let parentUuid: string;
</script>

<div class="[ unit-grid ] [ grid ]">
    {#each $JsOS.fileSystem.units.filter(x => x.parent === parentUuid) as unit}
        <svelte:component this={eval(createComponentName(unit.type))} props={unit} />
    {/each}
</div>