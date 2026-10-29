import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "lootcode — ตลาดซื้อขายไอดีเกม & ซอร์สโค้ด ปลอดภัยด้วยระบบคนกลาง" },
      { name: "description", content: "ซื้อขายไอดีเกม ROV, Valorant, Genshin และซอร์สโค้ดเว็บ บอท สคริปต์ พร้อมระบบคนกลางถือเงิน และรับพาร์ทเนอร์ร่วมขาย" },
      { property: "og:title", content: "lootcode — ไอดีเกม & ซอร์สโค้ด ครบที่เดียว" },
      { property: "og:description", content: "ตลาดไอดีเกมและซอร์สโค้ด ซื้อง่าย ขายไว มีคนกลางดูแลทุกดีล" },
    ],
  }),
  component: Index,
});

const TABS = [
  { key: "all", label: "ทั้งหมด" },
  { key: "game", label: "ไอดีเกม" },
  { key: "code", label: "ซอร์สโค้ด" },
] as const;

const STEPS = [
  { n: "01", t: "เลือกของที่ใช่", d: "ทุกรายการมีรูปจริง รายละเอียดครบ และรีวิวจากผู้ซื้อจริง" },
  { n: "02", t: "จ่ายเข้าคนกลาง", d: "เงินถูกพักไว้กับเรา ผู้ขายยังไม่ได้รับจนกว่าคุณจะยืนยัน" },
  { n: "03", t: "ตรวจของ 24 ชม.", d: "เข้าไอดีหรือรันโค้ดให้ชัวร์ ถ้าไม่ตรงปก ขอคืนเงินได้ทันที" },
];

function Index() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const items = PRODUCTS.filter((p) => tab === "all" || p.kind === tab);

  return (
    <main>
      <ScrollMorphHero>
        <p className="mb-5 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
          ● 18,240 รายการพร้อมขาย
        </p>
        <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] md:text-7xl">
          ซื้อไอดีเกมและโค้ด <span className="font-serif font-normal italic text-primary">แบบไม่ต้องลุ้น</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted-foreground md:text-base">มีคนกลางถือเงินทุกดีล ไม่ตรงปกคืนเงินเต็มจำนวน</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#market" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-lime">เลือกซื้อเลย</a>
          <Link to="/partner" className="rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-secondary">มาเป็นพาร์ทเนอร์</Link>
        </div>
      </ScrollMorphHero>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-bold">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["ROV", "Valorant", "Genshin", "Next.js", "Discord Bot", "Free Fire", "Laravel", "Unity", "Roblox", "PUBG"].map((t) => (
              <span key={`${k}-${t}`}>{t} ◆</span>
            )),
          )}
        </div>
      </div>

      {/* Pain points — fastwork style sticky notes */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">ซื้อไอดีมือสอง <span className="font-serif font-normal italic text-coral">มันเสี่ยง..</span></h2>
        <p className="mt-3 text-muted-foreground">ปัญหาเดิม ๆ ที่เราแก้ให้แล้ว</p>
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {[
            ["โอนแล้วโดนบล็อก หายเงียบ", "bg-lime -rotate-3"],
            ["ได้ไอดีมาแล้วโดนดึงคืน", "bg-coral rotate-2"],
            ["ซื้อโค้ดมา รันไม่ขึ้น ไม่มีใครซัพพอร์ต", "bg-sky -rotate-1"],
          ].map(([t, c]) => (
            <div key={t} className={`${c} w-60 p-6 text-left text-lg font-medium text-ink shadow-2xl transition hover:rotate-0 hover:scale-105`}>{t}</div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">#01 · หมวดหมู่</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">หาอะไรอยู่?</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <button key={c.name} className="group bg-background p-6 text-left transition hover:bg-surface">
              <div className="flex items-start justify-between">
                <h3 className="font-sans text-lg font-semibold tracking-normal">{c.name}</h3>
                <span className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary">→</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p>
              <p className="mt-6 font-display text-3xl font-bold">{c.count}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Market */}
      <section id="market" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">#02 · มาแรงสัปดาห์นี้</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">สินค้า <span className="font-serif font-normal italic">ยอดนิยม</span></h2>
          </div>
          <div className="flex rounded-full border border-border p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${tab === t.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* How it works — light panel like fastwork */}
      <section id="how" className="scroll-mt-24 px-4 pb-28">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-paper px-6 py-20 text-ink md:px-14">
          <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">#03 · ระบบคนกลาง</p>
          <h2 className="mt-2 max-w-2xl text-4xl font-bold md:text-6xl">ได้ของก่อน <span className="font-serif font-normal italic">ค่อยปล่อยเงิน</span></h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t-2 border-ink pt-5">
                <p className="font-display text-5xl font-bold opacity-20">{s.n}</p>
                <h3 className="mt-3 font-sans text-xl font-semibold tracking-normal">{s.t}</h3>
                <p className="mt-2 text-sm opacity-70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-10 md:p-16 grid-lines">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Partner program</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-bold md:text-6xl">มีของดี? <span className="font-serif font-normal italic text-primary">มาขายกับเรา</span></h2>
          <p className="mt-4 max-w-lg text-muted-foreground">ค่าธรรมเนียมเริ่ม 5% ถอนเงินได้ทุกวัน มีหน้าร้านของตัวเองพร้อมระบบจัดการออเดอร์</p>
          <Link to="/partner" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-lime">สมัครพาร์ทเนอร์ →</Link>
        </div>
      </section>
    </main>
  );
}
