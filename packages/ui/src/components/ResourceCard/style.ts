import { Box, Card, SxProps, styled } from "@mui/material";

export const ItemCard: SxProps = {
  display: "flex",
  marginTop: "0.5rem",
};

export const StyledCard = styled(Card)<{ selected?: boolean }>(({ theme, selected }) => ({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)",
  borderRadius: "0.5rem",
  border: "2px solid transparent",
  transition: "border-color 0.2s ease-in-out",
  position: "relative",
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

export const ImageStyle: SxProps = {
  height: 180,
  width: "calc(100% - 2rem)",
  maxWidth: 300,
  objectFit: "cover",
  margin: "1rem",
  borderRadius: "0.5rem",
};

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
  visibility: "hidden",
  opacity: 0,
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
  ...(selected && {
    background: theme.palette.primary.lighter,
    opacity: 1,
    visibility: "visible",
  }),
  "&:hover": {
    background: theme.palette.primary.lighter,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
}));

export const PublicIconWrapper: SxProps = {
  position: "absolute",
  bottom: ".8rem",
  right: ".8rem",
  display: "flex",
  gap: ".2rem"
};
