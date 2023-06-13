import { OS_FileTypeEnum } from "../../stores/types";

export function displayName(name: string, showExtension: boolean) {
    return showExtension ? name : name.split('.')[0];
}

export function createComponentName(type: OS_FileTypeEnum) {
    let nameChars = [...OS_FileTypeEnum[type]];
    for(let i = 1; i < nameChars.length; i++) {
        nameChars[i] = nameChars[i].toLowerCase()
    }

    return nameChars.join('') + 'Unit';
}