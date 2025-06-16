import { ColorItem, ColorPalette } from "@storybook/addon-docs/blocks";
import React from "react";

export const TemplatePalette = ({ theme }) => {
  return (
    <ColorPalette>
      <ColorItem
        title="Primary"
        subtitle="theme.palette.primary"
        colors={{
          lighter: theme.palette.primary.lighter,
          light: theme.palette.primary.light,
          main: theme.palette.primary.main,
          dark: theme.palette.primary.dark,
          darker: theme.palette.primary.darker,
        }}
      />
      <ColorItem
        title="Secondary"
        subtitle="theme.palette.secondary"
        colors={{
          lighter: theme.palette.secondary.lighter,
          light: theme.palette.secondary.light,
          main: theme.palette.secondary.main,
          dark: theme.palette.secondary.dark,
          darker: theme.palette.secondary.darker,
        }}
      />
      <ColorItem
        title="Error"
        subtitle="theme.palette.error"
        colors={{
          light: theme.palette.error.light,
          main: theme.palette.error.main,
          dark: theme.palette.error.dark,
        }}
      />
      <ColorItem
        title="Warning"
        subtitle="theme.palette.warning"
        colors={{
          light: theme.palette.warning.light,
          main: theme.palette.warning.main,
          dark: theme.palette.warning.dark,
        }}
      />
      <ColorItem
        title="Info"
        subtitle="theme.palette.info"
        colors={{
          light: theme.palette.info.light,
          main: theme.palette.info.main,
          dark: theme.palette.info.dark,
        }}
      />
      <ColorItem
        title="Success"
        subtitle="theme.palette.success"
        colors={{
          light: theme.palette.success.light,
          main: theme.palette.success.main,
          dark: theme.palette.success.dark,
        }}
      />
      <ColorItem
        title="Common"
        subtitle="theme.palette.common"
        colors={{
          black: theme.palette.common.black,
          white: theme.palette.common.white,
        }}
      />
      <ColorItem
        title="Grey"
        subtitle="theme.palette.grey"
        colors={{
          lighter: theme.palette.grey.lighter,
          light: theme.palette.grey.light,
          main: theme.palette.grey.main,
          dark: theme.palette.grey.dark,
          darker: theme.palette.grey.darker,
        }}
      />
      <ColorItem
        title="Text"
        subtitle="theme.palette.text"
        colors={{
          primary: theme.palette.text.primary,
          secondary: theme.palette.text.secondary,
          disabled: theme.palette.text.disabled,
        }}
      />
      <ColorItem
        title="Divider"
        subtitle="theme.palette.divider"
        colors={{ divider: theme.palette.divider }}
      />
      <ColorItem
        title="Background"
        subtitle="theme.palette.background"
        colors={{
          paper: theme.palette.background.paper,
          default: theme.palette.background.default,
        }}
      />
    </ColorPalette>
  );
};
