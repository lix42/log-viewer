import { Meta, StoryObj } from "@storybook/react";
import { LogList } from "../Components/LogList";

const meta = {
  title: "LogList",
  component: LogList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof LogList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
  },
};

export const NoLogs: Story = {
  args: {
    items: [],
    loading: false,
  },
};

export const WithLogs: Story = {
  args: {
    items: [
      { id: "1", data: { _time: 1724323612592, event: "Log Event 1" } },
      { id: "2", data: { _time: 1724323612592, event: "Log Event 2" } },
      { id: "3", data: { _time: 1724323612592, event: "Log Event 3" } },
      { id: "4", data: { _time: 1724323612592, event: "Log Event 4" } },
      { id: "5", data: { _time: 1724323612592, event: "Log Event 5" } },
    ],
    loading: false,
  },
};
