<script lang='ts'>
	import { JsOS } from "../../../stores/os";
	import { OS_FileTypeEnum, type OS_Unit } from "../../../stores/types";
	import { moveSelectedUnitsToBin } from "../../../stores/utils";
	import { createDefaultOsUnit } from "../../../utils/defaultCreates";
	import ContextMenuItem from "../../ContextMenu/ContextMenuItem.svelte";
    import Unit from "../Unit.svelte";
	import UnitGrid from "../UnitGrid.svelte";

    export let props: OS_Unit;
</script>

<Unit {props}>
    <div slot='contextmenu'>
        <ContextMenuItem action={() => true}>
            Clear folder
        </ContextMenuItem>
    </div>

    
    <div slot='window-content'>
        <UnitGrid parentUuid={props.uuid} />
    </div>
    

    <div slot='window-contextmenu' class="[ grid ]">
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit({type: OS_FileTypeEnum.FILE, parent: props.uuid}));
            return true;
            }}>
            Create File
        </ContextMenuItem>
        <ContextMenuItem action={() => {
            JsOS.createUnit(createDefaultOsUnit({type: OS_FileTypeEnum.BIN, parent: props.uuid, contents: []}));
            return true;
            }}>
            Create Folder
        </ContextMenuItem>
        {#if $JsOS.selectedUnitUuids.length > 0}
			<ContextMenuItem
				action={() => {
					JsOS.setSelectedUnits(moveSelectedUnitsToBin(props.uuid, $JsOS.selectedUnitUuids));
					return true;
				}}
			>
				Move selected to here
			</ContextMenuItem>
		{/if}
    </div>

    <div slot='window-footer'>
        <p>{props.contents?.length} items</p>
    </div>
</Unit>