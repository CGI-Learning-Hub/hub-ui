import type { SvgIconComponent } from "@mui/icons-material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import {
  type CustomTreeViewItem,
  ICON_TYPE,
  type IconType,
  type ItemDataMap,
} from "./types";

export const getIconComponent = (
  iconType: IconType | undefined,
  customIcon: SvgIconComponent | undefined,
): SvgIconComponent => {
  if (!iconType) return FolderRoundedIcon;
  if (typeof iconType !== "string") return iconType;

  switch (iconType) {
    case ICON_TYPE.SHARE:
      return ShareRoundedIcon;
    case ICON_TYPE.TRASH:
      return DeleteRoundedIcon;
    case ICON_TYPE.CUSTOM:
      return customIcon || FolderRoundedIcon;
    case ICON_TYPE.FOLDER:
    default:
      return FolderRoundedIcon;
  }
};

export const getItemId = (item: CustomTreeViewItem) => item.internalId;

export const findItemPath = (
  items: CustomTreeViewItem[],
  targetId: string,
  currentPath: string[] = [],
): string[] | null => {
  for (const item of items) {
    const newPath = [...currentPath, item.internalId];

    if (item.internalId === targetId) {
      return newPath;
    }

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
