import Stack from "@mui/material/Stack";

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
