import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { ClipLoader } from 'react-spinners';
import ErrorPage from './ErrorPage';
import errorIcon from '../assets/errorIcon.png';
import SearchInput from '../components/SearchInput';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  // Load posts from API
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

  // Filter posts based on search query
  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={"#123abc"} loading={loading} size={50} role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPage 
        errorTitle='Something went wrong'
        errorMessage={error}
        action={ <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>}
        errorIcon={errorIcon}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchText="Search posts..." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ height: '150px' }} 
            >
              <div className="flex items-center mb-4">
                <Avatar name={post.title.charAt(0)} size="50" round={true} />
                <h2 className="text-l font-semibold ml-4 line-clamp-2">{post.title}</h2>
              </div>
              <p className="text-gray-700 line-clamp-3">{post.body.substring(0, 50)}...</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No posts found</p>
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostList;
