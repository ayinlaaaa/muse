"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Plus, 
  Compass, 
  Library, 
  ListMusic, 
  Settings,
  LogIn
} from "lucide-react";
import { cn } from "@/shared/utils";
import { useAuth } from "@/hooks/use-auth";

const NAV_ITEMS = [
  { icon: Plus, href: "/chat", label: "Chat" },
  { icon: Compass, href: "/discover", label: "Discover" },
  { icon: Library, href: "/library", label: "Library" },
  { icon: ListMusic, href: "/playlists", label: "Playlists" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t border-border flex items-center justify-around px-2 md:hidden z-50">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] uppercase tracking-tighter transition-colors",
              isActive ? "text-accent" : "text-muted"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-muted")} />
            {item.label}
          </Link>
        );
      })}
      
      {!user ? (
        <Link
          href="/api/auth/login"
          className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] uppercase tracking-tighter text-accent"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>
      ) : (
        <Link
          href="/settings"
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] uppercase tracking-tighter transition-colors",
            pathname === "/settings" ? "text-accent" : "text-muted"
          )}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      )}
    </nav>
  );
}
