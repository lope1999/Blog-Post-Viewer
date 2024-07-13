import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './pages/PostList';
import PostDetailsViewer from './pages/PostDetailsViewer';
import ErrorPage from './pages/ErrorPage'; 
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostDetailsViewer />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
