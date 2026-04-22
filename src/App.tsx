import { useState } from "react";
import { motion } from "framer-motion";

type ThemeKey = "spring" | "summer" | "autumn" | "winter" | "sea" | "star-sky";
type IconName =
  | "user"
  | "news"
  | "focus"
  | "projects"
  | "publication"
  | "experience"
  | "contact"
  | "calendar"
  | "location"
  | "link";
type ThemeParticleKind = "sprout" | "leaf" | "snow" | "bubble" | "star" | "sun" | "sunray" | "wave";
type ThemeParticle = {
  kind: ThemeParticleKind;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  top?: number;
  width?: number;
  height?: number;
  angle?: number;
  transform?: string;
  opacity?: number;
};

const PHOTO_ZOOM = 1.0;
const PHOTO_ROTATE_DEG = 0;
const PHOTO_X = 0;
const PHOTO_Y = 0;
const portraitPhoto = new URL("../assets/pictures/IMG_1730.JPG", import.meta.url).href;

const themes: Record<ThemeKey, { label: string; tagline: string; background: string; card: string; text: string; muted: string; accent: string; accentSoft: string; border: string; glow: string }> = {
  spring: {
    label: "Spring Bloom",
    tagline: "Fresh, calm, and modern",
    background: "linear-gradient(180deg, #f4fbf3 0%, #edf8eb 48%, #f8fbf4 100%)",
    card: "rgba(255,255,255,0.72)",
    text: "#10261d",
    muted: "#4c675c",
    accent: "#15803d",
    accentSoft: "rgba(21,128,61,0.12)",
    border: "rgba(21,128,61,0.14)",
    glow: "rgba(74,222,128,0.22)",
  },
  summer: {
    label: "Summer Glow",
    tagline: "Sunny, bright, and energetic",
    background: "linear-gradient(180deg, #fff9d8 0%, #fff4b8 45%, #ffeaa2 100%)",
    card: "rgba(255,255,255,0.72)",
    text: "#3b2b14",
    muted: "#6a5533",
    accent: "#d97706",
    accentSoft: "rgba(245,158,11,0.14)",
    border: "rgba(180,83,9,0.2)",
    glow: "rgba(253,224,71,0.45)",
  },
  autumn: {
    label: "Autumn Ember",
    tagline: "Warm, editorial, and grounded",
    background: "linear-gradient(180deg, #fff8f2 0%, #fff1e7 45%, #fffaf7 100%)",
    card: "rgba(255,250,244,0.8)",
    text: "#2b1d15",
    muted: "#73594a",
    accent: "#c2410c",
    accentSoft: "rgba(194,65,12,0.12)",
    border: "rgba(194,65,12,0.14)",
    glow: "rgba(251,146,60,0.18)",
  },
  winter: {
    label: "Winter Frost",
    tagline: "Deep, quiet, and precise",
    background: "linear-gradient(180deg, #eef4f7 0%, #e1edf2 52%, #f3f7f9 100%)",
    card: "rgba(248,252,255,0.82)",
    text: "#10202b",
    muted: "#536977",
    accent: "#0f766e",
    accentSoft: "rgba(15,118,110,0.12)",
    border: "rgba(15,118,110,0.14)",
    glow: "rgba(45,212,191,0.18)",
  },
  sea: {
    label: "Sea Breeze",
    tagline: "Open, airy, and fresh",
    background: "linear-gradient(180deg, #ecfbff 0%, #dcf2fc 52%, #f4fbff 100%)",
    card: "rgba(255,255,255,0.78)",
    text: "#102030",
    muted: "#4f6575",
    accent: "#0369a1",
    accentSoft: "rgba(3,105,161,0.12)",
    border: "rgba(3,105,161,0.14)",
    glow: "rgba(14,165,233,0.2)",
  },
  "star-sky": {
    label: "Star Sky",
    tagline: "Clarity with gentle cosmic motion",
    background: "linear-gradient(180deg, #071125 0%, #0d1d3b 52%, #101f3d 100%)",
    card: "rgba(10,22,45,0.72)",
    text: "#e2ebff",
    muted: "#b8c7ef",
    accent: "#60a5fa",
    accentSoft: "rgba(96,165,250,0.16)",
    border: "rgba(148,190,255,0.26)",
    glow: "rgba(96,165,250,0.18)",
  },
};

