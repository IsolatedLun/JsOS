<script lang="ts">
	import { onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import type { FlexyAlignTypes, FlexyJustifyTypes } from './types';

	onMount(() => {
		use(_this!);
	});

	export let id = '';
	export let tag = 'div';
	export let cls = cubeCss({});
	export let justify: FlexyJustifyTypes = 'space-between';
	export let align: FlexyAlignTypes = 'start';
	export let gap: string | number = 1;
	export let useColumn = false;

	export let collapseOnMobile = false;
	export let alignCenterOnMobile = false;
	export let wrapOnMobile = false;
	
	export let use: (_this: HTMLElement) => void = () => null;
	const _class = cls.to_string({
		utilClass: `flex align-items-${align} justify-content-${justify} gap-${gap} ${
			useColumn ? 'flex-direction-column' : ''
		}`
	});
	export let _this: HTMLElement | null = null;
</script>

<svelte:element
	this={tag}
	{id}
	class={_class}
	bind:this={_this}
	data-collapse={collapseOnMobile}
	data-flex-collapse-center={alignCenterOnMobile}
	data-flex-wrap={wrapOnMobile}
	on:submit|preventDefault
>
	<slot />
</svelte:element>