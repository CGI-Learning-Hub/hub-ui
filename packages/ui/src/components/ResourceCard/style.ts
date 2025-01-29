import { Box, Card, CardContent, CardMedia, styled } from "@mui/material";
import { ResourceCardSize } from "./ResourceCard";

export const StyledCard = styled(Card)<{ selected?: boolean; size?: ResourceCardSize }>(({ theme, selected, size }) => ({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)",
  borderRadius: "0.5rem",
  border: "2px solid transparent",
  transition: "border-color 0.2s ease-in-out",
  position: "relative",
  ...(size === "sm" && {
    display: "flex",
    width: "100%"
  }),
  ...(selected && {
    borderColor: theme.palette.primary.light,
  }),
  "&:hover": {
    "& .MuiBox-root.selected-icon": {
      opacity: 1,
      visibility: "visible",
    },
  },
}));

export const SelectedIcon = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "2rem",
  height: "2rem",
  background: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".8rem",
  borderRadius: ".5rem",
  visibility: "visible",
  opacity: 0,
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
  ...(selected && {
    background: theme.palette.primary.lighter,
    opacity: 1,
    visibility: "visible",
  }),
  "&:hover, &:focus": {
    background: theme.palette.primary.lighter,
    opacity: 1,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
}));

export const ResourceCardImage = styled(CardMedia)<{ size?: ResourceCardSize, image?: string, logo: string }>(({ size, image, logo }) => ({
  height: size == "sm" ? 85 : 180,
  width: size == "sm" ? 85 : "calc(100% - 2rem)",
  objectFit: "cover",
  margin: size == "sm" ? "0 10px" : "1rem",
  borderRadius: "0.5rem",
  ...(!image && size === "md" && {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "repeat",
    backgroundSize: "20% 20%",
    backgroundPosition: "center",
    opacity: "0.7"
  })
}))

export const ResourceCardBody = styled(CardContent)<{ size?: ResourceCardSize}>(({ size }) => ({ 
  padding: size == "sm" ? ".7rem 5px .7rem 0 !important" : "0 16px 16px 16px !important", 
  width: size === "sm" ? "calc(100% - 110px)" : "100%"
}))

export const ResourcePropertyItem = styled(Box)<{ size?: ResourceCardSize }>(({ size }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "0.5rem",
  ...(size === "sm" && {
    "svg": {
      width: ".8em",
      height: ".8em"
    }
  })
}))

export const ResourcePropertyText = styled(Box)<{ size?: ResourceCardSize, width?: string, isLast: boolean }>(({ size, width, isLast }) => ({ 
  marginLeft: size === "sm" ? ".3rem" : ".5rem",
  fontSize: size === "sm" ? "12px" : "15px",
  "& .MuiTypography-root": {
    paddingTop: "2px",
    fontSize: size === "sm" ? "12px" : "15px"
  },
  ...(isLast && !width && {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: size === "sm" ? "110px" : "172px"
  })
}))

export const ResourceIconItem = styled(Box)<{ size?: ResourceCardSize}>(({ size }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  height: "fit-content",
  ...(size === "sm" && {
    "svg": {
      width: ".8em",
      height: ".8em"
    }
  })
}))

export const PublicIconWrapper = styled(Box)<{ size?: ResourceCardSize}>(({ size }) => ({
  position: "absolute",
  bottom: size === "sm" ? ".65rem" : "16px",
  right: size === "sm" ? "8px" : "16px",
  display: "flex",
  gap: ".2rem"
}))
