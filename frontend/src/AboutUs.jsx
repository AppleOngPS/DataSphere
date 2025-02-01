// eslint-disable-next-line no-unused-vars
import React from "react";
import "./AboutUsPage.css"; // Import your styles here
import "./assets/components/nav.css"; // Import Navbar CSS
import Footer from "./Footer";
import GuyLogo from "./assets/homepageguy1.jpg";
import Mindsphere from "./assets/logo.png";

const AboutUsPage = () => {
  return (
    <div className="about-us">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Introducing the leadership team and their journey.</p>
      </header>

      <section className="leadership-team">
        <img
          src="./src/assets/founders.png"
          alt="Leadership Team"
          className="leadership-image"
        />
        <div className="team-info">
          <h2>Simon, Founder</h2>
          <p>
            Simon has over 32 years of experience in real estate and
            international partnerships. He holds a Bachelor of Arts in Business
            Management from Kingston University and has pursued:
            <ul>
              <li>
                Cambridge International Diploma in Teaching and Training from
                the University of Cambridge
              </li>
              <li>
                Certified Professional Coach by the International Coaches
                Federation
              </li>
              <li>
                ACTA Certified Trainer by Singapore Workforce Skills
                Qualifications
              </li>
            </ul>
            He spent over a decade at OrangeTee & Tie Pte Ltd (OTT), one of
            Singapore&apos;s top real estate agencies, rising through the ranks
            to Board of Director and Chief Operating Officer where he trained
            thousands of real estate agents and team leaders. He spearheaded
            integration efforts during OTT&apos;s merger and acquisition,
            integrating over 95% of the salesforce, exceeding 1,000 salespeople.
            <br />
            <br />
            Always up for a challenge, Simon left OTT to become Managing
            Director at Singapore&apos;s first geospatial technology company
            Mogul.sg, securing a significant public-private partnership with the
            Ministry of National Development, marking a significant milestone in
            Singapore&apos;s real estate industry. This pioneer initiative sets
            a new standard for industry-government cooperation and drives
            sustainable urban development strategies.
            <br />
            <br />
            Currently, Simon serves as a consultant and advisor to several
            organizations in Singapore and is involved in entrepreneurship,
            driven by his mission to give back to society.
          </p>

          <h2>Christine, Co-Founder</h2>
          <p>
            Graduated with a Bachelor in Business Management from the Royal
            Melbourne Institute of Technology, Christine embodies multi-talent;
            she started teaching at the tender age of 17 and with patience as
            her strongest virtue, she advocates inclusive education for both
            neurotypical and special needs children. For close to 20 years now,
            she pursues her passion as an educator fervently, with an
            inclination towards guiding students who struggle with passing exams
            to eventually pass with flying colors. At 35, she took up the role
            of Adjunct Lecturer at the School of Business and Accountancy with
            Ngee Ann Polytechnic, extending her impact to adult teaching and
            motivating them to greater heights in their careers. She has
            impacted over 10,000 students to date.
            <br />
            <br />
            Concurrently, Christine hones her People skills through Business
            Development in the Banking and Finance sector. Currently a Talent
            Development Lead with the Singapore FinTech Association, she
            identifies with the sector’s hiring needs and gaps and commits to
            growing talents within Singapore to feed into the sector. Her
            expertise in both education and talent development harmonize
            complementarily, enabling her to become the bridge between employers
            and the future pillars of our economy.
          </p>
        </div>
      </section>

      <section>
        <h2 className="comments-title">Loved By Parents Locally</h2>
        <p className="comments-subtitle">
          Learning is easy when you focus on what truly matters.
        </p>
      </section>

      <section className="testimonials">
        <div className="testimonials-container">
          {/* Main testimonial */}
          <div className="main-testimonial">
            <img
              src={GuyLogo}
              alt="Main testimonial profile"
              className="testimonial-profile main-profile"
            />
            <blockquote>
              <p>
                &quot;From the time they joined, the growth has been amazing.
                Improving confidence, boosting grades—it all feels like
                magic.&quot;
              </p>
              <p className="testimonial-author">Becky Nelson</p>
              <div className="rating">
                <span>⭐️⭐️⭐️⭐️⭐️</span>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
      {/* Import and use Footer component */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
