"use client";

import React, { useEffect, useState } from "react";

interface ParticleStyle {
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export function FloatingElements() {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    // Only runs on the client, avoids SSR hydration mismatch
    setParticles(
      Array.from({ length: 12 }).map(() => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-xl floating-animation" />
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-200/30 to-blue-200/30 dark:from-pink-400/10 dark:to-blue-400/10 rounded-full blur-xl floating-animation"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-green-200/30 to-blue-200/30 dark:from-green-400/10 dark:to-blue-400/10 rounded-full blur-xl floating-animation"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-200/30 to-pink-200/30 dark:from-purple-400/10 dark:to-pink-400/10 rounded-full blur-xl floating-animation"
        style={{ animationDelay: "6s" }}
      />

      {/* Small particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-300/40 to-purple-300/40 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full particle-float"
          style={particle}
        />
      ))}

      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-900/50 dark:via-purple-900/20 dark:to-slate-800/50" />
    </div>
  );
}
