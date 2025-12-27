"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Menu, ArrowDown, ArrowUpRight } from "lucide-react";

// The actual site has specific card heights and behaviors
const sections = [
  {
    id: "landing",
    bg: "var(--color-rm-beige)",
    content: (
      <div className="flex flex-col items-center w-full px-6 md:px-12 pt-24">
        <div className="flex justify-between w-full mb-8 border-b border-rm-black/10 pb-4">
            <span className="text-sm font-medium uppercase tracking-tighter">Raw Materials</span>
            <span className="text-sm font-medium uppercase tracking-tighter">Studio &copy; 2025</span>
        </div>
        <h1 className="text-[18vw] leading-[0.8] font-bold tracking-tighter uppercase w-full text-left mb-12">
          Unusual<br/>Digital
        </h1>
        <div className="flex justify-between items-end w-full border-t border-rm-black pt-8 mt-12">
            <p className="max-w-sm text-lg md:text-xl font-medium leading-tight">
                A digital product design studio crafting unusual experiences for forward-thinking brands.
            </p>
            <div className="animate-bounce p-4 border border-rm-black rounded-full">
                <ArrowDown className="w-6 h-6" />
            </div>
        </div>
      </div>
    )
  },
  {
    id: "work-intro",
    bg: "var(--color-rm-black)",
    textColor: "white",
    content: (
        <div className="flex flex-col justify-between h-full p-12">
            <span className="text-7xl font-bold">01</span>
            <h2 className="text-[12vw] leading-none font-bold uppercase tracking-tighter">Selected<br/>Works</h2>
        </div>
    )
  }
];

const projects = [
    { title: "855-HOW-TO-QUIT", category: "Social Impact", color: "var(--color-rm-orange)" },
    { title: "Vanguard", category: "Fintech", color: "var(--color-rm-blue)" },
    { title: "Lumina AI", category: "Technology", color: "var(--color-rm-green)" }
];

export default function StickyCardStack() {
  return (
    <div className="bg-rm-beige min-h-screen font-sans overflow-x-hidden">
      {/* Sticky Navigation (Actual Layout) */}
      <nav className="fixed top-0 left-0 bottom-0 w-[226px] hidden lg:flex flex-col items-center py-12 z-[1000] mix-blend-difference text-white pointer-events-none border-right border-white/5">
        <div className="pointer-events-auto cursor-pointer mb-12">
            <Menu className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-4 items-start w-full px-8 mt-auto mb-12 opacity-50 text-sm font-mono">
            <span>[01] HELLO</span>
            <span>[02] WORK</span>
            <span>[03] TALENT</span>
            <span>[04] CONTACT</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="lg:pl-[226px] w-full flex flex-col gap-4 p-4">
        
        {/* Landing Section */}
        <section className="w-full bg-white border border-rm-black/10 rounded-[16px] overflow-hidden min-h-[90vh]">
            {sections[0].content}
        </section>

        {/* Section Divider Style */}
        <div className="sticky top-4 z-[50] bg-rm-orange text-white h-[40px] rounded-[16px] flex items-center justify-between px-12 shadow-lg">
            <span className="text-xs font-bold uppercase">Work</span>
            <span className="text-xs font-mono">01</span>
        </div>

        {/* Work Intro Card */}
        <section className="w-full h-[60vh] bg-rm-black text-white rounded-[16px] overflow-hidden">
            {sections[1].content}
        </section>

        {/* Dynamic Project Cards */}
        {projects.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
        ))}

        {/* Footer Card */}
        <section className="w-full h-screen bg-rm-beige border border-rm-black rounded-[16px] flex flex-col items-center justify-center p-12 relative overflow-hidden">
             <motion.h2 
                initial={{ x: "100%" }}
                whileInView={{ x: "-50%" }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[25vw] font-bold whitespace-nowrap opacity-10 absolute pointer-events-none"
             >
                LET'S TALK RAW MATERIALS LET'S TALK RAW MATERIALS
             </motion.h2>
             <a href="mailto:hello@rawmaterials.com" className="text-4xl md:text-7xl font-bold underline decoration-rm-orange decoration-4 underline-offset-8 hover:text-rm-orange transition-colors z-10">
                hello@rawmaterials.com
             </a>
             <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full z-10">
                {["Instagram", "Twitter", "LinkedIn", "Careers"].map(link => (
                    <div key={link} className="border-t border-rm-black pt-4 flex justify-between items-center group cursor-pointer">
                        <span className="font-bold uppercase text-sm">{link}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                ))}
             </div>
        </section>

      </div>
    </div>
  );
}

function ProjectCard({ title, category, color, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      onClick={() => setIsOpen(!isOpen)}
      layout
      className={`relative w-full cursor-pointer rounded-[16px] overflow-hidden bg-rm-black border border-white/5 shadow-2xl rm-transition ${isOpen ? 'h-[70vh]' : 'h-[11.1vw] min-h-[120px]'}`}
    >
        {/* Placeholder for project background - usually a video or high res image */}
        <div className={`absolute inset-0 opacity-40 bg-gradient-to-br from-rm-black to-transparent`} style={{ backgroundColor: color }}></div>
        
        <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-center">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-rm-grey text-xs uppercase font-bold mb-2 tracking-widest">{category}</span>
                    <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tighter">{title}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                    <span className="text-2xl text-white">+</span>
                </div>
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8"
                >
                    <p className="max-w-xl text-xl text-white/80 leading-snug">
                        Pushing the boundaries of digital interaction for the world's most innovative brands. 
                        A deep dive into strategy, design, and technical execution.
                    </p>
                    <button className="bg-white text-rm-black px-8 py-4 rounded-full font-bold hover:bg-rm-orange hover:text-white transition-colors">
                        View Case Study
                    </button>
                </motion.div>
            )}
        </div>
    </motion.div>
  );
}