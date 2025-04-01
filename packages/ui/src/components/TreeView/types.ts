import { SvgIconComponent } from "@mui/icons-material";
import { TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";

export type TreeViewItemId = string;
export type TreeViewItemsReorderingAction =
  | "reorder-above"
  | "reorder-below"
  | "make-child"
  | "move-to-parent";

declare module "@mui/x-tree-view/TreeItem2" {
  interface TreeItem2Props {
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

export interface CustomTreeViewItemProps {
  internalId: string;
  label: string;
  iconType?: IconType;
  customIcon?: SvgIconComponent;
}

export type CustomTreeViewItem = TreeViewBaseItem<CustomTreeViewItemProps>;

export interface TreeViewProps {
  items: CustomTreeViewItem[];
  selectedItemId: string;
  handleSelectedItemChange: (
    event: React.SyntheticEvent,
    itemIds: string | null,
  ) => void;
  iconColor?: string;
  maxHeight?: string | number;
  hasNoIcons?: boolean;
}

export interface ExtendedTreeItem2Props extends TreeItem2Props {
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
