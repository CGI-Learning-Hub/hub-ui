import Stack, { StackProps } from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";

import { useLazySvgImport } from "../../hooks/lazySvgImport";

export type EmptyStateProps = {
  svgName: string;
  title: string;
  description?: string;
  descriptionProps?: TypographyProps;
  svgProps?: React.SVGAttributes<SVGSVGElement>;
  titleProps?: TypographyProps;
} & StackProps;

const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  svgName,
  title,
  description,
  descriptionProps,
  svgProps,
  titleProps,
  ...otherProps
}) => {
  const { Svg } = useLazySvgImport(svgName);

  return Svg ? (
    <Stack direction="column" alignItems="center" margin="auto" {...otherProps}>
      <div style={{ width: 200, maxHeight: 200 }}>
        <Svg
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin slice"
          {...svgProps}
        />
      </div>
      <Typography variant="h2" fontWeight={500} mt={3} {...titleProps}>
        {title}
      </Typography>
      {description ? (
        <Typography color="grey" mt={2} {...descriptionProps}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  ) : null;
};

export default EmptyState;
