import { SvgIconComponent } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ShareIcon from "@mui/icons-material/Share";

import { CustomTreeViewItem, ICON_TYPE, IconType, ItemDataMap } from "./types";

export const getIconComponent = (
  iconType: IconType | undefined,
  customIcon: SvgIconComponent | undefined,
): SvgIconComponent => {
  if (!iconType) return FolderIcon;
  if (typeof iconType !== "string") return iconType;

  switch (iconType) {
    case ICON_TYPE.SHARE:
      return ShareIcon;
    case ICON_TYPE.TRASH:
      return DeleteIcon;
    case ICON_TYPE.CUSTOM:
      return customIcon || FolderIcon;
    case ICON_TYPE.FOLDER:
    default:
      return FolderIcon;
  }
};

export const getItemId = (item: CustomTreeViewItem) => item.internalId;

export const findItemPath = (
  items: CustomTreeViewItem[],
  targetId: string,
  currentPath: string[] = [],
): string[] | null => {
  for (const item of items) {
    // Path pour cet élément
    const newPath = [...currentPath, item.internalId];

    // Si c'est l'élément cible, retourner le chemin
    if (item.internalId === targetId) {
      return newPath;
    }

    // Rechercher dans les enfants si présents
    if (item.children && item.children.length > 0) {
      const foundPath = findItemPath(
        item.children as CustomTreeViewItem[],
        targetId,
        newPath,
      );

      if (foundPath) {
        return foundPath;
      }
    }
  }

  return null;
};

export const buildItemDataMap = (items: CustomTreeViewItem[]): ItemDataMap => {
  const map: ItemDataMap = {};

  const addItemToMap = (item: CustomTreeViewItem) => {
    map[item.internalId] = item;
    if (item.children?.length) {
      item.children.forEach(addItemToMap);
    }
  };

  items.forEach(addItemToMap);
  return map;
};
