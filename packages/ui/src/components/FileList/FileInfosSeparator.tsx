import { Stack } from "@mui/material";

export const FileInfosSeparator = () => {
  return (
    <Stack height="100%">
      <Stack
        height="4px"
        width="4px"
        borderRadius="50%"
        sx={{ backgroundColor: "divider" }}
      />
    </Stack>
  );
};
