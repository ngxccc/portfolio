"use client";

import { useState, useEffect } from "react";

export function FormattedDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    try {
      setFormatted(
        new Date(date).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } catch (e) {
      setFormatted(date);
    }
  }, [date]);

  return <span>{formatted || date}</span>;
}
