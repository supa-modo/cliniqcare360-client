import { useState } from "react";

export interface NotificationState {
  isOpen: boolean;
  type: "info" | "success" | "error" | "warning" | "confirm" | "delete";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const showNotification = (config: Omit<NotificationState, "isOpen">) => {
    setNotification({
      ...config,
      isOpen: true,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // Helper methods for common notification types
  const success = (title: string, message: string, autoClose = true) => {
    showNotification({
      type: "success",
      title,
      message,
      autoClose,
      autoCloseDelay: 3000,
    });
  };

  const error = (title: string, message: string) => {
    showNotification({
      type: "error",
      title,
      message,
      autoClose: false,
    });
  };

  const warning = (title: string, message: string) => {
    showNotification({
      type: "warning",
      title,
      message,
      autoClose: false,
    });
  };

  const info = (title: string, message: string, autoClose = true) => {
    showNotification({
      type: "info",
      title,
      message,
      autoClose,
      autoCloseDelay: 3000,
    });
  };

  const confirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = "Confirm",
    cancelText = "Cancel"
  ) => {
    showNotification({
      type: "confirm",
      title,
      message,
      onConfirm,
      confirmText,
      cancelText,
      showCancel: true,
    });
  };

  const deleteConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = "Delete",
    cancelText = "Cancel"
  ) => {
    showNotification({
      type: "delete",
      title,
      message,
      onConfirm,
      confirmText,
      cancelText,
      showCancel: true,
    });
  };

  return {
    notification,
    showNotification,
    closeNotification,
    success,
    error,
    warning,
    info,
    confirm,
    deleteConfirm,
  };
};

