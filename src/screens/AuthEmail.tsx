import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import styles from "./Auth.module.css";

const PHONE_VERIFIED_KEY = "omo_auth_phone_verified";
const EMAIL_KEY = "omo_auth_email";
const NAME_KEY = "omo_auth_name";
const EMAIL_OTP_KEY = "omo_auth_email_otp";

const AuthEmail = () => {
  const navigate = useNavigate();
  const phoneVerified = sessionStorage.getItem(PHONE_VERIFIED_KEY) === "true";

  if (!phoneVerified) {
    navigate("/auth-phone", { replace: true });
    return null;
  }

  const [email, setEmail] = useState(
    sessionStorage.getItem(EMAIL_KEY) ?? ""
  );
  const [name, setName] = useState(sessionStorage.getItem(NAME_KEY) ?? "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(EMAIL_KEY, trimmedEmail);
    sessionStorage.setItem(NAME_KEY, name.trim());
    sessionStorage.setItem(EMAIL_OTP_KEY, otp);

    alert(
      `Email OTP (simulated): ${otp}\n\nIn production, this would be emailed using Firebase Auth or another provider.`
    );

    navigate("/auth-email-verify");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Verify your email</h1>
      <p className={styles.subtitle}>
        Enter your email address. We&apos;ll send a one-time password to your
        inbox.
      </p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="you@omo.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            placeholder="How should OMO call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <Button type="submit" variant="primary" className={styles.submit}>
          Send email OTP
        </Button>
      </form>
    </div>
  );
};

export default AuthEmail;

