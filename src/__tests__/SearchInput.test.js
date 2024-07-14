import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

jest.mock('@heroicons/react/solid', () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}));

describe('SearchInput Component', () => {
  test('renders input with placeholder text', () => {
    render(<SearchInput searchQuery="" setSearchQuery={() => {}} searchText="Search for posts" />);
    const inputElement = screen.getByPlaceholderText('Search for posts');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input with default placeholder text when searchText is not provided', () => {
    render(<SearchInput searchQuery="" setSearchQuery={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls setSearchQuery on input change', () => {
    const setSearchQuery = jest.fn();
    render(<SearchInput searchQuery="" setSearchQuery={setSearchQuery} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(setSearchQuery).toHaveBeenCalledWith('test');
  });

  test('renders the SearchIcon', () => {
    render(<SearchInput searchQuery="" setSearchQuery={() => {}} />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });
});
