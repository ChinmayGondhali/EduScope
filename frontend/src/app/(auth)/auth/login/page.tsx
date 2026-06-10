"use client";

import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { LoginForm } from "@/features/auth/LoginForm";
import { APP_CONFIG } from "@/constants/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Visual/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-lg text-center text-primary-foreground space-y-8">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="h-16 w-16" />
            <h1 className="text-5xl font-extrabold tracking-tighter">{APP_CONFIG.name}</h1>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Your Journey Starts Here</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Join thousands of students who have found their perfect academic path through our platform.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-10">
            <div className="text-center">
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-sm opacity-80 uppercase tracking-widest font-semibold">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500k+</div>
              <div className="text-sm opacity-80 uppercase tracking-widest font-semibold">Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group self-center lg:self-start"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href={APP_CONFIG.links.signup} 
              className="font-bold text-primary hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
