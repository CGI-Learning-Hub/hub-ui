import {
  CalendarViewMonthRounded,
  DescriptionOutlined,
  InsertDriveFileOutlined,
  MovieOutlined,
  MusicNoteRounded,
  OndemandVideoRounded,
  PhotoOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";

export const FileIcon: React.FC<{ extension: string }> = ({ extension }) => {
  switch (extension.toUpperCase()) {
    case "MP3":
    case "MIDI":
    case "WAV":
      return <MusicNoteRounded />;

    case "JPG":
    case "JPEG":
    case "PNG":
    case "SVG":
      return <PhotoOutlined />;

    case "MP4":
    case "MOV":
    case "AVI":
      return <MovieOutlined />;

    case "CSV":
    case "ODS":
    case "XLS":
    case "XLSX":
      return <CalendarViewMonthRounded />;

    case "PDF":
      return <PictureAsPdfOutlined />;

    case "ODT":
    case "DOC":
    case "DOCX":
    case "TXT":
      return <DescriptionOutlined />;

    case "ODP":
    case "PPT":
    case "PPTX":
      return <OndemandVideoRounded />;

    default:
      return <InsertDriveFileOutlined />;
  }
};
