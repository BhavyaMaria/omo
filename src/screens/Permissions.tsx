import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import {
  setString,
  storageKeys,
  getString
} from "@services/localStorageService";
import styles from "./Permissions.module.css";

const Permissions = () => {
  const navigate = useNavigate();
  const [locationStatus, setLocationStatus] = useState(
    getString(storageKeys.LOCATION_PERMISSION_KEY) ?? "pending"
  );
  const [contactsStatus, setContactsStatus] = useState(
    getString(storageKeys.CONTACTS_PERMISSION_KEY) ?? "pending"
  );

  useEffect(() => {
    setString(storageKeys.LOCATION_PERMISSION_KEY, locationStatus);
  }, [locationStatus]);

  useEffect(() => {
    setString(storageKeys.CONTACTS_PERMISSION_KEY, contactsStatus);
  }, [contactsStatus]);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocationStatus("granted"),
      () => setLocationStatus("denied")
    );
  };

  const continueNext = () => {
    if (locationStatus !== "granted") return;
    navigate("/home", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Permissions</h1>
      <p className={styles.subtitle}>
        OMO uses your location to plan safe routes and optional contacts to
        show friendly faces when you arrive. You can skip for now and enable it
        later when you book a ride.
      </p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Location (recommended)</h2>
        <p className={styles.cardText}>
          Needed to detect your pickup point and track your ride.
        </p>
        <Button onClick={requestLocation}>
          {locationStatus === "granted" ? "Location enabled" : "Allow location"}
        </Button>
        {locationStatus === "denied" && (
          <p className={styles.error}>
            You can still explore OMO without location. We&apos;ll ask again
            when you start a ride.
          </p>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Contacts (optional)</h2>
        <p className={styles.cardText}>
          If enabled we can show your friends when you are near their saved
          places.
        </p>
        <div className={styles.toggleRow}>
          <Button
            variant="secondary"
            onClick={() => setContactsStatus("granted")}
          >
            Yes
          </Button>
          <Button
            variant="ghost"
            onClick={() => setContactsStatus("denied")}
          >
            No
          </Button>
        </div>
      </div>

      <Button className={styles.continue} onClick={continueNext}>
        Continue to OMO
      </Button>
    </div>
  );
};

export default Permissions;

