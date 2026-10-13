"use client";

import { useId } from "react";
import styles from "./stardust.module.css";

interface ParticleData {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
  driftX: string;
  peakOpacity: number;
}

const PARTICLES: ParticleData[] = [
  { id: 1, top: "25%", left: "18%", size: 4, duration: "6.2s", delay: "0.2s", driftX: "22px", peakOpacity: 0.9 },
  { id: 2, top: "42%", left: "12%", size: 3, duration: "7.5s", delay: "1.4s", driftX: "-18px", peakOpacity: 0.7 },
  { id: 3, top: "68%", left: "22%", size: 5, duration: "8.1s", delay: "0.8s", driftX: "26px", peakOpacity: 0.85 },
  { id: 4, top: "18%", left: "75%", size: 4, duration: "6.8s", delay: "2.1s", driftX: "-24px", peakOpacity: 0.95 },
  { id: 5, top: "35%", left: "82%", size: 3, duration: "7.2s", delay: "0.5s", driftX: "16px", peakOpacity: 0.7 },
  { id: 6, top: "72%", left: "78%", size: 5, duration: "8.5s", delay: "1.8s", driftX: "-28px", peakOpacity: 0.8 },
  { id: 7, top: "52%", left: "88%", size: 3, duration: "6.0s", delay: "3.2s", driftX: "-12px", peakOpacity: 0.65 },
  { id: 8, top: "82%", left: "35%", size: 4, duration: "7.8s", delay: "2.5s", driftX: "18px", peakOpacity: 0.75 },
  { id: 9, top: "15%", left: "48%", size: 3, duration: "9.0s", delay: "1.1s", driftX: "14px", peakOpacity: 0.8 },
  { id: 10, top: "60%", left: "48%", size: 4, duration: "8.4s", delay: "3.6s", driftX: "-20px", peakOpacity: 0.7 },
];

export function GoldStardust() {
  const baseId = useId();

  return (
    <div className={styles.stardustCanvas} aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={`${baseId}-${p.id}`}
          className={styles.particle}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Custom CSS variables for individual animation variance
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
            ["--drift-x" as string]: p.driftX,
            ["--peak-opacity" as string]: p.peakOpacity,
          }}
        />
      ))}
    </div>
  );
}
