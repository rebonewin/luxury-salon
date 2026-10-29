"use client";

import { useEffect, useState } from "react";

const FALLBACK_YEAR = 2026;

export default function CopyrightYear() {
  const [year, setYear] = useState(FALLBACK_YEAR);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <>{year}</>;
}
