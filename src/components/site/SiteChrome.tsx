import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-background/70 py-2 pl-5 pr-2 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">◆</span>
          lootcode
        </Link>
        <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="market" className="rounded-full px-3 py-1.5 hover:bg-secondary hover:text-foreground">ตลาด</Link>
          <Link to="/" hash="how" className="rounded-full px-3 py-1.5 hover:bg-secondary hover:text-foreground">ซื้อยังไง</Link>
          <Link to="/partner" className="rounded-full px-3 py-1.5 hover:bg-secondary hover:text-foreground" activeProps={{ className: "text-foreground bg-secondary" }}>
            พาร์ทเนอร์
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground sm:block">TH</span>
          <Link to="/partner" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
            เริ่มขาย
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
            loot<span className="font-serif font-normal italic text-primary">code</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">ตลาดไอดีเกมและซอร์สโค้ดที่ซื้อขายแบบมีคนกลางถือเงิน ปลอดภัยทุกดีล</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Market</p>
          <ul className="space-y-2"><li>ไอดีเกม</li><li>ซอร์สโค้ด</li><li>บอท & สคริปต์</li></ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Company</p>
          <ul className="space-y-2"><li><Link to="/partner">รับพาร์ทเนอร์</Link></li><li>ศูนย์ช่วยเหลือ</li><li>นโยบายคืนเงิน</li></ul>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">© 2026 lootcode · Escrow protected</p>
    </footer>
  );
}
