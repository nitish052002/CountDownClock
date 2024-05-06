import React, { ChangeEvent } from "react";
import styles from "./dateinput.module.css";

interface DateInputProps {
  clockCallBack: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ clockCallBack }) => {
  return (
    <div>
      <input
        type="datetime-local"
        id="time"
        name="time"
        className={styles.time}
        onChange={clockCallBack}
      />
    </div>
  );
};

export default DateInput;
