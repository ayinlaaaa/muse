"use client";

import { Sidebar } from "./sidebar";
import { NowPlaying } from "./now-playing";
import { MobileNav } from "./mobile-nav";
import { PageWrapper } from "./page-wrapper";
import { AnimatePresence } from "framer-motion";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-primary overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 relative flex flex-col h-screen overflow-y-auto custom-scrollbar pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <PageWrapper key="app-content">
            {children}
          </PageWrapper>
        </AnimatePresence>
      </main>

      <NowPlaying />
      <MobileNav />
    </div>
  );
}
