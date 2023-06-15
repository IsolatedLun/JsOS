<script lang='ts'>
	import { ICON_TRASH } from "../../../consts/icons";
	import { JsOS } from "../../../stores/os";
	import { OS_FileTypeEnum, type OS_Unit } from "../../../stores/types";
	import { createDefaultOsUnit } from "../../../utils/defaultCreates";
	import ContextMenuItem from "../../ContextMenu/ContextMenuItem.svelte";
    import Unit from "../Unit.svelte";
	import UnitGrid from "../UnitGrid.svelte";

    export let props: OS_Unit;
</script>

<Unit props={{...props, icon: ICON_TRASH}}>
    <div slot='contextmenu'>
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit({type: OS_FileTypeEnum.BIN, parent: props.uuid}));
            return true;
            }}>
            Delete all files
        </ContextMenuItem>
    </div>

    
    <div slot='window-content'>
        <UnitGrid parentUuid={props.uuid} />
    </div>
    

    <div slot='window-contextmenu' class="[ grid ]">
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit({type: OS_FileTypeEnum.BIN, parent: props.uuid}));
            return true;
            }}>
            Delete all files
        </ContextMenuItem>
    </div>

    <div slot='window-footer'>
        <p>{props.contents?.length} items</p>
    </div>
</Unit>