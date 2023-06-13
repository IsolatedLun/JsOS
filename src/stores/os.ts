import { get, writable } from "svelte/store";
import { OS_ThemeEnum, type OS, OS_GridLayout, type OS_Unit, OS_FileTypeEnum, type OS_Bin } from "./types";
import { _initiateChangeBackground, getExtension } from "./utils";
import type { Result } from "../types";

export function createOS() {
    let store = writable<OS>({
        fileSystem: {
            units: [],
            recycleBin: [],
            gridLayout: OS_GridLayout.MEDIUM
        },
        preferences: {
            theme: OS_ThemeEnum.DARk,
            showExtensions: false
        },
        taskbar: {
            references: [],
            show_search: true
        }
    })

    return {
        subscribe: store.subscribe,

        // File System
        createUnit: (unit: OS_Unit) => store.update(os => {
            unit.idx = os.fileSystem.units.length;

            os.fileSystem.units.push(unit);
            return os;
        }),
        setUnit: (unit: OS_Unit) => store.update(os => {
            os.fileSystem.units[unit.idx] = unit;
            return os
        }),


        getUnitByIndex: (idx: number) => _getUnitByIndex(get(store), idx),
        getUnitsByIndex: (indexes: number[]) => {
            const _store = get(store);
            const units: OS_Unit[] = [];

            indexes.forEach(idx => units.push(_store.fileSystem.units[idx]));
            return units;
        },
        getUnitsByParent: (parentUuid: string) => {
            return get(store).fileSystem.units.filter(x => x.parent === parentUuid);
        },

        recycleUnit: (unit: OS_Unit) => store.update(() => _recycleUnit(get(store), unit)),
        renameUnit: (idx: number, name: string) => store.update(() => _renameUnit(get(store), idx, name)),

        // Preferences
        changeBackground: () => _initiateChangeBackground()
    }
}

export const JsOS = createOS();

// ===========================================
function _getUnitByIndex(store: OS, idx: number): Result<OS_Unit, string> {
    return store.fileSystem.units[idx];
}

function _recycleUnit(store: OS, unit: OS_Unit) {
    const toRecycle = store.fileSystem.units[unit.idx];
    store.fileSystem.units = store.fileSystem.units.filter(x => x.uuid  !== unit.uuid);
    store.fileSystem.recycleBin.push(toRecycle);

    return store;
}

function _renameUnit(store: OS, idx: number, name: string) {
    const unit = _getUnitByIndex(store, idx);
    if(typeof unit === 'string') {
        return store;
    }

    unit.name = name;
    
    if(unit.type !== OS_FileTypeEnum.BIN) {
        const extension = getExtension(unit.name);

        if(extension) {
            unit.extension = extension;
        }
    }

    store.fileSystem.units[unit.idx] = unit

    return store;
}