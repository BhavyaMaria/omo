import { NavLink } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { useAuth } from "@context/AuthContext";
import styles from "./BottomNav.module.css";

const BottomNav = () => {
  const { theme, toggleTheme, mode } = useTheme();
  const { user } = useAuth();

  // Get user avatar emoji or default
  const getUserAvatar = () => {
    const avatarMap: Record<string, string> = {
      "omo-cloud": "☁️",
      "omo-drop": "💧", 
      "omo-flower": "🌸",
      "omo-leaf": "🍃",
      "cat": "🐱",
      "dog": "🐶",
      "panda": "🐼",
      "bunny": "🐰"
    };
    return user?.avatar ? avatarMap[user.avatar] || "👤" : "👤";
  };

  return (
    <nav
      className={styles.nav}
      style={{
        backgroundColor: theme.card,
        borderTopColor: theme.primary
      }}
    >
      <NavLink
        to="/ai"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <span className={styles.icon} style={{ color: '#9EDAE5' }}>🤖</span>
        <span className={styles.label}>AI</span>
      </NavLink>

      <NavLink
        to="/child"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <span className={styles.icon} style={{ color: '#9EDAE5' }}>🧒</span>
        <span className={styles.label}>Child</span>
      </NavLink>

      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""} ${styles.home}`
        }
      >
        <span className={styles.icon}>🏠</span>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <span className={styles.icon} style={{ color: '#9EDAE5' }}>📋</span>
        <span className={styles.label}>History</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <span className={styles.icon}>{getUserAvatar()}</span>
        <span className={styles.label}>Profile</span>
      </NavLink>

      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {mode === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

export default BottomNav;

