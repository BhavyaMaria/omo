import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import styles from "./Auth.module.css";

const PHONE_KEY = "omo_auth_phone";
const PHONE_OTP_KEY = "omo_auth_phone_otp";
const PHONE_VERIFIED_KEY = "omo_auth_phone_verified";

const AuthPhoneVerify = () => {
  const navigate = useNavigate();
  const storedPhone = sessionStorage.getItem(PHONE_KEY);
  const storedOtp = sessionStorage.getItem(PHONE_OTP_KEY);
  const [code, setCode] = useState("");

  if (!storedPhone || !storedOtp) {
    navigate("/auth-phone", { replace: true });
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim() !== storedOtp) {
      alert("Incorrect code. Please try again.");
      return;
    }
    sessionStorage.setItem(PHONE_VERIFIED_KEY, "true");
    navigate("/auth-email");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter SMS code</h1>
      <p className={styles.subtitle}>
        We sent a one-time password to {storedPhone}. Enter it below.
      </p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          SMS OTP
          <input
            className={styles.input}
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <Button type="submit" variant="primary" className={styles.submit}>
          Verify mobile
        </Button>
      </form>
    </div>
  );
};

export default AuthPhoneVerify;

