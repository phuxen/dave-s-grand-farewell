import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

gsap.registerPlugin(ScrollTrigger);

const messages = [
  {
    quote: "Dave taught me that every problem can be solved with enough Peroni and optimism.",
    author: "Sarah M.",
    role: "Creative Director",
  },
  {
    quote: "Never met anyone who could fall asleep in a meeting and still contribute the best idea.",
    author: "Mike T.",
    role: "Developer",
  },
  {
    quote: "His Fishdom high score is frankly intimidating. Legend.",
    author: "Emma R.",
    role: "Designer",
  },
  {
    quote: "Dave's ability to stream football while looking productive is unmatched.",
    author: "James K.",
    role: "Project Manager",
  },
  {
    quote: "You made chaos feel like strategy. We'll miss that.",
    author: "Lucy W.",
    role: "Account Manager",
  },
  {
    quote: "Thanks for pretending to understand when I explained code. True leadership.",
    author: "Tom H.",
    role: "Senior Developer",
  },
];

const animations = [
  { x: -200, rotation: -15, scale: 0.5 },
  { x: 200, rotation: 15, scale: 0.5 },
  { y: 200, rotation: 0, scale: 0.3 },
  { x: -150, y: 100, rotation: -20, scale: 0.6 },
  { x: 150, y: -100, rotation: 20, scale: 0.6 },
  { y: -200, rotation: 180, scale: 0.4 },
];

export const MessagesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quotes = gsap.utils.toArray<HTMLElement>(".quote-card");

      quotes.forEach((quote, index) => {
        const anim = animations[index % animations.length];

        gsap.fromTo(
          quote,
          {
            x: anim.x || 0,
            y: anim.y || 0,
            rotation: anim.rotation,
            scale: anim.scale,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: quote,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.5,
            },
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
          }
        );

        // Add wiggle effect when fully visible
        ScrollTrigger.create({
          trigger: quote,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(quote, {
              rotation: index % 2 === 0 ? 2 : -2,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Scattered fish */}
      <FloatingFish className="absolute top-40 left-5 opacity-30" size="sm" variant="default" />
      <FloatingFish className="absolute top-1/3 right-10 opacity-50" size="md" variant="alt" />
      <FloatingFish className="absolute bottom-1/3 left-1/4 opacity-40" size="lg" variant="fast" />
      <FloatingFish className="absolute bottom-20 right-1/3 opacity-35" size="sm" variant="alt" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-section text-center mb-4">
          Words from the <span className="text-primary">team</span>
        </h2>
        <p className="text-body text-muted-foreground text-center mb-20 text-lg">
          Heartfelt messages (and gentle roasts)
        </p>

        <div className="space-y-16">
          {messages.map((message, index) => (
            <div
              key={index}
              className="quote-card card-glass p-8 md:p-12 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 left-6 text-primary/20 text-8xl font-display">
                "
              </span>

              <blockquote className="text-quote text-foreground relative z-10 mb-6">
                "{message.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">
                    {message.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-body font-semibold text-foreground">
                    {message.author}
                  </p>
                  <p className="text-body text-muted-foreground text-sm">
                    {message.role}
                  </p>
                </div>
              </div>

              {/* Random fish in some quotes */}
              {index % 3 === 0 && (
                <FloatingFish
                  className="absolute -bottom-4 -right-4 opacity-20"
                  size="sm"
                  variant="fast"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
