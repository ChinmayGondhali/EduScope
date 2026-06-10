export const APP_CONFIG = {
  name: "EduScope",
  description: "College Discovery Platform",
  links: {
    home: "/",
    colleges: "/colleges",
    compare: "/compare",
    dashboard: "/dashboard",
    login: "/auth/login",
    signup: "/auth/signup",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: APP_CONFIG.links.home },
  { label: "Colleges", href: APP_CONFIG.links.colleges },
  { label: "Compare", href: APP_CONFIG.links.compare },
  { label: "Dashboard", href: APP_CONFIG.links.dashboard },
] as const;
