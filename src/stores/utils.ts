import { OS_FileTypeEnum } from "./types";

export function getExtension(fileName: string) {
    return fileName.split('.')[1];
}

export function _initiateChangeBackground() {
    const imgInput = document.querySelector('#background-input') as HTMLInputElement;
    imgInput.click();
}