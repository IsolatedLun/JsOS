<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import TaskBar from "../TaskBar/TaskBar.svelte";
	import UnitGrid from "../Unit/UnitGrid.svelte";

</script>

<div class="[ desktop-container ]">
    <UnitGrid parentUuid='root' />

    <TaskBar />
</div>