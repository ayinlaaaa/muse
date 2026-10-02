"use client";

import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-4">
            <Logo variant="wordmark" size={20} />
            <p className="text-muted text-sm">
              Your music, understood.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold">Product</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
                <li className="hover:text-primary cursor-pointer transition-colors">How it works</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Roadmap</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-muted text-[10px] uppercase tracking-widest">
            © 2026 MUSE. All rights reserved.
          </p>
          <p className="text-muted text-[10px] uppercase tracking-widest">
            Not affiliated with Spotify.
          </p>
        </div>
      </div>
    </footer>
  );
}
