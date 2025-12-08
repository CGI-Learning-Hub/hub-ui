import Backdrop, { type BackdropProps } from "@mui/material/Backdrop";
import type { BoxProps } from "@mui/material/Box";

import { StyledLoaderBackdropInner } from "./LoaderBackdrop.styles";

export type LoaderBackdropProps = {
  slotProps?: {
    backdrop?: Omit<BackdropProps, "open" | "children">;
    loader?: BoxProps;
  };
};

const LoaderBackdrop: React.FunctionComponent<LoaderBackdropProps> = ({
  slotProps = {},
}) => {
  return (
    <Backdrop
      open
      sx={{ bgcolor: "background.default" }}
      {...slotProps.backdrop}
    >
      <StyledLoaderBackdropInner color="primary.main" {...slotProps.loader}>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </StyledLoaderBackdropInner>
    </Backdrop>
  );
};

export default LoaderBackdrop;
