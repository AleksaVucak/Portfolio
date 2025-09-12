import React, { useRef, Suspense } from 'react';
import Navbar from './Navbar';
import Tilt from 'react-parallax-tilt';
import emailjs from '@emailjs/browser';

import './index.css';

import resumePdf from './assets/AleksaVucak_Resume.pdf';

import ActionFigure from './images/ActionFigure3.png';
import BlobBackground from './images/blob.png';
import CityLogo from './images/city.png';
import GlendorLogo from './images/glendor.png';
import StellantisLogo from './images/stellantis.png';
import SprayAndPlayThumb from './images/sprayandplay2.png';
import PyFlyerThumb from './images/pyflyer.png';
import BankMasterThumb from './images/bankmaster.png';
import PrivaseeThumb from './images/privasee2.png';
import ShapeShiftersThumb from './images/shapeshifters.png';
import PortfolioThumb from './images/portfolio.png';
import UWindsorLogo from './images/uwindsor.png';

import { FaGithub, FaLinkedin, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import DesktopModel from './DesktopModel';
import GlobeModel from './GlobeModel';

import { Typewriter } from 'react-simple-typewriter';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_f4wzuen', 'template_bdufpmg', form.current, 'PpzRCWX6v-6tCPA3S')
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          toast.error('Failed to send the message. Please try again.');
        }
      );
  };

  const projects = [
    { name: 'SprayAndPlay', link: 'https://github.com/AleksaVucak/Spray-and-Play', image: SprayAndPlayThumb },
    { name: 'PyFlyer', link: 'https://github.com/AleksaVucak/PyFlyer', image: PyFlyerThumb },
    { name: 'BankMaster', link: 'https://github.com/AleksaVucak/Bank-Master', image: BankMasterThumb },
    { name: 'Privasee', link: 'https://github.com/AleksaVucak/PrivaSee', image: PrivaseeThumb },
    { name: 'ShapeShifters', link: 'https://github.com/AleksaVucak/ShapeShifters', image: ShapeShiftersThumb },
    { name: 'Portfolio', link: 'https://github.com/AleksaVucak/Portfolio', image: PortfolioThumb },
    { name: 'Zajedno', link: 'https://github.com/AleksaVucak/Oddsify', comingSoon: true },
  ];

  return (
    <>
      {/* Smooth scrolling for anchor navigation */}
      <style>{`html{scroll-behavior:smooth}`}</style>

      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="toaster-container"
        toastOptions={{
          style: {
            background: '#6366f1',
            color: 'white',
            fontWeight: 'bold',
            padding: '14px 20px',
            borderRadius: '8px',
          },
        }}
      />
      <div id="top" className="bg-black text-white min-h-screen relative overflow-hidden">
        <Navbar />
        <main className="pt-24 pb-0 relative z-10">
          {/* Hero Section */}
          <section className="min-h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center justify-center px-4 gap-10">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold">Aleksa Vučak</h1>
              <h2 className="mt-4 text-lg md:text-xl text-indigo-400 tracking-widest font-medium uppercase">
                <Typewriter
                  words={[
                    'SOFTWARE DEVELOPER.',
                    'WRITES CODE. WRITES STORIES.',
                    'FROM IDEA TO INTERFACE.',
                    'ENGINEERING THE UNEXPECTED.',
                    'TURNING LOGIC INTO MAGIC.',
                    'WHERE DESIGN MEETS DEV.',
                    'CODE. CREATE. REPEAT.',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={2000}
                />
              </h2>
              <div className="mt-6 space-y-3 flex flex-col items-center md:items-start">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-indigo-400 hover:text-white transition-all"
                download="AleksaVucak_Resume.pdf"
              >
                Resume <FaFileAlt className="text-xl" />
              </a>

              <a
                href="https://github.com/AleksaVucak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-indigo-400 hover:text-white transition-all"
              >
                GitHub <FaGithub className="text-xl" />
              </a>

              <a
                href="https://www.linkedin.com/in/aleksa-vucak-587923298"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-indigo-400 hover:text-white transition-all"
              >
                LinkedIn <FaLinkedin className="text-xl" />
              </a>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <img src={ActionFigure} alt="Action Figure" className="rounded-2xl w-full object-contain" />
            </div>
          </section>

          {/* 3D Model Section */}
          <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
            <img
              src={BlobBackground}
              alt="Blob"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[1750px] max-w-none opacity-100 pointer-events-none mix-blend-screen"
            />
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 5], fov: 50 }}>
              <ambientLight intensity={5} />
              <directionalLight position={[2, 6, 2]} intensity={2} />
              <Suspense fallback={null}>
                <DesktopModel />
              </Suspense>
              <OrbitControls enableZoom={false} />
            </Canvas>
          </section>

          {/* Work Experience Section */}
          <section id="experience" className="py-14 px-4 bg-black scroll-mt-2 md:scroll-mt-6">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">Work Experience</h2>
              <p className="mt-2 text-sm md:text-base text-indigo-400 tracking-widest uppercase font-semibold">
                My Professional Path.
              </p>
            </div>

            {/* ===== Mobile (stacked) timeline ===== */}
            <div className="relative max-w-xl mx-auto md:hidden">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/60" />
              <div className="space-y-10">
                {/* 1 */}
                <div className="relative pl-10">
                  <span className="absolute left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white" />
                  <p className="text-white text-xs uppercase mb-2">JUN 2022 – AUG 2025</p>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-4">
                      <img src={CityLogo} alt="City of Windsor Logo" className="w-full h-28 object-contain" />
                    </div>
                    <div className="bg-indigo-500 text-white p-4">
                      <h3 className="text-base font-bold">Recreation Program Instructor</h3>
                      <p className="text-xs font-medium mt-1 uppercase">WINDSOR, ON • IN-PERSON</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Led engaging sports classes for kids ages 6-12 in soccer, basketball, floor hockey, and badminton, fostering teamwork and skill development through structured activities</li>
                        <li>Created and executed over 450 detailed lesson plans that taught fundamental techniques and strategies, ensuring a fun and inclusive learning environment</li>
                        <li>Facilitated recreational chess sessions, promoting critical thinking and problem-solving skills among 40+ participants</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 2 */}
                <div className="relative pl-10">
                  <span className="absolute left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white" />
                  <p className="text-white text-xs uppercase mb-2 text-right pr-1">SEP 2024 – DEC 2024</p>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-4">
                      <img src={GlendorLogo} alt="Glendor Logo" className="w-full h-28 object-contain" />
                    </div>
                    <div className="bg-indigo-500 text-white p-4">
                      <h3 className="text-base font-bold">Software Engineer Intern</h3>
                      <p className="text-xs font-medium mt-1 uppercase">DRAPER, UT • REMOTE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Applied blur application and detection algorithms to process more than 2000 medical images and video frames, achieving 92% accuracy in identifying sensitive regions while preserving clinical context</li>
                        <li>Automated results generation and storage with Python scripts that add metadata, rename outputs, and file assets into structured folders, reducing manual intervention by 99% and creating a consistent audit trail for review</li>
                        <li>Partnered with a team of 7 to deploy AI pipelines with real-time inference in existing healthcare workflows</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 3 */}
                <div className="relative pl-10">
                  <span className="absolute left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white" />
                  <p className="text-white text-xs uppercase mb-2">APR 2025 – AUG 2025</p>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-4">
                      <img src={StellantisLogo} alt="Stellantis Logo" className="w-full h-28 object-contain" />
                    </div>
                    <div className="bg-indigo-500 text-white p-4">
                      <h3 className="text-base font-bold">Machine Learning Engineer Co-op</h3>
                      <p className="text-xs font-medium mt-1 uppercase">WINDSOR, ON • ON-SITE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Designed and tuned supervised and unsupervised models on sliding window BMS time series with voltage sag, SOC, and thermal signals, raising precision at the target recall by 21% on batteries across varied drive profiles</li>
                        <li>Added SOC aware calibration with validation driven threshold policies from PR analyses, reducing false positive alerts by 32% while preserving recall and preventing leakage through validation test splits</li>
                        <li>Automated experiment tracking and generated reports for engineers showing window timelines, feature drivers, and risk band summaries, cutting triage time per log by 60% and ensuring reproducible results for integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 4 */}
                <div className="relative pl-10">
                  <span className="absolute left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white" />
                  <p className="text-white text-xs uppercase mb-2 text-right pr-1">JUL 2025 - PRESENT</p>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-4">
                      <img src={CityLogo} alt="City of Windsor Logo" className="w-full h-28 object-contain" />
                    </div>
                    <div className="bg-indigo-500 text-white p-4">
                      <h3 className="text-base font-bold">Facility Attendant</h3>
                      <p className="text-xs font-medium mt-1 uppercase">WINDSOR, ON • ON-SITE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Operate front desk with ActiveNet, processing 150–250 check-ins per day while handling registrations, bookings, payments, and accurate cash closure</li>
                        <li>Prepare and reset spaces for programs and rentals, completing 4–8 room turnovers per shift to keep schedules on time</li>
                        <li>Monitor facility safety and customer experience through scheduled walkthroughs, policy enforcement, incident response, and clear documentation and handoffs</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 5 */}
                <div className="relative pl-10">
                  <span className="absolute left-4 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white" />
                  <p className="text-white text-xs uppercase mb-2">SEP 2025 - PRESENT</p>
                  <div className="bg-white text-black rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-4">
                      <img src={UWindsorLogo} alt="University of Windsor Logo" className="w-full h-28 object-contain" />
                    </div>
                    <div className="bg-indigo-500 text-white p-4">
                      <h3 className="text-base font-bold">Undergraduate Teaching Assistant</h3>
                      <p className="text-xs font-medium mt-1 uppercase">WINDSOR, ON • HYBRID</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Lead a 33-student weekly Systems Programming lab, teaching C and Unix fundamentals and guiding debugging of processes, pipes, sockets, file I/O, and memory management through structured live demonstrations</li>
                        <li>Hosted weekly office hours, resolving student questions through targeted code reviews, step-by-step walkthroughs, and clear follow-ups</li>
                        <li>Graded all labs, assignments, and exams with consistent rubric-based feedback, returning marks within 72 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Desktop (alternating) timeline ===== */}
            <div className="relative w-full max-w-4xl mx-auto h-[1600px] hidden md:block">
              {/* control line tails with top/bottom percentages */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[2%] bottom-[2%] w-1 bg-white"></div>

              {/* 1) City of Windsor — LEFT (top 12%) */}
              <div className="absolute left-1/2 top-[12%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="absolute top-[12%] left-[calc(50%+2rem)] -translate-y-1/2 text-white text-sm md:text-base uppercase">
                JUN 2022 – AUG 2025
              </p>
              <div className="absolute top-[12%] right-[calc(50%+3rem)] -translate-y-1/2">
                <div className="group w-[85vw] md:w-[36rem] h-[300px] md:h-64 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                      <img src={CityLogo} alt="City of Windsor Logo" className="w-full h-full object-contain p-6" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[12px] border-transparent border-l-white"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500 text-white p-4 md:p-6 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <h3 className="text-lg font-bold">Recreation Program Instructor</h3>
                      <p className="text-sm font-medium mt-1 uppercase">WINDSOR, ON • IN-PERSON</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Led engaging sports classes for kids ages 6-12 in soccer, basketball, floor hockey, and badminton, fostering teamwork and skill development through structured activities</li>
                        <li>Created and executed over 450 detailed lesson plans that taught fundamental techniques and strategies, ensuring a fun and inclusive learning environment</li>
                        <li>Facilitated recreational chess sessions, promoting critical thinking and problem-solving skills among 40+ participants</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2) Glendor — RIGHT (top 31%) */}
              <div className="absolute left-1/2 top-[31%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="absolute top-[31%] right-[calc(50%+2rem)] -translate-y-1/2 text-white text-sm md:text-base uppercase text-right">
                SEP 2024 – DEC 2024
              </p>
              <div className="absolute top-[31%] left-[calc(50%+3rem)] -translate-y-1/2">
                <div className="group w-[90vw] md:w-[36rem] h-64 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                      <img src={GlendorLogo} alt="Glendor Logo" className="w-full h-full object-contain p-6" />
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-transparent border-r-white"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500 text-white p-6 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <h3 className="text-lg font-bold">Software Engineer Intern</h3>
                      <p className="text-sm font-medium mt-1 uppercase">DRAPER, UT • REMOTE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Applied blur application and detection algorithms to process more than 2000 medical images and video frames, achieving 92% accuracy in identifying sensitive regions while preserving clinical context</li>
                        <li>Automated results generation and storage with Python scripts that add metadata, rename outputs, and file assets into structured folders, reducing manual intervention by 99% and creating a consistent audit trail for review</li>
                        <li>Partnered with a team of 7 to deploy AI pipelines with real-time inference in existing healthcare workflows</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3) Stellantis — LEFT (top 50%) */}
              <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="absolute top-[50%] left-[calc(50%+2rem)] -translate-y-1/2 text-white text-sm md:text-base uppercase">
                APR 2025 – AUG 2025
              </p>
              <div className="absolute top-[50%] right-[calc(50%+3rem)] -translate-y-1/2">
                <div className="group w-[90vw] md:w-[36rem] h-64 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                      <img src={StellantisLogo} alt="Stellantis Logo" className="w-full h-full object-contain p-6" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[12px] border-transparent border-l-white"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500 text-white p-6 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <h3 className="text-lg font-bold">Machine Learning Engineer Co-op</h3>
                      <p className="text-sm font-medium mt-1 uppercase">WINDSOR, ON • ON-SITE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Designed and tuned supervised and unsupervised models on sliding window BMS time series with voltage sag, SOC, and thermal signals, raising precision at the target recall by 21% on batteries across varied drive profiles</li>
                        <li>Added SOC aware calibration with validation driven threshold policies from PR analyses, reducing false positive alerts by 32% while preserving recall and preventing leakage through validation test splits</li>
                        <li>Automated experiment tracking and generated reports for engineers showing window timelines, feature drivers, and risk band summaries, cutting triage time per log by 60% and ensuring reproducible results for integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4) City of Windsor — RIGHT (top 69%) */}
              <div className="absolute left-1/2 top-[69%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="absolute top-[69%] right-[calc(50%+2rem)] -translate-y-1/2 text-white text-sm md:text-base uppercase text-right">
                JUL 2025 - PRESENT
              </p>
              <div className="absolute top-[69%] left-[calc(50%+3rem)] -translate-y-1/2">
                <div className="group w-[90vw] md:w-[36rem] h-64 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                      <img src={CityLogo} alt="City of Windsor Logo" className="w-full h-full object-contain p-6" />
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-transparent border-r-white"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500 text-white p-6 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <h3 className="text-lg font-bold">Facility Attendant</h3>
                      <p className="text-sm font-medium mt-1 uppercase">WINDSOR, ON • ON-SITE</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Operate front desk with ActiveNet, processing 150–250 check-ins per day while handling registrations, bookings, payments, and accurate cash closure</li>
                        <li>Prepare and reset spaces for programs and rentals, completing 4–8 room turnovers per shift to keep schedules on time</li>
                        <li>Monitor facility safety and customer experience through scheduled walkthroughs, policy enforcement, incident response, and clear documentation and handoffs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5) University of Windsor — LEFT (top 88%) */}
              <div className="absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <p className="absolute top-[88%] left-[calc(50%+2rem)] -translate-y-1/2 text-white text-sm md:text-base uppercase">
                SEP 2025 - PRESENT
              </p>
              <div className="absolute top-[88%] right-[calc(50%+3rem)] -translate-y-1/2">
                <div className="group w-[90vw] md:w-[36rem] h-64 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                      <img src={UWindsorLogo} alt="University of Windsor Logo" className="w-full h-full object-contain p-6" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[12px] border-transparent border-l-white"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500 text-white p-6 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <h3 className="text-lg font-bold">Undergraduate Teaching Assistant</h3>
                      <p className="text-sm font-medium mt-1 uppercase">WINDSOR, ON • HYBRID</p>
                      <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                        <li>Lead a 33-student weekly Systems Programming lab, teaching C and Unix fundamentals and guiding debugging of processes, pipes, sockets, file I/O, and memory management through structured live demonstrations</li>
                        <li>Hosted weekly office hours, resolving student questions through targeted code reviews, step-by-step walkthroughs, and clear follow-ups</li>
                        <li>Graded all labs, assignments, and exams with consistent rubric-based feedback, returning marks within 72 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-14 px-4 bg-black scroll-mt-6 md:scroll-mt-10 -mt-6 md:-mt-10">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">Projects</h2>
              <p className="mt-2 text-sm md:text-base text-indigo-400 tracking-widest uppercase font-semibold">
                A LOOK INTO WHAT I’VE BUILT.
              </p>
            </div>

            {/* First Row */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {projects.slice(0, 4).map((project, index) => (
                <div
                  key={index}
                  className="w-full sm:w-72 bg-white text-black rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-[0_0_20px_4px_white]"
                >
                  {project.comingSoon ? (
                    <div className="h-40 w-full bg-gray-200 text-black flex items-center justify-center font-bold text-xl">
                      Coming Soon
                    </div>
                  ) : (
                    <img src={project.image} alt={project.name} className="h-40 w-full object-cover" />
                  )}
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-400 text-black">
                    <h3 className="text-base font-bold">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="text-black hover:text-gray-800 transition-colors" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row (centered) */}
            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
              {projects.slice(4).map((project, index) => (
                <div
                  key={index}
                  className="w-full sm:w-72 bg-white text-black rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-[0_0_20px_4px_white]"
                >
                  {project.comingSoon ? (
                    <div className="h-40 w-full bg-gray-200 text-black flex items-center justify-center font-bold text-xl">
                      Coming Soon!
                    </div>
                  ) : (
                    <img src={project.image} alt={project.name} className="h-40 w-full object-cover" />
                  )}
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-400 text-black">
                    <h3 className="text-base font-bold">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="text-black hover:text-gray-800 transition-colors" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-14 px-4 bg-black text-white scroll-mt-6 md:scroll-mt-10">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">Skills</h2>
              <p className="mt-2 text-sm md:text-base text-indigo-400 tracking-widest uppercase font-semibold">MY TECH STACK.</p>
            </div>

            {/* Languages - Row 1 */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center mb-8 text-center">
              {[
                { name: 'Python', icon: require('./images/python.png') },
                { name: 'Java', icon: require('./images/java.png') },
                { name: 'C', icon: require('./images/c.png') },
                { name: 'C++', icon: require('./images/cplusplus.png') },
                { name: 'JavaScript', icon: require('./images/javascript.png') },
                { name: 'TypeScript', icon: require('./images/typescript.png') },
              ].map((skill, i) => (
                <Tilt
                  key={skill.name}
                  tiltMaxAngleX={25}
                  tiltMaxAngleY={25}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={300}
                  gyroscope={true}
                >
                  <div
                    className="flex flex-col items-center bg-[#111] rounded-xl p-4 hover:shadow-[0_0_20px_#6366f1] transition-all duration-300"
                    style={{ animation: `fadeIn 0.4s ease ${i * 0.1}s both` }}
                  >
                    <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-2 object-contain" />
                    <span className="text-xs text-gray-300 mt-1">{skill.name}</span>
                  </div>
                </Tilt>
              ))}
            </div>

            {/* Languages - Row 2 (Centered 3 Icons) */}
            <div className="max-w-xl mx-auto grid grid-cols-3 gap-8 justify-items-center text-center">
              {[
                { name: 'SQL', icon: require('./images/sql.png') },
                { name: 'HTML', icon: require('./images/html.png') },
                { name: 'CSS', icon: require('./images/css.png') },
              ].map((skill, i) => (
                <Tilt
                  key={skill.name}
                  tiltMaxAngleX={45}
                  tiltMaxAngleY={45}
                  perspective={800}
                  scale={1.05}
                  transitionSpeed={300}
                  gyroscope={true}
                >
                  <div
                    className="flex flex-col items-center bg-[#111] rounded-xl p-4 hover:shadow-[0_0_20px_#6366f1] transition-all duration-300"
                    style={{ animation: `fadeIn 0.4s ease ${i * 0.1}s both` }}
                  >
                    <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-2 object-contain" />
                    <span className="text-xs text-gray-300 mt-1">{skill.name}</span>
                  </div>
                </Tilt>
              ))}
            </div>

            {/* Line Divider */}
            <div className="w-32 h-[2px] bg-indigo-400 mx-auto my-12 rounded-full"></div>

            {/* Frameworks Grid */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center items-center text-center">
              {[
                { name: 'React', icon: require('./images/react.png') },
                { name: 'Tailwind', icon: require('./images/tailwind.png') },
                { name: 'Flask', icon: require('./images/flask.png') },
                { name: 'FastAPI', icon: require('./images/fastapi.png') },
                { name: 'Three.js', icon: require('./images/threejs.png') },
                { name: 'EmailJS', icon: require('./images/emailjs.png') },
              ].map((tool, i) => (
                <Tilt
                  key={tool.name}
                  tiltMaxAngleX={25}
                  tiltMaxAngleY={25}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={300}
                  gyroscope={true}
                >
                  <div
                    className="flex flex-col items-center bg-[#111] rounded-xl p-4 hover:shadow-[0_0_20px_#6366f1] transition-all duration-300"
                    style={{ animation: `fadeIn 0.4s ease ${(i + 9) * 0.1}s both` }}
                  >
                    <img src={tool.icon} alt={tool.name} className="w-12 h-12 mb-2 object-contain" />
                    <span className="text-xs text-gray-300 mt-1">{tool.name}</span>
                  </div>
                </Tilt>
              ))}
            </div>
          </section>

          {/* Contact Me Section */}
          <section id="contact" className="pt-14 pb-0 md:pb-1 px-4 bg-black text_white scroll-mt-2 md:scroll-mt-6 -mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white">Contact Me</h2>
                <p className="mt-2 text-sm md:text-base text-indigo-400 tracking-widest uppercase font-semibold">I'm all ears.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Form */}
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      required
                      className="w-full md:w-1/2 p-4 bg-[#111] text_white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      required
                      className="w-full md:w-1/2 p-4 bg-[#111] text_white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    <textarea
                      rows="15"
                      name="message"
                      placeholder="Enter Message"
                      required
                      className="w-full p-4 bg-[#111] text_white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-fit bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-600 transition-all"
                    >
                      Send Message
                    </button>
                  </div>
                </form>

                {/* Right: Model */}
                <div className="w-full h-[600px]">
                  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2.5], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[2, 2, 5]} intensity={0} />
                    <Suspense fallback={null}>
                      <GlobeModel scale={0.015} position={[0, 0.175, 0]} />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;