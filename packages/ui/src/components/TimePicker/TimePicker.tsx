import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TimePicker as BaseTimePicker,
  type TimePickerProps as BaseTimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import type { FC } from "react";

export type TimePickerProps = {
  adapterLocale?: string;
} & BaseTimePickerProps;

const TimePicker: FC<TimePickerProps> = ({
  adapterLocale = "fr",
  ...pickerProps
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocale}
    >
      <BaseTimePicker {...pickerProps} />   
    </LocalizationProvider>
  );
};

export default TimePicker;
