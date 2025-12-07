import { useRef } from "react";
import { FloatingFish } from "./FloatingFish";

const stats = [
  { value: 2394, label: "Hours playing Fishdom", suffix: "" },
  { value: 3, label: "Times fell asleep in a meeting", suffix: "" },
  { value: 56943, label: "Hours streaming football in the studio", suffix: "" },
  { value: 6324, label: "Peroni's consumed", suffix: "🍺" },
];

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
              className="bg-card border-2 border-border p-8 text-center hover-lift rounded-sm"
            >
              <div className="text-stat text-primary mb-2">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
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
