import { Box, CardContent, CardMedia, Tooltip } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ImageStyle, ItemCard, PublicIconWrapper, SelectedIcon, StyledCard } from "./style";
import { EllipsisWithTooltip } from "../EllipsisWithTooltip";

export type PropertyItem = {
  text: ReactNode;
  icon?: ReactNode;
}

export type InfoItem = {
  text: string;
  icon: ReactNode;
}

type Size = "md" | "sm";

export interface ResourceCardProps {
  isSelected?: boolean;
  onSelect?: () => void;
  image?: string;
  title: string;
  propertyItems?: PropertyItem[];
  infoIcons?: InfoItem[];
  size?: Size;
  width?: string;
  height?: string;
}

export const ResourceCard = forwardRef<HTMLDivElement, ResourceCardProps>(({ isSelected = false, onSelect = () => {}, image, title, propertyItems = [], infoIcons = [], size = "md", width, height }, ref) => {

  // 3 maximum
  infoIcons = infoIcons.slice(0, 3);

  return (
    <Box ref={ref} sx={{ 
      position: "relative",
      width: width ? width : "300px",
      height: height ? height : "auto"
    }}>
      <StyledCard selected={isSelected}>
        <Box sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <CardMedia image={image} sx={ImageStyle} />
        </Box>
        <CardContent sx={{ padding: "0 16px 16px 16px" }}>
          <EllipsisWithTooltip
            typographyProps={{ fontWeight: "700", fontSize: "1.1rem" }}
            tooltipProps={{ placement: "bottom", arrow: true }}
          >
            {title}
          </EllipsisWithTooltip>
          {propertyItems.length > 0 && propertyItems.map(property => (
            <Box sx={ItemCard}>
              {property.icon && property.icon}
              <Box sx={{ marginLeft: "0.5rem", display: "flex" }}>
                {property.text}
              </Box>
            </Box>
          ))}
          <Box sx={PublicIconWrapper}>
            {infoIcons.length > 0 && infoIcons.map(infoItem => (
              <Tooltip title={infoItem.text} placement="top" arrow>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "fit-content",
                    height: "fit-content",
                  }}
                >
                  {infoItem.icon}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </CardContent>
        <SelectedIcon
          onClick={e => {
            e.stopPropagation();
            onSelect();
          }}
          className="selected-icon"
          selected={isSelected}
        >
          <MoreVertIcon />
        </SelectedIcon>
      </StyledCard>
    </Box>
  );
});
