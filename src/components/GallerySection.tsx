import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";
import { GalleryLightbox } from "./GalleryLightbox";

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
import gallery19 from "@/assets/gallery/Wine_night.jpeg";
import gallery20 from "@/assets/gallery/Seaside_view.jpeg";
import gallery21 from "@/assets/gallery/Workshop_day.jpeg";
import gallery22 from "@/assets/gallery/Axe_throwing.jpeg";
import gallery23 from "@/assets/gallery/Boat_party.jpeg";
import gallery24 from "@/assets/gallery/Squad_goals.jpeg";
import gallery25 from "@/assets/gallery/Sunset_crew.jpeg";
import gallery26 from "@/assets/gallery/Sandal_swagger.jpeg";
import gallery27 from "@/assets/gallery/IMG_7092.jpeg";

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
  { id: 19, src: gallery19, alt: "Wine night vibes" },
  { id: 20, src: gallery20, alt: "Seaside wander" },
  { id: 21, src: gallery21, alt: "Workshop mode" },
  { id: 22, src: gallery22, alt: "Viking axe throwing" },
  { id: 23, src: gallery23, alt: "Boat party chaos" },
  { id: 24, src: gallery24, alt: "Squad goals" },
  { id: 25, src: gallery25, alt: "Sunset crew" },
  { id: 26, src: gallery26, alt: "Sandal swagger" },
  { id: 27, src: gallery27, alt: "Pink hair party" },
];

export const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

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
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden bg-card">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50" />

      <FloatingFish
        className="absolute top-20 left-20 opacity-30"
        size="md"
        variant="fast"
      />
      <FloatingFish
        className="absolute bottom-40 right-10 opacity-20"
        size="lg"
        variant="alt"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-section text-center mb-4 text-foreground">
          The <span className="text-primary">Glory</span> Years
        </h2>
        <p className="text-body text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
          A visual journey through Dave's legendary tenure
        </p>

        <div
          ref={galleryRef}
          className="perspective-1000 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-card preserve-3d break-inside-avoid bg-background border-2 border-border overflow-hidden hover-lift group cursor-pointer"
              style={{ transformOrigin: "center center" }}
              onClick={() => handleImageClick(index)}
            >
              <div className="w-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-background text-sm font-display uppercase tracking-wider font-semibold">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <GalleryLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={galleryImages[selectedImageIndex].src}
          imageAlt={galleryImages[selectedImageIndex].alt}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={true}
          hasNext={true}
        />
      </div>
    </section>
  );
};
