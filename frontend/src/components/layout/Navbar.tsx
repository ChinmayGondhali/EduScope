"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, GraduationCap, ArrowLeftRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useCompare } from "@/context/CompareContext";

import { NAV_LINKS, APP_CONFIG } from "@/constants/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { selectedColleges } = useCompare();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">{APP_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-muted relative flex items-center gap-2",
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {link.label === "Compare" && selectedColleges.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground animate-in zoom-in duration-300">
                    {selectedColleges.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href={APP_CONFIG.links.login}>
            <Button variant="ghost" className="font-bold">Login</Button>
          </Link>
          <Link href={APP_CONFIG.links.signup}>
            <Button className="font-black px-8 shadow-primary/20">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2.5 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-bold transition-all",
                    pathname === link.href
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {link.label}
                  </div>
                  {link.label === "Compare" && selectedColleges.length > 0 && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm text-primary font-black shadow-lg animate-in zoom-in duration-300">
                      {selectedColleges.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div className="pt-6 border-t flex flex-col gap-4">
              <Link href={APP_CONFIG.links.login} className="w-full">
                <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-2xl">Login</Button>
              </Link>
              <Link href={APP_CONFIG.links.signup} className="w-full">
                <Button className="w-full h-14 text-lg font-black rounded-2xl">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
