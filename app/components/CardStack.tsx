"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const projects = [
  {
    title: "Vanguard",
    category: "Fintech",
    description: "Redefining the future of personal banking with an interface that feels like magic, not math.",
    year: "2024",
    color: "#E6E5E0" // Standard Beige
  },
  {
    title: "Lumina",
    category: "AI Research",
    description: "Visualizing complex neural networks in real-time for researchers and data scientists.",
    year: "2023",
    color: "#D4D3CD" // Slightly darker beige
  },
  {
    title: "Apex",
    category: "Automotive",
    description: "HMI systems for the next generation of electric autonomous vehicles.",
    year: "2023",
    color: "#C2C1BB" // Even darker
  },
  {
    title: "Orbit",
    category: "Aerospace",
    description: "Mission control software designed for deep space exploration telemetry.",
    year: "2022",
    color: "#B0B0AA" // Darkest beige/grey
  }
];

export default function CardStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative mt-20 mb-40">
      <div className="px-6 md:px-12 mb-20">
         <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Selected Works</h2>
      </div>
      
      {projects.map((project, i) => {
        // Calculate dynamic scaling for the stack effect
        const targetScale = 1 - ((projects.length - i) * 0.05); 
        return (
          <Card 
            key={i} 
            i={i} 
            {...project} 
            progress={scrollYProgress} 
            range={[i * 0.25, 1]} 
            targetScale={targetScale} 
          />
        );
      })}
    </div>
  );
}

function Card({ i, title, category, description, year, color, progress, range, targetScale }: any) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, backgroundColor: color, top: `calc(-10% + ${i * 25}px)` }} 
        className="relative flex flex-col h-[600px] w-[90vw] md:w-[1000px] rounded-3xl p-10 md:p-16 shadow-2xl origin-top border border-black/5"
      >
        <div className="flex justify-between items-start mb-10">
            <h3 className="text-4xl md:text-7xl font-bold text-card-foreground tracking-tighter uppercase">{title}</h3>
            <span className="text-xl font-mono text-card-foreground/60 border border-card-foreground/20 px-4 py-1 rounded-full">{year}</span>
        </div>

        <div className="flex-grow flex items-center justify-center overflow-hidden rounded-xl bg-[#1C1C1E] relative">
            {/* Placeholder for project image - using a geometric abstract shape */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <div className={`w-64 h-64 rounded-full border-4 border-[#FF4D00] ${i % 2 === 0 ? 'rounded-full' : 'rounded-none rotate-45'}`}></div>
             </div>
             <motion.div style={{ scale: imageScale }} className="relative z-10 text-center">
                 <span className="text-white/50 text-sm uppercase tracking-widest">Project Preview</span>
             </motion.div>
        </div>

        <div className="flex justify-between items-end mt-10 text-card-foreground">
            <div className="max-w-md">
                <span className="block text-sm uppercase tracking-widest text-card-foreground/60 mb-2">{category}</span>
                <p className="text-2xl font-medium leading-tight">{description}</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-lg font-bold hover:text-[#FF4D00] transition-colors">
                View Case Study &rarr;
            </button>
        </div>
      </motion.div>
    </div>
  )
}
