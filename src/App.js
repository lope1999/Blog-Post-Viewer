import React, {useState} from 'react';
import PostList from './components/PostList';
import PostDetailsViewer from './components/PostDetailsViewer';
import Header from './components/Header';

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleBack = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      {selectedPostId ? (
        <PostDetailsViewer postId={selectedPostId} onBack={handleBack} />
      ) : (
        <PostList onSelectPost={handleSelectPost} />
      )}
    </div>
  );
};

export default App;
