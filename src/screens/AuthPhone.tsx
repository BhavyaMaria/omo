import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import styles from "./Auth.module.css";

const PHONE_KEY = "omo_auth_phone";
const PHONE_OTP_KEY = "omo_auth_phone_otp";

const AuthPhone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(
    sessionStorage.getItem(PHONE_KEY) ?? ""
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!trimmed) return;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(PHONE_KEY, trimmed);
    sessionStorage.setItem(PHONE_OTP_KEY, otp);

    alert(
      `SMS OTP (simulated): ${otp}\n\nIn production, this would be sent via SMS using Firebase or another provider.`
    );

    navigate("/auth-phone-verify");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Verify your mobile</h1>
      <p className={styles.subtitle}>
        Enter your mobile number. We&apos;ll send a one-time password by SMS.
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

        <Button type="submit" variant="primary" className={styles.submit}>
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default AuthPhone;

