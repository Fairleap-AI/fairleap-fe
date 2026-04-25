"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "fairleap_domain_notice_dismissed";

export default function DomainMigrationNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-lg border bg-card text-card-foreground shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📢</span>
            <h3 className="text-base font-semibold text-foreground">
              Domain &amp; Email Migration Notice
            </h3>
          </div>
          <button
            onClick={dismiss}
            className="ml-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3 text-sm text-foreground">
          <p className="text-muted-foreground">
            From{" "}
            <span className="font-semibold text-foreground">May 24th, 2026</span>,
            Fairleap AI will transition to new domains as{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              fairleap.cloud
            </code>{" "}
            will not be renewed:
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span>🌐</span>
              <span>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href="https://fairleap.faizath.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  fairleap.faizath.com
                </a>{" "}
                <span className="text-muted-foreground text-xs">
                  (formerly <em>fairleap.cloud</em>)
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>⚙️</span>
              <span>
                <span className="font-medium">API:</span>{" "}
                <a
                  href="https://fairleap-api.faizath.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  fairleap-api.faizath.com
                </a>{" "}
                <span className="text-muted-foreground text-xs">
                  (formerly <em>api.fairleap.cloud</em>)
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>📧</span>
              <span>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:contact@fairleap.faizath.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  contact@fairleap.faizath.com
                </a>{" "}
                <span className="text-muted-foreground text-xs">
                  (formerly <em>contact@fairleap.cloud</em>)
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>🛰️</span>
              <span>
                <span className="font-medium">CDN:</span>{" "}
                <span className="text-foreground">fairleap-cdn.faizath.com</span>{" "}
                <span className="text-muted-foreground text-xs">
                  (formerly <em>cdn.fairleap.cloud</em>)
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>📈</span>
              <span>
                <span className="font-medium">Status Pages:</span>{" "}
                <a
                  href="https://status.faizath.com/status/fairleap"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  status.faizath.com/status/fairleap
                </a>{" "}
                <span className="text-muted-foreground text-xs">
                  (formerly <em>status.fairleap.cloud</em>)
                </span>
              </span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <Button onClick={dismiss} size="sm">
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
