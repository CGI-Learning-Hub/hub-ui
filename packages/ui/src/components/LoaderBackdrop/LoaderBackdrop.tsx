import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import "./styles.css";

export type LoaderBackdropProps = {};

const LoaderBackdrop: React.FunctionComponent<LoaderBackdropProps> = ({}) => {
  return (
    <Backdrop open sx={{ bgcolor: "background.default" }}>
      <Box className="cs-loader-backdrop-inner" color="primary.main">
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </Box>
    </Backdrop>
  );
};

export default LoaderBackdrop;
