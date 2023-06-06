import { get, writable } from "svelte/store";
import { OS_ThemeEnum, type OS, OS_GridLayout, type OS_Unit } from "./types";

export function createOS() {
    let store = writable<OS>({
        fileSystem: {
            units: [],
            recycleBin: [],
            gridLayout: OS_GridLayout.MEDIUM
        },
        preferences: {
            theme: OS_ThemeEnum.DARk,
            background: '',
            showExtensions: false
        },
        taskbar: {
            references: [],
            show_search: true
        }
    })

    return {
        subscribe: store.subscribe,
        createUnit: (unit: OS_Unit) => store.update(os => {
            unit.idx = os.fileSystem.units.length;

            os.fileSystem.units.push(unit);
            return os;
        }),

        getUnitByIndex: (idx: number) => _getUnitByIndex(get(store), idx),
        filterUnitsByName: (name: string) => _filterUnitsByName(get(store), name),
        recycleUnit: (idx: number) => _recycleUnit(get(store), idx),
        renameUnit: (idx: number, name: string) => store.update(() => _renameUnit(get(store), idx, name))
    }
}

export const JsOS = createOS();

// ===========================================
function _getUnitByIndex(store: OS, idx: number): OS_Unit {
    return store.fileSystem.units[idx];
}

function _filterUnitsByName(store: OS, name: string): OS_Unit[] {
    return store.fileSystem.units.filter(
        x => x.name.toLowerCase().indexOf(name.toLowerCase()) > -1
    );
}

function _recycleUnit(store: OS, idx: number) {
    const toRecycle = store.fileSystem.units[idx];
    store.fileSystem.units = store.fileSystem.units.filter((x, i) => i !== idx);
    store.fileSystem.recycleBin.push(toRecycle);

    return store
}

function _renameUnit(store: OS, idx: number, name: string) {
    store.fileSystem.units[idx].name = name;

    return store
}