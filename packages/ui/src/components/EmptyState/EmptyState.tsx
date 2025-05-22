import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ImgHTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = (
  | {
      image: ReactNode;
      imageProps?: never;
      imageSrc?: never;
    }
  | {
      image?: never;
      imageProps?: ImgHTMLAttributes<HTMLImageElement>;
      imageSrc: string;
    }
) & {
  imageHeight?: string | number;
  title: string;
  description?: string;
  descriptionProps?: TypographyProps;
  svgProps?: React.SVGAttributes<SVGSVGElement>;
  titleProps?: TypographyProps;
} & StackProps;

const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  image,
  imageProps,
  imageSrc,
  title,
  description,
  descriptionProps,
  svgProps,
  titleProps,
  imageHeight = 200,
  ...otherProps
}) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      margin="0 auto"
      {...otherProps}
    >
      <Box height={imageHeight} width="auto">
        {image ?? <img src={imageSrc} height="100%" {...imageProps} />}
      </Box>
      <Typography variant="h2" fontWeight={500} mt={3} {...titleProps}>
        {title}
      </Typography>
      {description ? (
        <Typography color="textSecondary" mt={2} {...descriptionProps}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default EmptyState;
