"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null
  );

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(null);
    }
  }, [password, confirmPassword]);

  const handleVerifyEmail = async () => {
    const email = form.getValues("email");
    if (!email || !email.includes("@") || !email.includes(".")) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    setVerifyingEmail(true);

    try {
      const response = await apiClient.verifyEmail(email);

      if (response.status === "success") {
        const verificationUrl = response.data.verificationCheck;
        const token = verificationUrl.split("token=")[1];
        setVerificationToken(token);

        addToast({
          type: "success",
          title: "Verification Email Sent",
          description:
            "Please check your inbox and click the verification link.",
        });

        // Start polling for verification status
        const pollInterval = setInterval(async () => {
          try {
            const statusResponse = await apiClient.checkEmailVerification(
              token
            );
            if (
              statusResponse.status === "success" &&
              statusResponse.data.isVerified
            ) {
              setEmailVerified(true);
              clearInterval(pollInterval);
              addToast({
                type: "success",
                title: "Email Verified",
                description: "Your email has been successfully verified!",
              });
            }
          } catch (error) {
            console.error("Error checking verification status:", error);
          }
        }, 3000);

        // Stop polling after 10 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
        }, 600000);
      } else {
        addToast({
          type: "error",
          title: "Verification Failed",
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to send verification email. Please try again.",
      });
    } finally {
      setVerifyingEmail(false);
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (!emailVerified) {
      form.setError("email", {
        type: "manual",
        message: "Please verify your email first",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.register(data.email, data.password);

      if (response.status === "success") {
        addToast({
          type: "success",
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });

        localStorage.setItem("authToken", response.data.token);

        router.push(
          `/auth/sign-in?email=${encodeURIComponent(
            data.email
          )}&password=${encodeURIComponent(data.password)}`
        );
      } else {
        addToast({
          type: "error",
          title: "Registration Failed",
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      addToast({
        type: "error",
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleGoogleSignUp = () => {
    const googleOAuthUrl = apiClient.getGoogleOAuthUrl();
    window.location.href = googleOAuthUrl;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-6 bg-white relative">
        <img
          src="/images/gojek.jpg"
          alt="Register"
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      {/* Right Register Form Panel */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 py-12 sm:px-12 md:px-16 lg:px-24 bg-white overflow-y-auto">
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
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Sign up to start your journey with FairLeap
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
                      Email Address
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          disabled={emailVerified || isLoading}
                          {...field}
                          className={`bg-white border border-border rounded-md h-12 focus:border-primary focus:ring-primary ${
                            emailVerified ? "opacity-60" : ""
                          }`}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={handleVerifyEmail}
                        disabled={
                          emailVerified || verifyingEmail || !field.value
                        }
                        className={`h-12 text-white font-medium px-4 ${
                          emailVerified
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {emailVerified
                          ? "Verified"
                          : verifyingEmail
                          ? "Verifying..."
                          : "Verify Email"}
                      </Button>
                    </div>
                    <FormMessage className="text-red-600" />
                    {verifyingEmail && !emailVerified && (
                      <p className="text-xs text-blue-500 mt-1">
                        Please check your inbox and click the verification link.
                      </p>
                    )}
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
                          placeholder="Create a password"
                          {...field}
                          disabled={!emailVerified || isLoading}
                          autoComplete="new-password"
                          className={`bg-white border border-border rounded-md pr-10 h-12 focus:border-primary focus:ring-primary ${
                            !emailVerified ? "opacity-60" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          disabled={!emailVerified}
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-primary font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                          disabled={!emailVerified || isLoading}
                          autoComplete="new-password"
                          className={`bg-white border ${
                            passwordsMatch === false && field.value
                              ? "border-red-500"
                              : passwordsMatch === true && field.value
                              ? "border-green-500"
                              : "border-border"
                          } rounded-md pr-10 h-12 focus:border-primary focus:ring-primary ${
                            !emailVerified ? "opacity-60" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          disabled={!emailVerified}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showConfirmPassword ? (
                            <IoEyeOffOutline className="h-5 w-5 text-gray-400" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {passwordsMatch === true &&
                      field.value &&
                      !fieldState.error && (
                        <p className="text-xs text-green-500 mt-1">
                          Passwords match
                        </p>
                      )}
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-left">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!emailVerified || isLoading}
                        className={`border-border text-primary focus:ring-primary mt-1 ${
                          !emailVerified ? "opacity-60" : ""
                        }`}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        className={`text-sm font-medium text-gray-600 cursor-pointer ${
                          !emailVerified ? "opacity-60" : ""
                        }`}
                      >
                        I accept the{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:text-primary/80 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:text-primary/80 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage className="text-red-600" />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={
                  !emailVerified || isLoading || passwordsMatch === false
                }
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-medium disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
                onClick={handleGoogleSignUp}
                className="w-full border border-border rounded-md h-12 hover:bg-muted/10 transition-colors text-primary font-medium hover:text-primary/80"
                type="button"
              >
                {" "}
                <FcGoogle className="mr-2 h-4 w-4" /> Sign Up with Google{" "}
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
