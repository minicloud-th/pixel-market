import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { HERO_IMAGES } from "@/components/ui/scroll-morph-hero";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "รับพาร์ทเนอร์ขายไอดีเกม & ซอร์สโค้ด — lootcode" },
      { name: "description", content: "เปิดร้านขายไอดีเกมและซอร์สโค้ดกับ lootcode ค่าธรรมเนียมเริ่ม 5% ถอนเงินทุกวัน มีหน้าร้านส่วนตัว" },
      { property: "og:title", content: "มาเป็นพาร์ทเนอร์ lootcode" },
      { property: "og:description", content: "ขายไอดีเกมและซอร์สโค้ดกับตลาดที่มีคนกลางดูแล ค่าธรรมเนียมเริ่ม 5%" },
    ],
  }),
  component: Partner,
});

const TIERS = [
  { name: "Starter", fee: "10%", d: "เริ่มขายได้ทันที", perks: ["หน้าร้านส่วนตัว", "ลงสินค้า 20 รายการ", "ถอนเงินทุกสัปดาห์"] },
  { name: "Pro", fee: "7%", d: "ยอดขาย ฿30k+/เดือน", perks: ["ลงสินค้าไม่จำกัด", "ป้าย Verified", "ถอนเงินทุกวัน"], hot: true },
  { name: "Studio", fee: "5%", d: "ทีม / ร้านใหญ่", perks: ["ผู้จัดการบัญชีส่วนตัว", "โปรโมทหน้าแรก", "API เชื่อมสต็อก"] },
];

function Partner() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <main className="pt-32">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 md:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Partner program</p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.02] md:text-7xl">
            ขายของคุณ <span className="font-serif font-normal italic text-primary">ให้คนทั้งประเทศ</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">ไม่ต้องทำเว็บเอง ไม่ต้องคุยลูกค้าทีละคน เราดูแลการจ่ายเงิน คนกลาง และข้อพิพาทให้ทั้งหมด</p>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[["1,200+", "ร้านค้า"], ["฿48M", "ยอดขายรวม"], ["24ชม.", "เงินเข้า"]].map(([a, b]) => (
              <div key={b}><p className="font-display text-2xl font-bold">{a}</p><p className="text-xs text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
        {/* Order dashboard mock */}
        <div className="rounded-[1.75rem] bg-paper p-5 text-ink shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold">ออเดอร์วันนี้</p>
            <p className="font-display text-2xl font-bold">฿18,420</p>
          </div>
          {[
            ["ROV Conqueror 120 สกิน", "฿4,590", "ส่งแล้ว", "bg-lime"],
            ["Next.js Shop Source", "฿2,490", "รอยืนยัน", "bg-sky"],
            ["Valorant Immortal", "฿6,200", "ใหม่", "bg-coral"],
          ].map(([t, p, s, c], i) => (
            <div key={t} className="mb-2 flex items-center gap-3 rounded-xl bg-background/5 p-3 ring-1 ring-ink/10">
              <img src={HERO_IMAGES[i * 4]} alt="" className="h-10 w-10 rounded-lg object-cover" />
              <div className="flex-1"><p className="text-sm font-medium">{t}</p><p className="text-xs opacity-60">เมื่อ {i * 7 + 2} นาทีที่แล้ว</p></div>
              <p className="text-sm font-semibold">{p}</p>
              <span className={`${c} rounded-full px-2 py-0.5 text-[11px] font-medium`}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-3xl font-bold md:text-5xl">ค่าธรรมเนียม <span className="font-serif font-normal italic">ชัด ไม่มีแอบแฝง</span></h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`rounded-2xl border p-7 ${t.hot ? "border-primary bg-surface glow-lime" : "border-border bg-card"}`}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.name}</p>
                {t.hot && <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">นิยม</span>}
              </div>
              <p className="mt-4 font-display text-6xl font-bold">{t.fee}</p>
              <p className="text-sm text-muted-foreground">{t.d}</p>
              <ul className="mt-6 space-y-2 text-sm">{t.perks.map((p) => <li key={p}>✓ {p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28">
        <div className="rounded-[2rem] border border-border bg-surface p-8 md:p-12">
          <h2 className="text-3xl font-bold">สมัครพาร์ทเนอร์</h2>
          <p className="mt-2 text-sm text-muted-foreground">ทีมงานจะติดต่อกลับภายใน 1 วันทำการ</p>
          {sent ? (
            <p className="mt-8 rounded-xl bg-primary p-5 font-medium text-primary-foreground">ได้รับใบสมัครแล้ว ขอบคุณครับ เราจะติดต่อกลับเร็ว ๆ นี้</p>
          ) : (
            <form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-2">
              <input required placeholder="ชื่อร้าน" className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              <input required type="email" placeholder="อีเมล" className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              <select className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary md:col-span-2">
                <option>ไอดีเกม</option><option>ซอร์สโค้ด / สคริปต์</option><option>ทั้งสองอย่าง</option>
              </select>
              <textarea placeholder="เล่าเกี่ยวกับสินค้าของคุณสั้น ๆ" rows={4} className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary md:col-span-2" />
              <button className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground glow-lime md:col-span-2">ส่งใบสมัคร</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
