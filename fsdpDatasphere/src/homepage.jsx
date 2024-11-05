// src/pages/homepage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './homepage.css'; // Ensure this CSS aligns with your design style
import homeImage from './assets/home.png'; // Import the main image

// Import each logo (replace with actual paths if available)
import fundigoLogo from './assets/fundigo.png';
import ieaLogo from './assets/iea.png';
import jcuLogo from './assets/jcu.png';
import orchidLogo from './assets/orchid.png';
import classLivingLogo from './assets/classLiving.png';
import learningApproachImage from './assets/logohome.png'; 

const Homepage = () => (
  <div className="home-page">
    <header className="home-header">
      <img src={homeImage} alt="Mindsphere Logo" />
      <button className="cta-button">Get Started</button>
    </header>

    {/* Trusted by local companies section */}
    <section className="trusted-section">
      <h2>Trusted by Local Companies</h2>
      <div className="trusted-logos">
        <img src={fundigoLogo} alt="Fundigo" className="company-logo" />
        <img src={ieaLogo} alt="IEA" className="company-logo" />
        <img src={jcuLogo} alt="James Cook University" className="company-logo" />
        <img src={orchidLogo} alt="Orchid Country Club" className="company-logo" />
        <img src={classLivingLogo} alt="Class Living" className="company-logo" />
      </div>
    </section>

    <section className="about-section">
      <h2>Our Story</h2>
      <p>
      With technology advancement at a rapid rate, the skills relevant for competency evolve continuously. As seasoned professionals in training and coaching, Simon and Christine face the challenge of innovating and tailoring their curriculum and methodologies to the different generations.

After a spontaneous sharing of their vision with each other, Simon and Christine&apos;s common goals led to the birth of Mindsphere Singapore.

A purpose driven by passion, Mindsphere is the union of their compassion, dedication and expertise in training and coaching.

Together, the founding partners came out with the Learning Sphere which you will find incorporated in all our programmes and the Curriculum Pyramid which guides the development of our curriculum. Backed by their impressive training record, they have painstakingly designed the curriculum of our signature programmes from scratch.

At Mindsphere, we constantly seek new methods and ideas to deliver effective teaching with workforce relevance in mind. Regardless how you define success, we believe every learner deserves a chance at it. We uphold the highest standards of integrity and ethics, and more than a learning hub, we are a community committed to fostering growth, inspiring confidence, and nurturing the leaders of tomorrow.

We welcome you onboard our journey to shape the future, one mind at a time.
      </p>
    </section>

    <section className="programs-section">
      <h2>Our Learning Approach</h2>
      <h4>Inspiring our avid learners</h4>
      <div className="learning-approach-image">
        <img src={learningApproachImage} alt="Our Learning Approach" />
      </div>
    </section>

    <div className="about-us">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Introducing the leadership team and their journey.</p>
      </header>

      <section className="leadership-team">
        <img src="./src/assets/founders.png" alt="Leadership Team" className="leadership-image" />
        <div className="team-info">
          <h2>Simon, Founder</h2>
          <p>
            Simon has over 32 years of experience in real estate and international partnerships. He holds a Bachelor of Arts in Business Management from Kingston University and has pursued:
            <ul>
              <li>Cambridge International Diploma in Teaching and Training from the University of Cambridge</li>
              <li>Certified Professional Coach by the International Coaches Federation</li>
              <li>ACTA Certified Trainer by Singapore Workforce Skills Qualifications</li>
            </ul>
            He spent over a decade at OrangeTee & Tie Pte Ltd (OTT), one of Singapore&apos;s top real estate agencies, rising through the ranks to Board of Director and Chief Operating Officer where he trained thousands of real estate agents and team leaders. He spearheaded integration efforts during OTT&apos;s merger and acquisition, integrating over 95% of the salesforce, exceeding 1,000 salespeople.
            <br /><br />
            Always up for a challenge, Simon left OTT to become Managing Director at Singapore&apos;s first geospatial technology company Mogul.sg, securing a significant public-private partnership with the Ministry of National Development, marking a significant milestone in Singapore&apos;s real estate industry. This pioneer initiative sets a new standard for industry-government cooperation and drives sustainable urban development strategies.
            <br /><br />
            Currently, Simon serves as a consultant and advisor to several organizations in Singapore and is involved in entrepreneurship, driven by his mission to give back to society.
          </p>

          <h2>Christine, Co-Founder</h2>
          <p>
            Graduated with a Bachelor in Business Management from the Royal Melbourne Institute of Technology, Christine embodies multi-talent; she started teaching at the tender age of 17 and with patience as her strongest virtue, she advocates inclusive education for both neurotypical and special needs children. For close to 20 years now, she pursues her passion as an educator fervently, with an inclination towards guiding students who struggle with passing exams to eventually pass with flying colors. At 35, she took up the role of Adjunct Lecturer at the School of Business and Accountancy with Ngee Ann Polytechnic, extending her impact to adult teaching and motivating them to greater heights in their careers. She has impacted over 10,000 students to date.
            <br /><br />
            Concurrently, Christine hones her People skills through Business Development in the Banking and Finance sector. Currently a Talent Development Lead with the Singapore FinTech Association, she identifies with the sector’s hiring needs and gaps and commits to growing talents within Singapore to feed into the sector. Her expertise in both education and talent development harmonize complementarily, enabling her to become the bridge between employers and the future pillars of our economy.
          </p>
        </div>
      </section>

      <section className="testimonials">
  <h2 className="testimonials-title">Loved by parents locally</h2>
  <p className="testimonials-subtitle">Learning is easy when you focus on what truly matters.</p>
  <div className="testimonial-cards">
    {Array(3).fill().map((_, index) => (
      <div className="testimonial-card" key={index}>
        <img src={`path_to_testimonial_profile_${index + 1}.jpg`} alt={`Profile ${index + 1}`} className="testimonial-profile" />
        <p>Testimonial content for person {index + 1}. This is where their feedback goes.</p>
      </div>
    ))}
  </div>
</section>


<section className="values">
        <h2>Integrity. Innovation. Inclusivity.</h2>
        <p>Where learning meets achievement.</p>
        <button className="contact-button">Speak With Our Friendly Team Now</button>
      </section>

      <footer className="footer">
        <img src="path_to_mindsphere_logo.png" alt="Mindsphere Logo" className="mindsphere-logo" />
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.</p>
      </footer>
    </div>
  </div>
 );

export default Homepage;

