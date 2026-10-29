import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle";

export const HERO_IMAGES = [
  "https://cdn.21st.dev/assets/mirror/4d/4d1bff4ea8b9f400dff7ae405f92e15bd39ec76e9285c7d96017e64ba1de3ae1.jpg",
  "https://cdn.21st.dev/assets/mirror/ee/ee36e332fe99d7611c43b90511db08a4f84e4545caa78e7b52e9ccffe273864b.jpg",
  "https://cdn.21st.dev/assets/mirror/dd/dddeaa4e6132c65bf7ff99d197f792a30937b5cbfe97a2b1ee54a793684df52e.jpg",
  "https://cdn.21st.dev/assets/mirror/48/487977107b5011b5e1c25289f6e4393ef555e1a92daee554788e9363b233ca14.jpg",
  "https://cdn.21st.dev/assets/mirror/a1/a12509688be6c9d3b2cb26d2ea1cfce48b8a8dbf2653e17be8a3fc31bd69f162.jpg",
  "https://cdn.21st.dev/assets/mirror/05/051f9e565b5b0b221384d9c27a0760febc3fb48d190c046adfda579f3614c958.jpg",
  "https://cdn.21st.dev/assets/mirror/87/87d4f60a4465d19d14b8acefa46275df4ccd767ccea6d7f234ea5bad99cfec56.jpg",
  "https://cdn.21st.dev/assets/mirror/06/0610989e0675a12c02d35aa5464e2644bf77913214b748b73a894808d2d79877.jpg",
  "https://cdn.21st.dev/assets/mirror/fe/fe90b90751e671a9526134c4743e2fcbf6c1a24991aba273ad7418c88fc9c701.jpg",
  "https://cdn.21st.dev/assets/mirror/2e/2e0452c1994fcc2130a1b8ef68e34b5ea52d1b35b80dde09b99349ad1de54598.jpg",
  "https://cdn.21st.dev/assets/mirror/84/847dc523558808119dc4bbb5218ff862ae5f5b455f33e9a0304f2f5a4b2f0f2c.jpg",
  "https://cdn.21st.dev/assets/mirror/2f/2f128763d177d6bdda3de9f0a766693406034977082bdb542138b7b74af9697b.jpg",
  "https://cdn.21st.dev/assets/mirror/30/30f8223f1d1ecc24fc8b7a9995b8ee98449b1e9fc300c14fbccec01b6a83a0ae.jpg",
  "https://cdn.21st.dev/assets/mirror/b4/b4df0e3e425ffce3b4f62fd7bc717e4dc90b94455f4d65d64fc07fe9721b0519.jpg",
  "https://cdn.21st.dev/assets/mirror/90/90c625659f072e4a701c2e37fa4ca46f25c7ca8689d723e7802fe84cf17874e9.jpg",
  "https://cdn.21st.dev/assets/mirror/6a/6aa0befc69cc3db8f3f3558d4b5e1216a5b64ceae1b86f51acf1c3f1432a8cf7.jpg",
  "https://cdn.21st.dev/assets/mirror/dc/dc126cfd753dc217945d0ea2f915e539dfe4ffb5fdea02245d0f576b25a9c4dd.jpg",
  "https://cdn.21st.dev/assets/mirror/ab/ab5f167fcb763aee7c3247fb8af97875998a7f519a6119da7dadd9cf73ae1a2c.jpg",
  "https://cdn.21st.dev/assets/mirror/57/57d6e450f7068e5f3be04907dcc0815343e67df1dc82f2da0ff1c859afc1f700.jpg",
  "https://cdn.21st.dev/assets/mirror/e4/e491359016d1494074e287dfbb55be068cffc0110017ae2257a5d4cdec193a47.jpg",
] as const;

const LABELS = ["ROV", "Valorant", "Genshin", "React", "Next.js", "Free Fire", "PUBG", "Laravel", "Roblox", "Unity"];
const IMG_W = 64;
const IMG_H = 90;
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

type Target = { x: number; y: number; rotation: number; scale: number; opacity: number };

