import { OS_FileTypeEnum, type OS_Unit } from "../stores/types";

export function createDefaultOsUnit(): OS_Unit {
    return {
        contents: [],
        type: OS_FileTypeEnum.FOLDER,
        name: 'New folder',
    }
}