import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import {
  TreeItemContent,
  TreeItemGroupTransition,
  TreeItemIconContainer,
  TreeItemRoot,
} from "@mui/x-tree-view/TreeItem";
import { TreeItemProvider } from "@mui/x-tree-view/TreeItemProvider";
import { useTreeItem } from "@mui/x-tree-view/useTreeItem";
import { type Ref } from "react";

import { EllipsisWithTooltip } from "../../EllipsisWithTooltip";
import {
  arrowContainerStyle,
  expandedGroupStyle,
  iconStyle,
  treeContentStyle,
  treeItemRootStyle,
} from "../style";
import { ExtendedTreeItemProps } from "../types";
import { getIconComponent } from "../utils";

function CustomTreeItem(
  props: ExtendedTreeItemProps & { ref?: Ref<HTMLLIElement> },
) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    itemData,
    iconColor = "primary",
    hasNoIcons,
    ref,
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
  } = useTreeItem({ id, itemId, label, disabled, children, rootRef: ref });

  const labelStyle = {
    ...(status.selected && { fontWeight: 600 }),
    color: "var(--theme-palette-text-primary)",
  };

  return (
    <TreeItemProvider itemId={itemId}>
      <TreeItemRoot
        {...getRootProps()}
        data-treeview-item={itemId || ""}
        data-treeview-item-label={label || ""}
        sx={treeItemRootStyle}
      >
        <TreeItemContent {...getContentProps()} style={treeContentStyle}>
          {!hasNoIcons && (
            <TreeItemIconContainer {...getIconContainerProps()} sx={iconStyle}>
              <IconComponent color={iconColor} sx={iconStyle} />
            </TreeItemIconContainer>
          )}
          <EllipsisWithTooltip
            {...getLabelProps()}
            typographyProps={labelStyle}
          />

          <Box sx={arrowContainerStyle}>
            {status.expandable &&
              (status.expanded ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              ))}
          </Box>
        </TreeItemContent>
        {children && (
          <TreeItemGroupTransition
            {...getGroupTransitionProps()}
            style={status.expanded ? expandedGroupStyle : undefined}
          />
        )}
      </TreeItemRoot>
    </TreeItemProvider>
  );
}

export default CustomTreeItem;
