import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId } from '../services/api';
import Avatar from 'react-avatar';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import PostComments from './PostComments';

const PostDetailsViewer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onBack = () => {
    navigate(-1)
  };

  const handleAddComment = (comment) => {
    setComments([...comments, { body: comment }]);
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postDataResponse = await fetchPostById(postId);
        setPost(postDataResponse);
        const commentsDataResponse = await fetchCommentsByPostId(postId);
        setComments(commentsDataResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <button className="text-blue-500 mb-4 flex items-center" onClick={()=>onBack()}>
        <ArrowLeftIcon className="w-6 h-6 mr-2" />
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Avatar name={post.title.charAt(0)} size="50" round={true} />
          <h1 className="text-2xl font-bold ml-4">{post.title}</h1>
        </div>
        <p className="mb-4">{post.body}</p>
      </div>
      <PostComments comments={comments} onAddComment={handleAddComment} />
    </div>
  );
};

export default PostDetailsViewer;