const themeParticles: Record<ThemeKey, ThemeParticle[]> = {
  spring: [
    { kind: "sprout", left: 10, size: 20, delay: -1, duration: 10, color: "rgba(34,197,94,0.45)", opacity: 0.85 },
    { kind: "sprout", left: 22, size: 16, delay: -4, duration: 11, color: "rgba(74,222,128,0.45)", opacity: 0.8 },
    { kind: "sprout", left: 37, size: 18, delay: -2, duration: 9, color: "rgba(34,197,94,0.42)", opacity: 0.86 },
    { kind: "sprout", left: 50, size: 14, delay: -7, duration: 12, color: "rgba(22,163,74,0.46)", opacity: 0.82 },
    { kind: "sprout", left: 66, size: 22, delay: -3, duration: 10, color: "rgba(74,222,128,0.45)", opacity: 0.83 },
    { kind: "sprout", left: 80, size: 17, delay: -5, duration: 13, color: "rgba(34,197,94,0.48)", opacity: 0.84 },
    { kind: "sprout", left: 92, size: 15, delay: -6, duration: 11, color: "rgba(22,163,74,0.45)", opacity: 0.8 },
  ],
  summer: [
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 330, height: 2, delay: -1, duration: 10, color: "rgba(250,204,21,0.42)", opacity: 0.66, angle: 0, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 320, height: 2, delay: -3, duration: 12, color: "rgba(251,191,36,0.4)", opacity: 0.62, angle: 25, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 170, width: 300, height: 1, delay: -6, duration: 11, color: "rgba(251,146,60,0.36)", opacity: 0.58, angle: 50, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 190, width: 350, height: 2, delay: -4, duration: 13, color: "rgba(253,186,116,0.34)", opacity: 0.54, angle: 75, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 320, height: 1, delay: -7, duration: 12, color: "rgba(250,204,21,0.32)", opacity: 0.52, angle: 105, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 175, width: 300, height: 1, delay: -5, duration: 11, color: "rgba(251,191,36,0.35)", opacity: 0.5, angle: 130, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 170, width: 290, height: 1, delay: -8, duration: 10, color: "rgba(253,186,116,0.3)", opacity: 0.48, angle: 155, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 310, height: 2, delay: -2, duration: 12, color: "rgba(250,204,21,0.34)", opacity: 0.54, angle: 180, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 170, width: 300, height: 1, delay: -9, duration: 13, color: "rgba(251,191,36,0.3)", opacity: 0.48, angle: 210, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 320, height: 1, delay: -3, duration: 11, color: "rgba(251,146,60,0.32)", opacity: 0.5, angle: 235, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 170, width: 290, height: 1, delay: -6, duration: 12, color: "rgba(253,186,116,0.28)", opacity: 0.46, angle: 260, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 190, width: 340, height: 2, delay: -4, duration: 10, color: "rgba(250,204,21,0.36)", opacity: 0.56, angle: 285, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 180, width: 320, height: 1, delay: -1, duration: 12, color: "rgba(251,191,36,0.34)", opacity: 0.52, angle: 310, transform: "translate(-50%, -50%)" },
    // { kind: "sunray", left: 82, top: 13, size: 175, width: 300, height: 1, delay: -7, duration: 11, color: "rgba(251,146,60,0.3)", opacity: 0.48, angle: 335, transform: "translate(-50%, -50%)" },
    { kind: "sun", left: 82, top: 3, size: 170, delay: -2, duration: 11, color: "rgba(248, 109, 10, 0.66)", opacity: 2.0, transform: "translate(-50%, -50%)" },
    ],
  autumn: [
    { kind: "leaf", left: 8, size: 14, delay: -1, duration: 13, color: "rgba(249,115,22,0.55)" },
    { kind: "leaf", left: 18, size: 16, delay: -6, duration: 12, color: "rgba(217,119,6,0.58)" },
    { kind: "leaf", left: 33, size: 13, delay: -3, duration: 11, color: "rgba(220,38,38,0.5)" },
    { kind: "leaf", left: 47, size: 15, delay: -8, duration: 14, color: "rgba(234,88,12,0.56)" },
    { kind: "leaf", left: 60, size: 12, delay: -4, duration: 10, color: "rgba(202,138,4,0.58)" },
    { kind: "leaf", left: 73, size: 17, delay: -5, duration: 15, color: "rgba(249,115,22,0.55)" },
    { kind: "leaf", left: 88, size: 14, delay: -2, duration: 12, color: "rgba(220,38,38,0.48)" },
  ],
  winter: [
    { kind: "snow", left: 2, size: 18, delay: -1, duration: 10, color: "rgba(255,255,255,0.84)" },
    { kind: "snow", left: 5, size: 16, delay: -6, duration: 8, color: "rgba(226,240,255,0.88)" },
    { kind: "snow", left: 8, size: 17, delay: -3, duration: 9, color: "rgba(248,252,255,0.9)" },
    { kind: "snow", left: 12, size: 15, delay: -7, duration: 8, color: "rgba(255,255,255,0.82)" },
    { kind: "snow", left: 16, size: 16, delay: -4, duration: 9, color: "rgba(226,240,255,0.86)" },
    { kind: "snow", left: 28, size: 15, delay: -5, duration: 11, color: "rgba(248,252,255,0.88)" },
    { kind: "snow", left: 44, size: 17, delay: -2, duration: 12, color: "rgba(255,255,255,0.85)" },
    { kind: "snow", left: 58, size: 16, delay: -8, duration: 10, color: "rgba(226,240,255,0.87)" },
    { kind: "snow", left: 72, size: 15, delay: -4, duration: 11, color: "rgba(255,255,255,0.82)" },
    { kind: "snow", left: 84, size: 17, delay: -2, duration: 9, color: "rgba(248,252,255,0.9)" },
    { kind: "snow", left: 89, size:16, delay: -6, duration: 8, color: "rgba(226,240,255,0.88)" },
    { kind: "snow", left: 93, size: 18, delay: -3, duration: 9, color: "rgba(255,255,255,0.86)" },
    { kind: "snow", left: 96, size: 15, delay: -7, duration: 8, color: "rgba(248,252,255,0.88)" },
    { kind: "snow", left: 98, size: 16, delay: -5, duration: 10, color: "rgba(226,240,255,0.85)" },
  ],
  sea: [
    { kind: "bubble", left: 2, size: 12, delay: -1, duration: 9, color: "rgba(56,189,248,0.36)" },
    { kind: "bubble", left: 6, size: 59, delay: -4, duration: 8, color: "rgba(14,165,233,0.34)" },
    { kind: "bubble", left: 10, size: 14, delay: -2, duration: 9, color: "rgba(56,189,248,0.34)" },
    { kind: "bubble", left: 15, size: 78, delay: -6, duration: 8, color: "rgba(14,165,233,0.32)" },
    { kind: "bubble", left: 24, size: 10, delay: -3, duration: 10, color: "rgba(56,189,248,0.3)" },
    { kind: "bubble", left: 38, size: 12, delay: -5, duration: 11, color: "rgba(14,165,233,0.31)" },
    { kind: "bubble", left: 52, size: 9, delay: -7, duration: 10, color: "rgba(56,189,248,0.32)" },
    { kind: "bubble", left: 68, size: 13, delay: -2, duration: 11, color: "rgba(14,165,233,0.33)" },
    { kind: "bubble", left: 83, size: 71, delay: -4, duration: 9, color: "rgba(56,189,248,0.33)" },
    { kind: "bubble", left: 88, size: 19, delay: -6, duration: 8, color: "rgba(14,165,233,0.35)" },
    { kind: "bubble", left: 92, size: 43, delay: -3, duration: 9, color: "rgba(56,189,248,0.35)" },
    { kind: "bubble", left: 95, size: 10, delay: -7, duration: 8, color: "rgba(14,165,233,0.34)" },
    { kind: "bubble", left: 98, size: 22, delay: -5, duration: 9, color: "rgba(56,189,248,0.36)" },
    { kind: "wave", left: -8, top: 74, size: 240, width: 560, height: 120, delay: -2, duration: 12, color: "rgba(56,189,248,0.24)", opacity: 0.72 },
    { kind: "wave", left: 26, top: 80, size: 240, width: 640, height: 130, delay: -8, duration: 14, color: "rgba(14,165,233,0.2)", opacity: 0.65 },
    { kind: "wave", left: 58, top: 86, size: 220, width: 560, height: 120, delay: -5, duration: 13, color: "rgba(56,189,248,0.2)", opacity: 0.6 },
  ],
  "star-sky": [
    { kind: "star", left: 5, size: 7, delay: -1, duration: 5, color: "rgba(255,255,255,0.84)", top: 10 },
    { kind: "star", left: 14, size: 4, delay: -4, duration: 6, color: "rgba(191,219,254,0.82)", top: 22 },
    { kind: "star", left: 27, size: 6, delay: -2, duration: 5, color: "rgba(255,255,255,0.9)", top: 14 },
    { kind: "star", left: 39, size: 4, delay: -5, duration: 7, color: "rgba(191,219,254,0.78)", top: 28 },
    { kind: "star", left: 52, size: 5, delay: -3, duration: 6, color: "rgba(255,255,255,0.85)", top: 16 },
    { kind: "star", left: 64, size: 3, delay: -6, duration: 5, color: "rgba(191,219,254,0.8)", top: 8 },
    { kind: "star", left: 76, size: 5, delay: -1, duration: 6, color: "rgba(255,255,255,0.9)", top: 24 },
    { kind: "star", left: 88, size: 4, delay: -4, duration: 7, color: "rgba(191,219,254,0.78)", top: 12 },
    { kind: "star", left: 95, size: 3, delay: -2, duration: 5, color: "rgba(255,255,255,0.82)", top: 30 },
    { kind: "star", left: 10, size: 3, delay: -3, duration: 6, color: "rgba(219,234,254,0.76)", top: 35 },
    { kind: "star", left: 20, size: 6, delay: -5, duration: 5, color: "rgba(255,255,255,0.86)", top: 6 },
    { kind: "star", left: 31, size: 4, delay: -1, duration: 7, color: "rgba(191,219,254,0.74)", top: 40 },
    { kind: "star", left: 46, size: 3, delay: -6, duration: 5, color: "rgba(255,255,255,0.8)", top: 4 },
    { kind: "star", left: 58, size: 4, delay: -2, duration: 6, color: "rgba(219,234,254,0.78)", top: 34 },
    { kind: "star", left: 70, size: 6, delay: -7, duration: 5, color: "rgba(191,219,254,0.8)", top: 18 },
    { kind: "star", left: 81, size: 5, delay: -3, duration: 6, color: "rgba(255,255,255,0.88)", top: 42 },
    { kind: "star", left: 92, size: 4, delay: -5, duration: 7, color: "rgba(219,234,254,0.76)", top: 20 },
    { kind: "star", left: 3, size: 3, delay: -2, duration: 5, color: "rgba(255,255,255,0.78)", top: 18 },
    { kind: "star", left: 7, size: 4, delay: -8, duration: 6, color: "rgba(219,234,254,0.74)", top: 44 },
    { kind: "star", left: 12, size: 3, delay: -4, duration: 7, color: "rgba(191,219,254,0.8)", top: 55 },
    { kind: "star", left: 18, size: 5, delay: -6, duration: 5, color: "rgba(255,255,255,0.86)", top: 48 },
    { kind: "star", left: 24, size: 3, delay: -1, duration: 6, color: "rgba(219,234,254,0.76)", top: 60 },
    { kind: "star", left: 35, size: 4, delay: -9, duration: 5, color: "rgba(255,255,255,0.82)", top: 52 },
    { kind: "star", left: 41, size: 3, delay: -5, duration: 7, color: "rgba(191,219,254,0.76)", top: 58 },
    { kind: "star", left: 49, size: 4, delay: -2, duration: 6, color: "rgba(219,234,254,0.78)", top: 50 },
    { kind: "star", left: 55, size: 3, delay: -7, duration: 5, color: "rgba(255,255,255,0.8)", top: 62 },
    { kind: "star", left: 63, size: 5, delay: -4, duration: 6, color: "rgba(191,219,254,0.82)", top: 54 },
    { kind: "star", left: 68, size: 8, delay: -10, duration: 7, color: "rgba(255,255,255,0.78)", top: 46 },
    { kind: "star", left: 74, size: 4, delay: -6, duration: 5, color: "rgba(219,234,254,0.8)", top: 57 },
    { kind: "star", left: 79, size: 3, delay: -3, duration: 6, color: "rgba(191,219,254,0.76)", top: 64 },
    { kind: "star", left: 86, size: 5, delay: -8, duration: 5, color: "rgba(255,255,255,0.86)", top: 52 },
    { kind: "star", left: 90, size: 6, delay: -2, duration: 7, color: "rgba(219,234,254,0.78)", top: 60 },
    { kind: "star", left: 97, size: 4, delay: -7, duration: 6, color: "rgba(191,219,254,0.8)", top: 50 },
  ],
};

