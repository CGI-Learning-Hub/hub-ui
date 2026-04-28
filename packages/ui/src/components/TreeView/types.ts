import type { SvgIconComponent } from "@mui/icons-material";
import type { TreeItemProps } from "@mui/x-tree-view/TreeItem";
import type { SyntheticEvent } from "react";

export type TreeViewItemId = string;
export type TreeViewItemsReorderingAction =
  | "reorder-above"
  | "reorder-below"
  | "make-child"
  | "move-to-parent";

declare module "@mui/x-tree-view/TreeItem" {
  interface TreeItemProps {
    itemData?: CustomTreeViewItem;
  }
}

export enum ICON_TYPE {
  FOLDER = "FOLDER",
  SHARE = "SHARE",
  TRASH = "TRASH",
  CUSTOM = "CUSTOM",
}

export type IconType = ICON_TYPE | SvgIconComponent;

export type CustomTreeViewItem = {
  internalId: string;
  label: string;
  iconType?: IconType;
  customIcon?: SvgIconComponent;
  children?: CustomTreeViewItem[];
};

export interface TreeViewProps {
  items: CustomTreeViewItem[];
  selectedItemId: string;
  handleSelectedItemChange: (
    event: SyntheticEvent | null,
    itemIds: string | null,
  ) => void;
  iconColor?: string;
  maxHeight?: string | number;
  hasNoIcons?: boolean;
  defaultExpandedItems?: string[];
}

export interface ExtendedTreeItemProps extends TreeItemProps {
  itemData?: CustomTreeViewItem;
  hasNoIcons: boolean;
  iconColor?:
    | "disabled"
    | "primary"
    | "inherit"
    | "action"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

export interface ItemDataMap {
  [key: string]: CustomTreeViewItem;
}

export interface TreeContainerProps {
  maxHeight: number | string;
}
