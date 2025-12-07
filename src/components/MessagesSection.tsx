import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingFish } from "./FloatingFish";

gsap.registerPlugin(ScrollTrigger);

const messages = [
  {
    quote:
      "Thank you, Dave, for being such an amazing boss. I can't express enough how grateful I am for the opportunities and support you've given me during your time at DAN. I'm proud of the work we've accomplished together, especially our efforts to support the community through the Fono. It's been an absolute pleasure getting to know you and working under your leadership. I'll never forget what a genuinely great person you are. Ofa lahi atu.",
    author: "Hulu",
    role: "",
  },
  {
    quote:
      "Congratulations on prioritizing family time! It takes real courage to step away. We'll figure things out from here—wishing you all the best.",
    author: "Dan",
    role: "",
  },
  {
    quote:
      "Couldn't have asked for a more awesome Don Boss for my first chaotic stumble into the agency world. Your ridiculous range of skills — synthesising, summarising, abstracting, managing, designing, directing (and somehow staying sane) — has always blown my mind. I'm going to seriously miss you, your leadership, and of course our highly confidential cricket-themed fax correspondence.",
    author: "Simon",
    role: "",
  },
  {
    quote:
      "Yo Dave Bro, been a blast working with you - go forth and conquer life with your awesome family 🫶 They will love having you around - just like we did 💯 Your energetic, intelligent, funny, strategic and caring personality will bring out the best in them - just like it did for us 🤩 Thanks for all you did to make work life valuable, insightful and a good time for all of us. I will miss you! Look forward to a beer in the new year 🍻 Chur, love & hugs.",
    author: "Heids",
    role: "",
  },
  {
    quote:
      "Best boss, you proved to me that a boss can be empathetic, smart, and get shit done at the same time. Huge respect, and I hope wherever your next journey takes you, it fulfills you both mentally and spiritually enough to fill your baldspot.",
    author: "Billy",
    role: "",
  },
  {
    quote:
      "DAVE BOO. I WILL MISS YOUR SASSY, CHAOTIC, STRATEGIC MEGA-BRAIN AURA that you bring daily into our work lives. A leader who is enduring, empathetic, charismatic, full of knowledge, with the occasional dodgy wisdom. I've learnt a lot from you. YOU ARE HIM. The incredible impact you've had here at DAN is monumental! Wherever your next journey takes you, I just know you'll turn up just as chaotic as you arrived here, HA! Go well, enjoy your time with Leo, such an amazing adventure to take. I'll be nagging you forever. LIFE COACH. BIG BRO. Big hugs, little kiss, BIGGER HUGS. Ofa atu.",
    author: "Naua",
    role: "",
  },
  {
    quote:
      "Its amazing what you are doing, but I am super sad to see you go. I can't begin to express how much of an impact you had and how much you will be missed. To say it has been a pleasure is an understatement - thank you so much for everything!",
    author: "Lelane",
    role: "",
  },
  {
    quote:
      "Dave - What an epic time! We've loved your leadership, energy, humour, insights, care, fun-making and gift of the gab. Thank you for everything you have done and enjoy a well deserved break.",
    author: "Katie",
    role: "",
  },
  {
    quote:
      "El Presidente, thank you so much for the dad jokes, questionable stories and chaotic energy that you brought to the studio. It's been so much fun working with you. <br />Beyond the laughs, I'm genuinely grateful for how you've invested in my growth here. Trusting me with the Design Lead role was a huge moment in my career, and your backing has meant everything. Thank you for believing in me and for everything you've done for both DAN and myself.",
    author: "Hux",
    role: "",
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
          },
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
            <div key={index} className="quote-card card-glass p-8 md:p-12 relative overflow-hidden">
              {/* Decorative quote mark */}
              <span className="absolute top-4 left-6 text-primary/20 text-8xl font-display">"</span>

              <blockquote className="text-quote text-foreground relative z-10 mb-6">"{message.quote}"</blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{message.author[0]}</span>
                </div>
                <div>
                  <p className="text-body font-semibold text-foreground">{message.author}</p>
                  <p className="text-body text-muted-foreground text-sm">{message.role}</p>
                </div>
              </div>

              {/* Random fish in some quotes */}
              {index % 3 === 0 && (
                <FloatingFish className="absolute -bottom-4 -right-4 opacity-20" size="sm" variant="fast" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
