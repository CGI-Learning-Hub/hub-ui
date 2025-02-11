import {
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

export type EllipsisWithTooltipProps = {
  tooltipProps?: Omit<TooltipProps, "children" | "title">;
  typographyProps?: Omit<
    TypographyProps,
    "noWrap" | "overflow" | "textOverflow"
  >;
  children: ReactNode;
};

const EllipsisWithTooltip: FC<EllipsisWithTooltipProps> = ({
  children,
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
      {...tooltipProps}
    >
      <Typography
        ref={textRef}
        noWrap
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        {...typographyProps}
        maxWidth="100%"
      >
        {children}
      </Typography>
    </Tooltip>
  );
};

export default EllipsisWithTooltip;
