"use client";

import Image from "next/image";

const navItems = [
  { label: "AV", href: "#top" },
  { label: "Work Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function HomePage() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-black text-white transition-colors duration-500"
    >
      <div className="relative z-10">
        {/* NAVBAR */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-2xl sm:px-8">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            {/* Left: AV chip */}
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 shadow-[0_0_25px_rgba(255,255,255,0.35)] backdrop-blur-3xl"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-sm font-semibold text-slate-950">
                AV
              </span>
              <span className="hidden sm:inline">Aleksa Vucak</span>
            </a>

            {/* Middle: nav links */}
            <nav className="hidden items-center gap-2 text-xs sm:flex sm:text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium text-white/80 backdrop-blur-2xl transition hover:bg-white/15 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO — fills the rest of the screen under the navbar */}
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            {/* Circular image with local blue glow */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-sky-500/35" />
              <div className="relative rounded-full border border-white/20 bg-white/10 p-[3px] shadow-[0_0_60px_rgba(56,189,248,0.7)]">
                <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
                  <Image
                    src="/me2.jpg"
                    alt="Aleksa Vucak"
                    fill
                    className="object-cover object-[55%_50%]"
                  />
                </div>
              </div>
            </div>

            {/* Name + tagline */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                SOFTWARE ENGINEER · AI/ML/RL
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Aleksa Vucak
              </h1>
              <p className="max-w-xl text-sm text-white/70 sm:text-base">
                AI &amp; software engineer focused on building useful tools,
                teaching systems programming, and shipping projects that
                actually get used.
              </p>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE – vertical timeline */}
        <section
          id="experience"
          className="border-t border-white/10 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-5xl">
            {/* centered heading + shorter subtitle */}
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Work Experience
              </h2>
              <p className="mx-auto max-w-xl text-sm text-white/60 sm:text-base">
              My track record across academia and industry.
              </p>
            </div>

            <ol className="relative space-y-8 border-l border-white/10 pl-6">
              {/* TA – TOP (most recent) */}
              <li className="relative">
                {/* timeline dot – yellow */}
                <span className="absolute -left-[9px] top-3 h-4 w-4 rounded-full bg-amber-400 ring-4 ring-black" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    {/* UWindsor logo */}
                    <div className="relative h-10 w-10 rounded-xl bg-white">
                      <Image
                        src="/uow.png"
                        alt="University of Windsor logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold sm:text-base">
                        Undergraduate Teaching Assistant
                      </h3>
                      <p className="text-xs text-white/60 sm:text-sm">
                        University of Windsor · School of Computer Science
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                      September 2025 - Present
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
                    <li>• Led labs in C, Unix, and low-level systems.</li>
                    <li>• Marked assignments and crafted detailed feedback.</li>
                    <li>• Coached 100+ students on debugging, tooling, and design.</li>
                  </ul>
                </article>
              </li>

              {/* Stellantis – middle */}
              <li className="relative">
                {/* timeline dot – blue */}
                <span className="absolute -left-[9px] top-3 h-4 w-4 rounded-full ring-4 ring-black" style={{ backgroundColor: "#243882" }} />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    {/* Stellantis logo */}
                    <div className="relative h-10 w-10 rounded-xl bg-white">
                      <Image
                        src="/stellantis.png"
                        alt="Stellantis logo"
                        fill
                        className="object-contain scale-150"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold sm:text-base">
                        Machine Learning Engineer Co-op
                      </h3>
                      <p className="text-xs text-white/60 sm:text-sm">
                        Stellantis · Battery State Estimation
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                      April 2025 - August 2025
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
                    <li>• Battery health and fault-detection ML tooling.</li>
                    <li>• Data pipelines, feature engineering, and eval dashboards.</li>
                    <li>
                      • Partnered with controls engineers on production EV
                      use-cases.
                    </li>
                  </ul>
                </article>
              </li>

              {/* Glendor – bottom (oldest) */}
              <li className="relative">
                {/* timeline dot – green */}
                <span className="absolute -left-[9px] top-3 h-4 w-4 rounded-full bg-[#1fa985] ring-4 ring-black" />
                <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    {/* Glendor logo */}
                    <div className="relative h-10 w-10 rounded-xl bg-white">
                      <Image
                        src="/glendor.svg"
                        alt="Glendor logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold sm:text-base">
                        Software Engineer Intern
                      </h3>
                      <p className="text-xs text-white/60 sm:text-sm">
                        Glendor, Inc. · Medical Imaging
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                      September 2024 - December 2024
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/70 sm:text-sm">
                    <li>• De-identification of PHI in CT/MRI data.</li>
                    <li>
                      • Blur-detection & anonymization pipelines using CV
                      models.
                    </li>
                    <li>• Contributing toward publication-ready research.</li>
                  </ul>
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
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
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
                  PROJECT GALLERY UNDER CONSTRUCTION
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}