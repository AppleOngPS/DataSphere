// FadeInSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
