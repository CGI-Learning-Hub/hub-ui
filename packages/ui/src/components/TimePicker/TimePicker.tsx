import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TimePicker as BaseTimePicker,
  type TimePickerProps as BaseTimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
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
