"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GESTURE_EVENTS = [
  "pointerdown",
  "mousedown",
  "click",
  "keydown",
  "touchstart",
] as const;

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(false);
      window.dispatchEvent(new CustomEvent("preloader-transition-start"));
      return;
    }

    // Lock page scroll while preloader is visible
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    let gestureActive = false;
    let fallbackTimer: NodeJS.Timeout | null = null;
    let guardTimer: NodeJS.Timeout | null = null;

    const removeGestureListeners = () => {
      if (!gestureActive) return;
      gestureActive = false;
      GESTURE_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
    };

    const handleFirstGesture = () => {
      if (videoRef.current && !hasExitedRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
      }
      removeGestureListeners();
    };

    const handlePlaying = () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      const vid = videoRef.current;
      const duration =
        vid && vid.duration && !isNaN(vid.duration) ? vid.duration : 4.2;
      guardTimer = setTimeout(() => {
        handleExit();
      }, (duration + 2) * 1000);
    };

    // Pause handler must not restart the video at its natural end
    const handlePause = () => {
      const vid = videoRef.current;
      if (!vid || hasExitedRef.current) return;
      if (vid.ended || vid.currentTime >= vid.duration - 0.15) {
        return;
      }
      vid.play().catch(() => {});
    };

    if (video) {
      video.playbackRate = 1.0;
      video.playsInline = true;
      video.loop = false;

      video.addEventListener("pause", handlePause);
      video.addEventListener("playing", handlePlaying, { once: true });

      // 8s fallback timer only in case the video never starts
      fallbackTimer = setTimeout(() => {
        handleExit();
      }, 8000);

      // Try sound first: set muted=false and call play()
      video.muted = false;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If rejected by autoplay policy, set muted=true and call play() again so it starts at once
          if (videoRef.current && !hasExitedRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});

            // While muted, listen for the first pointerdown, mousedown, click, keydown or touchstart
            gestureActive = true;
            GESTURE_EVENTS.forEach((evt) => {
              window.addEventListener(evt, handleFirstGesture, {
                once: true,
                passive: true,
              });
            });
          }
        });
      }
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (guardTimer) clearTimeout(guardTimer);
      if (video) {
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("playing", handlePlaying);
      }
      removeGestureListeners();
      document.body.style.overflow = "";
    };
  }, []);

  // Preloader finishes when the video ends (onEnded) with bottom-to-top slide curtain animation
  const handleExit = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    // Start hero animations synchronously as the curtain begins sliding up
    window.dispatchEvent(new CustomEvent("preloader-transition-start"));

    if (!containerRef.current) {
      document.body.style.overflow = "";
      setIsVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsVisible(false);
      },
    });

    // 1. Video soft scale and fade
    if (videoRef.current) {
      tl.to(
        videoRef.current,
        {
          scale: 1.06,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        0
      );
    }

    // 2. Bottom to top curtain slide reveal (slides up out of view)
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      0.08
    );
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#000000] select-none pointer-events-none overflow-hidden will-change-transform flex items-center justify-center"
      role="dialog"
      aria-label="CodeNest Loading Experience"
      aria-modal="true"
    >
      {/* Zoomed out video container: perfectly centered, responsive, no edge cropping */}
      <div className="relative w-full h-full max-w-[85vw] md:max-w-[78vw] lg:max-w-[72vw] xl:max-w-[65vw] max-h-[65vh] md:max-h-[70vh] flex items-center justify-center p-4 sm:p-6">
        <video
          ref={videoRef}
          src="/motion.mp4"
          autoPlay
          playsInline
          preload="auto"
          controls={false}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onEnded={handleExit}
          onError={() => {
            setTimeout(handleExit, 800);
          }}
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* Soft radial vignette overlay so no video edge shows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)] shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]" />
    </div>
  );
}
