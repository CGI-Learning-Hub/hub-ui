import type { Editor } from "@tiptap/react";
import { ColorResult } from "@uiw/color-convert";
import Circle from "@uiw/react-color-circle";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Popover } from "../../../..";
import { COLORS, DEFAULT_COLOR } from "./const";
// --- Icons ---
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- UI Primitives ---
import type { ButtonProps } from "../../ui-primitive/button";
import { Button } from "../../ui-primitive/button";
// --- Tiptap UI ---
import type { UseTextColorPopoverConfig } from "./use-text-color-popover";
import { useTextColorPopover } from "./use-text-color-popover";

export interface TextColorMainProps {
  /**
   * Function to set the text color in the editor.
   */
  setTextColor: (color: string) => void;
  /**
   * Function to remove the text color from the editor.
   */
  removeTextColor: () => void;
  /**
   * Function to call when changing the text color.
   */
  onChange?: () => void;
  /**
   * The currently active color in the editor.
   */
  activeColor: string | null;
}

export interface TextColorPopoverProps
  extends Omit<ButtonProps, "type" | "value">, UseTextColorPopoverConfig {
  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Text color button component for triggering the text color popover
 */
export const TextColorButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        className={className}
        role="button"
        tabIndex={-1}
        ref={ref}
        {...props}
      >
        {children || <FormatColorTextRoundedIcon fontSize="small" />}
      </Button>
    );
  },
);

TextColorButton.displayName = "TextColorButton";

/**
 * Main content component for the text color popover
 */
const TextColorMain: React.FC<TextColorMainProps> = ({
  setTextColor,
  removeTextColor,
  onChange,
  activeColor,
}) => {
  const handleChange = (color: ColorResult) => {
    if (color.hex === DEFAULT_COLOR) {
      removeTextColor();
    } else {
      setTextColor(color.hex);
    }
    onChange?.();
  }

  return (
    <Circle
      colors={COLORS}
      color={activeColor ?? DEFAULT_COLOR}
      onChange={handleChange}
      style={{
        gap: 5,
        width: "15rem",
        padding: 10,
      }}
      pointProps={{
        style: {
          width: 20,
          height: 20,
        },
      }}
    />
  );
};

/**
 * Text color content component for standalone use
 */
export const TextColorContent: React.FC<{
  editor?: Editor | null;
}> = ({ editor }) => {
  const textColorPopover = useTextColorPopover({
    editor,
  });

  return <TextColorMain {...textColorPopover} />;
};

/**
 * text color popover component for Tiptap editors.
 *
 * For custom popover implementations, use the `useTextColorPopover` hook instead.
 */
export const TextColorPopover = forwardRef<HTMLElement, TextColorPopoverProps>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onSetTextColor,
      onOpenChange,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const internalRef = useRef<HTMLElement>(null);
    const justSubmittedRef = useRef(false);

    const {
      isVisible,
      canSet,
      activeColor,
      isActive,
      setTextColor,
      removeTextColor,
      label,
      Icon,
    } = useTextColorPopover({
      editor,
      hideWhenUnavailable,
      onSetTextColor,
    });

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const handleClose = useCallback(() => {
      setAnchorEl(null);
      onOpenChange?.(false);
    }, [onOpenChange]);

    const handleSetTextColor = useCallback((color: string) => {
      justSubmittedRef.current = true;
      setTextColor(color);
      setAnchorEl(null);
      queueMicrotask(() => {
        justSubmittedRef.current = false;
      });
    }, [setTextColor]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event, !isActive);
        if (event.defaultPrevented) return;
        setAnchorEl(event.currentTarget);
      },
      [onClick, anchorEl],
    );

    if (!isVisible) {
      return null;
    }

    const open = Boolean(anchorEl);

    return (
      <div>
        <TextColorButton
          value="textStyle"
          disabled={!canSet}
          selected={isActive || open}
          data-disabled={!canSet}
          aria-label={label}
          tooltip={label}
          onClick={handleClick}
          {...buttonProps}
          ref={setRefs}
        >
          {children ?? <Icon fontSize="small" sx={{ color: activeColor ?? "inherit"}} />}
        </TextColorButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: -4,
            horizontal: "center",
          }}
        >
          <TextColorMain
            setTextColor={handleSetTextColor}
            removeTextColor={removeTextColor}
            onChange={handleClose}
            activeColor={activeColor}
          />
        </Popover>
      </div>
    );
  },
);

TextColorPopover.displayName = "TextColorPopover";

export default TextColorPopover;
