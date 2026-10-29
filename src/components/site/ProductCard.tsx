import { formatBaht, type Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium backdrop-blur">{p.tag}</span>
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.kind === "game" ? "bg-coral text-ink" : "bg-sky text-ink"}`}>
          {p.kind === "game" ? "ไอดีเกม" : "ซอร์สโค้ด"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] font-sans text-[15px] font-medium leading-snug tracking-normal">{p.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px]">{p.seller[0]}</span>
          {p.seller}
          {p.verified && <span className="text-primary">✓</span>}
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
          <p className="font-display text-xl font-bold">{formatBaht(p.price)}</p>
          <p className="text-xs text-muted-foreground">★ {p.rating.toFixed(1)} · ขายแล้ว {p.sold}</p>
        </div>
      </div>
    </article>
  );
}
