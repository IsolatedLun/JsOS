<script lang="ts">
	import { onMount } from 'svelte';
	import type { Some } from '../../types';

	onMount(() => {
		document.body.appendChild(instance!);
		sortChildren();
	})
	
	function sortChildren() {
		const children = [...childrenContainer.childNodes];
		childrenContainer.innerHTML = '';

		children
			.sort((a, b) => a.textContent![0] > b.textContent![0] ? 1 : -1)
			.forEach(child => childrenContainer.appendChild(child));
	}

	export let instance: Some<HTMLElement>;
	
	let childrenContainer: HTMLElement;
</script>

<div
	bind:this={instance}
	class="[ context-menu ] [ pos-absolute border-radius-bevelled padding-1 ]"
	tabindex="-1"
>
	<div bind:this={childrenContainer} class="[ grid ]">
        <slot />
    </div>
</div>
