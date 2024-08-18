import React from 'react';
import '../App.css';
import Header from "./Header";
import Footer from './Footer';

const Blog = ({ blog }) => {
  return (
    <div>
      <Header />

    <section className="ftco-section ftco-intro">
  <div className="container">
    <div className="row justify-content-end">
      <div className="col-md-4">
        <div className="card">
          <img src={blog.image} className="card-img-top" alt="Background" />
        </div>
      </div>
      <div class="col-md-8 py-md-5 pt-4 p-md-5 mt-4">
            <h2 className="card-title">{blog.title}</h2>
            <p className="card-text mt-4">{blog.content}</p>
            <a href="#" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </div>
  
</section>
<Footer/>
    </div>
  );
};

export default Blog;
