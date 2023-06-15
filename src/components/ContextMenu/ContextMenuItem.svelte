<script lang="ts">
	import { cubeCss } from '../../utils/cubeCss/cubeCss';
	import Button from '../Modules/Button/Button.svelte';

	export let action: () => boolean;
</script>

<Button
	cls={cubeCss({ blockClass: 'context-menu-item', utilClass: 'width-100' })}
	on:click={() => action()}
	variant="secondary"
	attachments={['hoverable', 'pad-context-menu', 'box']}
>
	<slot />
</Button>
