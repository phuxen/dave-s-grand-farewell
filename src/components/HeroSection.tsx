import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FloatingFish } from "./FloatingFish";
import teamMemberNew from "@/assets/heads/team_member_new.png";
import head1 from "@/assets/heads/head_1.png";
import head2 from "@/assets/heads/head_2.png";
import head3 from "@/assets/heads/head_3.png";
import head5 from "@/assets/heads/head_5.jpeg";
import head6 from "@/assets/heads/head_6.jpeg";

const teamMembers = [
  { name: "Team 1", delay: 0, image: head1, left: "5%", top: "12%", animation: "animate-float" },
  { name: "Team 2", delay: 0.2, image: head2, left: "75%", top: "8%", animation: "animate-float-alt" },
  { name: "Team 3", delay: 0.4, image: head3, left: "85%", top: "55%", animation: "animate-float-slow" },
  { name: "Team 4", delay: 0.6, image: teamMemberNew, left: "8%", top: "60%", animation: "animate-float-fast" },
  { name: "Team 5", delay: 0.8, image: head5, left: "45%", top: "75%", animation: "animate-float-alt" },
  { name: "Team 6", delay: 1.0, image: head6, left: "90%", top: "30%", animation: "animate-float-slow" },
];

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".floating-head", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      gsap.from(".hero-fish", {
        x: -200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.6,
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
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className={`floating-head absolute w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/30 to-secondary border-3 border-primary/50 flex items-center justify-center ${member.animation} overflow-hidden shadow-xl`}
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
    </section>
  );
};
