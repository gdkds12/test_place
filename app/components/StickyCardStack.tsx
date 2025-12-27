"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Menu, ArrowUpRight } from "lucide-react";

// Section Data
const cards = [
  { 
    id: "hello", 
    bg: "var(--color-rm-orange)", 
    title: "안녕하세요", 
    textColor: "white",
    type: "static",
    content: (
      <div className="flex flex-col justify-center h-full pb-20 pt-20">
        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-overlay break-keep">
          로우 <br/> 머티리얼즈
        </h1>
        <div className="flex justify-between items-end mt-12 border-t border-white/30 pt-6">
            <p className="text-xl md:text-2xl font-medium max-w-md break-keep">
                디지털 프로덕트 스튜디오
            </p>
            <ArrowDown className="w-12 h-12 animate-bounce" />
        </div>
      </div>
    )
  },
  { 
    id: "work", 
    bg: "var(--color-rm-black)", 
    title: "프로젝트", 
    textColor: "white",
    type: "static",
    content: (
       <div className="flex flex-col h-full">
         <div className="space-y-8 mt-10">
            {["뱅가드", "루미나 AI", "에이펙스 모터스"].map((project, i) => (
                <div key={i} className="group flex items-center justify-between border-b border-white/20 pb-8 cursor-pointer">
                    <span className="text-4xl md:text-6xl font-medium tracking-tight group-hover:text-rm-blue transition-colors break-keep">{project}</span>
                    <span className="text-sm border border-white/20 rounded-full px-3 py-1">202{4-i}</span>
                </div>
            ))}
         </div>
         <div className="mt-auto pb-20">
            <button className="bg-rm-blue text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform w-full md:w-auto break-keep">
                전체 프로젝트 보기
            </button>
         </div>
       </div>
    )
  },
  { 
    id: "journal", 
    bg: "var(--color-rm-green)", 
    title: "블로그", 
    textColor: "black",
    type: "static",
    content: (
        <div className="flex flex-col h-full">
             <div className="grid gap-6 mt-10">
                {[
                    { title: "플랫 디자인의 종말과 새로운 흐름", date: "10월 24일", tag: "칼럼" },
                    { title: "AI 시대를 위한 디자인 시스템 구축하기", date: "09월 12일", tag: "테크" },
                    { title: "2025년 디자인 트렌드 전망 보고서", date: "08월 05일", tag: "리포트" }
                ].map((post, i) => (
                    <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-6 cursor-pointer hover:pl-4 transition-all duration-300">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-widest border border-black/20 px-2 py-0.5 rounded-full">{post.tag}</span>
                                <span className="text-xs font-mono opacity-60">{post.date}</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold leading-tight group-hover:text-white transition-colors break-keep">{post.title}</h3>
                        </div>
                        <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 mt-4 md:mt-0" />
                    </div>
                ))}
             </div>
             <div className="mt-auto pb-20">
                <p className="text-xl font-medium max-w-2xl opacity-80 break-keep">
                    인터페이스 디자인, 크리에이티브 코딩, 그리고 디지털 제품의 미래에 대한 생각들을 기록합니다.
                </p>
             </div>
        </div>
    )
  },
  { 
    id: "talent", 
    bg: "var(--color-rm-blue)", 
    title: "팀 & 문화", 
    textColor: "white",
    type: "static",
    content: (
        <div className="flex flex-col h-full justify-between pb-20">
            <p className="text-3xl md:text-5xl font-medium leading-tight max-w-4xl break-keep">
                우리는 디지털 상호작용의 미래를 만드는 디자이너, 엔지니어, 그리고 전략가들의 집단입니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2">Design</h3>
                    <p className="opacity-80 break-keep">UI/UX, 모션 그래픽, 3D 인터랙션</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                     <h3 className="text-2xl font-bold mb-2">Tech</h3>
                     <p className="opacity-80 break-keep">풀스택 개발, WebGL, 인공지능</p>
                </div>
            </div>
        </div>
    )
  },
  { 
    id: "contact", 
    bg: "var(--color-rm-beige)", 
    title: "문의하기", 
    textColor: "black",
    type: "footer", // Special type for animation
    content: (
        // Content is handled inside the component for this specific card
        null 
    )
  },
];

export default function StickyCardStack() {
  return (
    <div className="bg-black min-h-screen pb-20 font-sans">
      {/* Sticky Header: Icon Menu Left, No Title, No Blur */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between px-6 py-6 mix-blend-difference text-white pointer-events-none bg-transparent">
        <button className="pointer-events-auto hover:opacity-50 transition-opacity">
            <Menu className="w-8 h-8" />
        </button>
        {/* Empty span to maintain flex layout if needed, currently just one item on left */}
        <span></span> 
      </nav>

      <div className="flex flex-col relative">
        {cards.map((card, i) => (
          <StickyCard key={card.id} {...card} index={i} />
        ))}
      </div>
    </div>
  );
}

function StickyCard({ bg, title, textColor, index, content, type }: any) {
  const cardRef = useRef(null);
  // Stacking logic: Each card sticks top + offset
  const stickyTop = index * 50; 

  // For footer parallax animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end end"]
  });
  
  // Transform x position based on scroll (only for footer)
  const xMovement = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        backgroundColor: bg, 
        color: textColor,
        top: stickyTop, 
        zIndex: index 
      }}
      className="sticky w-full h-screen rounded-t-[24px] border-t border-black/5 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.3)] origin-top"
    >
      <div className="p-6 md:p-12 pt-20 flex flex-col h-full relative">
        {/* Card Title (Visible in the sticky header area) */}
        <h2 className="absolute top-6 right-6 md:right-12 text-sm font-bold uppercase tracking-widest opacity-80">
            {title}
        </h2>
        
        {/* Content Container */}
        <div className="mt-4 h-full relative overflow-hidden">
            {type === "footer" ? (
                 <div className="flex flex-col h-full justify-center">
                    <motion.div style={{ x: xMovement }} className="w-full">
                         <a href="mailto:hello@rawmaterials.co" className="text-[12vw] font-bold tracking-tighter hover:text-rm-orange transition-colors block leading-none whitespace-nowrap">
                            hello@rawmaterials.co
                        </a>
                    </motion.div>
                    
                     <div className="flex gap-4 mt-12">
                        <button className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-rm-orange transition-colors">
                            Instagram
                        </button>
                        <button className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-rm-orange transition-colors">
                            LinkedIn
                        </button>
                     </div>
                     
                     {/* Moving colored strip */}
                     <motion.div 
                        style={{ x: useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]) }}
                        className="absolute bottom-0 left-0 w-full h-8 bg-rm-green"
                     />
                 </div>
            ) : (
                content
            )}
        </div>
      </div>
    </motion.div>
  );
}
