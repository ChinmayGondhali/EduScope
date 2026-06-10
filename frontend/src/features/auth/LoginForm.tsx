"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { APP_CONFIG } from "@/constants/navigation";
import { useAuth } from "@/context/AuthContext";
import { ApiResponse, User } from "@/types";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string; details?: any }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<{ user: User }> = await response.json();
      console.log("Login result:", result);

      if (result.success && result.data) {
        login(result.data.user);
        setTimeout(() => {
          router.push(APP_CONFIG.links.dashboard);
        }, 100);
      } else if (result.success && (result as any).message === "Login successful") {
        // Fallback for different response structure
        const userData = (result as any).user || (result as any).data?.user;
        if (userData) {
          login(userData);
          router.push(APP_CONFIG.links.dashboard);
        } else {
          setErrors({ general: "Login successful but user data missing" });
        }
      } else {
        setErrors({ 
          general: result.message || result.error || "Invalid email or password",
          // @ts-ignore
          details: result.details 
        });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className={cn(
          "p-3 text-sm font-medium rounded-lg border",
          errors.general.includes("successful") 
            ? "text-green-600 bg-green-50 border-green-200" 
            : "text-destructive bg-destructive/10 border-destructive/20"
        )}>
          {errors.general}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`pl-10 h-11 ${errors.email || errors.details?.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isLoading}
          />
        </div>
        {(errors.email || errors.details?.email) && (
          <p className="text-xs font-medium text-destructive">{errors.email || errors.details?.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-semibold text-foreground">
            Password
          </label>
          <button type="button" className="text-xs font-medium text-primary hover:underline">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`pl-10 pr-10 h-11 ${errors.password || errors.details?.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {(errors.password || errors.details?.password) && (
          <p className="text-xs font-medium text-destructive">{errors.password || errors.details?.password[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full h-11 font-bold text-base" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
