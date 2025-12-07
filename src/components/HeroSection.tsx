import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FloatingFish } from "./FloatingFish";
import teamMemberNew from "@/assets/heads/team_member_new.png";
import head1 from "@/assets/heads/head_1.png";
import head2 from "@/assets/heads/head_2.png";
import head3 from "@/assets/heads/head_3.png";

const teamMembers = [
  { name: "Team 1", delay: 0, image: head1 },
  { name: "Team 2", delay: 0.2, image: head2 },
  { name: "Team 3", delay: 0.4, image: head3 },
  { name: "Team 4", delay: 0.6, image: teamMemberNew },
  { name: "Lucy", delay: 0.8, image: null },
  { name: "Tom", delay: 1, image: null },
];

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".floating-head", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.8,
      });

      gsap.from(".hero-fish", {
        x: -200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/30 to-background" />

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

      {/* Floating team heads */}
      <div className="absolute inset-0 pointer-events-none">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className="floating-head absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary/30 to-secondary border-2 border-primary/50 flex items-center justify-center text-foreground font-body text-xs md:text-sm animate-float overflow-hidden"
            style={{
              left: `${10 + (index % 4) * 25}%`,
              top: `${15 + Math.floor(index / 4) * 45}%`,
              animationDelay: `${member.delay}s`,
            }}
          >
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <span className="opacity-70">{member.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <p ref={subtitleRef} className="text-body text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4">
          A fond farewell to our fearless leader
        </p>
        <h1 ref={textRef} className="text-hero gradient-text">
          LEGEND
        </h1>
        <p className="text-body text-cream-muted text-xl md:text-2xl mt-8 max-w-2xl mx-auto">
          David Perkins — MD, myth, Fishdom enthusiast
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="text-body text-muted-foreground text-sm tracking-wider">Scroll to celebrate</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
