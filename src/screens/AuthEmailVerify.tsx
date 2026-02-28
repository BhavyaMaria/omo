import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import type { User } from "@models/User";
import Button from "@components/ui/Button";
import styles from "./Auth.module.css";

const PHONE_KEY = "omo_auth_phone";
const EMAIL_KEY = "omo_auth_email";
const NAME_KEY = "omo_auth_name";
const EMAIL_OTP_KEY = "omo_auth_email_otp";

const AuthEmailVerify = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const phone = sessionStorage.getItem(PHONE_KEY);
  const email = sessionStorage.getItem(EMAIL_KEY);
  const name = sessionStorage.getItem(NAME_KEY);
  const storedOtp = sessionStorage.getItem(EMAIL_OTP_KEY);

  const [code, setCode] = useState("");

  if (!phone || !email || !storedOtp) {
    navigate("/auth-phone", { replace: true });
    return null;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (code.trim() !== storedOtp) {
      alert("Incorrect code. Please try again.");
      return;
    }

    const now = new Date().toISOString();
    const baseName =
      (name && name.trim()) ||
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter email code</h1>
      <p className={styles.subtitle}>
        We sent a one-time password to {email}. Enter it below.
      </p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Email OTP
          <input
            className={styles.input}
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <Button type="submit" variant="primary" className={styles.submit}>
          Verify email
        </Button>
      </form>
    </div>
  );
};

export default AuthEmailVerify;

