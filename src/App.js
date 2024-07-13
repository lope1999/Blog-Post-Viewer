import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetailsViewer from './components/PostDetailsViewer';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostDetailsViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
