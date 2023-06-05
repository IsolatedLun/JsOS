<script lang='ts'>
	import { fileTypeToIcon } from "../../consts/consts";
	import type { OS_FileTypeEnum, OS_Unit } from "../../stores/types";
	import { cubeCss } from "../../utils/cubeCss/cubeCss";
	import { createDefaultOsUnit } from "../../utils/defaultCreates";
	import Flex from "../Box/Flex/Flex.svelte";
	import Button from "../Modules/Button/Button.svelte";
	import type { ButtonAttachments } from "../Modules/Button/types";
	import Icon from "../Modules/Icon/Icon.svelte";

    export let props: OS_Unit = createDefaultOsUnit();
    export let attachments: ButtonAttachments[] = []; 
</script>

<Button cls={cubeCss({blockClass: 'unit'})} attachments={['hologram', ...attachments]}>
    <Flex useColumn={true} align='center'>
        <Icon cls={cubeCss({utilClass: 'fs-600'})} ariaLabel=''>{fileTypeToIcon[props.type]}</Icon>
        <p class="[ unit__name ] [ text-ellipsis-2 pointers-none ]">
            {props.name}
        </p>
    </Flex>
</Button>
