import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import PostList from '../pages/PostList';
import { fetchPosts } from '../services/api';

jest.mock('../services/api');

const mockPosts = [
  { id: 1, title: 'Post 1', body: 'Content of Post 1' },
  { id: 2, title: 'Post 2', body: 'Content of Post 2' },
  { id: 3, title: 'Post 3', body: 'Content of Post 3' },
];

describe('PostList Component', () => {
    test('displays loading spinner while fetching posts', async () => {
        fetchPosts.mockResolvedValueOnce(mockPosts);
        render(
          <MemoryRouter>
            <PostList />
          </MemoryRouter>
        );

        // Wait for the loading state to change
        await waitFor(() => {
          expect(screen.getByRole('status')).toBeInTheDocument();
        });
    
        // Wait for posts to be displayed
        await waitFor(() => {
          mockPosts.forEach((post) => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
          });
        });
      });
    

  test('displays posts after fetching them', async () => {
    fetchPosts.mockResolvedValueOnce(mockPosts);
    await act(async () => {
      render(
        <MemoryRouter>
          <PostList />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  test('displays error message when fetch fails', async () => {
    fetchPosts.mockRejectedValueOnce(new Error('Failed to fetch posts'));
    await act(async () => {
      render(
        <MemoryRouter>
          <PostList />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
    expect(screen.getByText(/failed to fetch posts/i)).toBeInTheDocument();
  });

  test('filters posts based on search query', async () => {
    fetchPosts.mockResolvedValueOnce(mockPosts);
    await act(async () => {
      render(
        <MemoryRouter>
          <PostList />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'Post 2' } });

    expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  test('paginates posts correctly', async () => {
    fetchPosts.mockResolvedValueOnce(mockPosts);
    await act(async () => {
      render(
        <MemoryRouter>
          <PostList />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());

    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      mockPosts.slice(1, 2).forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });
});
