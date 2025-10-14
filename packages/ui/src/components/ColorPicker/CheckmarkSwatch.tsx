import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { FC } from "react";

import { StyledSwatchBox } from "./styles";
import { SwatchProps } from "./types";

export const CheckmarkSwatch: FC<SwatchProps> = ({
  color,
  onClick,
  active,
  showBorder = false,
}) => {
  // Fonction pour déterminer si on doit utiliser du noir ou du blanc sur un fond coloré
  const getContrastingColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <StyledSwatchBox
      onClick={onClick}
      showBorder={showBorder}
      backgroundColor={color}
    >
      {active && (
        <CheckRoundedIcon
          sx={{
            fontSize: 14,
            color: getContrastingColor(color),
          }}
        />
      )}
    </StyledSwatchBox>
  );
};
