<script lang="ts">
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";


	export let tag = 'span';
	export let cls = cubeCss({});
	export let ariaLabel: string;

	const _class = cls.to_string({
        compostClass: 'icon',
        utilClass: 'ignore-self'
    })
</script>

<svelte:element this={tag} class={_class} aria-hidden={ariaLabel.length === 0} aria-label={ariaLabel}>
	<slot />
</svelte:element>