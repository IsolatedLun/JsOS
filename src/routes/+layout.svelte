<script lang='ts'>
	import { onMount } from "svelte";
	import ContextMenu from "../components/ContextMenu/ContextMenu.svelte";
	import ContextMenuItem from "../components/ContextMenu/ContextMenuItem.svelte";
	import { positionContextMenu } from "../components/ContextMenu/utils";
    import Desktop from "../components/Desktop/Desktop.svelte";
	import { JsOS } from "../stores/os";
	import { OS_FileTypeEnum } from "../stores/types";
	import { createDefaultOsUnit } from "../utils/defaultCreates";

    onMount(() => {
        backgroundInput.addEventListener('change', handleBackgroundInput);
    })

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();

        const target = e.target as HTMLElement;
        if(!(target.classList.contains('button')))
            positionContextMenu(ctx, e);
    }

    function handleBackgroundInput(e: Event) {
        if(backgroundInput.files && backgroundInput.files.length > 0) {
            const imgUrl = window.URL.createObjectURL(backgroundInput.files[0]);
            document.body.style.backgroundImage = `url(${imgUrl})`;
        }
    }

    let ctx: HTMLElement;
    let backgroundInput: HTMLInputElement;
</script>

<div on:contextmenu={handleContextMenu}>
    <Desktop />

    <ContextMenu bind:instance={ctx}>
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit(OS_FileTypeEnum.FILE));
            return true;
        }}>
            Create File
        </ContextMenuItem>    
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit(OS_FileTypeEnum.FOLDER));
            return true;
        }}>
            Create Folder
        </ContextMenuItem>
        <ContextMenuItem action={() => {
            JsOS.changeBackground();
            return true;
        }}>
            Change Background
        </ContextMenuItem> 
    </ContextMenu>
</div>

<input bind:this={backgroundInput} id="background-input" type="file" accept="image/*" hidden={true} />

<style>
    @import url('../../static/posty.css');
</style>