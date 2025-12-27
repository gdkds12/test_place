"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-24 px-6 md:px-12 pt-32">
      <div className="max-w-[90vw]">
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-[12vw] leading-[0.9] font-bold tracking-tighter uppercase text-foreground mix-blend-exclusion"
        >
          Raw <br />
          Materials
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 flex justify-between items-end w-full border-t border-foreground/20 pt-6"
        >
          <p className="text-xl md:text-2xl font-light max-w-md">
            A digital product design studio crafting <span className="text-accent">unusual</span> experiences for forward-thinking brands.
          </p>
          <div className="hidden md:block text-right">
            <p className="text-sm text-foreground/60 uppercase tracking-widest">Est. 2025</p>
            <p className="text-sm text-foreground/60 uppercase tracking-widest">San Francisco, CA</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
