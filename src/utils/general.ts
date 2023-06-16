import type { Enum } from "../types"

export function enumToKeys(e: Enum): string[] {
    const values: string[] =  Object.keys(e).filter(x => isNaN(Number(x)) === true);
    return values.map(x => x.toLowerCase());
}