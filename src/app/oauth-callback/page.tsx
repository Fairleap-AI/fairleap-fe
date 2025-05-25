"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { useDataSync } from "@/context/DataSyncContext";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  
  // Use DataSync untuk immediate sync setelah login
  const { syncAllData, loadUserProfile } = useDataSync();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get("token");

        if (token) {
          localStorage.setItem("authToken", token);

          // Trigger immediate data sync setelah token tersimpan
          try {
            await Promise.all([
              syncAllData(),
              loadUserProfile()
            ]);
          } catch (syncError) {
            console.warn('Data sync failed after login, will retry later:', syncError);
          }

          addToast({
            type: "success",
            title: "Login Successful",
            description: "Welcome! Redirecting to your dashboard...",
          });

          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          addToast({
            type: "error",
            title: "Authentication Failed",
            description: "No token received from OAuth provider.",
          });

          setTimeout(() => {
            router.push("/auth/sign-in");
          }, 2000);
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        addToast({
          type: "error",
          title: "Authentication Failed",
          description: "An error occurred during authentication.",
        });

        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, router, addToast, syncAllData, loadUserProfile]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          {" "}
          <style jsx>{`
            .custom-bounce {
              animation: customBounce 1.2s ease-in-out infinite;
            }
            @keyframes customBounce {
              0%,
              20%,
              53%,
              80%,
              100% {
                transform: translate3d(0, 0, 0);
              }
              40%,
              43% {
                transform: translate3d(0, -30px, 0);
              }
              70% {
                transform: translate3d(0, -15px, 0);
              }
              90% {
                transform: translate3d(0, -4px, 0);
              }
            }
          `}</style>{" "}
          <img
            src="/icon-only.png"
            alt="FairLeap"
            className="h-24 w-24 custom-bounce"
          />{" "}
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {isProcessing ? "Authenticating..." : "Almost there!"}
          </h1>
          <p className="text-gray-600">
            {isProcessing
              ? "Please wait while we process your authentication."
              : "Redirecting you to your dashboard."}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <img
            src="/icon-only.png"
            alt="FairLeap"
            className="h-24 w-24 animate-pulse"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Loading...</h1>
          <p className="text-gray-600">Please wait while we load the page.</p>
        </div>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OAuthCallbackContent />
    </Suspense>
  );
}
