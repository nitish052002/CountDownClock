import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./App.module.css";
import DateInput from "./components/DateInput";
import GradientBox from "./components/GradientBox";

const App: React.FC = () => {
  return (
    <main className="app">
      <div className={styles.title}>
        Counterdown <span className={styles.pnk}>Timer</span>
      </div>

      <div className={styles.row}>
        <DateInput clockCallBack={} />
      </div>

      <div className={styles.row}>
        <button className={styles.startBtn}>Cancel</button>

        <button className={styles.startBtn}>Start Now</button>
      </div>

      <div className={styles.row}>
        <GradientBox label="Days" />
      </div>
    </main>
  );
};

export default App;
