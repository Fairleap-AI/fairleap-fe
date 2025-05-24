"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function Toast({ id, title, description, type = 'info' }: ToastProps) {
  const { removeToast } = useToast();

  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-right-full",
        "max-w-sm bg-white",
        {
          "border-green-200 bg-green-50": type === 'success',
          "border-red-200 bg-red-50": type === 'error',
          "border-blue-200 bg-blue-50": type === 'info',
        }
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn("h-5 w-5 rounded-full flex items-center justify-center text-sm font-bold", {
            "bg-green-500 text-white": type === 'success',
            "bg-red-500 text-white": type === 'error',
            "bg-blue-500 text-white": type === 'info',
          })}
        >
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'i'}
        </div>
        <div className="flex-1">
          {title && (
            <div className="font-semibold text-gray-900 text-sm">{title}</div>
          )}
          {description && (
            <div className="text-gray-600 text-sm mt-1">{description}</div>
          )}
        </div>
        <button
          onClick={() => removeToast(id)}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 