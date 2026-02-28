import { motion } from "framer-motion";
import styles from "./CharactersRibbon.module.css";

const icons = [
  {
    emoji: "☁️",
    top: "8%",
    left: "6%",
    path: {
      x: [0, 10, -8, 14, 0],
      y: [0, -6, 4, -10, 0]
    }
  },
  {
    emoji: "💧",
    top: "18%",
    right: "10%",
    path: {
      x: [0, -12, 6, -4, 0],
      y: [0, 8, -6, 4, 0]
    }
  },
  {
    emoji: "🌸",
    bottom: "22%",
    left: "12%",
    path: {
      x: [0, 6, -10, 8, 0],
      y: [0, -4, 10, -6, 0]
    }
  },
  {
    emoji: "🍃",
    bottom: "12%",
    right: "6%",
    path: {
      x: [0, -8, 12, -6, 0],
      y: [0, 6, -8, 4, 0]
    }
  }
] as const;

const CharactersRibbon = () => {
  return (
    <div className={styles.layer}>
      {icons.map((icon, index) => (
        <motion.div
          key={icon.emoji}
          className={styles.character}
          style={{ top: icon.top, bottom: icon.bottom, left: icon.left, right: icon.right }}
          animate={{ x: icon.path.x, y: icon.path.y }}
          transition={{
            repeat: Infinity,
            duration: 10 + index * 2,
            ease: "easeInOut"
          }}
        >
          <span className={styles.body}>{icon.emoji}</span>
          <span className={styles.eyeLeft} />
          <span className={styles.eyeRight} />
          <span className={styles.mouth} />
        </motion.div>
      ))}
    </div>
  );
};

export default CharactersRibbon;

