import React from "react";
import { useParams } from "react-router-dom";
import blogs from "./assets/blogs"; // Import the blog data
import Footer from "./Footer"; // Import Footer component
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((post) => post.id === parseInt(id)); // Find the blog by id

  if (!blog) return <p>Blog post not found.</p>; // If blog not found

  return (
    <div className="blog-detail">
      <img src={blog.image} alt={blog.title} className="detail-image" />
      <h1>{blog.title}</h1>
      <span className="detail-date">{blog.date}</span>
      <span className="detail-category">{blog.category}</span>
      <div className="detail-content">
        {blog.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Add Footer component here */}
      <Footer />
    </div>
  );
};

export default BlogDetail;
