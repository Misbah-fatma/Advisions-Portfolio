import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get('/api/blogs');
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
