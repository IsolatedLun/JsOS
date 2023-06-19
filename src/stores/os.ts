import { get, writable } from "svelte/store";
import { OS_ThemeEnum, type OS, OS_GridLayout, type OS_Unit, OS_FileTypeEnum } from "./types";
import { _initiateChangeBackground, fileToString, getExtension } from "./utils";
import type { Result, Some } from "../types";
import { createDefaultOsUnit } from "../utils/defaultCreates";
import { enumToKeys } from "../utils/general";
import { UUID_RECYCLE_BIN } from "../consts/consts";
import { browser } from "$app/environment"

export function createOS() {
    let store = writable<OS>({
        units: [],
        selectedUnitUuids: [],

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
        createUnit: (unit: OS_Unit) => store.update(os => _createUnit(os, unit)),
        
        
        setUnit: (unit: OS_Unit) => store.update(os => {
            os.units[unit.idx] = unit;
            return os
        }),
        setUnitLocation: (unit: OS_Unit, parentUuid: string) => store.update(os => _changeUnitParent(os, unit, parentUuid)),
        setSelectedUnits: (selectedUnitUuids: string[]) => store.update(os => {
            os.selectedUnitUuids = selectedUnitUuids;
            return os;
        }),

        getUnitByUuid: (uuid: string) => get(store).units.filter(unit => unit.uuid === uuid)[0],
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

        recycleUnit: (unit: OS_Unit) => store.update(os => _changeUnitParent(os, unit, UUID_RECYCLE_BIN)),
        restoreUnit: (unit: OS_Unit) => store.update(os => _changeUnitParent(os, unit, 'root')),
        renameUnit: (unit: OS_Unit, name: string) => store.update((os) => _renameUnit(os, unit, name)),
        deleteUnit: (unit: OS_Unit) => store.update(os => _deleteUnit(os, unit)),
        deleteAllUnitsFromRecycleBin: () => store.update(os => _deleteAllUnitsFromRecycleBin(os)),

        saveFile: (unit: OS_Unit, contents: string) => store.update((os: OS) => _saveFile(os, unit, contents)),

        // Preferences
        changeBackground: () => _initiateChangeBackground(),

        // OS
        saveOs: () => _saveOstoLocalStorage(get(store)),
        getOs: () => {
            const data = _getOsFromLocalStorage();
            store.update(os => {
                return data ?? os;
            });

            return data ? false : true;
        },
            
    }
}

export const JsOS = createOS();

// ===========================================
function _getUnitByIndex(store: OS, idx: number): Result<OS_Unit, string> {
    return store.units[idx];
}

function _saveFile(store: OS, unit: OS_Unit, contents: string) {
    store.units[unit.idx].contents = contents;

    return store;
}

function _createUnit(store: OS, unit: OS_Unit) {
    unit.idx = store.units.length;

    if(unit.contents && unit.contents instanceof File) {
        unit.name = unit.contents.name;
    }

    store.units.push(unit);
    
    const parent = store.units.findIndex(x => x.uuid === unit.parent);
    if(parent > -1) {
        (store.units[parent].contents as string[]).push(unit.uuid);
    }

    return store;
}

function _saveOstoLocalStorage(os: OS) {
    if(browser && os) {
        localStorage.setItem('os', JSON.stringify(os));
    }
}

function _getOsFromLocalStorage(): Some<OS> {
    const osString: Some<string> = localStorage.getItem('os');
    if(osString)
        return JSON.parse(osString);
    return null;

}

function _changeUnitParent(store: OS, unit: OS_Unit, newParent: string) {
    const previousParent = store.units[unit.idx].parent;
    store.units[unit.idx].parent = newParent;

    // Removing the unit's reference from the previous unit
    const previousParentIdx = store.units.findIndex(x => x.uuid === previousParent);
    if(previousParentIdx > -1) {
        const previousParentContents = store.units[previousParentIdx].contents as string[]
        store.units[previousParentIdx].contents = previousParentContents.filter(x => x !== unit.uuid)
    }

    // Adding the unit's reference to the new parent
    const newParentIdx = store.units.findIndex(x => x.uuid === newParent);
    if(newParentIdx > -1) {
        const newParentContents = store.units[newParentIdx].contents as string[];
        newParentContents.push(unit.uuid);
    }

    return store;
}

function _deleteUnit(store: OS, unit: OS_Unit) {
    store.units.splice(unit.idx, 1);
    store.units.forEach((unit, i) => unit.idx = i);

    const recycleBinIdx = store.units.findIndex(x => x.uuid === UUID_RECYCLE_BIN);
    const recycleBinContents = store.units[recycleBinIdx].contents as string[];
    store.units[recycleBinIdx].contents = recycleBinContents.filter(x => x !== unit.uuid);

    return store;
}

function _deleteAllUnitsFromRecycleBin(store: OS) {
    const recycleBinIdx = store.units.findIndex(x => x.uuid === UUID_RECYCLE_BIN);
    const recycleBinContents = store.units[recycleBinIdx].contents as string[];

    store.units = store.units.filter(x => !recycleBinContents.includes(x.uuid))
    store.units[recycleBinIdx].contents = [];

    return store;
}

function _renameUnit(store: OS, unit: OS_Unit, name: string) {
    unit.name = name;

    if(!unit.isSystemFile && 'extension' in unit) {
        const extension = getExtension(unit.name);

        if(extension) {
            unit.extension = extension;
            const potentialType = enumToKeys(OS_FileTypeEnum).indexOf(extension);
            unit.type = potentialType > -1 ? potentialType : unit.type;
        }
    }

    store.units[unit.idx] = unit

    return store;
}