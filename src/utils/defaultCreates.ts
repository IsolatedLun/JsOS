import { OS_FileTypeEnum, type OS_Unit } from "../stores/types";

export function createDefaultOsUnit(type: OS_FileTypeEnum = OS_FileTypeEnum.FOLDER): OS_Unit {
    if (type === OS_FileTypeEnum.FOLDER)
        return {
            type,
            contents: [],
            name: 'New Unit',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
        
    else
        return {
            type,
            contents: new File([], 'New Unit'),
            name: 'New Unit',
            uuid: crypto.randomUUID(),
            idx: 0,
        }
}