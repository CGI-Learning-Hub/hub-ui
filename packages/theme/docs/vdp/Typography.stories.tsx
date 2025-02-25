import { ThemeProvider } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react";
import React, { FunctionComponent } from "react";

import { vdpMuiTheme } from "../../src";

type FontDetailProps = Pick<TypographyProps, "variant">;

const FontDetails: FunctionComponent<FontDetailProps> = ({ variant }) => {
  if (!variant) return null;
  const { fontFamily, fontSize, fontWeight } = vdpMuiTheme.typography[variant];

  return (
    <Stack direction="row" spacing={2} mt={1}>
      <span style={{ fontSize: 14 }}>
        <b>Font: </b>
        {fontFamily}
      </span>
      <span style={{ fontSize: 14 }}>
        <b>Size: </b>
        {fontSize}
      </span>
      <span style={{ fontSize: 14 }}>
        <b>Weight: </b>
        {fontWeight}
      </span>
    </Stack>
  );
};

const meta: Meta<typeof Typography> = {
  title: "Themes/VDP/Typography",
  component: Typography,
  decorators: [
    (Story, { args }) => (
      <ThemeProvider theme={vdpMuiTheme}>
        <Story />
        <FontDetails variant={args.variant} />
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: "h1", children: "h1.Heading" },
};

export const Heading2: Story = {
  args: { variant: "h2", children: "h2.Heading" },
};

export const Heading3: Story = {
  args: { variant: "h3", children: "h3.Heading" },
};

export const Heading4: Story = {
  args: { variant: "h4", children: "h4.Heading" },
};

export const Heading5: Story = {
  args: { variant: "h5", children: "h5.Heading" },
};

export const Heading6: Story = {
  args: { variant: "h6", children: "h6.Heading" },
};

export const Subtitle1: Story = {
  args: {
    variant: "subtitle1",
    children:
      "subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
  },
};

export const Subtitle2: Story = {
  args: {
    variant: "subtitle2",
    children:
      "subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
    children:
      "body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  },
};

export const Body2: Story = {
  args: {
    variant: "body2",
    children:
      "body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  },
};

export const Button: Story = {
  args: { variant: "button", children: "button text" },
};

export const Caption: Story = {
  args: { variant: "caption", children: "caption text" },
};

export const Overline: Story = {
  args: { variant: "overline", children: "overline text" },
};
