import { useState } from "react";
import { useRides } from "@context/RideContext";
import Button from "@components/ui/Button";
import GoogleMapRide from "@components/maps/GoogleMapRide";
import styles from "./Map.module.css";

const MapScreen = () => {
  const { activeRide, completeActiveRide } = useRides();
  const [showFriend, setShowFriend] = useState(true);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);

  if (!activeRide) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Map</h2>
        <p className={styles.location}>No active ride. Start a ride first.</p>
      </div>
    );
  }

  const onArrived = () => {
    completeActiveRide();
    alert("Your destination has been reached");
  };

  const isNearFriend = showFriend && activeRide.to.toLowerCase().includes("home");

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Your route</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="button"
            variant="ghost"
            className={styles.addStop}
            onClick={() => alert("Add stop flow mocked in frontend build.")}
          >
            Add stop
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={styles.addStop}
            onClick={() => setUseGoogleMaps(!useGoogleMaps)}
          >
            {useGoogleMaps ? "Simple Map" : "Google Maps"}
          </Button>
        </div>
      </div>
      <p className={styles.location}>
        {activeRide.from} → {activeRide.to} ({activeRide.mode})
      </p>

      {useGoogleMaps ? (
        <GoogleMapRide />
      ) : (
        <div className={styles.map}>
          {/* Map background with grid pattern */}
          <div className={styles.mapGrid} />
          
          {/* Route path */}
          <div className={styles.route} />
          
          {/* Markers */}
          <div className={`${styles.marker} ${styles.user}`}>🧍‍♀️</div>
          <div className={`${styles.marker} ${styles.car}`}>🚗</div>
          <div className={`${styles.marker} ${styles.dest}`}>📍</div>
          
          {/* Distance and time info */}
          <div className={styles.routeInfo}>
            <span>2.5 km • 8 min</span>
          </div>
        </div>
      )}

      {isNearFriend && !useGoogleMaps && (
        <div className={styles.friendCard}>
          <span className={styles.friendEmoji}>👋</span>
          <span className={styles.friendText}>
            Your friend is nearby and waving hi!
          </span>
        </div>
      )}

      {!useGoogleMaps && (
        <Button className={styles.arrived} onClick={onArrived}>
          I've reached my destination
        </Button>
      )}
    </div>
  );
};

export default MapScreen;

