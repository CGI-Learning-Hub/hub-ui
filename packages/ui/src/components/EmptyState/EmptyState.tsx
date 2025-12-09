import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { FC, ImgHTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = (
  | {
      image: ReactNode;
      /**
       * @deprecated Use `slotProps.image` instead.
       */
      imageProps?: never;
      imageSrc?: never;
    }
  | {
      image?: never;
      /**
       * @deprecated Use `slotProps.image` instead.
       */
      imageProps?: ImgHTMLAttributes<HTMLImageElement>;
      imageSrc: string;
    }
) & {
  imageHeight?: string | number;
  title: string;
  description?: string;
  footer?: ReactNode;
  slotProps?: {
    root?: StackProps;
    image?: ImgHTMLAttributes<HTMLImageElement>;
    title?: TypographyProps;
    description?: TypographyProps;
  };
  /**
   * @deprecated Use `slotProps.description` instead.
   */
  descriptionProps?: TypographyProps;
  /**
   * @deprecated Use `slotProps.title` instead.
   */
  titleProps?: TypographyProps;
} & StackProps;

const EmptyState: FC<EmptyStateProps> = ({
  image,
  imageSrc,
  title,
  description,
  footer,
  imageHeight = 200,
  slotProps = {},
  imageProps,
  descriptionProps,
  titleProps,
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
        {image ?? (
          <img
            src={imageSrc}
            height="100%"
            {...(slotProps.image ?? imageProps)}
          />
        )}
      </Box>
      <Typography
        variant="h2"
        fontWeight={500}
        mt={3}
        {...(slotProps.title ?? titleProps)}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          color="textSecondary"
          mt={2}
          {...(slotProps.description ?? descriptionProps)}
        >
          {description}
        </Typography>
      ) : null}
      {footer ? <Box mt={3}>{footer}</Box> : null}
    </Stack>
  );
};

export default EmptyState;
