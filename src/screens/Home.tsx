import { useNavigate } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import styles from "./Home.module.css";
import homeImage from "../images/home.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={homeImage}
          alt="Home"
          className={styles.hero}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>Welcome to OMO</h1>
          <p className={styles.subtitle}>READY FOR YOUR ADVENTURES?</p>
          <button
            className={styles.omoButton}
            style={{ backgroundColor: theme.primary, color: "#000" }}
            onClick={() => navigate("/ride")}
          >
            OMO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

