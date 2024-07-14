import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

const mockPaginate = jest.fn();

describe('Pagination Component', () => {
  test('renders the correct number of page buttons', () => {
    render(
      <Pagination
        postsPerPage={10}
        totalPosts={50}
        paginate={mockPaginate}
        currentPage={1}
      />
    );
    
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7); // 5 page buttons + 2 navigation buttons
  });

  test('previous button is disabled on the first page', () => {
    render(
      <Pagination
        postsPerPage={10}
        totalPosts={50}
        paginate={mockPaginate}
        currentPage={1}
      />
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  test('next button is disabled on the last page', () => {
    render(
      <Pagination
        postsPerPage={10}
        totalPosts={50}
        paginate={mockPaginate}
        currentPage={5}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('calls paginate function with correct page number when page button is clicked', () => {
    render(
      <Pagination
        postsPerPage={10}
        totalPosts={50}
        paginate={mockPaginate}
        currentPage={1}
      />
    );

    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    expect(mockPaginate).toHaveBeenCalledWith(3);
  });

  test('applies active styles to the current page button', () => {
    render(
      <Pagination
        postsPerPage={10}
        totalPosts={50}
        paginate={mockPaginate}
        currentPage={3}
      />
    );

    const activePageButton = screen.getByText('3');
    expect(activePageButton).toHaveClass('text-white bg-blue-500 border-blue-500');
  });
});
