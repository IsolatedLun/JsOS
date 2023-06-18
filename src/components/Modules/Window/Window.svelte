<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from '../Button/Button.svelte';
	import { createWindowId, fixWindowBounds, moveWindow } from './utils';
	import Flex from '../../Box/Flex/Flex.svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Icon from '../Icon/Icon.svelte';
	import { ICON_EXPAND, ICON_TIMES } from '../../../consts/icons';
	import type { OS_Unit } from '../../../stores/types';
	import { expandWindow, overlapWindow } from './utils';
	import ContextMenu from '../../ContextMenu/ContextMenu.svelte';
	import { positionContextMenu } from '../../ContextMenu/utils';
	import DragBox from '../../DragBox/DragBox.svelte';

	onMount(() => {
		// Child windows get stuck to it's parent, so we move every window to the body of the document.
		// moves existing elements instead of copying.	
		document.body.appendChild(windowEl);

		overlapWindow(windowEl);
		
		const observer = new ResizeObserver(() => fixWindowBounds(windowEl));
		observer.observe(windowEl)
	})


	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();

		const target = e.target as HTMLElement;
		if(!target.closest('.unit') && target.closest('.window__content'))
			positionContextMenu(ctx, e);
	}

	function handleMouseMove(e: MouseEvent) {
		if (isMouseDown) {
			moveWindow(windowEl, e);
			overlapWindow(windowEl);
		}
	}

	function handleExpandWindow() {
		expand = true;
	}

	export let props: OS_Unit;
	export let hide = false;

	let windowEl: HTMLElement;
	let windowContentEl: HTMLElement;

	let ctx: HTMLElement;
	let isMouseDown = false;
	let expand = true;

	const dispatch = createEventDispatcher();
</script>

<div
	bind:this={windowEl}
	id={createWindowId(props.uuid)}
	class="[ window ] [ pos-fixed border-radius-bevelled ]"
	hidden={hide}
>
	<header
		class="[ window__header ] [ width-100 cursor-grab ]"
		on:mousedown={() => (isMouseDown = true)}
		on:mouseup={() => (isMouseDown = false)}
		on:mouseleave={() => (isMouseDown = false)}
		on:mousemove={handleMouseMove}
	>
		<Flex align="center" justify="space-between" gap={2} cls={cubeCss({ utilClass: 'width-100' })}>
			<p class="[ clr-text-muted padding-inline-start-2 fs-300 fw-bold ]">{props.name}</p>
			<Flex gap={0}>
				{#if expand}
						<Button
							on:click={() => (expand = false)}
							variant="primary"
							attachments={['window', 'pad-window']}
						>
							<p class="[ fw-bold ]">-</p>
						</Button>
					{:else}
						<Button
							on:click={() => handleExpandWindow()}
							variant="primary"
							attachments={['window', 'pad-window']}
						>
							<Icon ariaLabel="Expand window">{ICON_EXPAND}</Icon>
						</Button>
				{/if}
				<Button
					on:click={() => dispatch('close')}
					variant="exit"
					attachments={['window', 'pad-window']}
				>
					<Icon ariaLabel="Close window">{ICON_TIMES}</Icon>
				</Button>
			</Flex>
		</Flex>
	</header>
	<main
		bind:this={windowContentEl}
		class="[ window__content ] [ overflow-hidden resize-both ]"
		hidden={!expand}
		on:contextmenu={handleContextMenu}
	>
		<Flex cls={cubeCss({utilClass: 'width-100 height-100'})}  useColumn={true} justify='space-between'>
			<div class="[ content__container ] [ padding-1 overflow-auto ]">
				{#if props.contents && props.contents instanceof Array}
					<DragBox>
						<slot name='window-content' />
					</DragBox>
					{:else}
						<slot name='window-content' />
				{/if}
			</div>
	
			<footer class="[ window__footer ] [ width-100 padding-inline-1 ]">
				<slot name='window-footer' />
			</footer>
		</Flex>
	</main>
</div>

<ContextMenu bind:instance={ctx}>
	<slot name="window-contextmenu" />
</ContextMenu>
