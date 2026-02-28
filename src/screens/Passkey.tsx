import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Button from "@components/ui/Button";
import {
  setFlag,
  storageKeys
} from "@services/localStorageService";
import styles from "./Passkey.module.css";

type Mode = "setup" | "unlock";

const Passkey = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { updateUser, user } = useAuth();

  const mode: Mode = pathname.includes("unlock") ? "unlock" : "setup";

  const [enabled, setEnabled] = useState(
    window.localStorage.getItem(storageKeys.PASSKEY_ENABLED_KEY) === "true"
  );
  const [pin, setPin] = useState("");

  const createPasskey = async () => {
    setFlag(storageKeys.PASSKEY_ENABLED_KEY, true);
    sessionStorage.setItem("omo_passkey_unlocked_session", "true");
    setEnabled(true);
    if (user && !user.passkeySet) {
      await updateUser({ passkeySet: true });
    }
    if (mode === "setup") {
      navigate("/permissions", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const unlock = () => {
    if (pin.trim().length < 4) {
      alert("Enter your 4-digit passkey.");
      return;
    }
    sessionStorage.setItem("omo_passkey_unlocked_session", "true");
    navigate("/", { replace: true });
  };

  const heading =
    mode === "setup" ? "Create Your Passkey" : "Unlock with your passkey";

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.caption}>
        {mode === "setup"
          ? "Choose how you’d like to unlock OMO on this device. This is simulated in this frontend build."
          : "Confirm it’s really you before we show your rides and vehicles."}
      </p>

      <div className={styles.grid}>
        <button onClick={mode === "setup" ? createPasskey : unlock} className={styles.option}>
          <span>Face ID</span>
        </button>
        <button onClick={mode === "setup" ? createPasskey : unlock} className={styles.option}>
          <span>Fingerprint</span>
        </button>
        <button onClick={mode === "setup" ? createPasskey : unlock} className={styles.option}>
          <span>PIN</span>
        </button>
      </div>
      {enabled && mode === "setup" && (
        <p className={styles.status}>Passkey is set on this device ✅</p>
      )}

      {mode === "unlock" && (
        <div className={styles.pinSection}>
          <input
            className={styles.pinInput}
            type="password"
            inputMode="numeric"
            maxLength={6}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <Button type="button" onClick={unlock}>
            Unlock with passkey
          </Button>
        </div>
      )}
    </div>
  );
};

export default Passkey;

