"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { authAPI } from "@/lib/apiService";
import { useToast } from "@/components/ui/toast";
import { useDataSync } from "@/context/DataSyncContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { syncAllData, loadUserProfile } = useDataSync();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    const passwordFromParams = searchParams.get("password");

    if (emailFromParams) {
      form.setValue("email", emailFromParams);
    }
    if (passwordFromParams) {
      form.setValue("password", passwordFromParams);
    }
  }, [searchParams, form]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(data.email, data.password);

      if (response.status === "success") {
        localStorage.setItem("authToken", response.data.token);

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
          description: "Welcome back! Redirecting to your dashboard...",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        addToast({
          type: "error",
          title: "Login Failed",
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      addToast({
        type: "error",
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleGoogleLogin = () => {
    const googleOAuthUrl = authAPI.getGoogleOAuthUrl();
    window.location.href = googleOAuthUrl;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-6 bg-white relative">
        <img
          src="/images/gojek.jpg"
          alt="Login"
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      {/* Right Login Form Panel */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 py-12 sm:px-12 md:px-16 lg:px-24 bg-white">
        <div className="w-full max-w-md">
          {/* Back Arrow */}
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <IoArrowBack className="h-5 w-5 mr-2" />
            Back to Home
          </Link>

          {/* Logo for mobile view */}
          <div className="flex lg:hidden justify-center mb-12">
            <h1 className="text-2xl font-bold text-primary">FairLeap</h1>
          </div>

          {/* Icon and Welcome Text */}
          <div className="mb-10 text-left">
            <img
              src="/icon-only.png"
              alt="FairLeap"
              className="h-16 w-16 mb-4"
            />
            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Enter your email and password to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-primary font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                        className="bg-white border border-border rounded-md h-12 focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-primary font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                          autoComplete="current-password"
                          className="bg-white border border-border rounded-md pr-10 h-12 focus:border-primary focus:ring-primary"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <IoEyeOffOutline className="h-5 w-5 text-gray-400" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="border-border text-primary focus:ring-primary"
                      />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-gray-600 cursor-pointer">
                        Remember me
                        </FormLabel>
                    </div>
                    </FormItem>
                  )}
                />
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-medium"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="w-full border border-border rounded-md h-12 hover:bg-muted/10 transition-colors text-primary font-medium hover:text-primary/80"
                type="button"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Sign In with Google
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign Up
            </Link>
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

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignInContent />
    </Suspense>
  );
}
