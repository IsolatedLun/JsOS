import type { Some } from "../types";

export enum OS_FileTypeEnum {
    UNKNOWN,
    ZIP,
    CMD,
    TXT,
    BROWSE,
    FOLDER,
}

export interface OS_File {
    icon: string;
    contents: Some<File>;

    cell: number;
    type: OS_FileTypeEnum;
}

export interface OS_Folder {
    name: string,
    contents: File[],
    cell: number;
    type: OS_FileTypeEnum.FOLDER;
}

export enum OS_ThemeEnum {
    DARk,
    LIGHT
}

export enum OS_GridLayout {
    SMALL,
    MEDIUM,
    LARGE
}

export interface OS {
    file_system: {
        files: (OS_File | OS_Folder)[],
        recycle_bin: (OS_File | OS_Folder)[],
        grid_layout: OS_GridLayout,
    },

    taskbar: {
        references: OS_File[],
        show_search: boolean;
    },

    preferences: {
        wallpaper: string;
        theme: OS_ThemeEnum;
    }

}