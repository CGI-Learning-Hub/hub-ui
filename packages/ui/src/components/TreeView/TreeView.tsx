import { SvgIconComponent } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FolderIcon from "@mui/icons-material/Folder";
import Box from "@mui/material/Box/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Props as MuiTreeItem2Props,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { FC, Ref, forwardRef } from "react";

export interface TreeItem2Props extends MuiTreeItem2Props {
  folderIcon?: SvgIconComponent;
}

export interface TreeViewProps {
  items: TreeViewBaseItem[];
  onItemSelect?: (event: React.SyntheticEvent, itemId: string) => void;
  folderIcon?: SvgIconComponent;
}

const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: TreeItem2Props,
  ref: Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children } = props;
  const FolderIconComponent =
    (props.folderIcon as SvgIconComponent) || FolderIcon;

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
            <FolderIconComponent
              fontSize="small"
              color="action"
              style={{ color: "#ff9800" }}
            />
          </TreeItem2IconContainer>

          <TreeItem2Label {...getLabelProps()} />

          {/* Flèche positionnée à droite */}
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
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

const TreeView: FC<TreeViewProps> = ({
  items,
  onItemSelect,
  folderIcon = FolderIcon,
}) => {
  return (
    <Box sx={{ minHeight: 200, minWidth: 200 }}>
      <RichTreeView
        items={items}
        onSelect={(event) =>
          onItemSelect && onItemSelect(event, (event.target as HTMLElement).id)
        }
        slots={{
          item: (itemProps: TreeItem2Props) => (
            <CustomTreeItem {...itemProps} folderIcon={folderIcon} />
          ),
        }}
      />
    </Box>
  );
};

export default TreeView;
