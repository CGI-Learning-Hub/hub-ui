import type { Meta, StoryObj } from "@storybook/react-vite";
import { type SyntheticEvent, useState } from "react";

import {
  TabList as BaseTabList,
  Tab,
  TabContext,
  type TabListProps,
  TabPanel,
} from "..";

const TabList = (props: TabListProps) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) =>
    setValue(newValue);

  return (
    <TabContext value={value}>
      <BaseTabList
        {...props}
        onChange={handleChange}
        aria-label="lib tablist example"
      >
        <Tab label="Item one" value="1" />
        <Tab label="Item two" value="2" />
        <Tab label="Item three" value="3" />
      </BaseTabList>
      <TabPanel value="1">Item one</TabPanel>
      <TabPanel value="2">Item two</TabPanel>
      <TabPanel value="3">Item three</TabPanel>
    </TabContext>
  );
};

const meta: Meta<typeof TabList> = {
  title: "Components/TabList",
  component: TabList,
  argTypes: {
    allowScrollButtonsMobile: {
      control: "boolean",
    },
    centered: {
      control: "boolean",
    },
    indicatorColor: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    scrollButtons: {
      control: "radio",
      options: ["auto", true, false],
    },
    textColor: {
      control: "radio",
      options: ["inherit", "primary", "secondary"],
    },
    variant: {
      control: "radio",
      options: ["fullWidth", "scrollable", "standard"],
    },
    visibleScrollbar: {
      control: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  args: {
    allowScrollButtonsMobile: false,
    centered: false,
    indicatorColor: "primary",
    orientation: "horizontal",
    scrollButtons: "auto",
    textColor: "primary",
    variant: "standard",
    visibleScrollbar: false,
  },
};
