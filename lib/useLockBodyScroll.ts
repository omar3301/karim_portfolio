"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while `locked` is true (used when the video modal is
 * open) and restores it on unmount/close. Keeps this concern out of the
 * modal component's render logic.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [locked]);
}
