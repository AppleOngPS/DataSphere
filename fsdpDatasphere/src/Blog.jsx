import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css"; // Ensure Blog.css exists and is properly styled
import collaborationImg from "./assets/collaboration.jpg";
import educationImg from "./assets/education.png";
import stageFrightImg from "./assets/stage_fright.png";
import Footer from "./Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      date: "29 October 2024",
      category: "Business",
      title: "The Power of Meaningful Collaboration in Business",
      image: collaborationImg,
      readTime: "3 minutes read",
    },
    {
      id: 2,
      date: "3 September 2024",
      category: "Children",
      title:
        "Navigating the Challenges of Preparing for the PSLE Chinese: Here's How.",
      image: educationImg,
      readTime: "3 minutes read",
    },
    {
      id: 3,
      date: "24 August 2024",
      category: "Children",
      title: "Helping Kids Conquer Stage Fright",
      image: stageFrightImg,
      readTime: "4 minutes read",
    },
  ];

  return (
    <section className="blog-page">
      <header className="blog-header">
        <h1>Blog</h1>
        <p>Stay up-to-date with the latest industry news</p>
      </header>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="blog-post-link"
          >
            <div className="blog-post">
              <img src={post.image} alt={post.title} className="post-image" />
              <div className="post-info">
                <span className="post-date">{post.date}</span>
                <span className="post-category">{post.category}</span>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-read-time">{post.readTime}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Import and use Footer component */}
      <Footer />
    </section>
  );
};

export default Blog;
