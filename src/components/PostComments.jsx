import React, { useState } from 'react';

const PostComments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded">
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddComment}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostComments;
