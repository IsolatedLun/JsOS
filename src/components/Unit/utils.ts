export function displayName(name: string, showExtension: boolean) {
    return showExtension ? name : name.split('.')[0];
}