import React, { Ref, forwardRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box/Box";
import {
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { ExtendedTreeItem2Props } from "../types";
import { getIconComponent } from "../utils";
import { arrowContainerStyle, expandedGroupStyle, treeContentStyle } from "../style";


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
          style={treeContentStyle}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <IconComponent fontSize="small" color={iconColor} />
          </TreeItem2IconContainer>

          <TreeItem2Label {...getLabelProps()} />

          <Box sx={arrowContainerStyle}>
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
                ? expandedGroupStyle
                : undefined
            }
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

export default CustomTreeItem;