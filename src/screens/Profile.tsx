import { useAuth } from "@context/AuthContext";
import { useTheme } from "@context/ThemeContext";
import Button from "@components/ui/Button";
import styles from "./Profile.module.css";
import { getString, storageKeys } from "@services/localStorageService";
import { useNavigate } from "react-router-dom";

const AVATAR_EMOJI: Record<string, string> = {
  "omo-cloud": "☁️",
  "omo-drop": "💧",
  "omo-flower": "🌸",
  "omo-leaf": "🍃",
  cat: "🐱",
  dog: "🐶",
  panda: "🐼",
  bunny: "🐰"
};

const Profile = () => {
  const { user } = useAuth();
  const { mode } = useTheme();
  const navigate = useNavigate();
  const contacts = getString(storageKeys.CONTACTS_PERMISSION_KEY) === "granted";

  if (!user) {
    return (
      <div className={styles.container}>
        <p>Please sign in to see your profile.</p>
      </div>
    );
  }

  const avatarEmoji = AVATAR_EMOJI[user.avatar ?? "omo-cloud"] ?? "💧";

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.avatarCircle}>
          <span className={styles.avatarEmoji}>{avatarEmoji}</span>
        </div>
        <button
          type="button"
          className={styles.settings}
          onClick={() => navigate("/profile-setup")}
        >
          ⚙️
        </button>
      </div>

      <div
        className={styles.bottom}
        style={{
          backgroundColor: mode === "light" ? "#ffffff" : "#021726"
        }}
      >
        <h2 className={styles.name}>{user.name}</h2>
        <Button
          className={styles.edit}
          onClick={() => navigate("/profile-setup")}
        >
          Edit profile
        </Button>
        <p className={styles.meta}>
          Member since {new Date(user.joinedAt).toLocaleDateString()}
        </p>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Friends</h3>
          {contacts ? (
            <p className={styles.text}>
              Contacts enabled. Show friendly avatars when you are near them.
            </p>
          ) : (
            <p className={styles.text}>
              Contacts are disabled. Turn them on in Permissions to see
              friends.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

