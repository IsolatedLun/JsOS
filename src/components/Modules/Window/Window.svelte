<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../Button/Button.svelte';
	import { moveWindow } from '../../../utils/window';
	import Flex from '../../Box/Flex/Flex.svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Icon from '../Icon/Icon.svelte';
	import { ICON_EXPAND, ICON_TIMES } from '../../../consts/icons';
	import Unit from '../../Unit/Unit.svelte';

	function handleMouseMove(e: MouseEvent) {
        if(isMouseDown) {
            moveWindow(windowEl, e);
        }
    }

    let windowEl: HTMLElement;
	let headerEl: HTMLElement;
	let isMouseDown = false;
</script>

<div bind:this={windowEl} class="[ window ] [ pos-absolute border-radius-bevelled overflow-hidden ]">
	<header
		class="[ window__header ] [ width-100 cursor-grab ]"
        bind:this={headerEl}
		on:mousedown={() => (isMouseDown = true)}
		on:mouseup={() => (isMouseDown = false)}
        on:mouseleave={() => (isMouseDown = false)}
        on:mousemove={handleMouseMove}
	>
		<Flex align='center' justify='space-between' cls={cubeCss({utilClass: "width-100"})}>
			<p class="[ clr-text-muted padding-inline-start-2 fs-300 fw-bold ]">main.js</p>
			<Flex gap={0}>
				<Button variant='primary' attachments={['window', 'pad-window']}>
					<p class="[ fw-bold ]">-</p>
				</Button>
				<Button variant='primary' attachments={['window', 'pad-window']}>
					<Icon ariaLabel='Expand window'>{ICON_EXPAND}</Icon>
				</Button>
				<Button variant='exit' attachments={['window', 'pad-window']}>
					<Icon ariaLabel='Close window'>{ICON_TIMES}</Icon>
				</Button>
			</Flex>
		</Flex>
	</header>
	<main class="[ window__content ] [ padding-1 ] [ overflow-y-auto ]">
		<slot />
	</main>
</div>
