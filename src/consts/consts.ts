import { OS_FileTypeEnum } from "../stores/types";
import { ICON_FILE, ICON_FOLDER, ICON_TERMINAL, ICON_TEXT, ICON_TRASH, ICON_ZIP } from "./icons";

export const extensionToIcon: Record<string, string> = {
    'folder': ICON_FOLDER,
    'cmd': ICON_TERMINAL,
    'exe': 'exe',
    'recycle': ICON_TRASH,
    'txt': ICON_TEXT,
    
    '': ICON_FILE,
}

export const ATTR_SYSTEM_FILE = 'data-system-file';
export const UUID_RECYCLE_BIN = 'recycleBin';