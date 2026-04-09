import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { FC, ImgHTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = (
  | {
      image: ReactNode;
      imageSrc?: never;
    }
  | {
      image?: never;
      imageSrc: string;
    }
) & {
  imageHeight?: string | number;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  slotProps?: {
    root?: StackProps;
    image?: ImgHTMLAttributes<HTMLImageElement>;
    title?: TypographyProps;
    description?: TypographyProps;
  };
} & StackProps;

const EmptyState: FC<EmptyStateProps> = ({
  image,
  imageSrc,
  title,
  description,
  footer,
  imageHeight = 200,
  slotProps = {},
  ...otherProps
}) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      margin="0 auto"
      {...otherProps}
      {...slotProps.root}
    >
      <Box height={imageHeight} width="auto">
        {image ?? <img src={imageSrc} height="100%" {...slotProps.image} />}
      </Box>
      <Typography variant="h2" mt={3} {...slotProps.title}>
        {title}
      </Typography>
      {description ? (
        <Typography color="textSecondary" mt={2} {...slotProps.description}>
          {description}
        </Typography>
      ) : null}
      {footer ? <Box mt={3}>{footer}</Box> : null}
    </Stack>
  );
};

export default EmptyState;
