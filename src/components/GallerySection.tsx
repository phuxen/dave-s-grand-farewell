import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

// Gallery images
import gallery1 from "@/assets/gallery/DP_HM_AT.jpeg";
import gallery2 from "@/assets/gallery/DP_AT_HT_TG.jpeg";
import gallery3 from "@/assets/gallery/DP_and_LF.jpeg";
import gallery4 from "@/assets/gallery/AI_DP_TG.jpeg";
import gallery5 from "@/assets/gallery/Friday_lunch_1.jpeg";
import gallery6 from "@/assets/gallery/Media.jpeg";
import gallery7 from "@/assets/gallery/Dave_DP.jpeg";
import gallery8 from "@/assets/gallery/DP_and_espresso.jpeg";
import gallery9 from "@/assets/gallery/DP_and_screen.jpeg";
import gallery10 from "@/assets/gallery/DP_the_gardener_with_his_team_1.jpeg";
import gallery11 from "@/assets/gallery/DAN_1_1.jpeg";
import gallery12 from "@/assets/gallery/Dave_on_the_couch.jpeg";
import gallery13 from "@/assets/gallery/Denim_DP.jpeg";
import gallery14 from "@/assets/gallery/DP_cow.jpeg";
import gallery15 from "@/assets/gallery/IMG_5316.jpeg";
import gallery16 from "@/assets/gallery/IMG_5909_1.jpeg";
import gallery17 from "@/assets/gallery/Image_2.jpeg";
import gallery18 from "@/assets/gallery/Image_1.jpeg";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: gallery1, alt: "Dave with the team" },
  { id: 2, src: gallery2, alt: "Office fun times" },
  { id: 3, src: gallery3, alt: "Smash room adventures" },
  { id: 4, src: gallery4, alt: "Silly hats moment" },
  { id: 5, src: gallery5, alt: "Friday lunch crew" },
  { id: 6, src: gallery6, alt: "Polaroid memories" },
  { id: 7, src: gallery7, alt: "Party vibes" },
  { id: 8, src: gallery8, alt: "Espresso martini time" },
  { id: 9, src: gallery9, alt: "Meeting mode" },
  { id: 10, src: gallery10, alt: "Team outing" },
  { id: 11, src: gallery11, alt: "Christmas team photo" },
  { id: 12, src: gallery12, alt: "Couch nap time" },
  { id: 13, src: gallery13, alt: "Double denim vibes" },
  { id: 14, src: gallery14, alt: "Cow costume legend" },
  { id: 15, src: gallery15, alt: "Evening chill" },
  { id: 16, src: gallery16, alt: "The matching duo" },
  { id: 17, src: gallery17, alt: "Tropical party" },
  { id: 18, src: gallery18, alt: "Bowling night" },
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
              <div className="w-full h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-foreground text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
