import React from 'react';
import { IPost } from '../types/Post';
import './PostList.css';

interface PostListProps {
  posts: IPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="posts-grid">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <h2 className="post-title">{post.title}</h2>
            <span className="post-id">ID: {post.id}</span>
          </div>
          <p className="post-body">{post.body}</p>
          <div className="post-footer">
            <span className="user-id">User ID: {post.userId}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;