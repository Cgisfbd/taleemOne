"use client";

import React from "react";
import { Toaster as SonnerToaster } from "sonner";
import styles from "./premium-toaster.module.css";

export function PremiumToaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={true}
      visibleToasts={4}
      closeButton={false}
      className={styles.toasterContainer}
      toastOptions={{
        duration: 4500,
      }}
    />
  );
}
