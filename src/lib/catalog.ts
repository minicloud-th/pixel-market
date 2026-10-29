import { HERO_IMAGES } from "@/components/ui/scroll-morph-hero";

export type Product = {
  id: number;
  title: string;
  kind: "game" | "code";
  tag: string;
  price: number;
  seller: string;
  rating: number;
  sold: number;
  image: string;
  verified?: boolean;
};

export const PRODUCTS: Product[] = [
  { id: 1, title: "ROV ไอดีแรงค์ Conqueror สกินหายาก 120+", kind: "game", tag: "ROV", price: 4590, seller: "NightOwl Store", rating: 4.9, sold: 312, image: HERO_IMAGES[0], verified: true },
  { id: 2, title: "Valorant Immortal 3 + Vandal Prime Bundle", kind: "game", tag: "Valorant", price: 6200, seller: "AimLab TH", rating: 4.8, sold: 148, image: HERO_IMAGES[3], verified: true },
  { id: 3, title: "Genshin AR60 · 5★ x14 · Raiden C2", kind: "game", tag: "Genshin", price: 3800, seller: "Paimon Shop", rating: 5.0, sold: 89, image: HERO_IMAGES[6] },
  { id: 4, title: "ระบบร้านค้าออนไลน์ Next.js + Stripe พร้อมหลังบ้าน", kind: "code", tag: "Next.js", price: 2490, seller: "devkit.th", rating: 4.9, sold: 421, image: HERO_IMAGES[9], verified: true },
  { id: 5, title: "Discord Bot เติมเกมอัตโนมัติ + Dashboard", kind: "code", tag: "Node.js", price: 1290, seller: "BotForge", rating: 4.7, sold: 260, image: HERO_IMAGES[12] },
  { id: 6, title: "สคริปต์ระบบจองคิว Laravel + LINE Notify", kind: "code", tag: "Laravel", price: 1890, seller: "Codesmith", rating: 4.8, sold: 177, image: HERO_IMAGES[15] },
  { id: 7, title: "Free Fire ไอดีเลเวล 70 อีโมตครบ", kind: "game", tag: "Free Fire", price: 1590, seller: "FireStarter", rating: 4.6, sold: 203, image: HERO_IMAGES[17] },
  { id: 8, title: "Unity Template เกมแนว Roguelike พร้อมขึ้นสโตร์", kind: "code", tag: "Unity", price: 3290, seller: "PixelYard", rating: 4.9, sold: 64, image: HERO_IMAGES[19], verified: true },
];

export const CATEGORIES = [
  { name: "ไอดีเกมมือถือ", count: "8,420", hint: "ROV · Free Fire · PUBG" },
  { name: "ไอดีเกม PC", count: "3,115", hint: "Valorant · Steam · LoL" },
  { name: "ซอร์สโค้ดเว็บ", count: "2,640", hint: "Next.js · Laravel · WP" },
  { name: "บอท & สคริปต์", count: "1,280", hint: "Discord · LINE · Python" },
  { name: "เทมเพลตเกม", count: "540", hint: "Unity · Godot · Roblox" },
  { name: "แอปมือถือ", count: "720", hint: "Flutter · React Native" },
];

export const formatBaht = (n: number) => `฿${n.toLocaleString("th-TH")}`;
