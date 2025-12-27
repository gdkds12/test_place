export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 px-6 md:px-12 rounded-t-[3rem] -mt-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase mb-8">
            Let's <br/> Talk
          </h2>
          <a href="mailto:hello@rawmaterials.co" className="text-2xl md:text-4xl underline decoration-accent decoration-2 underline-offset-8 hover:text-accent transition-colors">
            hello@rawmaterials.co
          </a>
        </div>
        
        <div className="flex flex-col gap-4 text-lg font-medium">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          <p className="mt-8 text-background/50">© 2025 Raw Materials.</p>
        </div>
      </div>
    </footer>
  );
}
