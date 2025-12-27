"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { Menu, ArrowDown, ArrowUpRight } from "lucide-react";

// Exact Content from Analysis
const heroContent = {
    title: "Raw\nMaterials",
    subtitle: "We design and launch unusually creative digital products that change brands' fortunes."
};

const projects = [
    { title: "7-Eleven Rewards", category: "Retail Experience", color: "#EE2526" }, // 7-Eleven Red
    { title: "Volta Charging", category: "EV Infrastructure", color: "#FFD93E" },   // Volta Yellow
    { title: "Meta AI", category: "Artificial Intelligence", color: "#0064E0" },    // Meta Blue
    { title: "Project Aria", category: "Augmented Reality", color: "#83807C" }      // Grey
];

export default function StickyCardStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-rm-beige min-h-screen font-sans overflow-x-hidden selection:bg-rm-orange selection:text-white">
      {/* Sidebar Navigation */}
      <nav className="fixed top-0 left-0 bottom-0 w-[226px] hidden lg:flex flex-col items-center py-12 z-[1000] mix-blend-difference text-white pointer-events-none border-right border-white/5">
        <div className="pointer-events-auto cursor-pointer mb-12 hover:opacity-50 transition-opacity">
            <Menu className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-6 items-start w-full px-8 mt-auto mb-12 opacity-60 text-xs font-mono tracking-widest">
            <span className="hover:text-rm-orange transition-colors cursor-pointer pointer-events-auto">[01] HELLO</span>
            <span className="hover:text-rm-orange transition-colors cursor-pointer pointer-events-auto">[02] WORK</span>
            <span className="hover:text-rm-orange transition-colors cursor-pointer pointer-events-auto">[03] TALENT</span>
            <span className="hover:text-rm-orange transition-colors cursor-pointer pointer-events-auto">[04] CONTACT</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="lg:pl-[226px] w-full flex flex-col gap-4 p-4 md:p-6">
        
        {/* HERO SECTION */}
        <section className="sticky top-4 z-0 min-h-[85vh] bg-white border border-rm-black/10 rounded-[16px] p-8 md:p-12 flex flex-col justify-start gap-12">
            <div className="flex justify-between w-full border-b border-rm-black/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest">Raw Materials</span>
                <div className="flex gap-4">
                    {["All", "Design", "Tech", "Insights"].map((cat) => (
                        <span key={cat} className="text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-rm-orange transition-colors">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="mt-8">
                <h1 className="text-[13vw] leading-[0.85] font-bold tracking-tighter uppercase whitespace-pre-line mb-8">
                    {heroContent.title}
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start border-t border-rm-black pt-8 gap-8">
                    <p className="text-xl md:text-2xl font-medium leading-tight max-w-xl">
                        {heroContent.subtitle}
                    </p>
                    <ArrowDown className="w-8 h-8 animate-bounce" />
                </div>
            </div>
        </section>

        {/* STICKY DIVIDER */}
        <div className="sticky top-8 z-10 bg-rm-orange text-white h-[48px] rounded-[16px] flex items-center justify-between px-8 shadow-xl mx-2 md:mx-0">
            <span className="text-sm font-bold uppercase tracking-widest">Selected Works</span>
            <span className="text-sm font-mono">01</span>
        </div>

        {/* PROJECT STACK */}
        <div className="relative flex flex-col gap-4 mb-24">
            {projects.map((project, i) => {
                // Calculate scale based on position in stack relative to total
                const targetScale = 1 - ((projects.length - i) * 0.025); 
                return (
                    <ProjectCard 
                        key={i} 
                        {...project} 
                        index={i} 
                        total={projects.length}
                        progress={scrollYProgress}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>

        {/* FOOTER / CONTACT */}
        <section className="sticky bottom-4 z-0 w-full h-[80vh] bg-rm-beige border border-rm-black rounded-[16px] flex flex-col items-center justify-center p-8 overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none overflow-hidden">
                 <motion.h2 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="text-[40vw] font-bold whitespace-nowrap leading-none"
                 >
                    LET'S TALK LET'S TALK 
                 </motion.h2>
             </div>
             
             <div className="z-10 text-center">
                 <p className="text-sm font-bold uppercase tracking-widest mb-4">Start a Project</p>
                 <a href="mailto:hello@rawmaterials.com" className="text-[8vw] leading-none font-bold underline decoration-rm-orange decoration-4 underline-offset-8 hover:text-rm-orange transition-colors">
                    hello@<br/>rawmaterials.com
                 </a>
             </div>

             <div className="absolute bottom-8 left-8 right-8 flex justify-between border-t border-rm-black pt-4">
                <span className="text-xs font-bold uppercase">San Francisco, CA</span>
                <div className="flex gap-4">
                    {["IG", "TW", "LN"].map(link => (
                        <a key={link} href="#" className="text-xs font-bold hover:text-rm-orange transition-colors">{link}</a>
                    ))}
                </div>
             </div>
        </section>

      </div>
    </div>
  );
}

function ProjectCard({ title, category, color, index, total, progress, targetScale }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  
  // Dynamic offset for "stacking" feel
  const topOffset = 80 + (index * 60); 

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        top: topOffset,
      }}
      onClick={() => setIsOpen(!isOpen)}
      layout
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`sticky w-full cursor-pointer rounded-[16px] overflow-hidden bg-rm-black border border-white/5 shadow-2xl origin-top ${isOpen ? 'h-[80vh] z-50' : 'h-[14vw] min-h-[160px] z-0'}`}
    >
        {/* Background Color/Media */}
        <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: color, opacity: isOpen ? 1 : 0.9 }}></div>
        
        <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <span className="inline-block px-3 py-1 mb-4 border border-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-black">
                        {category}
                    </span>
                    <h3 className={`font-bold text-black tracking-tighter leading-[0.9] transition-all duration-500 ${isOpen ? 'text-[8vw]' : 'text-[6vw]'}`}>
                        {title}
                    </h3>
                </div>
                
                <div className={`w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>

            {/* Expanded Content */}
            <div className={`transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[16px] max-w-2xl">
                    <p className="text-xl font-medium leading-relaxed mb-6">
                        An award-winning collaboration redefining how users interact with the brand ecosystem.
                        Focused on seamless transitions, bold typography, and intuitive motion.
                    </p>
                    <button className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-rm-orange hover:border-rm-orange transition-colors">
                        View Case Study
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
  );
}