import type { Meta, StoryObj } from "@storybook/react";
import { LogItem } from "../Components/LogItem";

const meta = {
  title: "LogItem",
  component: LogItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof LogItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const shortItem = {
  _time: new Date().getTime(),
  message: "This is a log message",
  level: "info",
};

const longItem = {
  _time: 1724323612592,
  cid: "api",
  channel: "conf:policies",
  level: "info",
  message: "loading policy",
  context: "cribl",
  policy: {
    args: ["groupName", "macroId"],
    template: [
      "GET /m/${groupName}/search/macros/${macroId}",
      "GET /m/${groupName}/search/macros/${macroId}/*",
    ],
    description: "Members with this policy can view and use the macro",
    title: "Read Only",
  },
};
export const Default: Story = {
  args: {
    item: shortItem,
    index: 0,
  },
};

export const LongMessage: Story = {
  args: {
    item: longItem,
    index: 0,
  },
};

export const MultipleItems: Story = {
  args: {
    item: longItem,
    index: 0,
  },
  render: () => (
    <div>
      <LogItem item={shortItem} index={0} />
      <LogItem item={longItem} index={1} />
      <LogItem item={shortItem} index={2} />
    </div>
  ),
};
