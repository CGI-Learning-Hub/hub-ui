import Box from "@mui/material/Box/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import React, { FC, useEffect, useMemo, useState } from "react";

import CustomTreeItem from "./components/CustomTreeItem";
import { DEFAULT_CHILDREN_INDENT, treeContainerStyle } from "./style";
import { ExtendedTreeItem2Props, TreeViewProps } from "./types";
import { buildItemDataMap, findItemPath, getItemId } from "./utils";

const TreeView: FC<TreeViewProps> = ({
  items,
  selectedItemId,
  handleSelectedItemChange,
  iconColor = "primary",
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const itemDataMap = useMemo(() => buildItemDataMap(items), [items]);

  useEffect(() => {
    if (selectedItemId) {
      const path = findItemPath(items, selectedItemId);

      if (path) {
        const parentsToExpand = path.slice(0, -1);

        setExpandedItems((prev) => {
          const uniqueParents = parentsToExpand.filter(
            (id) => !prev.includes(id),
          );

          return uniqueParents.length > 0 ? [...prev, ...uniqueParents] : prev;
        });
      }
    }
  }, [selectedItemId, items]);

  const handleExpandedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string[],
  ) => {
    setExpandedItems(itemIds);
  };

  return (
    <Box sx={treeContainerStyle} data-treeview-root="true">
      <RichTreeView
        items={items}
        selectedItems={selectedItemId}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        itemChildrenIndentation={DEFAULT_CHILDREN_INDENT}
        onSelectedItemsChange={handleSelectedItemChange}
        getItemId={getItemId}
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
