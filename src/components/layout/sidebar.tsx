"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, 
  Compass, 
  Library, 
  ListMusic, 
  Settings,
  User,
  LogOut,
  LogIn
} from "lucide-react";
import { cn } from "@/shared/utils";
import { SPRING } from "@/shared/motion";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";

const NAV_ITEMS = [
  { label: "New chat", icon: Plus, href: "/chat" },
  { label: "Discover", icon: Compass, href: "/discover" },
  { label: "Library", icon: Library, href: "/library" },
  { label: "Playlists", icon: ListMusic, href: "/playlists" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-[240px] h-screen border-r border-border bg-background flex flex-col hidden md:flex">
      <div className="p-8 pb-10">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
          <Logo variant="wordmark" size={28} />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors group",
                isActive ? "text-primary font-medium" : "text-secondary hover:text-primary hover:bg-surface"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-4 bg-accent rounded-full"
                  transition={SPRING}
                />
              )}
              <item.icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-muted group-hover:text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {user ? (
          <>
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user.displayName}</div>
                <div className="text-[10px] text-accent uppercase tracking-widest font-bold">Connected</div>
              </div>
            </div>
            
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md text-sm text-secondary hover:text-primary hover:bg-surface transition-colors",
                pathname === "/settings" && "text-primary bg-surface"
              )}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>

            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm text-secondary hover:text-red-400 hover:bg-red-400/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/api/auth/login"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm text-primary bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            <LogIn className="w-4 h-4 text-accent" />
            Connect Spotify
          </Link>
        )}
      </div>
    </aside>
  );
}
