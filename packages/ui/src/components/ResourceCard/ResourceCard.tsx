import { Box, Tooltip } from "@mui/material";
import { forwardRef, ReactNode, KeyboardEvent as ReactKeyboardEvent } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PublicIconWrapper, ResourceCardBody, ResourceCardImage, ResourceIconItem, ResourcePropertyItem, ResourcePropertyText, SelectedIcon, StyledCard } from "./style";
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
  logo: string;
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
  image, 
  title,
  logo,
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
      width: width && size === "md" ? width : "320px",
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
          <ResourceCardImage 
            image={image}
            logo={logo}
            role="img"
            aria-label={`Image for ${title}`}
          />
        </Box>
        <ResourceCardBody
          size={size}
        >
          <EllipsisWithTooltip
            typographyProps={{ fontWeight: "700", fontSize: "1.1rem" }}
            tooltipProps={{ placement: "bottom", arrow: true }}
          >
            {title}
          </EllipsisWithTooltip>
          {propertyItems.length > 0 && propertyItems.map((property, index) => (
            <ResourcePropertyItem
              key={`property-${index}`}
              role="group"
              aria-label={`Property ${index}`}
            >
              {property.icon}
              <ResourcePropertyText
                isLast={index === propertyItems.length - 1}
                size={size}
                width={width}
              >
                {property.text}
              </ResourcePropertyText>
            </ResourcePropertyItem>
          ))}
          <PublicIconWrapper 
            size={size}
          >
            {infoIcons.length > 0 && infoIcons.map((infoItem, index) => (
              <Tooltip
                title={infoItem.text} 
                placement="top" 
                arrow
                key={`info-${index}`}
              >
                <ResourceIconItem
                  role="button"
                  tabIndex={0}
                  aria-label={infoItem.text}
                >
                  {infoItem.icon}
                </ResourceIconItem>
              </Tooltip>
            ))}
          </PublicIconWrapper>
        </ResourceCardBody>
      </StyledCard>
    </Box>
  );
});
