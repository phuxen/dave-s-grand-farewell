import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".video-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light/30 via-background to-primary/5" />

      <FloatingFish className="absolute top-20 right-20 opacity-40" size="lg" variant="alt" />
      <FloatingFish className="absolute bottom-20 left-10 opacity-30" size="md" variant="default" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="video-title text-section text-center mb-4">
          <span className="text-primary">Video</span> Memories
        </h2>
        <p className="text-body text-muted-foreground text-center mb-16 text-lg">
          The moments that made us laugh, cry, and question HR policies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/MicrosoftTeams-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/MicrosoftTeams-video_1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/MicrosoftTeams-video_2.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/MicrosoftTeams-video_3.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_5572_1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_5555_1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_5539.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_4484.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_4135.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_1083.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_0939.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="video-container bg-gradient-to-br from-secondary to-navy-light rounded-3xl overflow-hidden border border-border/50 hover-lift">
            <video className="w-full h-auto" controls playsInline>
              <source src="/videos/IMG_0122_2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
