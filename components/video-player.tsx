"use client";

import { Slider } from "@base-ui/react/slider";
import {
  ArrowsInIcon,
  ArrowsOutIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { easeOutQuart } from "@rahul-choudhury/ui";
import { useMediaQuery } from "@rahul-choudhury/ui/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { triggerMobileHaptic } from "./mobile-haptics";
import styles from "./video-player.module.css";

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
  const isMobile = useMediaQuery("(width < 64rem)");

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
      } catch {
        // Some browsers do not expose screen orientation controls.
      }
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
    } catch {
      // Ignore unsupported orientation lock requests on desktop and Safari.
    }
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
      className={styles.player}
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
        className={styles.video}
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
        className={styles.overlay}
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
            transition: { duration: 0.25, ease: easeOutQuart },
          },
          hidden: {
            y: "100%",
            opacity: 1,
            transition: { duration: 0.25, ease: easeOutQuart },
          },
        }}
        className={styles.bar}
      >
        {/* Controls box */}
        <div className={styles.controls}>
          {/* Play/Pause */}
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            className={styles.control}
            data-control="play"
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
                  <PauseIcon size={18} weight="fill" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PlayIcon size={18} weight="fill" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Time */}
          <span className={styles.time}>
            {formatTime(currentTime)}&nbsp;/&nbsp;{formatTime(duration)}
          </span>

          {/* Seek slider */}
          <Slider.Root
            value={currentTime}
            max={duration || 1}
            step={0.1}
            aria-label="Seek"
            onValueChange={handleSeek}
            onValueCommitted={() => {
              setIsSeeking(false);
              triggerMobileHaptic();
            }}
            className={styles.seek}
          >
            <Slider.Control className={styles.seekControl}>
              <Slider.Track className={styles.track}>
                <Slider.Indicator className={styles.progress} />
                <Slider.Thumb className={styles.thumb} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>

          {/* Fullscreen */}
          <button
            type="button"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className={styles.control}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <ArrowsInIcon size={16} />
            ) : (
              <ArrowsOutIcon size={16} />
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
