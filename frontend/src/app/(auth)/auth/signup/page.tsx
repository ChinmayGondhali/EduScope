"use client";

import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { SignupForm } from "@/features/auth/SignupForm";
import { APP_CONFIG } from "@/constants/navigation";

export default function SignupPage() {
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
            <h2 className="text-3xl font-bold">Start Your Discovery</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Create an account to save your favorite colleges, compare courses, and get personalized recommendations.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-sm font-medium italic">
              "Finding the right college was overwhelming until I used EduScope. The comparison tool and verified placement data made my choice easy!"
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-300" />
              <div className="text-xs font-bold text-left">
                <div>Sarah Jenkins</div>
                <div className="opacity-70">Engineering Aspirant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-[450px] space-y-8">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group self-center lg:self-start"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-muted-foreground">
              Fill in your details to get started with {APP_CONFIG.name}
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <SignupForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href={APP_CONFIG.links.login} 
              className="font-bold text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>

          <p className="text-[10px] text-center text-muted-foreground px-8">
            By clicking "Create Account", you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
