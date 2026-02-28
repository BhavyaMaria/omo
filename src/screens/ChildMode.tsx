import { useState } from "react";
import Button from "@components/ui/Button";
import { loadJSON, saveJSON, storageKeys } from "@services/localStorageService";
import styles from "./ChildMode.module.css";

interface ChildModeState {
  pickup: string;
  drop: string;
  liveTracking: boolean;
  lastRating?: number;
}

const initial: ChildModeState =
  loadJSON<ChildModeState>(storageKeys.CHILD_MODE_KEY) ?? {
    pickup: "",
    drop: "",
    liveTracking: true
  };

const ChildMode = () => {
  const [state, setState] = useState<ChildModeState>(initial);

  const update = (partial: Partial<ChildModeState>) => {
    const next = { ...state, ...partial };
    setState(next);
    saveJSON(storageKeys.CHILD_MODE_KEY, next);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Child mode</h2>
      <p className={styles.subtitle}>
        Assign pickup and drop locations, enable tracking, and rate the ride
        when your child arrives.
      </p>

      <label className={styles.label}>
        Pickup location
        <input
          className={styles.input}
          value={state.pickup}
          onChange={(e) => update({ pickup: e.target.value })}
        />
      </label>

      <label className={styles.label}>
        Drop location
        <input
          className={styles.input}
          value={state.drop}
          onChange={(e) => update({ drop: e.target.value })}
        />
      </label>

      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={state.liveTracking}
          onChange={(e) => update({ liveTracking: e.target.checked })}
        />
        <span>Live tracking enabled</span>
      </label>

      <div className={styles.ratingRow}>
        <span className={styles.ratingLabel}>Rate last ride</span>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={`${styles.star} ${
              state.lastRating && state.lastRating >= value
                ? styles.starActive
                : ""
            }`}
            onClick={() => update({ lastRating: value })}
          >
            ★
          </button>
        ))}
      </div>

      <Button className={styles.save}>Save settings</Button>
    </div>
  );
};

export default ChildMode;

