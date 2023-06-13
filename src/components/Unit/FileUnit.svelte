<script lang='ts'>
	import type { OS_Unit } from "../../stores/types";
	import ContextMenuItem from "../ContextMenu/ContextMenuItem.svelte";
    import Unit from "./Unit.svelte";
	import UnitGrid from "./UnitGrid.svelte";

    export let props: OS_Unit;
</script>

<Unit {props}>
    <div slot='contextmenu'>
        <ContextMenuItem action={() => true}>
            Clear folder
        </ContextMenuItem>
    </div>

    
    <div slot='window-content' contenteditable="true">
        file
    </div>
    

    <div slot='window-contextmenu'>
        
    </div>
</Unit>