import type { Some } from "../types";

// =============
// Units
export enum OS_FileTypeEnum {
    FILE,
    RECYCLE,
    BIN,
    TXT
}

export type OS_Unit =  { 
    name: string,
    icon: Some<string>,
    uuid: string, 
    
    contents: Some<string[] | string>,
    
    idx: number, 
    isSystemFile: boolean,

    extension: Some<string>,

    parent: Some<string>,
    previousParent: Some<string>, 

    type: OS_FileTypeEnum
};
// =============


// =============
// Preferences/Settings
export enum OS_ThemeEnum {
    DARK,
    LIGHT
}

export enum OS_GridLayout {
    SMALL,
    MEDIUM,
    LARGE
}

export interface OS_Preferences {
    theme: OS_ThemeEnum;
    showExtensions: boolean;
}
// =============

export interface OS {
    units: OS_Unit[],
    selectedUnitUuids: string[];

    taskbar: {
        references: string[],
        show_search: boolean,
    },

    preferences: OS_Preferences,
}