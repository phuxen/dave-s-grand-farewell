import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".footer-fish", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />

      {/* School of fish */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingFish className="footer-fish absolute top-10 left-1/4 opacity-60" size="md" variant="fast" />
        <FloatingFish className="footer-fish absolute top-20 left-1/3 opacity-40" size="sm" variant="default" />
        <FloatingFish className="footer-fish absolute top-16 left-[40%] opacity-50" size="lg" variant="alt" />
        <FloatingFish className="footer-fish absolute top-24 right-1/3 opacity-45" size="md" variant="fast" />
        <FloatingFish className="footer-fish absolute top-12 right-1/4 opacity-55" size="sm" variant="alt" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="footer-text">
          <p className="text-body text-primary uppercase tracking-[0.3em] text-sm mb-8">Thank you for everything</p>

          <h2 className="text-hero gradient-text mb-8">Cheers, Dave!</h2>

          <p className="text-body text-foreground/70 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            From all of us who you've led, inspired, confused, and entertained.
            <br />
            <span className="text-primary">May your time be full of Fishdom victories and uninterrupted football.</span>
          </p>

          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
            <span>🍺</span>
            <span className="text-body">Made with love & Peroni</span>
            <span>🐟</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
