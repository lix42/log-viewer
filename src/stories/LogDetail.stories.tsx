import type { Meta, StoryObj } from "@storybook/react";
import { LogDetail } from "../Components/LogDetail";

const meta = {
  title: "LogDetail",
  component: LogDetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LogDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

const simpleData = {
  id: "123",
  message: "This is a simple log detail",
  level: "info",
  count: 10,
  isActive: false,
  additionalInfo: null,
};

const complexData = {
  id: "456",
  message: "This is a complex log detail",
  level: "error",
  count: 42,
  isActive: true,
  tags: ["debug", "error", "critical"],
  details: {
    ip: "192.168.1.1",
    location: "USA",
    lastLogin: null,
  },
  longString: `This is a very long string that contains detailed information about the log entry.
It spans multiple lines to provide additional context and clarity.
This is a very long string that contains detailed information about the log entry.
It spans multiple lines to provide additional context and clarity.`,
  aVeryLongKeyNameThatDescribesThePurposeOfThisField: "This is the value for the long key.",
};

export const Simple: Story = {
  args: {
    data: simpleData,
  },
};

export const Complex: Story = {
  args: {
    data: complexData,
  },
};
