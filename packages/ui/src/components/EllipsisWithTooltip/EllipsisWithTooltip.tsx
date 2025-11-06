import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";

export type EllipsisWithTooltipProps = {
  children: ReactNode;
  slotProps?: {
    text?: Omit<TypographyProps, "noWrap" | "overflow" | "textOverflow">;
    tooltip?: Omit<TooltipProps, "children" | "title">;
  };
  /**
   * @deprecated Use `slotProps.tooltip` instead.
   */
  tooltipProps?: Omit<TooltipProps, "children" | "title">;
  /**
   * @deprecated Use `slotProps.text` instead.
   */
  typographyProps?: Omit<
    TypographyProps,
    "noWrap" | "overflow" | "textOverflow"
  >;
};

const EllipsisWithTooltip: FC<EllipsisWithTooltipProps> = ({
  children,
  slotProps = {},
  tooltipProps,
  typographyProps,
}) => {
  const [isTextEllipsized, setIsTextEllipsized] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkEllipsis = () => {
      if (textRef.current) {
        const { scrollWidth, clientWidth } = textRef.current;
        setIsTextEllipsized(scrollWidth > clientWidth);
      }
    };

    const observer = new ResizeObserver(() => {
      checkEllipsis();
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    checkEllipsis(); // Initial check

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <Tooltip
      disableHoverListener={!isTextEllipsized}
      title={children}
      {...(slotProps.tooltip ?? tooltipProps)}
    >
      <Typography
        ref={textRef}
        noWrap
        overflow="hidden"
        textOverflow="ellipsis"
        maxWidth="100%"
        {...(slotProps.text ?? typographyProps)}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};

export default EllipsisWithTooltip;
