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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:postId" element={<PostDetailsViewer />} />
            <Route path="*" element={<ErrorPage />} /> 
          </Routes>
          <Footer/>
        </main>
      </div>
    </Router>
  );
};

export default App;
