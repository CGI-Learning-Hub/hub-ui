import Backdrop, { type BackdropProps } from "@mui/material/Backdrop";
import Box, { type BoxProps } from "@mui/material/Box";

import "./styles.css";

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
      <Box
        className="cs-loader-backdrop-inner"
        color="primary.main"
        {...slotProps.loader}
      >
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </Box>
    </Backdrop>
  );
};

export default LoaderBackdrop;
