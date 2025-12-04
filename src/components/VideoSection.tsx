import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".video-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light/30 via-background to-primary/5" />

      <FloatingFish className="absolute top-20 right-20 opacity-40" size="lg" variant="alt" />
      <FloatingFish className="absolute bottom-20 left-10 opacity-30" size="md" variant="default" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="video-title text-section text-center mb-4">
          <span className="text-primary">Video</span> Memories
        </h2>
        <p className="text-body text-muted-foreground text-center mb-16 text-lg">
          The moments that made us laugh, cry, and question HR policies
        </p>

        <div className="video-container aspect-video bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 relative group cursor-pointer hover-lift">
          {/* Placeholder for video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </div>
          </div>

          {/* Placeholder text */}
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <p className="text-body text-muted-foreground bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full">
              Add video tribute here
            </p>
          </div>

          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="aspect-video bg-secondary/50 rounded-xl border border-border/30 flex items-center justify-center hover-lift cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center group-hover:bg-primary/70 transition-colors">
                <Play className="w-5 h-5 text-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
