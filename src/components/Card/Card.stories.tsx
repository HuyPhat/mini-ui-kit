import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Button } from '../Button/Button';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Card title',
    children: 'Some card content goes here.',
  },
  argTypes: {
    children: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 3, name: 'Card title' })).toBeInTheDocument();
  },
};

export const HeadingLevel: Story = {
  args: { headingLevel: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2 })).toBeInTheDocument();
  },
};

export const WithActions: Story = {
  args: {
    title: 'Delete project',
    children: (
      <>
        <p style={{ margin: '0 0 var(--space-4)' }}>This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="danger">Delete</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </>
    ),
  },
};
