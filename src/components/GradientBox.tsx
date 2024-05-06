import React from 'react';
import styles from "./gradient.module.css";

interface GradientBoxProps {
  label: string;
  number: number;
}

const GradientBox: React.FC<GradientBoxProps> = ({ label, number }) => {
  return (
    <div className={styles.box}>
      <div className={styles.num}>{number}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default GradientBox;
