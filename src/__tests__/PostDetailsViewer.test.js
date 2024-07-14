import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetailsViewer from '../pages/PostDetailsViewer';
import { fetchPostById, fetchCommentsByPostId } from '../services/api';

jest.mock('../services/api');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PostDetailsViewer Component', () => {
  const mockPost = {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'This is a test post body.',
  };

  const mockComments = [
    { id: 1, postId: 1, name: 'Comment 1', body: 'This is comment 1.' },
    { id: 2, postId: 1, name: 'Comment 2', body: 'This is comment 2.' },
  ];

  beforeEach(() => {
    fetchPostById.mockResolvedValue(mockPost);
    fetchCommentsByPostId.mockResolvedValue(mockComments);
  });

  test('renders loading spinner while loading data', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetailsViewer />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(fetchPostById).toHaveBeenCalledTimes(1);
      expect(fetchCommentsByPostId).toHaveBeenCalledTimes(1);
    });
  });

  test('renders error message on fetch error', async () => {
    const errorMessage = 'Failed to fetch data';
    fetchPostById.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetailsViewer />} />
        </Routes>
      </MemoryRouter>
    );

    const errorTitle = await screen.findByText(/something went wrong/i);
    expect(errorTitle).toBeInTheDocument();

    const retryButton = screen.getByText(/retry/i);
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(fetchPostById).toHaveBeenCalledTimes(2); 
  });

  test('renders post details and comments when data is loaded', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetailsViewer />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const postTitle = screen.getByText(mockPost.title);
      expect(postTitle).toBeInTheDocument();

      const postBody = screen.getByText(mockPost.body);
      expect(postBody).toBeInTheDocument();

      const comment1 = screen.getByText(mockComments[0].body);
      expect(comment1).toBeInTheDocument();

      const comment2 = screen.getByText(mockComments[1].body);
      expect(comment2).toBeInTheDocument();
    });
  });

  test('navigates back when back button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetailsViewer />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    });

    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
