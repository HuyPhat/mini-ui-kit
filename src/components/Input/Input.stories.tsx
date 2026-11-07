import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn } from 'storybook/test';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { label: 'Email', onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'you@example.com' },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'hi');
    await expect(input).toHaveValue('hi');
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

export const WithError: Story = {
  args: { error: 'Please enter a valid email' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toBeInvalid();
    await expect(input).toHaveAccessibleDescription('Please enter a valid email');
  },
};

export const Disabled: Story = { args: { disabled: true, value: 'locked@example.com' } };
