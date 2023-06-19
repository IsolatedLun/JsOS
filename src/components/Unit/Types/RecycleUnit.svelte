<script lang='ts'>
	import { UUID_ROOT } from "../../../consts/consts";
	import { ICON_TRASH } from "../../../consts/icons";
	import { JsOS } from "../../../stores/os";
	import { OS_FileTypeEnum, type OS_Unit } from "../../../stores/types";
	import { deleteSelectedUnits, moveSelectedUnitsToBin, restoreSelectedUnits } from "../../../stores/utils";
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
            JsOS.deleteAllUnitsFromRecycleBin();
            return true;
            }}>
            Delete all files
        </ContextMenuItem>
        {#if $JsOS.selectedUnitUuids.length > 0}
			<ContextMenuItem
				action={() => {
					JsOS.setSelectedUnits(restoreSelectedUnits($JsOS.selectedUnitUuids));
					return true;
				}}
			>
				Restore selected
			</ContextMenuItem>
            <ContextMenuItem
				action={() => {
					JsOS.setSelectedUnits(deleteSelectedUnits($JsOS.selectedUnitUuids));
					return true;
				}}
			>
				Delete selected
			</ContextMenuItem>
		{/if}
    </div>

    <div slot='window-footer'>
        <p>{props.contents?.length} items</p>
    </div>
</Unit>