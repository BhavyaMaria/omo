import React from "react";
import { useTheme } from "@context/ThemeContext";
import BottomNav from "@components/navigation/BottomNav";
import CharactersRibbon from "@components/animations/CharactersRibbon";
import styles from "./Layout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={styles.shell}
      style={{
        backgroundColor: theme.background
      }}
    >
      <CharactersRibbon />
      <main className={styles.main}>{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;

