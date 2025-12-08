import type { BoxProps } from "@mui/material/Box";

import { StyledLoader, StyledLoaderInner } from "./Loader.styles";

export type LoaderProps = BoxProps;

const Loader: React.FunctionComponent<LoaderProps> = (props) => {
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
