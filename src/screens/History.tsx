import { useRides } from "@context/RideContext";
import styles from "./History.module.css";

const History = () => {
  const { rides } = useRides();

  if (rides.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No previous history found</p>
      </div>
    );
  }

  const reversed = [...rides].reverse();

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ride history</h2>
      {reversed.map((ride) => (
        <div key={ride.id} className={styles.item}>
          <div className={styles.main}>
            {ride.from} → {ride.to}
          </div>
          <div className={styles.meta}>
            {ride.mode.toUpperCase()} •{" "}
            {new Date(ride.startedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;

