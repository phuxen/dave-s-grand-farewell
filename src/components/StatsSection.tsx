import { useRef, useState, useEffect } from "react";
import { FloatingFish } from "./FloatingFish";

const stats = [
  { value: 2394, label: "Hours playing Fishdom", suffix: "" },
  { value: 3, label: "Times fell asleep in a meeting", suffix: "" },
  { value: 56943, label: "Hours streaming football in the studio", suffix: "" },
  { value: 6324, label: "Peroni's consumed", suffix: "🍺" },
  { value: 1340000, label: "Calls to self-proclaimed HR", suffix: "📞" },
  { value: 2, label: "Documented sightings of his hair out", suffix: "💇" },
];

const CountUpNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref} className="text-stat text-primary mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
              className="bg-card border-2 border-border p-8 text-center hover-lift rounded-2xl"
            >
              <CountUpNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-body text-foreground text-lg">
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
