"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#151515",
          border: "1px solid #222222",
          color: "#F5F5F5",
          fontFamily: "var(--font-inter), sans-serif",
          borderRadius: "0.75rem",
        },
        className: "fitlog-toast",
      }}
    />
  );
}
