import { OS_FileTypeEnum, type OS_Unit } from "../stores/types";

export function createDefaultOsUnit(type: OS_FileTypeEnum = OS_FileTypeEnum.BIN): OS_Unit {
    if (type === OS_FileTypeEnum.BIN)
        return {
            type,
            contents: [],
            name: 'New Bin',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
        
    else
        return {
            type,
            contents: new File([], 'New File'),
            extension: '',
            name: 'New Unit',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
}