function FlipCard({ src, index, target }: { src: string; index: number; target: Target }) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{ position: "absolute", width: IMG_W, height: IMG_H, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface shadow-lg" style={{ backfaceVisibility: "hidden" }}>
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
            {LABELS[index % LABELS.length]}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Scroll-driven morph hero: cards scatter -> line -> circle, then morph into an arc as the page scrolls. */
export default function ScrollMorphHero({ children }: { children?: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<AnimationPhase>("scatter");
  const [size, setSize] = useState({ width: 1200, height: 800 });
  const [scatter, setScatter] = useState<Target[]>(() => HERO_IMAGES.map(() => ({ x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 })));

  useEffect(() => {
    setScatter(
      HERO_IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    );
    const t1 = setTimeout(() => setPhase("line"), 400);
    const t2 = setTimeout(() => setPhase("circle"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setSize({ width: e.contentRect.width, height: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const morph = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), { stiffness: 40, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0.3, 1], [0, 1]), { stiffness: 40, damping: 20 });
  const mouseX = useMotionValue(0);
  const smoothMouse = useSpring(mouseX, { stiffness: 30, damping: 20 });

  const [m, setM] = useState(0);
  const [r, setR] = useState(0);
  const [px, setPx] = useState(0);
  useEffect(() => {
    const a = morph.on("change", setM);
    const b = rotate.on("change", setR);
    const c = smoothMouse.on("change", setPx);
    return () => { a(); b(); c(); };
  }, [morph, rotate, smoothMouse]);

  const contentOpacity = useTransform(morph, [0.75, 1], [0, 1]);
  const contentY = useTransform(morph, [0.75, 1], [24, 0]);

  const total = HERO_IMAGES.length;
  const targets = useMemo(() => {
    return HERO_IMAGES.map((_, i): Target => {
      if (phase === "scatter") return scatter[i]!;
      if (phase === "line") {
        const sp = 74;
        return { x: i * sp - (total * sp) / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
      }
      const isMobile = size.width < 768;
      const minD = Math.min(size.width, size.height);
      const cr = Math.min(minD * 0.33, 320);
      const ca = (i / total) * 360;
      const crad = (ca * Math.PI) / 180;
      const circle = { x: Math.cos(crad) * cr, y: Math.sin(crad) * cr, rotation: ca + 90 };

      const arcR = Math.min(size.width, size.height * 1.5) * (isMobile ? 1.4 : 1.1);
      const apexY = size.height * (isMobile ? 0.7 : 0.66);
      const centerY = apexY + arcR - size.height / 2;
      const spread = isMobile ? 100 : 130;
      const step = spread / (total - 1);
      const a = -90 - spread / 2 + i * step - r * spread * 0.8 + spread * 0.4;
      const arad = (a * Math.PI) / 180;
      const arc = { x: Math.cos(arad) * arcR + px, y: Math.sin(arad) * arcR + centerY, rotation: a + 90, scale: isMobile ? 1.3 : 1.7 };
      return {
        x: lerp(circle.x, arc.x, m),
        y: lerp(circle.y, arc.y, m),
        rotation: lerp(circle.rotation, arc.rotation, m),
        scale: lerp(1, arc.scale, m),
        opacity: 1,
      };
    });
  }, [phase, scatter, size, m, r, px, total]);

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div
        ref={stageRef}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 80);
        }}
        className="sticky top-0 h-screen w-full overflow-hidden grid-lines"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_75%)]" />

        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={phase === "circle" && m < 0.5 ? { opacity: 1 - m * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="text-2xl font-semibold md:text-4xl"
          >
            ไอดีเกม. ซอร์สโค้ด. <span className="font-serif font-normal italic text-primary">ครบที่เดียว</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "circle" && m < 0.5 ? { opacity: 0.6 - m } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-[11px] font-bold tracking-[0.3em] text-muted-foreground"
          >
            SCROLL TO EXPLORE ↓
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-x-0 top-[12%] z-10 flex flex-col items-center px-4 text-center"
        >
          {children}
        </motion.div>

        <div className="relative flex h-full w-full items-center justify-center">
          {HERO_IMAGES.map((src, i) => (
            <FlipCard key={i} src={src} index={i} target={targets[i]!} />
          ))}
        </div>
      </div>
    </section>
  );
}
