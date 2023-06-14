import { OS_FileTypeEnum, type OS_Unit } from '../stores/types';

export function createDefaultOsUnit(unit: Partial<OS_Unit>): OS_Unit {
	return { 
		type: unit?.type ?? OS_FileTypeEnum.BIN,
		parent: unit?.parent ?? 'root',
		isSystemFile: unit?.isSystemFile ?? false,
		previousParent: unit?.previousParent ?? '',
		contents:  unit?.contents ?? [],
		icon: unit?.icon ?? null,
		extension: '',
		name: unit?.name ?? 'New Unit',
		uuid: unit?.uuid ?? crypto.randomUUID(),
		idx: 0
	}
}
