import { AppShell } from "@/components/layout/app-shell";

export default function ChatPage() {
  return (
    <AppShell>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif">What are we listening to?</h1>
          <p className="text-secondary">Tell me the mood, sound, artist, or moment.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            "Late night Afrobeats",
            "Something completely new",
            "Songs like Brent Faiyaz",
            "Music for a 2am drive"
          ].map((prompt) => (
            <button
              key={prompt}
              className="p-4 text-left border border-border rounded-md hover:border-accent hover:bg-surface transition-all group"
            >
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                {prompt}
              </span>
            </button>
          ))}
        </div>
        
        <div className="w-full pt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Message MUSE..."
              className="w-full bg-surface border border-border rounded-md px-4 py-4 pr-12 focus:outline-hidden focus:ring-1 focus:ring-accent transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs font-mono">
              ENTER
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
