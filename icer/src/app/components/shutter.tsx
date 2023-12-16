/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./shutter.module.css";
import { useProgress } from "@react-three/drei";
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
      <Box component="div" sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export const Shutter: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { active, progress, errors, item, loaded, total } = useProgress();
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      //   setTimerTmp(true);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div
      className={`${styles.shutter} ${!isLoading && !active && styles.fadeIn}`}
    >
      <img className={styles["shtter-img"]} alt="" src="/load-icon.svg"></img>
      <div className={styles["shtter-linear"]}>
        <LinearProgressWithLabel value={progress} />
      </div>
    </div>
  );
};
