import { AppShell } from "@/components/layout/app-shell";

export default function DiscoverPage() {
  return (
    <AppShell>
      <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif">Discover</h1>
          <p className="text-secondary max-w-lg">
            Editorial selections and personalized discoveries curated by MUSE.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
            New territory
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3 group cursor-pointer">
                <div className="aspect-square bg-surface border border-border rounded-md group-hover:border-border-strong transition-colors" />
                <div className="space-y-1">
                  <div className="h-4 bg-surface rounded w-3/4" />
                  <div className="h-3 bg-surface rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
