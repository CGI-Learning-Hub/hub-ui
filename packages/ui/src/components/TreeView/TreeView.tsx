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
import {
  FC,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
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
    onClick,
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

  // Ajouter l'événement onClick au contenu
  const contentProps = getContentProps();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Appeler le gestionnaire d'origine s'il existe
      if (contentProps.onClick) {
        contentProps.onClick(event);
      }

      // Appeler notre gestionnaire onClick personnalisé s'il existe
      if (onClick && itemId) {
        onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
      }
    },
    [contentProps, onClick, itemId],
  );

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps()}>
        <TreeItem2Content
          {...contentProps}
          onClick={handleClick}
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

  // Utiliser une seule valeur pour l'élément sélectionné plutôt qu'un tableau
  const [selectedItem, setSelectedItem] = useState<string | null>(
    expandedItemId || null,
  );

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

  // Synchroniser l'élément sélectionné avec expandedItemId
  useEffect(() => {
    if (expandedItemId) {
      setSelectedItem(expandedItemId);
    }
  }, [expandedItemId]);

  // Utiliser apiRef pour ouvrir l'élément spécifié dynamiquement
  useEffect(() => {
    // Vérifier que apiRef.current existe et que nous avons des éléments à développer
    if (apiRef.current && expandedItems.length > 0) {
      // Sécuriser l'accès à apiRef.current en le stockant dans une variable locale
      const api = apiRef.current;
      expandedItems.forEach((id) => {
        // Utiliser un événement synthétique vide et spécifier isExpanded=true
        try {
          api.setItemExpansion({} as React.SyntheticEvent, id, true);
        } catch (e) {
          console.error("Erreur lors de l'expansion de l'item:", id, e);
        }
      });
    }
  }, [apiRef, expandedItems]);

  // Gestionnaire de clic direct sur un élément
  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>, itemId: string) => {
      if (onItemSelect) {
        console.log("Clic sur l'item:", itemId);
        onItemSelect(event, itemId);
        // Mettre à jour l'élément sélectionné
        setSelectedItem(itemId);
      }
    },
    [onItemSelect],
  );

  return (
    <Box sx={{ minHeight: 200, minWidth: 200 }}>
      <RichTreeView
        apiRef={apiRef}
        items={items}
        itemChildrenIndentation={"50px"}
        defaultExpandedItems={expandedItems}
        selectedItems={selectedItem ? [selectedItem] : []}
        disableSelection={false}
        multiSelect={false}
        slots={{
          item: (itemProps: TreeItem2Props) => {
            const originalItemData = itemProps.itemId
              ? itemDataMap[itemProps.itemId]
              : undefined;

            // Ajouter le gestionnaire de clic directement à l'élément
            const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
              if (itemProps.itemId) {
                handleItemClick(event, itemProps.itemId);
              }
            };

            return (
              <CustomTreeItem
                {...itemProps}
                itemData={originalItemData}
                iconColor={iconColor as ExtendedTreeItem2Props["iconColor"]}
                onClick={handleClick}
              />
            );
          },
        }}
      />
    </Box>
  );
};

export default TreeView;
