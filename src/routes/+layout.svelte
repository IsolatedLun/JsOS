<script lang='ts'>
	import ContextMenu from "../components/ContextMenu/ContextMenu.svelte";
	import { positionContextMenu } from "../components/ContextMenu/utils";
    import Desktop from "../components/Desktop/Desktop.svelte";

    let ctx: HTMLElement;
</script>

<div on:contextmenu={(e) => {
    e.preventDefault();
    positionContextMenu(ctx, e);
}}>
    <Desktop />
    <ContextMenu bind:instance={ctx} />
</div>

<style>
    @import url('../../static/posty.css');
</style>