const latestNews = [
  {
    date: "Aug 2025",
    title: "EVLR under review",
    detail: "Explainable vision-language modeling for radiology with a focus on justifiability and clinical alignment.",
  },
  {
    date: "2024-Present",
    title: "Doctoral Researcher at SMU",
    detail: "Advancing AI for healthcare with explainable, robust, and clinically useful modeling.",
  },
];

const focusAreas = [
  "Explainable AI",
  "Medical Imaging",
  "Vision-Language Models",
  "Causal ML",
];

const projects = [
  {
    title: "jCNN - Justifiable CNNs",
    period: "Mar 2022",
    summary: "Enhanced CNNs to learn beyond correlational associations and improve causal interpretability with domain-guided constraints.",
    links: [
      { label: "Paper", href: "https://proceedings.mlr.press/v189/bhosale23a/bhosale23a.pdf" },
      { label: "Code", href: "https://github.com/BRim28/jCNN" },
    ],
  },
  {
    title: "EVLR - Explainable VLM for Radiology",
    period: "Aug 2025",
    summary: "Investigating prompt design and justifiability of vision-language models in medical contexts.",
    links: [],
  },
  {
    title: "XGB-EVM - Hackathon Winner",
    period: "Aug 2021",
    summary: "Winning ensemble solution for retinal disease detection with robust uncertainty-aware predictions.",
    links: [],
  },
  {
    title: "MS-TCN-2-Med - Medical Temporal Modeling",
    period: "Aug 2025",
    summary: "Applying multi-stage TCNs for medical video and temporal event detection tasks.",
    links: [],
  },
];

