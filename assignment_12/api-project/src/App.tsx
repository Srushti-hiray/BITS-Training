import React, { useState } from 'react';
import axios from 'axios';
import { IPost } from './types/Post';
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import './App.css';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPostsByUserId = async () => {
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Error fetching posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setUserId(''); // Clear the user ID input when fetching all posts
    } catch (error) {
      console.error('Error fetching all posts:', error);
      alert('Error fetching all posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);
    if (!value) {
      setPosts([]); // Clear posts when input is empty
    }
  };

  const handleSubmit = async (formData: { userId: string; title: string; body: string }) => {
    try {
      const response = await axios.post<IPost>('https://jsonplaceholder.typicode.com/posts', {
        userId: parseInt(formData.userId),
        title: formData.title,
        body: formData.body
      });
      
      alert(`Post added successfully!\nStatus: ${response.status}\nID: ${response.data.id}\nTitle: ${response.data.title}`);
      setShowForm(false);
      
      const newPost = {
        ...response.data,
        id: Math.max(...posts.map(post => post.id), 0) + 1
      };
      
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Posts</h1>
          <button className="add-button" onClick={() => setShowForm(true)}>
            Add Post
          </button>
        </div>

        <div className="search-section">
          <div className="search-container">
            <input
              type="number"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
              className="search-input"
            />
            <button onClick={fetchPostsByUserId} className="search-button">
              Fetch Posts
            </button>
            <button onClick={fetchAllPosts} className="fetch-all-button">
              Fetch All
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="no-posts">
            <p>No posts found. Enter a user ID and click "Fetch Posts" or click "Fetch All" to see all posts.</p>
          </div>
        )}

        {showForm && (
          <PostForm
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;