import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const navigate = useNavigate();
  
  // Load posts api
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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div className="flex items-center mb-4">
              <Avatar name={post.title.charAt(0)} size="50" round={true} />
              <h2 className="text-l font-semibold ml-4 line-clamp-5">{post.title}</h2>
            </div>
            <p className="text-gray-700 line-clamp-5">{post.body.substring(0, 50)}...</p>
          </div>
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostList;
