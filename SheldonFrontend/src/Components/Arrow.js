import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap"; // Import Button from React-Bootstrap

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    setProgress(scrollPercent);

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="primary" // Use React-Bootstrap button variant
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: isVisible ? "block" : "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        padding: "0",
        zIndex: "5",
      }}
    >
      <svg className="progress-circle" width="60" height="60">
        <circle
          cx="30"
          cy="30"
          r="28"
          stroke="transparent"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="30"
          cy="30"
          r="28"
          stroke="lightblue"
          strokeWidth="4"
          fill="none"
          strokeDasharray="175.84"
          strokeDashoffset={175.84 - (175.84 * progress) / 100}
        />
      </svg>
      <span
        className="arrow"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          color: "white",
        }}
      >
        ↑
      </span>
    </Button>
  );
};

export default BackToTopButton;
