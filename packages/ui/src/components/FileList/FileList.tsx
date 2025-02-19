import { Divider, List } from "@mui/material";

import FileListItem, { CustomFile } from "./FileListItem";

export interface FileListProps<T extends CustomFile> {
  files: T[];
  onDelete?: (file: T) => void;
  onClick?: (file: T) => void;
  onDownload?: (file: T) => void;
}

const FileList = <T extends CustomFile>({
  files,
  onDelete,
  onClick,
  onDownload,
}: FileListProps<T>) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column" }}>
      {files.map((file, index) => (
        <>
          <FileListItem
            key={index}
            file={file}
            onClick={onClick}
            onDelete={onDelete}
            onDownload={onDownload}
          />
          {index < files.length - 1 && <Divider variant="middle" />}
        </>
      ))}
    </List>
  );
};

export default FileList;
