"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const token = searchParams.get("token");
  const isChangePassword = !!token;

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const changePasswordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onForgotPasswordSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient.forgotPassword(data.email);

      if (response.status === "success") {
        setEmailSent(true);
        addToast({
          type: "success",
          title: "Reset Email Sent",
          description:
            "Please check your inbox for password reset instructions.",
        });
      } else {
        addToast({
          type: "error",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error: unknown) {
      console.error("Forgot password failed:", error);
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePasswordSubmit = async (data: ChangePasswordFormValues) => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await apiClient.changePassword(data.password, token);

      if (response.status === "success") {
        addToast({
          type: "success",
          title: "Password Changed",
          description:
            "Your password has been successfully changed. You can now sign in.",
        });

        // Redirect to sign-in after a delay
        setTimeout(() => {
          window.location.href = "/auth/sign-in";
        }, 2000);
      } else {
        addToast({
          type: "error",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error: unknown) {
      console.error("Change password failed:", error);
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to change password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChangePassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-card p-8 rounded-lg border shadow-sm">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <IoArrowBack className="h-5 w-5 mr-2" />
              Back to Sign In
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Change Password
              </h1>
              <p className="text-muted-foreground mt-2">
                Enter your new password
              </p>
            </div>

            <Form {...changePasswordForm}>
              <form
                onSubmit={changePasswordForm.handleSubmit(
                  onChangePasswordSubmit
                )}
                className="space-y-6"
              >
                <FormField
                  control={changePasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={changePasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Changing Password..." : "Change Password"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-card p-8 rounded-lg border shadow-sm text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Email Sent</h1>
              <p className="text-muted-foreground mt-2">
                We&apos;ve sent a password reset link to your email address. Please
                check your inbox and follow the instructions.
              </p>
            </div>

            <Link
              href="/auth/sign-in"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <IoArrowBack className="h-5 w-5 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-card p-8 rounded-lg border shadow-sm">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <IoArrowBack className="h-5 w-5 mr-2" />
            Back to Sign In
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Forgot Password?
            </h1>
            <p className="text-muted-foreground mt-2">
              Don&apos;t worry, we&apos;ll send you reset instructions.
            </p>
          </div>

          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
              className="space-y-6"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-card p-8 rounded-lg border shadow-sm text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Loading...</h1>
          <p className="text-muted-foreground">Please wait while we load the page.</p>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
