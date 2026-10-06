"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const timeFormatter = new Intl.DateTimeFormat("en-NG", {
  timeZone: profile.timeZone,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** Current time in Lagos, or null until mounted so server and client markup match. */
export function useLagosTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}
