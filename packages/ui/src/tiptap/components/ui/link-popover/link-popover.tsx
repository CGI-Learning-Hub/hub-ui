import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { Divider, IconButton, InputBase, Popover, Stack, styled } from "../../../..";
// --- Icons ---
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// --- Tiptap UI ---
import type { UseLinkPopoverConfig } from "./use-link-popover";
import { useLinkPopover } from "./use-link-popover";
// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor";
// --- UI Primitives ---
import type { ButtonProps } from "../../ui-primitive/button";
import { Button } from "../../ui-primitive/button";

export interface LinkMainProps {
  /**
   * The URL to set for the link.
   */
  url: string;
  /**
   * Function to update the URL state.
   */
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
  /**
   * Function to set the link in the editor.
   */
  setLink: () => void;
  /**
   * Function to remove the link from the editor.
   */
  removeLink: () => void;
  /**
   * Function to open the link.
   */
  openLink: () => void;
  /**
   * Whether the link is currently active in the editor.
   */
  isActive: boolean;
}

export interface LinkPopoverProps
  extends Omit<ButtonProps, "type" | "value">, UseLinkPopoverConfig {
  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether to automatically open the popover when a link is active.
   * @default true
   */
  autoOpenOnLinkActive?: boolean;
}

/**
 * Link button component for triggering the link popover
 */
export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
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
        {children || <LinkRoundedIcon fontSize="small" />}
      </Button>
    );
  },
);

LinkButton.displayName = "LinkButton";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  "& .MuiTouchRipple-root .MuiTouchRipple-child": {
    borderRadius: theme.shape.borderRadius,
  },
}));

/**
 * Main content component for the link popover
 */
const LinkMain: React.FC<LinkMainProps> = ({
  url,
  setUrl,
  setLink,
  removeLink,
  openLink,
  isActive,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLink();
    }
  };

  return (
    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", p: 1 }}>
      <InputBase
        type="url"
        placeholder="Coller un lien..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        sx={{
          padding: ".25rem .625rem",
          fontSize: "0.875rem",
          minWidth: "12rem",
        }}
      />

      <StyledIconButton
        size="small"
        type="button"
        onClick={setLink}
        title="Appliquer le lien"
        disabled={!url && !isActive}
      >
        <KeyboardReturnRoundedIcon fontSize="small" />
      </StyledIconButton>

      <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

      <StyledIconButton
        size="small"
        type="button"
        onClick={openLink}
        title="Ouvrir dans une nouvelle fenêtre"
        disabled={!url && !isActive}
      >
        <OpenInNewRoundedIcon fontSize="small" />
      </StyledIconButton>

      <StyledIconButton
        size="small"
        type="button"
        onClick={removeLink}
        title="Supprimer le lien"
        disabled={!url && !isActive}
      >
        <DeleteRoundedIcon fontSize="small" />
      </StyledIconButton>
    </Stack>
  );
};

/**
 * Link content component for standalone use
 */
export const LinkContent: React.FC<{
  editor?: Editor | null;
}> = ({ editor }) => {
  const linkPopover = useLinkPopover({
    editor,
  });

  return <LinkMain {...linkPopover} />;
};

/**
 * Link popover component for Tiptap editors.
 *
 * For custom popover implementations, use the `useLinkPopover` hook instead.
 */
export const LinkPopover = forwardRef<HTMLElement, LinkPopoverProps>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onSetLink,
      onOpenChange,
      autoOpenOnLinkActive = true,
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
      isActive,
      url,
      setUrl,
      setLink,
      removeLink,
      openLink,
      label,
      Icon,
    } = useLinkPopover({
      editor,
      hideWhenUnavailable,
      onSetLink,
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

    const handleClose = useCallback(
      () => {
        setAnchorEl(null);
        onOpenChange?.(false);
      },
      [onOpenChange],
    );

    const handleSetLink = useCallback(() => {
      justSubmittedRef.current = true;
      setLink();
      setAnchorEl(null);
      queueMicrotask(() => {
        justSubmittedRef.current = false;
      });
    }, [setLink]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event, !isActive);
        if (event.defaultPrevented) return;
        setAnchorEl(event.currentTarget);
      },
      [onClick, anchorEl],
    );

    useEffect(() => {
      if (autoOpenOnLinkActive && isActive && !justSubmittedRef.current) {
        setAnchorEl(internalRef.current);
      }
    }, [autoOpenOnLinkActive, isActive]);

    if (!isVisible) {
      return null;
    }

    const open = Boolean(anchorEl);

    return (
      <div>
        <LinkButton
          value="link"
          disabled={!canSet}
          selected={isActive || open}
          data-disabled={!canSet}
          aria-label={label}
          tooltip={label}
          onClick={handleClick}
          {...buttonProps}
          ref={setRefs}
        >
          {children ?? <Icon fontSize="small" />}
        </LinkButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: -4,
            horizontal: 'center',
          }}>
          <LinkMain
            url={url}
            setUrl={setUrl}
            setLink={handleSetLink}
            removeLink={removeLink}
            openLink={openLink}
            isActive={isActive}
          />
        </Popover>
      </div>
    );
  },
);

LinkPopover.displayName = "LinkPopover";

export default LinkPopover;
