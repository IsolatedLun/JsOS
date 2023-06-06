import type { Some } from "../types";

// =============
// Units
export enum OS_FileTypeEnum {
    FILE,
    FOLDER,
    EXE,
    CMD
}

export interface OS_File {
    name: string,
    contents: Some<File>,

    type: OS_FileTypeEnum
}

export interface OS_Folder {
    name: string,
    contents: OS_Unit[],

    type: OS_FileTypeEnum.FOLDER
}

export type OS_Unit = (OS_File | OS_Folder) & { idx: number, uuid: string };
// =============


// =============
// Preferences/Settings
export enum OS_ThemeEnum {
    DARk,
    LIGHT
}

export enum OS_GridLayout {
    SMALL,
    MEDIUM,
    LARGE
}
// =============

export interface OS {
    fileSystem: {
        units: OS_Unit[],
        recycleBin: OS_Unit[],
        gridLayout: OS_GridLayout,
    },

    taskbar: {
        references: OS_Unit[],
        show_search: boolean;
    },

    preferences: {
        background: string;
        theme: OS_ThemeEnum;
        showExtensions: boolean;
    }
}