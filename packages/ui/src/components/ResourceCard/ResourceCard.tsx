import { Box, CardContent, CardMedia, Tooltip } from "@mui/material";
import { forwardRef, ReactNode, KeyboardEvent as ReactKeyboardEvent } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ItemCard, PublicIconWrapper, SelectedIcon, StyledCard } from "./style";
import { EllipsisWithTooltip } from "../EllipsisWithTooltip";

export type PropertyItem = {
  text: ReactNode;
  icon?: ReactNode;
}

export type InfoItem = {
  text: string;
  icon: ReactNode;
}

export type ResourceCardSize = "md" | "sm";

export interface ResourceCardProps {
  isSelected?: boolean;
  onSelect?: () => void;
  image?: string;
  title: string;
  propertyItems?: PropertyItem[];
  infoIcons?: InfoItem[];
  size?: ResourceCardSize;
  width?: string;
  onClick?: () => void;
}

export const ResourceCard = forwardRef<HTMLDivElement, ResourceCardProps>(({ 
  isSelected = false, 
  onSelect = () => {}, 
  image, title, 
  propertyItems = [], 
  infoIcons = [], 
  size = "md", 
  width, 
  onClick = () => {} 
}, ref) => {

  // 3 maximum
  infoIcons = infoIcons.slice(0, 3);

  return (
    <Box ref={ref} sx={{ 
      position: "relative",
      width: width && size === "md" ? width : "360px",
      height: "auto"
    }}>
      <StyledCard 
        selected={isSelected}
        size={size}
        onClick={onClick}
        onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Resource card for ${title}`}
      >
        <SelectedIcon
          onClick={e => {
            e.stopPropagation();
            onSelect();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect();
            }
          }}
          className="selected-icon"
          selected={isSelected}
          role="button"
          tabIndex={0}
          aria-label={isSelected ? "Unselect card" : "Select card"}
        >
          <MoreVertIcon />
        </SelectedIcon>
        <Box sx={{
          width: size == "sm" ? 110 : "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box"
        }}>
          <CardMedia 
            image={image}
            sx={{
              height: size == "sm" ? "calc(100% - 32px)" : 180,
              width: size == "sm" ? "calc(100% - 32px)" : "calc(100% - 2rem)",
              objectFit: "cover",
              margin: size == "sm" ? 0 : "1rem",
              borderRadius: "0.5rem",
            }}
            role="img"
            aria-label={`Image for ${title}`}
          />
        </Box>
        <CardContent sx={{ padding: size == "sm" ? "1rem 0 !important" : "0 16px 16px 16px !important", width: size === "sm" ? "calc(100% - 110px)" : "100%" }}>
          <EllipsisWithTooltip
            typographyProps={{ fontWeight: "700", fontSize: "1.1rem" }}
            tooltipProps={{ placement: "bottom", arrow: true }}
          >
            {title}
          </EllipsisWithTooltip>
          {propertyItems.length > 0 && propertyItems.map((property, index) => (
            <Box
              sx={ItemCard}
              key={`property-${index}`}
              role="group"
              aria-label={`Property ${index}`}
            >
              {property.icon}
              <Box sx={{ marginLeft: "0.5rem", display: "flex" }}>
                {property.text}
              </Box>
            </Box>
          ))}
          <Box sx={PublicIconWrapper}>
            {infoIcons.length > 0 && infoIcons.map((infoItem, index) => (
              <Tooltip
                title={infoItem.text} 
                placement="top" 
                arrow
                key={`info-${index}`}
              >
                <Box
                  role="button"
                  tabIndex={0}
                  aria-label={infoItem.text}
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
      </StyledCard>
    </Box>
  );
});
