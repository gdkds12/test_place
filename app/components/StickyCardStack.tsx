"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

// Section Data
const cards = [
  { 
    id: "hello", 
    bg: "var(--color-rm-orange)", 
    title: "Hello", 
    textColor: "white",
    content: (
      <div className="flex flex-col justify-end h-full pb-20">
        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-overlay">
          Raw <br/> Materials
        </h1>
        <div className="flex justify-between items-end mt-12 border-t border-white/30 pt-6">
            <p className="text-xl md:text-2xl font-medium max-w-md">
                Digital Product Studio
            </p>
            <ArrowDown className="w-12 h-12 animate-bounce" />
        </div>
      </div>
    )
  },
  { 
    id: "work", 
    bg: "var(--color-rm-black)", 
    title: "Work", 
    textColor: "white",
    content: (
       <div className="flex flex-col h-full">
         <div className="space-y-8 mt-10">
            {["Vanguard", "Lumina", "Apex"].map((project, i) => (
                <div key={i} className="group flex items-center justify-between border-b border-white/20 pb-8 cursor-pointer">
                    <span className="text-4xl md:text-6xl font-medium tracking-tight group-hover:text-rm-blue transition-colors">{project}</span>
                    <span className="text-sm border border-white/20 rounded-full px-3 py-1">202{4-i}</span>
                </div>
            ))}
         </div>
         <div className="mt-auto pb-20">
            <button className="bg-rm-blue text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform w-full md:w-auto">
                View All Projects
            </button>
         </div>
       </div>
    )
  },
  { 
    id: "talent", 
    bg: "var(--color-rm-blue)", 
    title: "Talent", 
    textColor: "white",
    content: (
        <div className="flex flex-col h-full justify-between pb-20">
            <p className="text-4xl md:text-6xl font-medium leading-tight max-w-4xl">
                We are a collective of designers, engineers, and strategists building the future of digital interaction.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2">Design</h3>
                    <p className="opacity-80">UI/UX, Motion, 3D</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                     <h3 className="text-2xl font-bold mb-2">Tech</h3>
                     <p className="opacity-80">Full-stack, WebGL, AI</p>
                </div>
            </div>
        </div>
    )
  },
  { 
    id: "contact", 
    bg: "var(--color-rm-beige)", 
    title: "Contact", 
    textColor: "black",
    content: (
        <div className="flex flex-col h-full justify-between pb-20">
             <div>
                <a href="mailto:hello@rawmaterials.co" className="text-[8vw] font-bold tracking-tighter hover:text-rm-orange transition-colors block leading-none">
                    hello@<br/>rawmaterials.co
                </a>
             </div>
             <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-rm-orange transition-colors">
                    Instagram
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-rm-orange transition-colors">
                    LinkedIn
                </button>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-4 bg-rm-green"></div>
        </div>
    )
  },
];

export default function StickyCardStack() {
  return (
    <div className="bg-black min-h-screen pb-20 font-sans">
      {/* Sticky Header with Mix-Blend-Mode */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-6 py-6 mix-blend-difference text-white pointer-events-none">
        <span className="text-xl font-bold tracking-tighter uppercase">Raw Materials</span>
        <span className="font-mono text-sm">[MENU]</span>
      </nav>

      <div className="flex flex-col relative">
        {cards.map((card, i) => (
          <StickyCard key={card.id} {...card} index={i} total={cards.length} />
        ))}
      </div>
    </div>
  );
}

function StickyCard({ bg, title, textColor, index, content }: any) {
  // Stacking logic: Each card sticks top + offset
  const stickyTop = index * 50; // 50px offset allows previous card headers to peek through
  
  return (
    <motion.div
      style={{ 
        backgroundColor: bg, 
        color: textColor,
        top: stickyTop, 
        zIndex: index 
      }}
      className="sticky w-full h-screen rounded-t-[24px] border-t border-black/5 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.3)] origin-top"
    >
      <div className="p-6 md:p-12 pt-20 flex flex-col h-full relative">
        {/* Section Number */}
        <span className="absolute top-6 left-6 md:left-12 text-sm font-mono opacity-60">
            0{index + 1}
        </span>
        
        {/* Card Title (Visible in the sticky header area) */}
        <h2 className="absolute top-6 right-6 md:right-12 text-sm font-bold uppercase tracking-widest opacity-80">
            {title}
        </h2>
        
        {/* Content Container */}
        <div className="mt-4 h-full">
            {content}
        </div>
      </div>
    </motion.div>
  );
}
