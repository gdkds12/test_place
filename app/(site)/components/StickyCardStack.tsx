"use client";
import { motion, useScroll, useTransform, MotionValue, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import { Menu, ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

export default function StickyCardStack({ initialPosts = [] }: { initialPosts?: any[] }) {
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

        {/* PROJECT STACK (Now List with Expansion) */}
        <LayoutGroup>
            <div className="flex flex-col gap-4 mb-24">
                {projects.map((project, i) => (
                    <ProjectCard 
                        key={i} 
                        {...project} 
                        index={i} 
                        total={projects.length}
                    />
                ))}
            </div>
        </LayoutGroup>

        {/* JOURNAL SECTION (CMS Integrated) */}
        {initialPosts.length > 0 && (
            <div className="flex flex-col gap-4 mb-24">
                <div className="sticky top-12 z-10 bg-rm-green text-rm-black h-[48px] rounded-[16px] flex items-center justify-between px-8 shadow-xl">
                    <span className="text-sm font-bold uppercase tracking-widest">Journal</span>
                    <span className="text-sm font-mono">02</span>
                </div>
                {initialPosts.map((post, i) => (
                    <Link key={post.slug} href={`/journal/${post.slug}`} className="w-full">
                        <div className="bg-white border border-rm-black/10 rounded-[16px] p-8 md:p-12 hover:bg-rm-beige transition-colors group">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{post.tag}</span>
                                    <h3 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase">{post.title}</h3>
                                </div>
                                <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}

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

function ProjectCard({ title, category, color, index, total }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`relative w-full cursor-pointer rounded-[16px] overflow-hidden bg-rm-black border border-white/5 shadow-xl origin-top group`}
      style={{
        zIndex: isOpen ? 10 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
        {/* Background Color/Media */}
        <motion.div 
            layout="position"
            className="absolute inset-0 transition-opacity duration-500" 
            style={{ backgroundColor: color, opacity: isOpen ? 1 : 0.9 }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-10 flex flex-col">
            {/* Header Row */}
            <motion.div layout="position" className="flex justify-between items-start w-full">
                <div>
                    <motion.span 
                        layout="position"
                        className="inline-block px-3 py-1 mb-4 border border-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-black"
                    >
                        {category}
                    </motion.span>
                    <motion.h3 
                        layout="position"
                        className={`font-bold text-black tracking-tighter leading-[0.9] transition-all duration-500 ${isOpen ? 'text-[8vw] mb-8' : 'text-[6vw]'}`}
                    >
                        {title}
                    </motion.h3>
                </div>
                
                <motion.div 
                    layout="position"
                    className={`w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                >
                    <ArrowUpRight className="w-5 h-5" />
                </motion.div>
            </motion.div>

            {/* Expanded Content Body */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="mt-4"
                >
                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[16px] max-w-3xl shadow-lg">
                        <div className="flex flex-col md:flex-row gap-8 items-end">
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-rm-black/80">
                                An award-winning collaboration redefining how users interact with the brand ecosystem. 
                                Focused on seamless transitions, bold typography, and intuitive motion design that feels physically present.
                            </p>
                            <button className="whitespace-nowrap px-6 py-3 bg-rm-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-rm-orange transition-colors">
                                View Case Study
                            </button>
                        </div>
                    </div>
                    
                    {/* Placeholder for extra media/images in expanded state */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="aspect-video bg-black/10 rounded-lg"></div>
                        <div className="aspect-video bg-black/10 rounded-lg"></div>
                    </div>
                </motion.div>
            )}
        </div>
    </motion.div>
  );
}