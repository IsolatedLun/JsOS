<script lang='ts'>
	import Button from "../Modules/Button/Button.svelte";

    export let action: () => boolean;
</script>

<Button on:click={() => action()} variant='secondary' attachments={['hoverable', 'pad-context-menu']}>
    <slot />
</Button>