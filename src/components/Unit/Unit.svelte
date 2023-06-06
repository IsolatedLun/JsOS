<script lang="ts">
	import { fileTypeToIcon } from '../../consts/consts';
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

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();

		positionContextMenu(ctx, e);
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
</script>

<Button
	on:contextmenu={(e) => handleContextMenu(e.detail)}
	id={props.uuid}
	cls={cubeCss({ blockClass: 'unit' })}
	attachments={['hologram', ...attachments]}
>
	<Flex cls={cubeCss({ utilClass: 'pointers-none' })} useColumn={true} align="center">
		<Icon cls={cubeCss({ utilClass: 'fs-600' })} ariaLabel="">{fileTypeToIcon[props.type]}</Icon>
		<p
			bind:this={textEl}
            on:input={handleRename}
			class="[ unit__name ] [ text-ellipsis-2 pointers-none ]"
			contenteditable="false"
            spellcheck="false"
		>
			{#if props.type !== OS_FileTypeEnum.FOLDER}
                {#if $JsOS.preferences.showExtensions}
                    {props.name}
                    {:else}
                    {props.name.split('.')[0]}
                {/if}
                {:else}
                {props.name}
            {/if}
		</p>
	</Flex>
</Button>

<ContextMenu bind:instance={ctx}>
	<ContextMenuItem action={() => rename()}>Rename</ContextMenuItem>
</ContextMenu>
