import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Stack, Tooltip } from "@mui/material";
import { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

import { EllipsisWithTooltip } from "../EllipsisWithTooltip";
import {
  PublicIconWrapper,
  ResourceCardBody,
  ResourceCardImage,
  ResourceIconItem,
  ResourcePropertyItem,
  ResourcePropertyText,
  SelectedIcon,
  StyledCard,
} from "./style";

export type PropertyItem = {
  text: ReactNode;
  icon?: ReactNode;
};

export type InfoItem = {
  text: string;
  icon: ReactNode;
};

export type ResourceCardSize = "md" | "sm";

export type ResourceCardProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  image?: string;
  defaultImage: string;
  title: string;
  propertyItems?: PropertyItem[];
  infoIcons?: InfoItem[];
  size?: ResourceCardSize;
  width?: string;
  onClick?: () => void;
};

const ResourceCard: React.FunctionComponent<ResourceCardProps> = ({
  isSelected = false,
  onSelect = () => {},
  image,
  title,
  defaultImage,
  propertyItems = [],
  infoIcons = [],
  size = "md",
  width,
  onClick = () => {},
}) => {
  // 3 maximum
  infoIcons = infoIcons.slice(0, 3);

  return (
    <Box sx={{ width: width && size === "md" ? width : "320px" }}>
      <StyledCard
        selected={isSelected}
        size={size}
        onClick={onClick}
        onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Resource card for ${title}`}
      >
        <SelectedIcon
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
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
        <Stack
          sx={{
            width: size == "sm" ? 110 : "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <ResourceCardImage
            image={image}
            defaultImage={defaultImage}
            size={size}
            role="img"
            aria-label={`Image for ${title}`}
          />
        </Stack>
        <ResourceCardBody size={size}>
          <EllipsisWithTooltip
            typographyProps={{ variant: "h4", component: "p" }}
            tooltipProps={{ placement: "bottom", arrow: true }}
          >
            {title}
          </EllipsisWithTooltip>
          {propertyItems.length > 0 &&
            propertyItems.map((property, index) => (
              <ResourcePropertyItem
                size={size}
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
          <PublicIconWrapper size={size}>
            {infoIcons.length > 0 &&
              infoIcons.map((infoItem, index) => (
                <Tooltip
                  title={infoItem.text}
                  placement="top"
                  arrow
                  key={`info-${index}`}
                >
                  <ResourceIconItem
                    size={size}
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
};

export default ResourceCard;
