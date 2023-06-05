<script lang='ts'>
	import type { Some } from "../../types";
	import Flex from "../Box/Flex/Flex.svelte";
	import Button from "../Modules/Button/Button.svelte";

    export let instance: Some<HTMLElement>;
</script>

<div bind:this={instance} class="[ context-menu ] [ pos-absolute border-radius-bevelled padding-1 ]" tabindex="-1">
    <Flex useColumn={true}>
        <Button variant='secondary' attachments={['hoverable']}>Make new file</Button>
    </Flex>
</div>