import { useEffect, useRef } from "react";
import gsap from "gsap";
import introHero from "@/assets/intro-hero.png";
import { FloatingFish } from "./FloatingFish";
import teamMemberNew from "@/assets/heads/team_member_new.png";
import head1 from "@/assets/heads/head_1.png";
import head2 from "@/assets/heads/head_2.png";
import head3 from "@/assets/heads/head_3.png";
import head5 from "@/assets/heads/head_5.jpeg";
import head6 from "@/assets/heads/head_6.jpeg";

const teamMembers = [
  { name: "Team 1", delay: 0, image: head1, left: "2%", top: "5%", animation: "animate-float" },
  { name: "Team 2", delay: 0.2, image: head2, left: "55%", top: "3%", animation: "animate-float-alt" },
  { name: "Team 3", delay: 0.4, image: head3, left: "75%", top: "45%", animation: "animate-float-slow" },
  { name: "Team 4", delay: 0.6, image: teamMemberNew, left: "5%", top: "50%", animation: "animate-float-fast" },
  { name: "Team 5", delay: 0.8, image: head5, left: "35%", top: "70%", animation: "animate-float-alt" },
  { name: "Team 6", delay: 1.0, image: head6, left: "80%", top: "15%", animation: "animate-float-slow" },
];

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

      gsap.from(".floating-head", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      gsap.from(".hero-fish", {
        x: -200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.8,
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
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

      {/* Floating fish decorations */}
      <FloatingFish
        className="hero-fish absolute top-20 left-10 opacity-60"
        size="sm"
        variant="default"
        style={{ animationDelay: "0s" }}
      />
      <FloatingFish
        className="hero-fish absolute top-40 right-20 opacity-40"
        size="lg"
        variant="alt"
        style={{ animationDelay: "2s" }}
      />
      <FloatingFish
        className="hero-fish absolute bottom-40 left-1/4 opacity-50"
        size="md"
        variant="fast"
        style={{ animationDelay: "4s" }}
      />
      <FloatingFish
        className="hero-fish absolute bottom-20 right-10 opacity-70"
        size="sm"
        variant="alt"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating team heads - 50% reduced size */}
      <div className="absolute inset-0 pointer-events-none">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className={`floating-head absolute w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-primary/30 to-secondary border-2 border-primary/50 flex items-center justify-center ${member.animation} overflow-hidden shadow-xl`}
            style={{
              left: member.left,
              top: member.top,
              animationDelay: `${member.delay}s`,
            }}
          >
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
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