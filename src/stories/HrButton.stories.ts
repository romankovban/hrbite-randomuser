import type { Meta, StoryObj } from '@storybook/react';

import { HrButton } from '../common/components/hr-button.component';

const meta = {
  title: 'Components/Button',
  component: HrButton,
} satisfies Meta<typeof HrButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Some button' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Some button' },
};
