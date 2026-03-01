"use client";

import { Slider } from "@base-ui/react/slider";
import { Maximize, Minimize, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  width,
  height,
}: {
  src: string;
  width: string;
  height: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const controlsVisible = !isPlaying || isMobile || isHovering;

  const handlePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    setIsSeeking(true);
    setCurrentTime(value);
    video.currentTime = value;
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      try {
        screen.orientation.unlock();
      } catch {}
      await document.exitFullscreen();
      return;
    }

    await container.requestFullscreen();
    try {
      await (
        screen.orientation as ScreenOrientation & {
          lock(orientation: string): Promise<void>;
        }
      ).lock("landscape");
    } catch {}
  };

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setIsHovering(containerRef.current?.matches(":hover") ?? false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncDuration = () => {
      const nextDuration = video.duration;
      setDuration(
        Number.isFinite(nextDuration) && nextDuration > 0 ? nextDuration : 0,
      );
    };

    syncDuration();
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("durationchange", syncDuration);

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Video player"
      className="relative my-6 overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="auto"
        className="mx-auto block"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          if (!isSeeking) setCurrentTime(e.currentTarget.currentTime);
        }}
      />

      {/* Click overlay for play/pause */}
      <button
        type="button"
        aria-label={isPlaying ? "Pause Video" : "Play Video"}
        className="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={handlePlayback}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handlePlayback();
          }
        }}
      />

      {/* Controls bar */}
      <motion.div
        initial={false}
        animate={controlsVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.25, ease: [0.165, 0.84, 0.44, 1] },
          },
          hidden: {
            y: "100%",
            opacity: 1,
            transition: { duration: 0.25, ease: [0.165, 0.84, 0.44, 1] },
          },
        }}
        className="absolute bottom-0 left-0 right-0 p-2.5"
      >
        {/* Controls box */}
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 shadow-lg backdrop-blur-md">
          {/* Play/Pause */}
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex shrink-0 cursor-pointer items-center justify-center text-white/90 transition-colors hover:text-white"
            onClick={handlePlayback}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Pause size={18} fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Play size={18} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Time */}
          <span className="shrink-0 select-none font-mono text-xs text-white/70 tabular-nums">
            {formatTime(currentTime)}&nbsp;/&nbsp;{formatTime(duration)}
          </span>

          {/* Seek slider */}
          <Slider.Root
            value={currentTime}
            max={duration || 1}
            step={0.1}
            aria-label="Seek"
            onValueChange={handleSeek}
            onValueCommitted={() => setIsSeeking(false)}
            className="group/slider flex grow items-center"
          >
            <Slider.Control className="flex h-5 w-full touch-none items-center">
              <Slider.Track className="relative h-1 w-full rounded-full bg-white/25 transition-[height] duration-150 group-hover/slider:h-1.5">
                <Slider.Indicator className="rounded-full bg-white/80" />
                <Slider.Thumb className="block size-3 rounded-full bg-white opacity-0 shadow-sm transition-[opacity,transform] duration-150 focus:outline-none group-hover/slider:opacity-100 data-dragging:scale-125 data-dragging:opacity-100" />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>

          {/* Fullscreen */}
          <button
            type="button"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="flex shrink-0 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-white"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
