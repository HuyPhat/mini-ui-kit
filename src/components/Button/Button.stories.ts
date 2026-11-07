import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn(), children: 'Button' },
  argTypes: {
    variant: { control: 'select',  options: ['primary', 'secondary', 'danger'], description: 'The variant of the button', defaultValue: 'primary' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'The size of the button', defaultValue: 'md' },
    disabled: { control: 'boolean', defaultValue: false, description: 'Disables the button when true' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Danger' } };
export const Large: Story = { args: { size: 'lg' } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };