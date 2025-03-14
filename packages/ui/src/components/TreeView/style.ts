import { CSSProperties } from "react";

export const treeContainerStyle = {
  minHeight: 200,
  minWidth: 200,
};

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
