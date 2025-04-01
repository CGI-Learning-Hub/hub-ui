import { Box, styled } from "@mui/material";
import { CSSProperties } from "react";

import { TreeContainerProps } from "./types";

export const DEFAULT_CHILDREN_INDENT = "50px";

export const TreeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<TreeContainerProps>(({ maxHeight }) => ({
  maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
  overflowY: "auto",
}));

export const treeItemRootStyle: CSSProperties = { margin: "6px 0" };

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
  marginLeft: "11px",
  marginTop: "8px",
  marginBottom: "8px",
};

export const iconStyle: CSSProperties = {
  width: "24px",
  height: "24px",
};
