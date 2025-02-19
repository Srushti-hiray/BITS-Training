import React, { useState } from 'react';
import './PostForm.css';

interface PostFormProps {
  onSubmit: (data: { userId: string; title: string; body: string }) => void;
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    body: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Add New Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label>User ID</label>
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;