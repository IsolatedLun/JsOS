import type { Some } from "../types";
import { JsOS } from "./os";
import { Buffer } from "buffer";
import type { OS_Unit } from "./types";

export function getExtension(fileName: string) {
    return fileName.split('.')[1];
}

export function _initiateChangeBackground() {
    const imgInput = document.querySelector('#background-input') as HTMLInputElement;
    imgInput.click();
}

export function moveSelectedUnitsToBin(unitUuids: string[]) {
    unitUuids.forEach(uuid => {
        JsOS.recycleUnit(JsOS.getUnitByUuid(uuid));
    });
    return [];
}

export async function fileToString(file: File): Promise<Some<string>> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const target = e.target?.result as string;
            resolve(btoa(target));
        }
        reader.onerror = (e) => {
            alert('error')
            reject('fuck off')
        }
    
        reader.readAsBinaryString(file);
    })
}

export function stringToFile(unit: OS_Unit): File {
    const byteCharacters = Buffer.from(unit.extension!, 'base64').toString('binary');
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new File([byteArray], unit.name, { type: unit.extension! });
}