import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { SvgIconProps } from "@mui/material";
import type { FC } from "react";

type FileIconProps = {
  extension: string;
} & SvgIconProps;

export const FileIcon: FC<FileIconProps> = ({ extension, ...otherProps }) => {
  switch (extension.toUpperCase()) {
    case "MP3":
    case "MIDI":
    case "WAV":
      return <MusicNoteRoundedIcon {...otherProps} />;

    case "JPG":
    case "JPEG":
    case "PNG":
    case "SVG":
      return <PhotoOutlinedIcon {...otherProps} />;

    case "MP4":
    case "MOV":
    case "AVI":
      return <MovieOutlinedIcon {...otherProps} />;

    case "CSV":
    case "ODS":
    case "XLS":
    case "XLSX":
      return <CalendarViewMonthRoundedIcon {...otherProps} />;

    case "PDF":
      return <PictureAsPdfOutlinedIcon {...otherProps} />;

    case "ODT":
    case "DOC":
    case "DOCX":
    case "TXT":
      return <DescriptionOutlinedIcon {...otherProps} />;

    case "ODP":
    case "PPT":
    case "PPTX":
      return <OndemandVideoRoundedIcon {...otherProps} />;

    default:
      return <InsertDriveFileOutlinedIcon {...otherProps} />;
  }
};
