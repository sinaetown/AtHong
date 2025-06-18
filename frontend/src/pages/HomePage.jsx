"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// This component can be used as a direct replacement for your original HomePage
const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);

    // Add Lobster font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Rubik+Iso&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Underdog&display=swap";
    document.head.appendChild(link);

    return () => {
      // Clean up
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://source.unsplash.com/featured/?pastel,sky,clouds')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(186, 230, 253, 0.4)", // sky-200/40 equivalent
          backdropFilter: "blur(8px)",
          zIndex: 10,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
          padding: "0 1rem",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          style={{
            fontFamily: "'Rubik Iso', cursive",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#7dd3fc", // sky-400 equivalent
            textShadow: "3px 3px #ffffff",
            marginBottom: "2rem",
          }}
        >
          At Hong
        </motion.h1>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            rotate: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <button
            style={{
              marginTop: "2rem",
              backgroundColor: "#bae6fd", // sky-200 equivalent
              color: "#0c4a6e", // sky-900 equivalent
              fontWeight: "bold",
              fontSize: "1.125rem",
              padding: "1.5rem 2rem",
              borderRadius: "9999px",
              boxShadow: "0 10px 15px -3px rgba(186, 230, 253, 0.5)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#7dd3fc"; // sky-300 equivalent
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#bae6fd"; // sky-200 equivalent
            }}
            onClick={() => navigate("/items")}
          >
            🌤️ 쇼핑하러 가기
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Homepage;
