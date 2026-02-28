import { FormEvent, useState } from "react";
import { getMockResponse } from "@services/mockAIService";
import styles from "./AI.module.css";

interface ChatMessage {
  from: "you" | "nb";
  text: string;
}

const AI = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const response = getMockResponse(input);
    setHistory((prev) => [
      ...prev,
      { from: "you", text: input },
      { from: "nb", text: response }
    ]);
    setInput("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>OMO AI – NB</h2>
      <div className={styles.chat}>
        {history.length === 0 ? (
          <p className={styles.placeholder}>
            Ask NB anything about OMO rides, routes, or safety.
          </p>
        ) : (
          history.map((msg, idx) => (
            <p
              key={idx}
              className={`${styles.message} ${
                msg.from === "you" ? styles.fromYou : styles.fromBot
              }`}
            >
              {msg.text}
            </p>
          ))
        )}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          placeholder="Message NB..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.send} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default AI;

