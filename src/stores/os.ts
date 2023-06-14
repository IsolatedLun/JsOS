import { get, writable } from "svelte/store";
import { OS_ThemeEnum, type OS, OS_GridLayout, type OS_Unit, OS_FileTypeEnum } from "./types";
import { _initiateChangeBackground, getExtension } from "./utils";
import type { Result } from "../types";
import { createDefaultOsUnit } from "../utils/defaultCreates";

export function createOS() {
    let store = writable<OS>({
        units: [],
        preferences: {
            theme: OS_ThemeEnum.DARK,
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
            unit.idx = os.units.length;

            os.units.push(unit);
            return os;
        }),
        setUnit: (unit: OS_Unit) => store.update(os => {
            os.units[unit.idx] = unit;
            return os
        }),


        getUnitByIndex: (idx: number) => _getUnitByIndex(get(store), idx),
        getUnitsByIndex: (indexes: number[]) => {
            const _store = get(store);
            const units: OS_Unit[] = [];

            indexes.forEach(idx => units.push(_store.units[idx]));
            return units;
        },
        getUnitsByParent: (parentUuid: string) => {
            return get(store).units.filter(x => x.parent === parentUuid);
        },

        recycleUnit: (unit: OS_Unit) => store.update(os => _changeUnitParent(os, unit, 'recycleBin')),
        restoreUnit: (unit: OS_Unit) => store.update(os => _changeUnitParent(os, unit, 'root')),
        renameUnit: (idx: number, name: string) => store.update(() => _renameUnit(get(store), idx, name)),
        deleteUnit: (unit: OS_Unit) => store.update(os => _deleteUnit(os, unit)),

        saveFile: (unit: OS_Unit, contents: string) => store.update((os: OS) => {
            const unitToUpdate: OS_Unit = os.units[unit.idx];
            unitToUpdate.contents = new File([contents], unit.name);

            console.log(os);

            return os;
        }),

        // Preferences
        changeBackground: () => _initiateChangeBackground()
    }
}

export const JsOS = createOS();

// ===========================================
function _getUnitByIndex(store: OS, idx: number): Result<OS_Unit, string> {
    return store.units[idx];
}

function _changeUnitParent(store: OS, unit: OS_Unit, newParent: string) {
    store.units[unit.idx].parent = newParent;

    return store;
}

function _deleteUnit(store: OS, unit: OS_Unit) {
    store.units.splice(unit.idx, 1);
    store.units.forEach((unit, i) => unit.idx = i);

    return store;
}

function _renameUnit(store: OS, idx: number, name: string) {
    const unit = _getUnitByIndex(store, idx);
    if(typeof unit === 'string') {
        return store;
    }

    unit.name = name;
    
    if('extension' in unit) {
        const extension = getExtension(unit.name);

        if(extension) {
            unit.extension = extension;
        }
    }

    store.units[unit.idx] = unit

    return store;
}