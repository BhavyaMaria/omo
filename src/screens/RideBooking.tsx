import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRides } from "@context/RideContext";
import type { TransportMode } from "@models/Ride";
import Button from "@components/ui/Button";
import {
  getString,
  setString,
  storageKeys
} from "@services/localStorageService";
import styles from "./RideBooking.module.css";

const RideBooking = () => {
  const { rides, startRide } = useRides();
  const navigate = useNavigate();

  const [from, setFrom] = useState("Current location");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState<TransportMode>("car");
  const [childMode, setChildMode] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = `${pos.coords.latitude.toFixed(
          4
        )}, ${pos.coords.longitude.toFixed(4)}`;
        setFrom(loc);
      });
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!to.trim()) return;

    const permission = getString(storageKeys.LOCATION_PERMISSION_KEY);

    if (permission !== "granted") {
      if (!("geolocation" in navigator)) {
        alert(
          "Location access is required to start a ride, but it is not supported in this browser."
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = `${pos.coords.latitude.toFixed(
            4
          )}, ${pos.coords.longitude.toFixed(4)}`;
          setFrom(loc);
          setString(storageKeys.LOCATION_PERMISSION_KEY, "granted");
          startRide(loc, to, mode, childMode);
          navigate("/map");
        },
        () => {
          alert(
            "Location is required when you confirm your destination. Please allow location access to start the ride."
          );
        }
      );

      return;
    }

    startRide(from, to, mode, childMode);
    navigate("/map");
  };

  const lastRides = [...rides].slice(-3).reverse();

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Book a ride</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          From
          <input
            className={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Destination
          <input
            className={styles.input}
            placeholder="Where do you want to go?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>

        <div className={styles.modeRow}>
          <Button
            type="button"
            variant={mode === "car" ? "primary" : "secondary"}
            onClick={() => setMode("car")}
          >
            Car
          </Button>
          <Button
            type="button"
            variant={mode === "train" ? "primary" : "secondary"}
            onClick={() => setMode("train")}
          >
            Train
          </Button>
        </div>

        <label className={styles.childRow}>
          <input
            type="checkbox"
            checked={childMode}
            onChange={(e) => setChildMode(e.target.checked)}
          />
          <span>Parental / child mode</span>
        </label>

        <Button type="submit" className={styles.submit}>
          Continue to map
        </Button>
      </form>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Last rides</h3>
        {lastRides.length === 0 && (
          <p className={styles.empty}>No previous rides yet.</p>
        )}
        {lastRides.map((ride) => (
          <div key={ride.id} className={styles.rideItem}>
            <span className={styles.rideMain}>
              {ride.from} → {ride.to}
            </span>
            <span className={styles.rideMeta}>
              {ride.mode.toUpperCase()} •{" "}
              {new Date(ride.startedAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideBooking;

