import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BaseDialog, {
  type DialogProps as BaseDialogProps,
} from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import type { FC } from "react";

export type DialogProps = {
  showCloseButton?: boolean;
} & BaseDialogProps;

const Dialog: FC<DialogProps> = ({
  children,
  showCloseButton = true,
  ...otherProps
}) => {
  const handleClose = () => otherProps.onClose?.({}, "escapeKeyDown");

  return (
    <BaseDialog {...otherProps}>
      {showCloseButton ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 15,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <CloseRoundedIcon color="inherit" />
        </IconButton>
      ) : null}
      {children}
    </BaseDialog>
  );
};
export default Dialog;
