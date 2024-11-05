// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './WorkshopPage.css'; // Import your styles here
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheck } from '@fortawesome/free-solid-svg-icons';

const WorkshopPage = () => {
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const programmes = [
    {
      name: "Public Speaking Workshops",
      image: "./src/assets/publicspeaking.png",
      description: "Transform your child into a seasoned stage storyteller.",
      workshopCards: [
        {
          price: "$788*",
          originalPrice: "$988",
          Level: "Beginner",
          Desc: "Just getting started.",
          classSize: "15 - 20",
          duration: "3.5 days",
          lunchProvided: true,
          membershipBenefits: "Complimentary 1-year membership with access to our resources and member rates for all programmes",
        },
        {
          price: "$988*",
          originalPrice: "$1188",
          Level: "Intermediate",
          Desc: "Perfect for someone who wants more.",
          classSize: "15 - 20",
          duration: "3.5 days",
          lunchProvided: true,
          membershipBenefits: "Complimentary 1-year membership with access to our resources and member rates for all programmes",
        },
        {
          price: "$1388*",
          classSize: "15 - 20",
          duration: "3.5 days",
          lunchProvided: true,
          membershipBenefits: "Complimentary 1-year membership with access to our resources and member rates for all programmes",
        }
      ],
      testimonials: [
        {
quote: "I've had the privilege of witnessing Simon Yio's public speaking on several occasions, and each time has been nothing short of impressive. Simon possesses a rare ability to communicate with clarity and precision, effortlessly distilling complex ideas into understandable concepts. His presentations are not just informative but deeply engaging, holding the audience's attention from start to finish.\n\nSimon's speaking style is truly captivating. He has a natural charisma and presence that commands the room, combined with a genuine passion for his topics. Whether addressing a small group or a large audience, Simon has a way of connecting with people on a personal level, fostering a sense of rapport and making everyone feel included in the conversation.\n\nIn summary, Simon Yio is an exceptional public speaker who excels in clarity, engagement, analogies, and captivation. His ability to articulate ideas clearly, use compelling analogies, and hold the audience's attention sets him apart. I have no doubt that Simon will continue to inspire and educate through his impactful presentations.",
          image: "./src/assets/sharon.png", 
          name: "Sharon Chong",
         
        }, 
        {
          quote: "I highly recommend Simon as a trainer, and I am grateful for the opportunity to learn from such a seasoned professional and look forward to applying these teachings for continued success in my career.",
          image: "./src/assets/lisa.png", 
          name: "Lisa Seow",
        },
        {
          quote: "Mr. Yio’s dedication to fostering a supportive and dynamic learning environment was evident throughout the course. His ability to connect with participants and provide personalized feedback greatly enhanced the learning experience. I am immensely grateful for the knowledge and skills I have gained under his guidance, and I am confident that these will serve me well in my future leadership endeavors.",
          image: "./src/assets/geryl.png", 
          name: "Geryl Lim",
        },
{
  quote: "It was my absolute pleasure to attend a leadership training conducted by Simon Yio, the esteemed former COO of OrangeTee back then in 2022. Simon's adeptness in engaging every participant truly set his training apart. His clear, relatable messages, undoubtedly honed by his experience as a trained Toastmasters speaker, resonated deeply with all of us. Simon not only encouraged lively interaction among participants but also facilitated thought-provoking and enjoyable activities.",
  image: "./src/assets/roza.png", 
  name: "Roza Sure Bagus",
}
      ],
    },
    {
      name: "PSLE Camps",
      image: "./src/assets/psle.png",
      description: "Get ready for PSLE with our focused camps.",
      workshopCards: [
        {
          price: "$688*",
          originalPrice: "$888",
          classSize: "10 - 15",
          duration: "2 days",
          lunchProvided: true,
          membershipBenefits: "Access to additional resources and support.",
        },
        {
          price: "$688*",
          originalPrice: "$888",
          classSize: "10 - 15",
          duration: "2 days",
          lunchProvided: true,
          membershipBenefits: "Access to additional resources and support.",
        }
      ],
      testimonials: [
        {
          quote: "The PSLE camp was an eye-opener for my child. The techniques taught were invaluable.",
          name: "Martha Lim",
        },
        {
          quote: "My child made significant progress in understanding difficult concepts. Highly recommended!",
          name: "Henry Tan",
        },
        {
          quote: "Excellent camp! My child is now more confident about PSLE.",
          name: "Selina Wong",
        },
      ],
    },
    {
      name: "Future Entrepreneurs",
      image: "./src/assets/entre.png",
      description: "Nurturing the next generation of innovators.",
      workshopCards: [],
      testimonials: [],
    },
    {
      name: "Professionals",
      image: "./src/assets/pro.png",
      description: "Programs for skill enhancement and career advancement.",
      workshopCards: [
        {
          price: "$888*",
          originalPrice: "$1088",
          classSize: "10 - 15",
          duration: "2 days",
          lunchProvided: true,
          membershipBenefits: "Access to exclusive networking events and professional resources.",
        },
      ],
      testimonials: [
        {
          quote: "The professional workshop helped me advance my career significantly. Highly recommended!",
          name: "David Lee",
        },
        {
          quote: "Great insights and practical skills that I could apply immediately in my job.",
          name: "Rachel Ong",
        },
      ],
    }
  ];

  const handleProgrammeClick = (programme) => {
    setSelectedProgramme(programme);
  };

  return (
    <div className="workshop">
      <section className="signature-programmes" id="programmes">
        <h2>Our Signature Programmes</h2>
        <p>Select each programme to find out more</p>
        <div className="programme-cards">
          {programmes.map((programme, index) => (
            <div className="programme-card" key={index} onClick={() => handleProgrammeClick(programme)}>
              <img src={programme.image} alt={programme.name} />
              <p>{programme.name}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedProgramme && (
        <section className="selected-programme">
          <h2>{selectedProgramme.name}</h2>
          <p>{selectedProgramme.description}</p>

          {/* Displaying workshop cards */}
{selectedProgramme.workshopCards.length > 0 && (
  <div className="workshop-details">
    {selectedProgramme.workshopCards.map((card, index) => (
      <div className="workshop-card" key={index}>
        <h3>{card.price}</h3>
        {card.originalPrice && (
          <p><s>Was {card.originalPrice}</s></p>
        )}
        <p>Class size: {card.classSize}</p>
        <p>Duration: {card.duration}</p>
        <p>{card.lunchProvided ? 'Lunch provided' : 'Lunch not provided'}</p>
        <p>{card.membershipBenefits}</p>
        <button>Get Started</button>
      </div>
    ))}
  </div>
)}


          {/* Displaying testimonials */}
          {selectedProgramme.testimonials.length > 0 && (
            <div className="testimonials">
              <h2 className="testimonials-title">Hear from our learners</h2>
              {selectedProgramme.testimonials.map((testimonial, index) => (
                <div className="testimonial-card" key={index}>
                <img src={testimonial.image} alt={`${testimonial.name}'s profile`} className="profile-logo" />
                  <p>{testimonial.quote}</p>
                  <p><strong>- {testimonial.name}</strong></p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Footer Section */}
      <footer className="footer">
        <img src="./src/assets/logo.png" alt="Mindsphere Logo" className="mindsphere-logo" />
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
  );
};

export default WorkshopPage;

