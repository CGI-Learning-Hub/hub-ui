import { Box, styled } from "@mui/material";
import { CSSProperties } from "react";

import { TreeContainerProps } from "./types";

export const DEFAULT_CHILDREN_INDENT = "50px";

export const TreeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "height",
})<TreeContainerProps>(({ height }) => ({
  minHeight: 200,
  minWidth: 200,
  height: typeof height === "number" ? `${height}px` : height,
  overflowY: "auto",
}));

export const treeContentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
};

export const arrowContainerStyle = {
  display: "flex",
  marginLeft: "auto",
};

export const expandedGroupStyle: CSSProperties = {
  borderLeft: "1px solid #bdbdbd",
  paddingLeft: "12px",
  marginLeft: "15px",
  marginTop: "4px",
  marginBottom: "4px",
};