const publications = [
  {
    title: "Learning with Domain Knowledge to Develop Justifiable Convolutional Networks",
    venue: "Asian Conference on Machine Learning (ACML), 2023",
    summary: "Bhosale, R. & Mrinal Das. Develops justifiable convolutional networks by integrating domain knowledge.",
    links: [
      { label: "ACML Page", href: "https://proceedings.mlr.press/v189/bhosale23a.html" },
    ],
  },
];

const experience = [
  {
    role: "Doctoral Researcher",
    org: "Singapore Management University",
    period: "Aug 2024 - Present",
    location: "Singapore",
    summary: "Researching explainability and clinically relevant behavior in vision-language and medical AI systems.",
  },
  {
    role: "Product Engineer",
    org: "Vijna Labs, SLK",
    period: "Jun 2022 - Aug 2024",
    location: "Bangalore, India",
    summary: "Built document information extraction systems using LLMs and CV+NLP pipelines.",
  },
  {
    role: "MS by Research (Computer Science)",
    org: "IIT Palakkad",
    period: "Jul 2019 - Mar 2022",
    location: "India",
    summary: "Thesis on causally focused CNNs and domain knowledge guided modeling.",
  },
];

const links = [
  { label: "Email", href: "mailto:rimmon281996@gmail.com" },
  { label: "GitHub", href: "https://github.com/BRim28" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rimmon" },
  { label: "Resume", href: "/Rimmon_Bhosale_Resume.pdf" },
];

const iconPaths: Record<IconName, string> = {
  user: "M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9a7 7 0 0 1 14 0",
  news: "M5 4h14a1 1 0 0 1 1 1v14H4V5a1 1 0 0 1 1-1Zm3 4h8M8 12h8M8 16h5",
  focus: "M4 12h4m8 0h4M12 4v4m0 8v4M8 8l8 8M16 8l-8 8",
  projects: "M3 7h7v12H3V7Zm11-3h7v15h-7V4ZM3 3h7v2H3V3Z",
  publication: "M6 4h12v16H6V4Zm3 4h6m-6 4h6m-6 4h4",
  experience: "M4 8h16v11H4V8Zm4-4h8v4H8V4Z",
  contact: "M4 6h16v12H4V6Zm1 1 7 5 7-5",
  calendar: "M7 3v3m10-3v3M4 8h16v12H4V8Zm0 4h16",
  location: "M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  link: "M10 14 14 10m-6 2a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1m-6 2a4 4 0 0 0 0 6l1 1a4 4 0 0 0 6-6l-2-2",
};

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("spring");
  const theme = themes[themeKey];
  const particles = themeParticles[themeKey];

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: theme.background,
        color: theme.text,
        fontFamily: '"Avenir Next", "Avenir", "Segoe UI", sans-serif',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at top left, ${theme.glow}, transparent 35%), radial-gradient(circle at 85% 20%, ${theme.accentSoft}, transparent 28%)`,
        }}
      />

      <div className="theme-particle-layer pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={`${themeKey}-${particle.kind}-${index}`}
            className={`theme-particle particle-${particle.kind}`}
            style={{
              left: `${particle.left}%`,
              top: particle.top !== undefined ? `${particle.top}%` : undefined,
              width: `${particle.width ?? particle.size}px`,
              height: `${particle.height ?? particle.size}px`,
              background: particle.color,
              transform: particle.kind === "sunray" && particle.angle !== undefined
                ? `${particle.transform ?? ""} rotate(${particle.angle}deg)`
                : particle.transform,
              opacity: particle.opacity ?? 1,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-5 pb-20 pt-5 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-5 rounded-[2rem] border p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7"
          style={{ background: theme.card, borderColor: theme.border }}
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              {/* <p className="text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: theme.accent }}>
                Welcome! Good to see you ;)!
              </p> */}
              <p className="mt-2 text-lg font-medium" style={{ color: theme.muted }}>
                Welcome, Good to see you! How do you feel today?
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {/* <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
                  Theme
                </span> */}
                {(Object.entries(themes) as Array<[ThemeKey, (typeof themes)[ThemeKey]]>).map(([key, option]) => {
                  const active = key === themeKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setThemeKey(key)}
                      className="rounded-full border px-2 py-1 text-xs transition"
                      style={{
                        background: active ? theme.accent : theme.card,
                        borderColor: active ? theme.accent : theme.border,
                        color: active ? "white" : theme.text,
                      }}
                      title={option.tagline}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden text-right text-sm sm:block" style={{ color: theme.muted }}>
              <div>{themes[themeKey].label}</div>
              <div className="mt-1">{themes[themeKey].tagline}</div>
            </div>
          </div>

          <div className="grid items-center gap-5 border-t pt-5 lg:grid-cols-[0.9fr_1.1fr]" style={{ borderColor: theme.border }}>
            <div className="rounded-[1.4rem] border p-5" style={{ borderColor: theme.border, background: theme.accentSoft }}>
              {/* <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em]" style={{ borderColor: theme.border, color: theme.muted }}>
                  <Icon name="user" className="h-3.5 w-3.5" />
                  Photo
                </span>
              </div> */}
              <div className="mt-4 aspect-square w-full overflow-hidden rounded-[1.1rem] border" style={{ borderColor: theme.border, background: theme.card }}>
                <img
                  src={portraitPhoto}
                  alt="Rimmon Bhosale"
                  className="h-full w-full object-cover"
                  style={{
                    transform: `translate3d(${PHOTO_X}%, ${PHOTO_Y}%, 0) scale(${PHOTO_ZOOM}) rotate(${PHOTO_ROTATE_DEG}deg)`,
                    transformOrigin: "center center",
                    imageRendering: "auto",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex flex-col items-center gap-1 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.24em] text-center"
                  style={{ borderColor: theme.border, color: theme.muted }}
                >
                  <p className="text-sm font-medium" style={{ color: theme.muted }}>
                    Rimmon Bhosale
                  </p>

                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: theme.accent }}
                  >
                    Doctoral Researcher - Singapore Management University
                  </p>
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-5xl">
                <center>Building Trustworthy AI for Healthcare.</center>
              </h1>
              <p className="mt-4 text-lg leading-8 sm:text-xl" style={{ color: theme.muted }}>
                I am a doctoral researcher focused on making medical AI systems justifiable, robust, and useful in real clinical workflows.
                My work spans vision models, multimodal systems, and domain-knowledge guided learning.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
                    style={{ borderColor: theme.border, background: theme.accentSoft }}
                  >
                    <Icon name="focus" className="h-4 w-4" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t pt-5" style={{ borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.accent }}>
                <Icon name="news" className="h-4 w-4" />
                Latest News
              </span>
              <span className="text-sm" style={{ color: theme.muted }}>
                Compact highlights
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {latestNews.map((item) => (
                <article key={item.title} className="rounded-[1rem] border p-4" style={{ borderColor: theme.border, background: theme.accentSoft }}>
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {item.date}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-tight">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border p-5 sm:p-7"
          style={{ background: theme.card, borderColor: theme.border }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: theme.accentSoft, color: theme.accent }}>
              <Icon name="projects" className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.accent }}>
                Projects
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Selected Projects</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {projects.map((project) => (
              <article key={project.title} className="rounded-[1.4rem] border p-5" style={{ background: theme.accentSoft, borderColor: theme.border }}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.title}</h3>
                    <p className="mt-3 text-base leading-7" style={{ color: theme.muted }}>
                      {project.summary}
                    </p>
                    {project.links.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.links.map((projectLink) => (
                          <a
                            key={projectLink.label}
                            href={projectLink.href}
                            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                            style={{ borderColor: theme.border, background: theme.card }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Icon name="link" className="h-3.5 w-3.5" />
                            {projectLink.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {project.period}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border p-5 sm:p-7"
          style={{ background: theme.card, borderColor: theme.border }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: theme.accentSoft, color: theme.accent }}>
              <Icon name="publication" className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.accent }}>
                Research
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Research and Publications</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {publications.map((publication) => (
              <article key={publication.title} className="rounded-[1.4rem] border p-5" style={{ background: theme.accentSoft, borderColor: theme.border }}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
                  {publication.venue}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{publication.title}</h3>
                <p className="mt-3 text-base leading-7" style={{ color: theme.muted }}>
                  {publication.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {publication.links.map((publicationLink) => (
                    <a
                      key={publicationLink.label}
                      href={publicationLink.href}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                      style={{ borderColor: theme.border, background: theme.card }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="link" className="h-3.5 w-3.5" />
                      {publicationLink.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border p-5 sm:p-7"
          style={{ background: theme.card, borderColor: theme.border }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: theme.accentSoft, color: theme.accent }}>
              <Icon name="experience" className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.accent }}>
                Experience
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Experience and Education</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {experience.map((item) => (
              <article key={item.role} className="flex flex-col gap-3 rounded-[1.4rem] border p-5 lg:flex-row lg:items-start lg:justify-between" style={{ background: theme.accentSoft, borderColor: theme.border }}>
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{item.role}</h3>
                  <p className="mt-1 text-base font-medium" style={{ color: theme.accent }}>
                    {item.org}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm" style={{ color: theme.muted }}>
                    <Icon name="location" className="h-3.5 w-3.5" />
                    {item.location}
                  </p>
                  <p className="mt-3 text-base leading-7" style={{ color: theme.muted }}>
                    {item.summary}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
                  <Icon name="calendar" className="h-3.5 w-3.5" />
                  {item.period}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.footer
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border p-5 sm:p-7"
          style={{ background: theme.card, borderColor: theme.border }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: theme.accent }}>
                <Icon name="contact" className="h-4 w-4" />
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Let's collaborate</h2>
              <p className="mt-4 text-lg leading-8" style={{ color: theme.muted }}>
                Open to academic collaborations, PhD supervision enquiries, and industry research roles in AI for healthcare.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{ background: link.label === "GitHub" ? theme.accent : theme.card, color: link.label === "GitHub" ? "white" : theme.text, borderColor: theme.border }}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon name="link" className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t pt-4 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: theme.border, color: theme.muted }}>
            <span>Professional portfolio for AI4Health research and applied machine learning.</span>
            <span>© {new Date().getFullYear()} Rimmon Bhosale</span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
