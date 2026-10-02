"use client";

import { cn } from "@/shared/utils";

interface LogoProps {
  variant?: "wordmark" | "mark";
  size?: number | string;
  theme?: "dark" | "light";
  className?: string;
}

export function Logo({ 
  variant = "wordmark", 
  size, 
  theme = "dark",
  className 
}: LogoProps) {
  const isDark = theme === "dark";
  
  const textColor = isDark ? "#F2F1ED" : "#0B0B0C";
  const accentColor = isDark ? "#A8E85C" : "#4F8A12";

  // Ratios based on ViewBox
  // Mark: 64/64 = 1
  // Wordmark: 275/104 = 2.644
  
  if (variant === "mark") {
    const defaultSize = 32;
    const finalSize = size || defaultSize;
    return (
      <svg 
        width={finalSize} 
        height={finalSize} 
        viewBox="-4 -4 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="MUSE Logo"
        className={className}
      >
        <title>MUSE</title>
        <polygon 
          points="0,56 0,0 8,0 28,30 48,0 56,0 56,56 49,56 49,12 28,43 7,12 7,56" 
          fill={textColor}
        />
        <circle cx="28" cy="50.5" r="4" fill={accentColor}/>
      </svg>
    );
  }

  // Wordmark sizing logic to preserve aspect ratio
  const defaultHeight = 32;
  const height = size || defaultHeight;
  
  return (
    <svg 
      height={height}
      viewBox="-24 -24 275 104" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MUSE Wordmark"
      className={cn("w-auto h-auto", className)}
      style={{ aspectRatio: '275 / 104' }}
    >
      <title>MUSE</title>
      <polygon 
        points="0,56 0,0 8,0 28,30 48,0 56,0 56,56 49,56 49,12 28,43 7,12 7,56" 
        fill={textColor}
      />
      <circle cx="28" cy="50.5" r="4" fill={accentColor}/>
      <g transform="translate(70 0)" fill="none" stroke={textColor} strokeWidth="7" strokeLinejoin="miter">
        <path d="M3.5 0 V33 A19.5 19.5 0 0 0 42.5 33 V0"/>
      </g>
      <g transform="translate(130 0)" fill="none" stroke={textColor} strokeWidth="7">
        <path d="M41.5 15.75 A19 12.25 0 0 0 3.5 15.75 A19 12.25 0 0 0 22.5 28 A19 12.25 0 0 1 41.5 40.25 A19 12.25 0 0 1 22.5 52.5 A19 12.25 0 0 1 3.5 40.25"/>
      </g>
      <g transform="translate(189 0)" fill="none" stroke={textColor} strokeWidth="7" strokeLinejoin="miter">
        <path d="M38 3.5 H3.5 V52.5 H38"/>
        <path d="M3.5 28 H31"/>
      </g>
    </svg>
  );
}
