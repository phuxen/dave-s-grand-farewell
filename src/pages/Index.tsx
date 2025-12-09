import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IntroSection } from "@/components/IntroSection";
import { StatsSection } from "@/components/StatsSection";
import { GallerySection } from "@/components/GallerySection";
import { MessagesSection } from "@/components/MessagesSection";
import { VideoSection } from "@/components/VideoSection";
import { FooterSection } from "@/components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <IntroSection />
      <StatsSection />
      <GallerySection />
      <MessagesSection />
      <VideoSection />
      <FooterSection />
    </main>
  );
};

export default Index;
