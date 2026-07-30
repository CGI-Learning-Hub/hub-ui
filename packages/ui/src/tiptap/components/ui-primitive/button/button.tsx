"use client";

import { Fragment, forwardRef, useMemo } from "react";
import { ToggleButton, ToggleButtonProps, Tooltip } from "../../../..";
// --- Lib ---
import { parseShortcutKeys } from "../../../lib/tiptap-utils";

export interface ButtonProps extends ToggleButtonProps {
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  shortcutKeys?: string;
}

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null;

  return (
    <div>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </Fragment>
      ))}
    </div>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      tooltip,
      showTooltip = true,
      shortcutKeys,
      ...props
    },
    ref,
  ) => {
    const shortcuts = useMemo<string[]>(
      () => parseShortcutKeys({ shortcutKeys }),
      [shortcutKeys],
    );

    if (!tooltip || !showTooltip) {
      return (
        <ToggleButton
          size="small"
          color="primary"
          ref={ref}
          sx={{
            border: "none",
            "&:disabled": {
              border: "none",
            }
          }}
          {...props}
        >
          {children}
        </ToggleButton>
      );
    }

    return (
      <Tooltip
        enterDelay={200}
        title={
          <>
            {tooltip}
            <ShortcutDisplay shortcuts={shortcuts} />
          </>
        }
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -8],
                },
              },
            ],
          },
        }}
      >
        <ToggleButton
          size="small"
          color="primary"
          ref={ref}
          sx={{
            border: "none",
            "&:disabled": {
              border: "none",
            }
          }}
          {...props}
        >
          {children}
        </ToggleButton>
      </Tooltip>
    );
  },
);

Button.displayName = "Button";

export default Button;
