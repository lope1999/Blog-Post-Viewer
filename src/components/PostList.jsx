import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetchPosts();
        setPosts(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div className="flex items-center mb-4">
              <Avatar name={post.title.charAt(0)} size="50" round={true} />
              <h2 className="text-l font-semibold ml-4">{post.title}</h2>
            </div>
            <p className="text-gray-700">
              {post.body.substring(0, 50)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
