import React from "react";
import "./Blog.css"; // Ensure Blog.css exists and is properly styled
import collaborationImg from "./assets/collaboration.jpg";
import educationImg from "./assets/education.png";
import stageFrightImg from "./assets/stage_fright.png";

const Blog = () => {
  const blogPosts = [
    {
      date: "29 October 2024",
      category: "Business",
      title: "The Power of Meaningful Collaboration in Business",
      image: collaborationImg,
      readTime: "3 minutes read",
    },
    {
      date: "3 September 2024",
      category: "Children",
      title:
        "Navigating the Challenges of Preparing for the PSLE Chinese: Here's How.",
      image: educationImg,
      readTime: "3 minutes read",
    },
    {
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
        {blogPosts.map((post, index) => (
          <div className="blog-post" key={index}>
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-info">
              <span className="post-date">{post.date}</span>
              <span className="post-category">{post.category}</span>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-read-time">{post.readTime}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <img
          src="./src/assets/logo.png"
          alt="Mindsphere Logo"
          className="mindsphere-logo"
        />
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>
          Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default Blog;
