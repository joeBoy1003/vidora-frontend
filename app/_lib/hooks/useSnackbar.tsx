"use client";
import { useState } from "react";

type SnackbarType = "success" | "error" | "info";

interface SnackbarOptions {
  message: string;
  type?: SnackbarType;
}

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null);

  const showSnackbar = (message: string, type: SnackbarType = "info") => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000); // Hide after 3 seconds
  };

  const SnackbarComponent = () =>
    snackbar ? (
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white text-center ${
          snackbar.type === "success"
            ? "bg-green-500"
            : snackbar.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
        }`}
      >
        {snackbar.message}
      </div>
    ) : null;

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
