<script>
	import { JsOS } from "../../stores/os";
	import TaskBar from "../TaskBar/TaskBar.svelte";
	import Unit from "../Unit/Unit.svelte";

</script>

<div class="[ desktop-container ]">
    <div class="[ desktop-grid ] [ grid gap-1 ]">
        {#each $JsOS.fileSystem.units as unit}
            <Unit props={unit} />
        {/each}
    </div>

    <TaskBar />
</div>