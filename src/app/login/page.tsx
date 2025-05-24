import React from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/auth/sign-in");
} 