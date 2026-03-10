import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, Link, Typography } from "..";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    separator: {
      control: "text",
      description: "Custom separator between breadcrumb items.",
    },
    maxItems: {
      control: "number",
      description:
        "Specifies the maximum number of breadcrumbs to display before collapsing.",
    },
    itemsAfterCollapse: {
      control: "number",
      description:
        "Number of items to show after the ellipsis when breadcrumbs collapse.",
    },
    itemsBeforeCollapse: {
      control: "number",
      description:
        "Number of items to show before the ellipsis when breadcrumbs collapse.",
    },
    expandText: {
      control: "text",
      description: "Label used for the expand button when breadcrumbs collapse.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumbs help users understand their current location within a hierarchy and navigate back to previous pages.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    separator: "/",
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Catalog
      </Link>
      <Typography color="text.primary">Accessories</Typography>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: ">",
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Products
      </Link>
      <Typography color="text.primary">Shoes</Typography>
    </Breadcrumbs>
  ),
};

export const Collapsed: Story = {
  args: {
    maxItems: 2,
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Category
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Subcategory
      </Link>
      <Typography color="text.primary">Item</Typography>
    </Breadcrumbs>
  ),
};

export const WithManyItems: Story = {
  args: {
    separator: "/",
    maxItems: 3,
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Electronics
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Computers
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Laptops
      </Link>
      <Typography color="text.primary">Gaming</Typography>
    </Breadcrumbs>
  ),
};