<script lang="ts">
	import { ATTR_SYSTEM_FILE, UUID_RECYCLE_BIN, extensionToIcon } from '../../consts/consts';
	import { ICON_FOLDER, ICON_TRASH } from '../../consts/icons';
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
		if (getWindowById(props.uuid)) overlapWindow(getWindowById(props.uuid));
	}

	function handleRename(e: Event) {
		const target = e.target as HTMLParagraphElement;
		JsOS.renameUnit(props, target.textContent!);
	}

	function handleFocusRename() {
		textEl.contentEditable = String(true);
		textEl.focus();

		return true;
	}

	export let props: OS_Unit = createDefaultOsUnit({});
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
	use={(el) => el.setAttribute(ATTR_SYSTEM_FILE, String(props.isSystemFile))}
>
	<Flex cls={cubeCss({ utilClass: 'pointers-none' })} useColumn={true} align="center">
		<Icon cls={cubeCss({ utilClass: 'fs-600' })} ariaLabel="">
			{#if props.icon}
					{props.icon}
				{:else}

				{#if props.type === OS_FileTypeEnum.BIN}
					{props.uuid === 'recycleBin' ? ICON_TRASH : ICON_FOLDER}
				{:else}
					{extensionToIcon[props.extension ?? ''] ?? extensionToIcon['']}
				{/if}
			{/if}
		</Icon>
		<p
			bind:this={textEl}
			on:input={handleRename}
			on:blur={() => (textEl.contentEditable = String(false))}
			class="[ unit__name ] [ text-ellipsis-2 pointers-none ]"
			contenteditable="false"
			spellcheck="false"
		>
			{displayName(props.name, $JsOS.preferences.showExtensions)}
		</p>
	</Flex>
</Button>

<ContextMenu bind:instance={ctx}>
	<slot name="contextmenu" />
	{#if props.parent === UUID_RECYCLE_BIN}
		<ContextMenuItem
			action={() => {
				JsOS.restoreUnit(props);
				return true;
			}}>Restore</ContextMenuItem
		>
		<ContextMenuItem
			action={() => {
				JsOS.deleteUnit(props);
				return true;
			}}
		>
			Delete
		</ContextMenuItem>
	{:else}
		<ContextMenuItem action={() => handleFocusRename()}>Rename</ContextMenuItem>
		{#if props.uuid !== UUID_RECYCLE_BIN}
			<ContextMenuItem
				action={() => {
					JsOS.recycleUnit(props);
					return true;
				}}
			>
				Move to bin
			</ContextMenuItem>
		{/if}
	{/if}
</ContextMenu>

<Window on:close={() => (showWindow = false)} {props} hide={!showWindow}>
	<div slot="window-content" class="[ width-100 height-100 ]">
		<slot name="window-content" />
	</div>
	<div slot="window-contextmenu">
		<slot name="window-contextmenu" />
	</div>
	<div slot='window-footer'>
		<slot name='window-footer'>
			<p class="[ visibility-hidden ]" aria-hidden="true">placeholder</p>
		</slot>
	</div>
</Window>
