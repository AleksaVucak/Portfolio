"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

export default function HomePage() {
  const handleSmoothScroll = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden text-white transition-colors duration-500 pt-16"
    >
      {/* Dark navy background with subtle blue glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-[#020617] via-black to-black" />
        <div className="absolute inset-0 mix-blend-screen opacity-60 bg-[radial-gradient(circle_at_15%_0%,rgba(56,189,248,0.45),transparent_55%)]" />
        <div className="absolute inset-0 mix-blend-screen opacity-55 bg-[radial-gradient(circle_at_85%_110%,rgba(129,140,248,0.5),transparent_55%)]" />
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <header className="fixed top-4 left-0 right-0 z-20 px-4 sm:px-8">
          <div className="mx-auto flex max-w-5xl items-center rounded-3xl border border-white/10 bg-linear-to-r from-slate-950/90 via-black/80 to-slate-950/90 px-4 py-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            {/* Left: AV logo */}
            <div className="flex flex-1">
              <a
                href="#top"
                onClick={(e) => handleSmoothScroll(e, "#top")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#020617] via-[#0313fc] to-[#3b82f6] text-[11px] font-semibold tracking-tight text-slate-50 ring-2 ring-white/15"
              >
                AV
              </a>
            </div>

            {/* Center: nav buttons */}
            <nav className="flex items-center gap-1 rounded-full bg-white/5 px-1.5 py-1 text-xs sm:text-sm shadow-[0_0_25px_rgba(15,23,42,0.9)]">
              <a
                href="#experience"
                onClick={(e) => handleSmoothScroll(e, "#experience")}
                className="rounded-full px-4 py-1.5 font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                Work Experience
              </a>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")}
                className="rounded-full px-4 py-1.5 font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                Projects
              </a>
            </nav>

            {/* Right: updated status */}
            <div className="hidden flex-1 items-center justify-end gap-2 text-[11px] text-white/50 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span>Updated 02/07/2026</span>
            </div>
          </div>
        </header>

        {/* HERO — fills the rest of the screen under the navbar */}
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            {/* Circular image with modern glow (no extra ring) */}
            <div className="relative">
              {/* animated aurora glow (CSS in globals) */}
              <div className="avatar-glow" />
              {/* inner frame */}
              <div className="relative rounded-full border border-white/20 bg-black/40 p-[3px] shadow-[0_0_60px_rgba(3,19,252,0.9)]">
                <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
                  <Image
                    src="/me2.jpg"
                    alt="Aleksa Vucak"
                    fill
                    className="object-cover object-[54%_50%]"
                  />
                </div>
              </div>
            </div>

            {/* Name + tagline */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                SOFTWARE ENGINEERING STUDENT
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Aleksa Vučak
              </h1>
              <p className="max-w-xl text-sm text-white/70 sm:text-base">
                I’m someone who likes owning the full pipeline: design it, build
                it, and ship it. Most of my work lives where data,
                infrastructure, and product intersect.
              </p>

              {/* CTA buttons – same pill + button style as navbar */}
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-1 rounded-full bg-white/5 px-1.5 py-1 text-xs sm:text-sm shadow-[0_0_25px_rgba(15,23,42,0.9)]">
                  {/* Resume */}
                  <a
                    href="/Aleksa_Vucak_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path
                        d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                      <path
                        d="M14 3v4a1 1 0 0 0 1 1h4"
                        fill="none"
                        stroke="black"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Resume</span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/AleksaVucak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.5.46-3.17-.61-3.37-1.17-.11-.28-.6-1.17-1.02-1.4-.35-.19-.85-.66-.01-.67.79-.01 1.35.73 1.54 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.38 9.38 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/aleksa-vucak-587923298/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        ry="3"
                        fill="currentColor"
                      />
                      <rect x="6.5" y="9" width="2.3" height="7.5" fill="black" />
                      <circle cx="7.65" cy="7" r="1.2" fill="black" />
                      <path
                        d="M12 9h2.1v1.04h.03c.29-.55 1.02-1.13 2.1-1.13 2.25 0 2.67 1.42 2.67 3.27v4.32h-2.3v-3.83c0-.91-.02-2.09-1.27-2.09-1.28 0-1.47 1-1.47 2.03v3.89H12V9z"
                        fill="black"
                      />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Mobile updated status under buttons */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/50 sm:hidden">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>Updated 12/03/2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE – vertical timeline */}
        <section
          id="experience"
          className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16"
        >
          <div className="mx-auto w-full max-w-5xl">
            {/* centered header + subheading */}
            <div className="mb-6 space-y-2 text-center sm:mb-8">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Work Experience
              </h2>
              <p className="text-sm text-white/60 sm:text-base">
                My track record across academia and industry.
              </p>
            </div>

            <ol className="relative space-y-6 pl-0 border-l-0 sm:space-y-8 sm:border-l sm:border-white/10 sm:pl-6">
              {/* Stellantis SWE – TOP (most recent) */}
              <li className="relative">
                {/* mobile dot – Stellantis blue on the right */}
                <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white sm:hidden" />
                {/* timeline dot – Stellantis blue (desktop only) */}
                <span className="absolute hidden h-4 w-4 -left-[9px] top-5 rounded-full bg-blue-600 ring-4 ring-black sm:block" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Stellantis logo */}
                      <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white">
                        <Image
                          src="/stellantis.png"
                          alt="Stellantis logo"
                          fill
                          className="object-contain scale-140"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          Software Engineer Co-op
                        </h3>
                        <p className="text-xs text-white/60 sm:text-sm">
                          Stellantis · Battery OTA Analytics
                        </p>
                      </div>
                    </div>

                    <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 sm:self-center">
                      January 2026 - Present
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                    Engineered an internal EIS platform for Stellantis&apos; <strong>OTA</strong> team using <strong>React</strong>, <strong>TypeScript</strong>, <strong>FastAPI</strong>, and <strong>SQLite</strong> to unify
                    3D circuit configuration, simulation, hardware control,
                    reducing board iteration costs by <strong>$1,050</strong>.
                  </p>
                </article>
              </li>

              {/* TA – second most recent */}
              <li className="relative">
                {/* mobile dot – yellow on the right */}
                <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white sm:hidden" />
                {/* timeline dot – yellow (desktop only) */}
                <span className="absolute hidden h-4 w-4 -left-[9px] top-5 rounded-full bg-amber-400 ring-4 ring-black sm:block" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* UWindsor logo */}
                      <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white">
                        <Image
                          src="/uow.png"
                          alt="University of Windsor logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          Undergraduate Teaching Assistant
                        </h3>
                        <p className="text-xs text-white/60 sm:text-sm">
                          University of Windsor · School of Computer Science
                        </p>
                      </div>
                    </div>

                    <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 sm:self-center">
                      September 2025 - Present
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                    Led a weekly <strong>Software Development</strong> lab for <strong>37 students</strong>, teaching <strong>Java</strong> and <strong>OOP</strong> through live coding, debugging demos, and guided practice 
                    with <strong>classes</strong>, <strong>inheritance</strong>, <strong>interfaces</strong>, and <strong>collections</strong> while providing rubric-based grading 
                    with a typical turnaround under <strong>72 hours</strong>.
                  </p>
                </article>
              </li>

              {/* Stellantis – middle */}
              <li className="relative">
                {/* mobile dot – Stellantis blue on the right */}
                <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white sm:hidden" />
                {/* timeline dot – Stellantis blue (desktop only) */}
                <span className="absolute hidden h-4 w-4 -left-[9px] top-5 rounded-full bg-blue-600 ring-4 ring-black sm:block" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Stellantis logo */}
                      <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white">
                        <Image
                          src="/stellantis.png"
                          alt="Stellantis logo"
                          fill
                          className="object-contain scale-140"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          Machine Learning Engineer Co-op
                        </h3>
                        <p className="text-xs text-white/60 sm:text-sm">
                          Stellantis · Battery State Estimation
                        </p>
                      </div>
                    </div>

                    <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 sm:self-center">
                      April 2025 - August 2025
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                    Developed an end-to-end battery fault-detection pipeline
                    over EV BMS logs using <strong>Python</strong>, <strong>pandas</strong>, <strong>NumPy</strong>, <strong>scikit-learn</strong>,
                    and <strong>tree-based gradient-boosting</strong> models to engineer
                    time-series features and automatically flag risky
                    cells/packs, improving fault-flagging precision at fixed
                    recall by <strong>21%</strong>.
                  </p>
                </article>
              </li>

              {/* Glendor – bottom (oldest) */}
              <li className="relative">
                {/* mobile dot – Glendor green on the right */}
                <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-[#1fa985] ring-2 ring-white sm:hidden" />
                {/* timeline dot – Glendor green (desktop only) */}
                <span className="absolute hidden h-4 w-4 -left-[9px] top-5 rounded-full bg-[#1fa985] ring-4 ring-black sm:block" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Glendor logo */}
                      <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white">
                        <Image
                          src="/glendor.svg"
                          alt="Glendor logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          Software Engineer Intern
                        </h3>
                        <p className="text-xs text-white/60 sm:text-sm">
                          Glendor, Inc. · Medical Imaging
                        </p>
                      </div>
                    </div>

                    <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 sm:self-center">
                      September 2024 - December 2024
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                    Built a <strong>Python/OpenCV</strong> pipeline to detect and blur PHI in <strong>2000+</strong> medical images, tuning CV models and
                    automating reports to reach <strong>92% F1</strong> while eliminating <strong>96%</strong> of the manual file-handling work.
                  </p>
                </article>
              </li>
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="border-t border-white/10 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
            {/* Caution tape block only */}
            <div className="relative mt-2 w-full max-w-3xl overflow-hidden rounded-2xl border border-yellow-400/80 bg-black/70 text-sm sm:text-base">
              {/* stripes */}
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, #facc15, #facc15 16px, #000000 16px, #000000 32px)",
                }}
              />
              {/* content on top */}
              <div className="relative flex items-center justify-center px-6 py-8">
                <span className="rounded-full bg-black/80 px-4 py-1 text-xs font-semibold tracking-wide text-yellow-300 sm:text-sm">
                  🚧 PROJECT GALLERY UNDER CONSTRUCTION 🚧
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}