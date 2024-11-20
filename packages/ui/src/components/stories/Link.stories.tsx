import MUILink, { LinkProps } from "@mui/material/Link";
import type { Meta, StoryObj } from "@storybook/react";

const Link = (props: LinkProps) => {
  return <MUILink {...props} />;
};

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  argTypes: {
    children: {
      control: "text",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
        "textPrimary",
        "textSecondary",
        "textDisabled",
      ],
    },
    href: {
      control: "text",
    },
    underline: {
      control: "select",
      options: ["always", "hover", "none"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Link",
    color: "primary",
    href: "https://www.cgi.com/france/fr-fr/solution/cgi-learning-hub",
    underline: "always",
  },
};
