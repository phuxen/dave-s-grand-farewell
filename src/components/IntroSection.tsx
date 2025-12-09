import { useEffect, useRef } from "react";
import gsap from "gsap";
import introHero from "@/assets/intro-hero.png";

const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-white pointer-events-none animate-snowfall opacity-80"
    style={style}
  >
    ❄
  </div>
);

const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${Math.random() * 1.5 + 0.5}rem`,
    opacity: Math.random() * 0.6 + 0.4,
  }));
};

const snowflakes = generateSnowflakes(50);

export const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={introHero}
          alt="David Perkins dressed as Santa in Carhartt"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
        />
      </div>

      {/* Falling Snow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            style={{
              left: flake.left,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay,
              fontSize: flake.fontSize,
              opacity: flake.opacity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mt-auto pb-24">
        <p className="intro-text text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-body">
          A fond farewell to our fearless leader
        </p>
        <h1 className="intro-text text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tight">
          <span className="gradient-text">David Perkins</span>
        </h1>
        <p className="intro-text text-cream-muted text-xl md:text-2xl mt-6 max-w-2xl mx-auto font-body">
          MD, myth, Fishdom enthusiast
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle z-10">
        <span className="text-body text-muted-foreground text-sm tracking-wider">Scroll to celebrate</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};