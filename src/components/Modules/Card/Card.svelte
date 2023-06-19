<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		use(_this);
	});

	export let cls = cubeCss({});
	export let variant = 'primary';
    export let padding: number = 1;
	export let attachments: string[] = [];
	export let use: (_this: HTMLElement) => void = () => null;

	const _class = cls.to_string({
		compostClass: `card padding-${padding}`
	});

	let _this: HTMLElement;
</script>

<div
	bind:this={_this}
	class={_class}
	data-variant={variant}
	data-attachments={attachments.join(',')}
>
	<slot />
</div>