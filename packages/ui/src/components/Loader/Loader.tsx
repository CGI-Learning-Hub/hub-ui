import Box, { type BoxProps } from "@mui/material/Box";

import "./styles.css";

export type LoaderProps = BoxProps;

const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  return (
    <Box className="cs-loader" color="primary.main" {...props}>
      <Box className="cs-loader-inner">
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </Box>
    </Box>
  );
};

export default Loader;
