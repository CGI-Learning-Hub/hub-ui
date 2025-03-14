import { Box, Card, CardContent, styled } from "@mui/material";

export const StyledFolder = styled(Card)<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)",
  borderRadius: "0.5rem",
  height: "auto",
  border: "2px solid transparent",
  transition: "border-color 0.2s ease-in-out",
  position: "relative",
  display: "flex",
  width: "100%",
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

export const SelectedIcon = styled(Box)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
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
  }),
);

export const FolderBodyStyle = {
  display: "flex",
  padding: "16px !important",
  width: "100%",
  alignItems: "center",
};

export const FolderIconStyle = {
  marginRight: ".8rem",
  fontSize: "2rem",
};
