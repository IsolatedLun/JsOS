<script lang="ts">
	import type { Some } from '../../types';
	import { cubeCss } from '../../utils/cubeCss/cubeCss';
	import Flex from '../Box/Flex/Flex.svelte';
	import Button from '../Modules/Button/Button.svelte';

	export let instance: Some<HTMLElement>;
</script>

<div
	bind:this={instance}
	class="[ context-menu ] [ pos-absolute border-radius-bevelled padding-1 ]"
	tabindex="-1"
>
	<div class="[ grid ]">
        <slot />
    </div>
</div>
