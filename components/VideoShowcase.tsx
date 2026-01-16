import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

// Add types for the YouTube IFrame API
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export const VideoShowcase: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const YOUTUBE_VIDEO_ID = 'EM68s3Lnr5o';

    // Load YouTube API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    }, []);

    const initPlayer = () => {
        if (window.YT && window.YT.Player) {
            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: YOUTUBE_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    disablekb: 1,
                },
                events: {
                    'onStateChange': onPlayerStateChange,
                }
            });
        }
    };

    const onPlayerStateChange = (event: any) => {
        // 2 = PAUSED, 1 = PLAYING
        if (event.data === 2) {
            setIsPaused(true);
        } else if (event.data === 1) {
            setIsPaused(false);
        }
    };

    const handlePlayClick = () => {
        setIsPlaying(true);
        // Give a small delay for the div to render before initializing player
        setTimeout(() => {
            if (window.YT && window.YT.Player) {
                initPlayer();
            } else {
                // Fallback if API isn't ready yet
                window.onYouTubeIframeAPIReady = initPlayer;
            }
        }, 100);
    };

    const togglePlayPause = () => {
        if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
            const state = playerRef.current.getPlayerState();
            if (state === 1) { // Playing
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Use CSS custom properties for GPU-accelerated cursor tracking
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    const handleMouseEnter = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--cursor-scale', '1');
            containerRef.current.style.setProperty('--cursor-opacity', '1');
        }
    };

    const handleMouseLeave = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--cursor-scale', '0');
            containerRef.current.style.setProperty('--cursor-opacity', '0');
        }
    };

    return (
        <section className="relative min-h-screen w-full bg-black py-20 px-4 md:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-thin text-white tracking-tight">
                    <span className="text-white/60 font-thin text-xl md:text-2xl">&lt;/view&gt;</span> <span className="text-white/40 mx-2">|</span> <span className="text-[#eaff80]">our latest creation</span>
                </h2>
            </div>

            {/* Video Container */}
            <div
                ref={containerRef}
                className="relative max-w-6xl mx-auto aspect-video rounded-2xl bg-black border border-white/10 cursor-none group animate-glow-pulse"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={isPlaying ? togglePlayPause : undefined}
            >

                {/* Inner container with overflow control */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {/* Vignette Effect - Dark shadow from corners */}
                    <div className="absolute inset-0 z-20 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }}>
                    </div>

                    {!isPlaying ? (
                        <>
                            {/* Blurred Video Grid Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-md scale-105 transition-transform duration-700"
                                style={{
                                    backgroundImage: `url('https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg')`,
                                }}
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Initial Click Handler Layer */}
                            <div
                                onClick={(e) => { e.stopPropagation(); handlePlayClick(); }}
                                className="absolute inset-0 z-30"
                            />
                        </>
                    ) : (
                        /* YouTube Player Container */
                        <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isPaused ? 'blur-lg grayscale-[30%]' : ''}`}>
                            <div id="youtube-player" className="w-full h-full"></div>
                            {/* Transparent overlay to capture clicks for custom play/pause */}
                            <div className="absolute inset-0 z-10 bg-transparent"></div>
                        </div>
                    )}
                </div>

                {/* Custom Cursor - GPU accelerated with CSS variables */}
                <div
                    className="absolute z-40 pointer-events-none"
                    style={{
                        left: 'var(--mouse-x, 0px)',
                        top: 'var(--mouse-y, 0px)',
                        transform: 'translate(-50%, -50%) scale(var(--cursor-scale, 0))',
                        opacity: 'var(--cursor-opacity, 0)',
                        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                        willChange: 'transform, opacity'
                    }}
                >
                    {/* Cursor Circle */}
                    <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform duration-300 ${isPlaying && !isPaused ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}>
                        {isPlaying && !isPaused ? (
                            <Pause className="w-8 h-8 text-black fill-black" />
                        ) : (
                            <Play className="w-10 h-10 text-black fill-black ml-1" />
                        )}
                    </div>

                    {/* Text Label */}
                    {(!isPlaying || isPaused) && (
                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-white font-medium tracking-wide text-sm bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            {isPlaying ? 'Pause' : 'hit the highlights!'}
                        </div>
                    )}
                </div>

            </div>

            {/* Optional: Add some spacing at the bottom */}
            <div className="h-20" />
        </section>
    );
};
