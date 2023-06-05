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

export type OS_Unit = OS_File | OS_Folder;
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
    file_system: {
        units: OS_Unit[],
        recycle_bin: OS_Unit[],
        grid_layout: OS_GridLayout,
    },

    taskbar: {
        references: OS_Unit[],
        show_search: boolean;
    },

    preferences: {
        wallpaper: string;
        theme: OS_ThemeEnum;
    }
}