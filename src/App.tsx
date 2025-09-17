// import React from "react";

// Rimmon Bhosale - Single-file React portfolio (Tailwind CSS + Framer Motion + shadcn style)
// Usage: place this file in a Create React App / Vite + Tailwind project (e.g. pages/index.jsx for github pages)

import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#001F5A]">Rimmon Bhosale</h1>
          <p className="mt-1 text-sm text-[#0039AC]">Doctoral Researcher • AI4Health • Singapore Management University</p>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#research" className="text-sm hover:underline">Research</a>
          <a href="#experience" className="text-sm hover:underline">Experience</a>
          <a href="#contact" className="text-sm bg-[#0039AC] text-white px-3 py-1 rounded-md">Contact</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <h2 className="text-4xl font-extrabold leading-tight">AI for Healthcare • Explainability • Vision & Multi‑Modal Systems</h2>
            <p className="mt-4 text-gray-600">Doctoral researcher at SMU working on making Vision‑Language and medical imaging models more justifiable, robust and clinically useful. I build explainable, causal, and clinically-aligned models — bridging research and applied systems for healthcare.</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="/Rimmon_Bhosale_Resume.pdf" className="text-sm px-4 py-2 border rounded-md">Download Resume</a>
              <a href="https://github.com/BRim28" target="_blank" rel="noreferrer" className="text-sm px-4 py-2 bg-[#001F5A] text-white rounded-md">View GitHub</a>
              <a href="#contact" className="text-sm px-4 py-2 border rounded-md">Get in touch</a>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="p-3 border rounded-md">
                <div className="font-semibold">XAI</div>
                <div className="text-gray-500">Explainable models & justifiability</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="font-semibold">Medical Imaging</div>
                <div className="text-gray-500">CT/Endoscopy/Ultrasound</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="font-semibold">VLMs</div>
                <div className="text-gray-500">Vision-Language Models for healthcare</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="font-semibold">Causal ML</div>
                <div className="text-gray-500">Domain knowledge + causality</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex md:flex-col items-center gap-4"
          >
            {/* Placeholder for photo - replace with your portrait */}
            <div className="w-44 h-44 rounded-2xl bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">Your Photo</span>
            </div>
            <div className="text-sm text-gray-600 text-center">Rimmon Bhosale<br/>AI4Health · SMU</div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-8">
          <h3 className="text-2xl font-bold text-[#001F5A]">Selected Projects</h3>
          <p className="text-gray-600 mt-2">A curated selection that highlights research depth and applied systems work — useful for hiring committees and industry teams.</p>

          <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* jCNN */}
            <article className="p-4 border rounded-lg hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">jCNN — Justifiable CNNs</h4>
                  <p className="text-sm text-gray-500 mt-1">Enhanced CNNs to learn beyond correlational associations; associated publication at ACML.</p>
                </div>
                <div className="text-xs text-gray-400">Mar 2022</div>
              </div>
              <ul className="mt-3 text-sm list-disc pl-5 text-gray-600">
                <li>Incorporates domain-guided constraints to improve causal interpretability.</li>
                <li>Code & paper: <a href="https://proceedings.mlr.press/v189/bhosale23a/bhosale23a.pdf" className="underline">paper</a> • <a href="https://github.com/BRim28/jCNN" className="underline">code</a></li>
              </ul>
            </article>

            {/* EVLR */}
            <article className="p-4 border rounded-lg hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">EVLR — Explainable VLM for Radiology (Work under review)</h4>
                  <p className="text-sm text-gray-500 mt-1">Investigating prompt design and justifiability of Vision-Language Models in medical contexts.</p>
                </div>
                <div className="text-xs text-gray-400">Aug 2025</div>
              </div>
              <ul className="mt-3 text-sm list-disc pl-5 text-gray-600">
                <li>Analyzed success and failure modes of MIUVL and proposed improved prompt templates.</li>
                <li>Focused on clinical alignment and interpretability for downstream workflows.</li>
              </ul>
            </article>

            {/* XGB-EVM */}
            <article className="p-4 border rounded-lg hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">XGB‑EVM — Hackathon Winner</h4>
                  <p className="text-sm text-gray-500 mt-1">Winning ensemble solution for retinal disease detection (AI for Healthcare Hackathon).</p>
                </div>
                <div className="text-xs text-gray-400">Aug 2021</div>
              </div>
              <ul className="mt-3 text-sm list-disc pl-5 text-gray-600">
                <li>Combined XGBoost and EVM-style uncertainty modeling for robust predictions.</li>
                <li>Deployed a lightweight inference pipeline suitable for clinical partners.</li>
              </ul>
            </article>

            {/* MS-TCN-2-Med */}
            <article className="p-4 border rounded-lg hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">MS‑TCN‑2‑Med — Medical Temporal Modeling</h4>
                  <p className="text-sm text-gray-500 mt-1">Applying multi-stage TCNs for medical video/temporal tasks (surgical phase / event detection).</p>
                </div>
                <div className="text-xs text-gray-400">Aug 2025</div>
              </div>
            </article>
          </div>

          <div className="mt-6 text-right">
            <a href="#research" className="text-sm underline">See research & publications →</a>
          </div>
        </section>

        {/* RESEARCH & PUBLICATIONS */}
        <section id="research" className="py-8 border-t pt-8">
          <h3 className="text-2xl font-bold text-[#001F5A]">Research & Publications</h3>
          <div className="mt-4 grid gap-4">
            <article className="p-4 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Learning with Domain Knowledge to Develop Justifiable Convolutional Networks</div>
                  <div className="text-sm text-gray-600">Bhosale, R. & Mrinal Das — Asian Conference on Machine Learning (ACML), 2023</div>
                </div>
                <div className="text-xs text-gray-400">ACML 2023</div>
              </div>
              <div className="mt-2 text-sm">
                <a href="https://proceedings.mlr.press/v189/bhosale23a.html" className="underline">Paper (ACML)</a>
              </div>
            </article>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="py-8 border-t pt-8">
          <h3 className="text-2xl font-bold text-[#001F5A]">Experience & Education</h3>
          <div className="mt-4 grid gap-4">
            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Doctoral Researcher — Singapore Management University</div>
                  <div className="text-sm text-gray-600">Aug 2024 — Present • SMU, Singapore</div>
                </div>
                <div className="text-sm text-gray-400">Research | XAI | VLMs</div>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">
                <li>Doctoral research focusing on explainability and clinically-relevant model behavior.</li>
                <li>Collaborating with clinical partners for evaluation and alignment with workflows.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Product Engineer — Vijña Labs, SLK</div>
                  <div className="text-sm text-gray-600">Jun 2022 — Aug 2024 • Bangalore, India</div>
                </div>
                <div className="text-sm text-gray-400">Doc Info Extraction • LLMs • CV+NLP</div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">MS by Research (CS) — IIT Palakkad</div>
                  <div className="text-sm text-gray-600">Jul 2019 — Mar 2022</div>
                </div>
                <div className="text-sm text-gray-400">Thesis: Causally Focused CNNs</div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <section id="contact" className="py-12 border-t mt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold">Let's collaborate</h3>
            <p className="mt-2 text-gray-600">I'm open to academic collaborations, PhD supervision enquiries, and industry research roles in AI for healthcare.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="mailto:rimmon281996@gmail.com" className="px-5 py-2 border rounded-md">rimmon281996@gmail.com</a>
              <a href="https://github.com/BRim28" className="px-5 py-2 bg-[#001F5A] text-white rounded-md">GitHub</a>
              <a href="https://www.linkedin.com/in/rimmon" className="px-5 py-2 border rounded-md">LinkedIn</a>
            </div>

            <div className="mt-6 text-xs text-gray-400">© Rimmon Bhosale — {new Date().getFullYear()}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
