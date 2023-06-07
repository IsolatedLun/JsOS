<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import type { OS_Unit } from "../../stores/types";
	import TaskBar from "../TaskBar/TaskBar.svelte";
	import Unit from "../Unit/Unit.svelte";

    let units: OS_Unit[] = []

    JsOS.subscribe(store => {
        units = store.fileSystem.units;
    })
</script>

<div class="[ desktop-container ]">
    <div class="[ desktop-grid ] [ grid gap-1 ]">
        {#each units as unit}
            <Unit props={unit} />
        {/each}
    </div>

    <TaskBar />
</div>