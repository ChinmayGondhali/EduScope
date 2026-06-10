"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User as UserIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { APP_CONFIG } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { ApiResponse, User } from "@/types";

export function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
    details?: any;
  }>({});

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const result: ApiResponse<{ user: User }> = await response.json();

      if (result.success && result.data) {
        setIsSuccess(true);
        login(result.data.user);
        
        setTimeout(() => {
          router.push(APP_CONFIG.links.dashboard);
        }, 2000);
      } else if (result.success && (result as any).message === "User created successfully") {
        const userData = (result as any).user || (result as any).data?.user;
        if (userData) {
          setIsSuccess(true);
          login(userData);
          setTimeout(() => {
            router.push(APP_CONFIG.links.dashboard);
          }, 2000);
        } else {
          setErrors({ general: "Signup successful but user data missing" });
        }
      } else {
        setErrors({ 
          general: result.message || result.error || "Registration failed",
          // @ts-ignore
          details: result.details 
        });
      }
    } catch (err) {
      setErrors({ general: "Registration failed. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">Account Created!</h2>
        <p className="text-muted-foreground font-medium">
          Welcome to EduScope. Redirecting you to your dashboard...
        </p>
      </div>
    );
  }

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
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Full Name
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`pl-10 h-11 ${errors.name || errors.details?.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isLoading}
          />
        </div>
        {(errors.name || errors.details?.name) && (
          <p className="text-xs font-medium text-destructive">{errors.name || errors.details?.name[0]}</p>
        )}
      </div>

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
        <label htmlFor="password" className="text-sm font-semibold text-foreground">
          Password
        </label>
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
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[10px] uppercase font-black tracking-widest">
              <span className="text-muted-foreground">Strength</span>
              <span className={cn(
                passwordStrength <= 25 && "text-destructive",
                passwordStrength === 50 && "text-yellow-500",
                passwordStrength === 75 && "text-blue-500",
                passwordStrength === 100 && "text-green-500"
              )}>
                {passwordStrength <= 25 && "Weak"}
                {passwordStrength === 50 && "Fair"}
                {passwordStrength === 75 && "Good"}
                {passwordStrength === 100 && "Strong"}
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  passwordStrength <= 25 && "bg-destructive",
                  passwordStrength === 50 && "bg-yellow-500",
                  passwordStrength === 75 && "bg-blue-500",
                  passwordStrength === 100 && "bg-green-500"
                )}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
        {(errors.password || errors.details?.password) && (
          <p className="text-xs font-medium text-destructive">{errors.password || errors.details?.password[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`pl-10 pr-10 h-11 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs font-medium text-destructive">{errors.confirmPassword}</p>}
      </div>

      <Button type="submit" className="w-full h-11 font-bold text-base" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
