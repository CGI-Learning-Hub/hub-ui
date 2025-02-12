import Box from "@mui/material/Box";

import "./styles.css";

export type LoaderProps = {};

const Loader: React.FunctionComponent<LoaderProps> = ({}) => {
  return (
    <Box className="cs-loader" color="primary.main">
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
