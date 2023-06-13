import { OS_FileTypeEnum, type OS_Unit } from "../stores/types";

export function createDefaultOsUnit(type: OS_FileTypeEnum = OS_FileTypeEnum.BIN, parent: string | null = null): OS_Unit {
    if (type === OS_FileTypeEnum.BIN)
        return {
            type,
            parent: parent,
            contents: [],
            name: 'New Bin',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
        
    else
        return {
            type,
            parent: parent,
            contents: new File([], 'New File'),
            extension: '',
            name: 'New Unit',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
}