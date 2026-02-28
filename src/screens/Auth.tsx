import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import type { User } from "@models/User";
import Button from "@components/ui/Button";
import styles from "./Auth.module.css";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !email.trim()) return;

    const now = new Date().toISOString();
    const baseName =
      name.trim() ||
      (email.includes("@") ? email.split("@")[0] : "OMO Explorer");

    const user: User = {
      id: `user-${Date.now()}`,
      name: baseName,
      email,
      phone,
      avatar: undefined,
      joinedAt: now,
      passkeySet: false
    };

    await login(user);
    navigate("/profile-setup", { replace: true });
  };

  const simulateGoogle = async () => {
    const now = new Date().toISOString();
    const user: User = {
      id: `google-${Date.now()}`,
      name: "OMO Explorer",
      email: email || "omo@example.com",
      phone,
      avatar: undefined,
      joinedAt: now,
      passkeySet: false
    };
    await login(user);
    navigate("/profile-setup", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Security Check</h1>
      <p className={styles.subtitle}>
        Sign in securely to sync your OMO rides across devices.
      </p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Mobile number
          <input
            className={styles.input}
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            placeholder="what should OMO call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <Button type="submit" variant="primary" className={styles.submit}>
          Continue
        </Button>

        <Button
          type="button"
          variant="secondary"
          className={styles.google}
          onClick={simulateGoogle}
        >
          Continue with Google
        </Button>

        <p className={styles.helper}>
          OTP / email verification is mocked in this frontend-only build. Wire
          these flows to Firebase Auth in a real backend.
        </p>
      </form>
    </div>
  );
};

export default Auth;

