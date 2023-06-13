<script lang="ts">
	import { extensionToIcon } from '../../consts/consts';
	import { ICON_FOLDER } from '../../consts/icons';
	import { JsOS } from '../../stores/os';
	import { OS_FileTypeEnum, type OS_Unit } from '../../stores/types';
	import { cubeCss } from '../../utils/cubeCss/cubeCss';
	import { createDefaultOsUnit } from '../../utils/defaultCreates';
	import Flex from '../Box/Flex/Flex.svelte';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';
	import { positionContextMenu } from '../ContextMenu/utils';
	import Button from '../Modules/Button/Button.svelte';
	import type { ButtonAttachments } from '../Modules/Button/types';
	import Icon from '../Modules/Icon/Icon.svelte';
	import Window from '../Modules/Window/Window.svelte';
	import { getWindowById, overlapWindow } from '../Modules/Window/utils';
	import { displayName } from './utils';

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();

		positionContextMenu(ctx, e);
	}

	function handleClick() {
		showWindow = true;
		if(getWindowById(props.uuid))
			overlapWindow(getWindowById(props.uuid));
	}

    function handleRename(e: Event) {
        const target = e.target as HTMLParagraphElement;
        JsOS.renameUnit(props.idx, target.textContent!);
    }

	function rename() {
		textEl.contentEditable = String(true);
		textEl.focus();

        return true;
	}

	export let props: OS_Unit = createDefaultOsUnit();
	export let attachments: ButtonAttachments[] = [];

	let ctx: HTMLElement;
	let textEl: HTMLParagraphElement;

	let showWindow = false;
</script>

<Button
	on:click={handleClick}
	on:contextmenu={(e) => handleContextMenu(e.detail)}
	id={props.uuid}
	cls={cubeCss({ blockClass: 'unit' })}
	attachments={['hologram', ...attachments]}
>
	<Flex cls={cubeCss({ utilClass: 'pointers-none' })} useColumn={true} align="center">
		<Icon cls={cubeCss({ utilClass: 'fs-600' })} ariaLabel="">
			{#if props.type === OS_FileTypeEnum.BIN}
				{ICON_FOLDER}
				{:else}
				{extensionToIcon[props.extension] ?? extensionToIcon['']}
			{/if}
		</Icon>
		<p
			bind:this={textEl}
            on:input={handleRename}
			class="[ unit__name ] [ text-ellipsis-2 pointers-none ]"
			contenteditable="false"
            spellcheck="false"
		>
			{displayName(props.name, $JsOS.preferences.showExtensions)}
		</p>
	</Flex>
</Button>

<ContextMenu bind:instance={ctx}>
	<slot name='contextmenu' />
	<ContextMenuItem action={() => rename()}>Rename</ContextMenuItem>
	<ContextMenuItem action={() => {
		JsOS.recycleUnit(props);
		return true;
	}}>
		Move to bin
	</ContextMenuItem>
</ContextMenu>

<Window on:close={() => showWindow = false} {props} hide={!showWindow}>
	<div slot='window-content'>
		<slot name='window-content' />
	</div>
	<div slot='window-contextmenu'>
		<slot name='window-contextmenu' />
	</div>
</Window>
