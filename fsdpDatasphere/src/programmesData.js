// programmesData.js

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
        membershipBenefits:
          "Complimentary 1-year membership with access to our resources and member rates for all programmes",
      },
      {
        price: "$988*",
        originalPrice: "$1188",
        Level: "Intermediate",
        Desc: "Perfect for someone who wants more.",
        classSize: "15 - 20",
        duration: "3.5 days",
        lunchProvided: true,
        membershipBenefits:
          "Complimentary 1-year membership with access to our resources and member rates for all programmes",
      },
      {
        price: "$1388*",
        classSize: "15 - 20",
        duration: "3.5 days",
        lunchProvided: true,
        membershipBenefits:
          "Complimentary 1-year membership with access to our resources and member rates for all programmes",
      },
    ],
    testimonials: [
      {
        quote:
          "I've had the privilege of witnessing Simon Yio's public speaking on several occasions...",
        image: "./src/assets/sharon.png",
        name: "Sharon Chong",
      },
      {
        quote:
          "I highly recommend Simon as a trainer, and I am grateful for the opportunity to learn...",
        image: "./src/assets/lisa.png",
        name: "Lisa Seow",
      },
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
    ],
    testimonials: [
      {
        quote:
          "The PSLE camp was an eye-opener for my child. The techniques taught were invaluable.",
        name: "Martha Lim",
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
        membershipBenefits:
          "Access to exclusive networking events and professional resources.",
      },
    ],
    testimonials: [
      {
        quote:
          "The professional workshop helped me advance my career significantly. Highly recommended!",
        name: "David Lee",
      },
    ],
  },
];

export default programmes;
