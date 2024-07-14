import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders header with title', () => {
    render(<Header />);
    expect(screen.getByText('Blogger Blogger')).toBeInTheDocument();
  });

  test('renders menu buttons for large screens', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('menu toggle works correctly on small screens', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /Toggle menu/ });
    fireEvent.click(menuButton);

    const mobileMenu = screen.getByRole('navigation', { name: 'mobile-menu' });
    expect(within(mobileMenu).getByText('Home')).toBeVisible();
    expect(within(mobileMenu).getByText('About')).toBeVisible();
    expect(within(mobileMenu).getByText('Contact')).toBeVisible();

    fireEvent.click(menuButton);

    expect(screen.queryByRole('navigation', { name: 'mobile-menu' })).not.toBeInTheDocument();
  });

  test('renders correctly when menu is toggled', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /Toggle menu/ });
    fireEvent.click(menuButton);

    const mobileMenu = screen.getByRole('navigation', { name: 'mobile-menu' });
    expect(within(mobileMenu).getByText('Home')).toBeVisible();
    expect(within(mobileMenu).getByText('About')).toBeVisible();
    expect(within(mobileMenu).getByText('Contact')).toBeVisible();
  });
});
