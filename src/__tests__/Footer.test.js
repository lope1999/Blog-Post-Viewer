import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders the component', () => {
    render(<Footer />);
    expect(screen.getByText('Blogger Blogger')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Blogger Blogger. All rights reserved.')).toBeInTheDocument();
  });

  test('renders the social media links', () => {
    render(<Footer />);
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });

    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://www.twitter.com');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
  });

  test('links open in a new tab', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');

    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
