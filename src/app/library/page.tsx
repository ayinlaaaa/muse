import { AppShell } from "@/components/layout/app-shell";

export default function LibraryPage() {
  return (
    <AppShell>
      <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif">Library</h1>
            <div className="flex gap-6 text-sm font-medium uppercase tracking-widest text-muted">
              <span className="text-primary cursor-pointer border-b border-accent pb-1">Recently played</span>
              <span className="hover:text-primary cursor-pointer transition-colors pb-1">Top Artists</span>
              <span className="hover:text-primary cursor-pointer transition-colors pb-1">Top Tracks</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-md hover:bg-surface group transition-colors cursor-pointer border border-transparent hover:border-border">
              <div className="w-12 h-12 bg-surface rounded-sm border border-border" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Track Name {i}</div>
                <div className="text-xs text-secondary truncate">Artist Name</div>
              </div>
              <div className="text-xs text-muted font-mono">3:45</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
