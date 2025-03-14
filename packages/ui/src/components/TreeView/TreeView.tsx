import { SvgIconComponent } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Props,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { FC, Ref, forwardRef, useEffect, useMemo } from "react";

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
  id: string;
  label: string;
  iconType?: IconType;
  customIcon?: SvgIconComponent;
}

export type CustomTreeViewItem = TreeViewBaseItem<CustomTreeViewItemProps>;

export interface TreeViewProps {
  items: CustomTreeViewItem[];
  onItemSelect?: (event: React.SyntheticEvent, itemId: string) => void;
  iconColor?: string;
  expandedItemId?: string;
}

interface ExtendedTreeItem2Props extends TreeItem2Props {
  itemData?: CustomTreeViewItem;
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

interface ItemDataMap {
  [key: string]: CustomTreeViewItem;
}

const getIconComponent = (
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

const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: ExtendedTreeItem2Props,
  ref: Ref<HTMLLIElement>,
) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    itemData,
    iconColor = "primary",
  } = props;

  const IconComponent = getIconComponent(
    itemData?.iconType,
    itemData?.customIcon,
  );

  const {
    getRootProps,
    getContentProps,
    getLabelProps,
    getGroupTransitionProps,
    getIconContainerProps,
    status,
  } = useTreeItem2({ id, itemId, label, disabled, children, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps()}>
        <TreeItem2Content
          {...getContentProps()}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <IconComponent fontSize="small" color={iconColor} />
          </TreeItem2IconContainer>

          <TreeItem2Label {...getLabelProps()} />

          <Box sx={{ display: "flex", marginLeft: "auto" }}>
            {status.expandable &&
              (status.expanded ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              ))}
          </Box>
        </TreeItem2Content>
        {children && (
          <TreeItem2GroupTransition
            {...getGroupTransitionProps()}
            style={
              status.expanded
                ? {
                    borderLeft: "1px solid #bdbdbd",
                    paddingLeft: "12px",
                    marginLeft: "15px",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }
                : undefined
            }
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

const buildItemDataMap = (items: CustomTreeViewItem[]): ItemDataMap => {
  const map: ItemDataMap = {};

  const addItemToMap = (item: CustomTreeViewItem) => {
    map[item.id] = item;
    if (item.children?.length) {
      item.children.forEach(addItemToMap);
    }
  };

  items.forEach(addItemToMap);
  return map;
};

// Fonction utilitaire pour trouver tous les parents d'un item
const findItemParents = (
  itemId: string,
  items: CustomTreeViewItem[],
  parentIds: string[] = [],
): string[] => {
  for (const item of items) {
    if (item.id === itemId) {
      return parentIds;
    }

    if (item.children?.length) {
      const result = findItemParents(itemId, item.children, [
        ...parentIds,
        item.id,
      ]);
      if (result.length > 0) {
        return result;
      }
    }
  }

  return [];
};

const TreeView: FC<TreeViewProps> = ({
  items,
  onItemSelect,
  iconColor = "primary",
  expandedItemId,
}) => {
  const itemDataMap = useMemo(() => buildItemDataMap(items), [items]);
  const apiRef = useTreeViewApiRef();

  // Calculer tous les éléments parents qui doivent être ouverts si expandedItemId est défini
  const expandedItems = useMemo(() => {
    if (!expandedItemId) return [];

    // Ajouter l'ID lui-même s'il existe dans notre map
    if (itemDataMap[expandedItemId]) {
      // Trouver tous les parents à ouvrir également
      const parentIds = findItemParents(expandedItemId, items);
      return [...parentIds, expandedItemId];
    }

    return [];
  }, [expandedItemId, itemDataMap, items]);

  // Utiliser apiRef pour ouvrir l'élément spécifié dynamiquement
  useEffect(() => {
    if (apiRef.current && expandedItems.length > 0) {
      expandedItems.forEach((id) => {
        apiRef.current.setItemExpansion(id, true);
      });
    }
  }, [apiRef, expandedItems]);
  console.log(expandedItems);

  return (
    <Box sx={{ minHeight: 200, minWidth: 200 }}>
      <RichTreeView
        apiRef={apiRef}
        items={items}
        itemChildrenIndentation={"50px"}
        defaultExpandedItems={expandedItems}
        onSelect={(event, selectedItemIds) => {
          if (onItemSelect && typeof selectedItemIds === "string") {
            onItemSelect(event, selectedItemIds);
          }
        }}
        slots={{
          item: (itemProps: TreeItem2Props) => {
            const originalItemData = itemProps.itemId
              ? itemDataMap[itemProps.itemId]
              : undefined;

            return (
              <CustomTreeItem
                {...itemProps}
                itemData={originalItemData}
                iconColor={iconColor as ExtendedTreeItem2Props["iconColor"]}
              />
            );
          },
        }}
      />
    </Box>
  );
};

export default TreeView;
