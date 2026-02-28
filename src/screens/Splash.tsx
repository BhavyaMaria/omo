import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OMO_BLUE } from "@app/theme";
import omoImage from "../images/omo.jpeg";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.setTimeout(() => navigate("/"), 3000);
    return () => window.clearTimeout(id);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background: OMO_BLUE,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#000"
      }}
    >
      <motion.img
        src={omoImage}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        width={150}
        alt="OMO logo"
      />

      <motion.div
        style={{ 
          marginTop: 32, 
          fontSize: 28,
          color: '#9EDAE5',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -20, 20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🧸 🌸 ☁️ 🍃
      </motion.div>
    </div>
  );
};

export default Splash;

