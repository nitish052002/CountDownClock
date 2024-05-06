import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./App.module.css";
import DateInput from "./components/DateInput";
import GradientBox from "./components/GradientBox";

interface DateTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {
  const [cancelIntervalId, setCancelIntervalId] = useState<number | null>(null);
  const [cancelBtn, setCancelBtn] = useState<boolean>(false);
  const [userDate, setUserDate] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState<DateTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [error, setError] = useState<string | null>(null);

  function generateError(message: string): void {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  function clock(): void {
    const START_DATE: Date = new Date();
    const END_DATE: Date = new Date(userDate || 0);
    const difference: number = END_DATE.getTime() - START_DATE.getTime();

    let seconds: number = Math.floor(difference / 1000);
    let minutes: number = Math.floor(seconds / 60);
    let hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    if (days > 100) {
      generateError("Selected Time is more than 100 days");
      return;
    }

    setDateTime({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  }

  useEffect(() => {
    if (cancelBtn) {
      generateError("Countdown is running");
    }

    if (userDate) {
      clock();
    }
  }, [userDate]);

  function startCountDown(): void {
    if (!userDate) {
      generateError("Select date and time");
      return;
    }

    if (dateTime.days > 100) {
      generateError("Selected Time is more than 100 days");
      return;
    }

    setCancelBtn(true);
    const intervalId: number = setInterval(() => {
      if (userDate) {
        clock();
      }
    }, 1000);
    setCancelIntervalId(intervalId);
  }

  function stopCountDown(): void {
    if (cancelIntervalId) {
      clearInterval(cancelIntervalId);
    }

    setDateTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    setUserDate(null);
    setCancelBtn(false);
  }

  function getUserDate(event: ChangeEvent<HTMLInputElement>): void {
    if (userDate) {
      generateError("Countdown is running");
      return;
    }
    const DATE_BYUSER: string = event.target.value;
    setUserDate(DATE_BYUSER);
  }

  return (
    <main className="app">
      <div className={styles.title}>
        Counterdown <span className={styles.pnk}>Timer</span>
      </div>

      <div className={styles.row}>
        <DateInput clockCallBack={getUserDate} />
      </div>

      <div className={styles.row}>
        {cancelBtn ? (
          <button className={styles.startBtn} onClick={stopCountDown}>
            Cancel
          </button>
        ) : (
          <button className={styles.startBtn} onClick={startCountDown}>
            Start Now
          </button>
        )}
      </div>

      <div className={styles.row}>
        <GradientBox label="Days" number={dateTime.days} />
        <GradientBox label="Hours" number={dateTime.hours} />
        <GradientBox label="Minutes" number={dateTime.minutes} />
        <GradientBox label="Seconds" number={dateTime.seconds} />
      </div>

      <div className={styles.errContainer}>{error && <p>{error}</p>}</div>
    </main>
  );
};

export default App;
