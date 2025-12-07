import fishImage from "@/assets/fish.png";

interface FloatingFishProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "alt" | "fast";
}

const sizeClasses = {
  sm: "w-48 h-auto",
  md: "w-96 h-auto",
  lg: "w-[36rem] h-auto",
};

const animationClasses = {
  default: "fish-float",
  alt: "fish-float-alt",
  fast: "fish-float-fast",
};

export const FloatingFish = ({
  className = "",
  style,
  size = "md",
  variant = "default",
}: FloatingFishProps) => {
  return (
    <img
      src={fishImage}
      alt="Fish"
      className={`pointer-events-none select-none ${sizeClasses[size]} ${animationClasses[variant]} ${className}`}
      style={style}
    />
  );
};
