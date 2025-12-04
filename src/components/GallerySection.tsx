import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace with actual Dave photos
const galleryImages = [
  { id: 1, placeholder: "Dave at the office" },
  { id: 2, placeholder: "Team celebration" },
  { id: 3, placeholder: "Conference moment" },
  { id: 4, placeholder: "Dave being Dave" },
  { id: 5, placeholder: "Legendary meeting" },
  { id: 6, placeholder: "The Peroni years" },
];

export const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D rotation effect on scroll
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            rotateY: index % 2 === 0 ? -45 : 45,
            rotateX: 15,
            opacity: 0,
            z: -200,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            z: 0,
            ease: "power2.out",
          }
        );
      });

      // Horizontal scroll effect
      gsap.to(galleryRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: false,
        },
        x: -100,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-background to-navy-light/20" />

      <FloatingFish
        className="absolute top-20 left-20 opacity-50"
        size="md"
        variant="fast"
      />
      <FloatingFish
        className="absolute bottom-40 right-10 opacity-40"
        size="lg"
        variant="alt"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-section text-center mb-4">
          The <span className="text-primary italic">Glory</span> Years
        </h2>
        <p className="text-body text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
          A visual journey through Dave's legendary tenure
        </p>

        <div
          ref={galleryRef}
          className="perspective-1000 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-card preserve-3d aspect-[4/3] bg-gradient-to-br from-secondary to-navy-light rounded-2xl overflow-hidden border border-border/50 hover-lift group cursor-pointer"
              style={{ transformOrigin: "center center" }}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Placeholder - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <span className="text-body text-muted-foreground text-center p-4">
                  📸 {image.placeholder}
                </span>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-body text-center mt-12 text-muted-foreground italic">
          Add your favourite Dave photos here!
        </p>
      </div>
    </section>
  );
};
