import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostComments from '../components/PostComments';

describe('PostComments Component', () => {
  it('renders comments correctly', () => {
    const comments = [
      { id: 1, body: 'First comment' },
      { id: 2, body: 'Second comment' },
    ];

    const { getByText } = render(<PostComments comments={comments} />);
    
    expect(getByText('Comments')).toBeInTheDocument();
    expect(getByText('First comment')).toBeInTheDocument();
    expect(getByText('Second comment')).toBeInTheDocument();
  });

  it('adds a new comment correctly', () => {
    const onAddComment = jest.fn(); 

    const { getByText, getByRole } = render(<PostComments comments={[]} onAddComment={onAddComment} />);
    
    const textarea = getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New comment text' } });

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    expect(onAddComment).toHaveBeenCalledWith('New comment text');
    expect(textarea).toHaveValue('');
  });

  it('does not add a comment when textarea is empty', () => {
    const onAddComment = jest.fn(); 

    const { getByText } = render(<PostComments comments={[]} onAddComment={onAddComment} />);
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    expect(onAddComment).not.toHaveBeenCalled();
  });
});
