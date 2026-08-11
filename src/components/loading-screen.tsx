"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setVisible(false), 500);
      }
    }, 180);
    const timeout = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
      aria-hidden="true"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-border border-t-accent animate-spin" />
        <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" />
      </div>
      <p className="mt-6 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
        ActionMyService
      </p>
      <p className="mt-2 text-xs text-muted-foreground/60">
        Preparing Digital Experience...
      </p>
      <div className="mt-6 w-48 h-px bg-border overflow-hidden rounded-full">
        <div
          className="h-px bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs font-mono text-muted-foreground/50">{progress}%</p>
    </div>
  );
}