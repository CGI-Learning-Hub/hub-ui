import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker as BaseDatePicker,
  type DatePickerProps as BaseDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import type { FC } from "react";

export type DatePickerProps = {
  adapterLocale?: string;
} & BaseDatePickerProps;

const DatePicker: FC<DatePickerProps> = ({
  adapterLocale = "fr",
  ...pickerProps
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocale}
    >
      <BaseDatePicker {...pickerProps} />
    </LocalizationProvider>
  );
};

export default DatePicker;
