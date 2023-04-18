import type { Meta, StoryObj } from '@storybook/react';

import { EmployeeCard } from '../modules/employees/components/employee-card.component';

const meta = {
  title: 'Employee/Card',
  component: EmployeeCard,
} satisfies Meta<typeof EmployeeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'Roman Kovban',
    dob: new Date(),
    photo: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
};
