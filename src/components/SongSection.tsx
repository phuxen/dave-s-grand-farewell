import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import fishImage from "@/assets/fish.png";

export const SongSection = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative py-24 md:py-32 bg-secondary overflow-hidden">
      {/* Floating fish decorations */}
      <img
        src={fishImage}
        alt=""
        className="absolute top-10 left-10 w-24 md:w-32 opacity-30 animate-float pointer-events-none"
      />
      <img
        src={fishImage}
        alt=""
        className="absolute bottom-10 right-10 w-20 md:w-28 opacity-25 animate-float-alt pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-center mb-4 uppercase tracking-wider text-foreground">
          The Ballad of Parko the Bold
        </h2>
        <p className="text-center text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          A musical tribute to the legend himself. Press play and enjoy.
        </p>

        {/* Audio Player */}
        <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-border">
          <audio ref={audioRef} src="/audio/The_Ballad_of_Parko_the_Bold.mp3" />

          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              )}
            </button>

            <div className="flex-1">
              <h3 className="font-display text-lg text-foreground uppercase tracking-wide">
                The Ballad of Parko the Bold
              </h3>
              <p className="text-muted-foreground text-sm">A Team Tribute</p>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-muted-foreground" />
              ) : (
                <Volume2 className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time display */}
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
