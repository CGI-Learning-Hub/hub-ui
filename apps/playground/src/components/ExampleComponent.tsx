import { useTheme } from "@mui/material";
import type {} from "@mui/material/themeCssVarsAugmentation";
// necessary to use theme.vars
import React from "react";

import "./example.css";

type ExampleComponentProps = {
  primaryText: string;
  secondaryText: string;
};

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  primaryText,
  secondaryText,
}) => {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: 10,
        backgroundColor: theme.vars.palette.primary.lighter,
      }}
    >
      <p style={{ color: "var(--theme-palette-primary-main)" }}>
        {primaryText}
      </p>
      <p className="secondary-text">{secondaryText}</p>
    </div>
  );
};

export default ExampleComponent;
