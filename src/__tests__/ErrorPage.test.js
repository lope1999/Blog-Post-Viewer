import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ErrorPage component', () => {
  test('renders default error message and title', () => {
    render(<ErrorPage />, { wrapper: BrowserRouter });

    expect(screen.getByAltText('Funny 404')).toBeInTheDocument();
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Oops! The page you are looking for does not exist.')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  test('renders custom error message and title', () => {
    render(<ErrorPage errorTitle="Custom Error" errorMessage="Custom Error Message" />, { wrapper: BrowserRouter });

    expect(screen.getByAltText('Funny 404')).toBeInTheDocument();
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  test('does not render action button when action prop is false', () => {
    render(<ErrorPage action={false} />, { wrapper: BrowserRouter });

    expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
  });

  test('calls navigate function when Go Back button is clicked', () => {
    render(<ErrorPage />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByText('Go Back'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
