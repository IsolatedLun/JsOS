<script>
	import { cubeCss } from "../../utils/cubeCss/cubeCss";
	import Flex from "../Box/Flex/Flex.svelte";
    import Unit from "../Unit/Unit.svelte";
	import TaskBarInfo from "./TaskBarInfo.svelte";

</script>
<div class="[ taskbar ] [ margin-inline-auto border-radius-max overflow-hidden ]">
    <Flex cls={cubeCss({utilClass: 'height-100'})} align='center'>
        <div class="[ taskbar-grid ] [ grid ]">
            
        </div>
        <TaskBarInfo />
    </Flex>
</div>