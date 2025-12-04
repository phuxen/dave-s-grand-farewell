import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2394, label: "Hours playing Fishdom", suffix: "" },
  { value: 3, label: "Times fell asleep in a meeting", suffix: "" },
  { value: 56943, label: "Hours streaming football in the studio", suffix: "" },
  { value: 6324, label: "Peroni's consumed", suffix: "🍺" },
];

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  isVisible: boolean;
}

const AnimatedCounter = ({ target, suffix = "", isVisible }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, isVisible]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setIsVisible(true),
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        rotation: -5,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      {/* Floating fish */}
      <FloatingFish
        className="absolute top-10 right-1/4 opacity-30"
        size="lg"
        variant="alt"
      />
      <FloatingFish
        className="absolute bottom-20 left-10 opacity-40"
        size="md"
        variant="default"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-section text-center mb-4">
          <span className="text-primary">Dave</span> by numbers
        </h2>
        <p className="text-body text-muted-foreground text-center mb-16 text-lg">
          Scientifically accurate* statistics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card card-glass p-8 text-center hover-lift"
            >
              <div className="text-stat text-primary mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-body text-foreground/80 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-body text-muted-foreground text-center mt-12 text-sm italic">
          *May not be scientifically accurate
        </p>
      </div>
    </section>
  );
};
