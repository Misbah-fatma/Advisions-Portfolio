import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Blogs</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4">
            <div className="card mb-4">
              {blog.image && <img src={blog.image} className="card-img-top" alt={blog.title} />}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                <a href={`/blog/${blog._id}`} className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
