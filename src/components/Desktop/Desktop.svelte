<script lang='ts'>
	import { JsOS } from "../../stores/os";
	import DragBox from "../DragBox/DragBox.svelte";
	import TaskBar from "../TaskBar/TaskBar.svelte";
	import UnitGrid from "../Unit/UnitGrid.svelte";

</script>

<DragBox>
	<div class="[ desktop-container ]">
		<UnitGrid parentUuid='root' />
		<TaskBar />
	</div>
</DragBox>