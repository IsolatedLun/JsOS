<script lang="ts">
	import { cubeCss } from '../../utils/cubeCss/cubeCss';
	import Button from '../Modules/Button/Button.svelte';

	export let action: () => boolean;
</script>

<Button
	cls={cubeCss({ blockClass: 'context-menu-item' })}
	on:click={() => action()}
	variant="secondary"
	attachments={['hoverable', 'pad-context-menu']}
>
	<slot />
</Button>
