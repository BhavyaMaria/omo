import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import type { AvatarId } from "@models/User";
import Button from "@components/ui/Button";
import styles from "./ProfileSetup.module.css";

const AVATARS: { id: AvatarId; label: string; emoji: string }[] = [
  { id: "omo-cloud", label: "Cloud", emoji: "☁️" },
  { id: "omo-drop", label: "Drop", emoji: "💧" },
  { id: "omo-flower", label: "Flower", emoji: "🌸" },
  { id: "omo-leaf", label: "Leaf", emoji: "🍃" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "panda", label: "Panda", emoji: "🐼" },
  { id: "bunny", label: "Bunny", emoji: "🐰" }
];

const ProfileSetup = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AvatarId | undefined>(
    user?.avatar ?? "omo-cloud"
  );

  if (!user) {
    navigate("/auth", { replace: true });
    return null;
  }

  const onSave = async () => {
    if (!selected) return;
    await updateUser({ avatar: selected });
    navigate("/passkey-setup", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose your OMO avatar</h1>
      <p className={styles.subtitle}>
        Pick a character that will travel with you on every ride.
      </p>

      <div className={styles.grid}>
        {AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            className={`${styles.avatar} ${
              selected === avatar.id ? styles.avatarSelected : ""
            }`}
            onClick={() => setSelected(avatar.id)}
          >
            <span className={styles.emoji}>{avatar.emoji}</span>
            <span className={styles.label}>{avatar.label}</span>
          </button>
        ))}
      </div>

      <Button className={styles.save} onClick={onSave}>
        Save &amp; continue
      </Button>
    </div>
  );
};

export default ProfileSetup;

