import { SvgIconComponent } from "@mui/icons-material";
import type { Color, SvgIconProps } from "@mui/material";
import Stack, { type StackProps } from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";

export type HeadingProps = {
  title: string;
  IconComponent?: SvgIconComponent;
  iconColor?: Color;
  slotProps?: {
    root?: StackProps;
    icon?: SvgIconProps;
    text?: TypographyProps;
  };
  iconSize?: number;
  /**
   * @deprecated Use `slotProps.icon` instead.
   */
  iconProps?: SvgIconProps;
  /**
   * @deprecated Use `slotProps.text` instead.
   */
  titleProps?: TypographyProps;
} & StackProps;

const Heading: React.FunctionComponent<HeadingProps> = ({
  title,
  IconComponent,
  iconColor,
  iconSize = 28,
  slotProps = {},
  iconProps,
  titleProps,
  ...otherProps
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      {...otherProps}
      {...slotProps.root}
    >
      {IconComponent ? (
        <IconComponent
          sx={{
            fontSize: iconSize,
            padding: "2px",
            borderRadius: 1,
            color: iconColor?.[500],
            backgroundColor: iconColor?.[50],
          }}
          {...(slotProps.icon ?? iconProps)}
        />
      ) : null}
      <Typography
        component="h3"
        variant="h2"
        {...(slotProps.text ?? titleProps)}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default Heading;
