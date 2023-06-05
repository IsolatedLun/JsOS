import { OS_FileTypeEnum } from "../stores/types";
import { ICON_FILE, ICON_FOLDER, ICON_TERMINAL } from "./icons";

export const fileTypeToIcon = {
    [OS_FileTypeEnum.FOLDER]: ICON_FOLDER,
    [OS_FileTypeEnum.FILE]: ICON_FILE,
    [OS_FileTypeEnum.CMD]: ICON_TERMINAL,
}