import { useTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
// necessary to use theme.vars
import { FC } from "react";

import "./example.css";

type ExampleComponentProps = {
  primaryText: string;
  secondaryText: string;
};

const ExampleComponent: FC<ExampleComponentProps> = ({
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
