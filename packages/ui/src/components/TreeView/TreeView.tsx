import Box from "@mui/material/Box/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import React, { FC, useEffect, useMemo, useState } from "react";

import { ExtendedTreeItem2Props, TreeViewProps } from "./types";
import { buildItemDataMap, findItemPath, getItemId } from "./utils";
import { treeContainerStyle } from "./style";
import CustomTreeItem from "./components/CustomTreeItem";

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
          const newExpanded = [...prev];
          let changed = false;

          parentsToExpand.forEach((id) => {
            if (!newExpanded.includes(id)) {
              newExpanded.push(id);
              changed = true;
            }
          });
          return changed ? newExpanded : prev;
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
    <Box sx={treeContainerStyle}>
      <RichTreeView
        items={items}
        selectedItems={selectedItemId}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        itemChildrenIndentation={"50px"}
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
