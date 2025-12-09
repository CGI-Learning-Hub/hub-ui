import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import type { FC } from "react";

export const FileIcon: FC<{ extension: string }> = ({ extension }) => {
  switch (extension.toUpperCase()) {
    case "MP3":
    case "MIDI":
    case "WAV":
      return <MusicNoteRoundedIcon />;

    case "JPG":
    case "JPEG":
    case "PNG":
    case "SVG":
      return <PhotoOutlinedIcon />;

    case "MP4":
    case "MOV":
    case "AVI":
      return <MovieOutlinedIcon />;

    case "CSV":
    case "ODS":
    case "XLS":
    case "XLSX":
      return <CalendarViewMonthRoundedIcon />;

    case "PDF":
      return <PictureAsPdfOutlinedIcon />;

    case "ODT":
    case "DOC":
    case "DOCX":
    case "TXT":
      return <DescriptionOutlinedIcon />;

    case "ODP":
    case "PPT":
    case "PPTX":
      return <OndemandVideoRoundedIcon />;

    default:
      return <InsertDriveFileOutlinedIcon />;
  }
};
