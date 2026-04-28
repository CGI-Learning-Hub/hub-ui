import type { BoxProps } from "@mui/material/Box";
import type { FC } from "react";

import { StyledLoader, StyledLoaderInner } from "./Loader.styles";

export type LoaderProps = BoxProps;

const Loader: FC<LoaderProps> = (props) => {
  return (
    <StyledLoader {...props} sx={{ color: "primary.main", ...props.sx }}>
      <StyledLoaderInner>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </StyledLoaderInner>
    </StyledLoader>
  );
};

export default Loader;
