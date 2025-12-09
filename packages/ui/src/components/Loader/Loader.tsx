import type { BoxProps } from "@mui/material/Box";
import type { FC } from "react";

import { StyledLoader, StyledLoaderInner } from "./Loader.styles";

export type LoaderProps = BoxProps;

const Loader: FC<LoaderProps> = (props) => {
  return (
    <StyledLoader color="primary.main" {...props}>
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
