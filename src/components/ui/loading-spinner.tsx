"use client";

import { motion } from "motion/react";

interface SpinnerProps {
  radius?: number;
  duration?: number;
}

export default function LoadingSpinner({ radius = 120, duration = 2 }: SpinnerProps) {
  const circleSize = 320;
  const trailCount = 8;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div
        className="relative"
        style={{ width: circleSize + radius * 2, height: circleSize + radius * 2 }}
      >
        {Array.from({ length: trailCount }).map((_, i) => {
          const delay = -(duration / trailCount) * i;
          const opacity = 0.15 + (i / trailCount) * 0.25;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: circleSize,
                height: circleSize,
                top: "50%",
                left: "50%",
                marginTop: -(circleSize / 2),
                marginLeft: -(circleSize / 2),
                background: "linear-gradient(135deg, #fef3c7 0%, #fcd5b4 50%, #fbcba8 100%)",
                opacity,
              }}
              animate={{
                x: [
                  Math.cos(0) * radius,
                  Math.cos(Math.PI / 2) * radius,
                  Math.cos(Math.PI) * radius,
                  Math.cos((3 * Math.PI) / 2) * radius,
                  Math.cos(2 * Math.PI) * radius,
                ],
                y: [
                  Math.sin(0) * radius,
                  Math.sin(Math.PI / 2) * radius,
                  Math.sin(Math.PI) * radius,
                  Math.sin((3 * Math.PI) / 2) * radius,
                  Math.sin(2 * Math.PI) * radius,
                ],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}

        <motion.div
          className="absolute rounded-full"
          style={{
            width: circleSize,
            height: circleSize,
            top: "50%",
            left: "50%",
            marginTop: -(circleSize / 2),
            marginLeft: -(circleSize / 2),
            background: "linear-gradient(135deg, #fef3c7 0%, #fcd5b4 50%, #fbcba8 100%)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          }}
          animate={{
            x: [
              Math.cos(0) * radius,
              Math.cos(Math.PI / 2) * radius,
              Math.cos(Math.PI) * radius,
              Math.cos((3 * Math.PI) / 2) * radius,
              Math.cos(2 * Math.PI) * radius,
            ],
            y: [
              Math.sin(0) * radius,
              Math.sin(Math.PI / 2) * radius,
              Math.sin(Math.PI) * radius,
              Math.sin((3 * Math.PI) / 2) * radius,
              Math.sin(2 * Math.PI) * radius,
            ],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
