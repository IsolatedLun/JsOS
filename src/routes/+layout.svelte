<script lang='ts'>
	import ContextMenu from "../components/ContextMenu/ContextMenu.svelte";
	import ContextMenuItem from "../components/ContextMenu/ContextMenuItem.svelte";
	import { positionContextMenu } from "../components/ContextMenu/utils";
    import Desktop from "../components/Desktop/Desktop.svelte";
	import { JsOS } from "../stores/os";
	import { createDefaultOsUnit } from "../utils/defaultCreates";

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();

        const target = e.target as HTMLElement;
        if(!(target.classList.contains('button')))
            positionContextMenu(ctx, e);
    }

    JsOS.subscribe((e) => {
        console.log(e.fileSystem)
    })

    let ctx: HTMLElement;
</script>

<div on:contextmenu={handleContextMenu}>
    <Desktop />

    <ContextMenu bind:instance={ctx}>
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit());
            return true;
        }}>
            Create file
        </ContextMenuItem>    
        <ContextMenuItem action={() => true}>
            Change background
        </ContextMenuItem> 
    </ContextMenu>
</div>

<style>
    @import url('../../static/posty.css');
</style>