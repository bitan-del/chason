import React, { useEffect, useRef, useState } from 'react';

// The exact video background from the reference
const VIDEO_SRC = "https://d1apnj7dqboaex.cloudfront.net/BH-BG-HERO.mp4";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hindiRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [togglePosition, setTogglePosition] = useState<'left' | 'center' | 'right'>('center');

  // Optimized Mouse Movement for Lens Effect
  const handleTextMouseMove = (e: React.MouseEvent) => {
    if (!textContainerRef.current) return;

    // Get coordinates relative to the MAIN container
    const rect = textContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Move the English Mask (The "Hole")
    // Instead of moving a small mask image, we update the gradient center on the full element
    if (maskRef.current) {
      const gradient = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 98%, black 100%)`;
      maskRef.current.style.maskImage = gradient;
      maskRef.current.style.webkitMaskImage = gradient;
    }

    // 2. Move the Hindi Clip Path (The "Fill")
    if (hindiRef.current) {
      hindiRef.current.style.clipPath = `circle(100px at ${x}px ${y}px)`;
    }

    // 3. Move the Visual Ring
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Explicitly collapse the circle immediately to prevent artifacts
    if (hindiRef.current) {
      hindiRef.current.style.clipPath = 'circle(0px at 50% 50%)';
    }

    // Reset mask to show full text (no hole)
    if (maskRef.current) {
      maskRef.current.style.maskImage = 'none';
      maskRef.current.style.webkitMaskImage = 'none';
    }
  };

  const handleRedirect = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setTogglePosition('left');
      setTimeout(() => {
        window.location.href = 'https://outreachpro.io';
      }, 400);
    } else {
      setTogglePosition('right');
      setTimeout(() => {
        window.location.href = 'https://klintstudios.com';
      }, 400);
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* Background Layer: VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Main Interactive Content */}
      <div
        ref={containerRef}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-[95vw] px-4"
      >
        {/* Interactive Text Lens Container */}
        <div
          ref={textContainerRef}
          className="relative w-fit mx-auto py-20 px-4 md:px-8 flex items-center justify-center cursor-none select-none"
          onMouseMove={handleTextMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
        >

          {/* 
            Note on Typography:
            - lg:whitespace-nowrap ensures single line on desktop
            - lg:text-5xl xl:text-6xl scales down to fit the single line within view
            - font-serif maps to 'Rische' in tailwind config
          */}

          {/* 0. Spacer (Invisible) - Defines size */}
          <div className="relative opacity-0 pointer-events-none" aria-hidden="true">
            <h1
              className="text-center text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white tracking-tight leading-[1.2] whitespace-normal lg:whitespace-nowrap"
              style={{
                fontFamily: 'Helvetica Neue, sans-serif',
                fontWeight: 300,
                fontStyle: 'normal'
              }}
            >
              Where <span style={{ fontWeight: 'bold' }}>Technology</span> & <br className="lg:hidden" /> <span style={{ fontWeight: 'bold' }}>Creativity</span> Ignite Brilliance
            </h1>
          </div>

          {/* 1. English Layer (The Base) */}
          <div
            ref={maskRef}
            className="absolute inset-0 flex items-center justify-center z-10"
          // Styles are handled dynamically via JS to ensure full coverage
          >
            <h1
              className="text-center text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white tracking-tight leading-[1.2] opacity-90 whitespace-normal lg:whitespace-nowrap"
              style={{
                fontFamily: 'Helvetica Neue, sans-serif',
                fontWeight: 300,
                fontStyle: 'normal'
              }}
            >
              Where <span style={{ fontWeight: 'bold' }}>Technology</span> & <br className="lg:hidden" /> <span style={{ fontWeight: 'bold' }}>Creativity</span> Ignite Brilliance
            </h1>
          </div>

          {/* 2. Hindi Layer (The Reveal) */}
          <div
            ref={hindiRef}
            className="absolute inset-0 flex items-center justify-start px-4 md:px-8 z-20 pointer-events-none text-white bg-transparent"
            style={{
              clipPath: isHovering ? 'circle(0px at 50% 50%)' : 'circle(0px at 50% 50%)', // Initial state updated by JS
              willChange: 'clip-path',
            }}
          >
            <h1 className="text-justify [text-align-last:justify] font-devanagari font-normal text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white tracking-widest leading-[1.2] w-full subpixel-antialiased drop-shadow-none whitespace-normal lg:whitespace-nowrap">
              विद्या अमृतम् अस्ति |<br className="lg:hidden" /> तमसो मा ज्योतिर्गमय
            </h1>
          </div>

          {/* 3. The Visual Lens Ring */}
          <div
            ref={ringRef}
            className={`absolute pointer-events-none w-[200px] h-[200px] rounded-full border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.1)] z-30 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: 0,
              left: 0,
              marginTop: -100, // Center offset
              marginLeft: -100, // Center offset
              willChange: 'transform'
            }}
          >
            {/* Subtle Lens Glare */}
            <div className="absolute top-3 left-4 w-6 h-3 bg-white/10 blur-[2px] rounded-[50%] rotate-[-45deg]"></div>
          </div>

        </div>

        {/* Bottom Toggle Section */}
        {/* Using GRID ensures strictly mathematically centered middle element */}
        <div className="mt-16 grid grid-cols-[1fr_auto_1fr] items-center gap-6 w-full max-w-2xl opacity-90 hover:opacity-100 transition-opacity duration-500 group">
          {/* Left Label */}
          <span
            onClick={() => handleRedirect('left')}
            className={`justify-self-end font-poppins font-light text-lg tracking-wide text-white cursor-pointer transition-opacity duration-300 ${togglePosition === 'left' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            Outreach Pro
          </span>

          {/* Slider Component */}
          <div
            className="group/switch w-20 h-9 rounded-full border border-white/20 relative bg-white/5 cursor-pointer backdrop-blur-sm shadow-inner transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX < rect.width / 2) {
                handleRedirect('left');
              } else {
                handleRedirect('right');
              }
            }}
          >
            {/* The Thumb */}
            <div
              className={`absolute top-1.5 w-6 h-6 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/switch:shadow-[0_0_25px_white] group-hover/switch:bg-white
                 ${togglePosition === 'center' ? 'left-1/2 -translate-x-1/2' : ''}
                 ${togglePosition === 'left' ? 'left-1.5 translate-x-0' : ''}
                 ${togglePosition === 'right' ? 'left-[calc(100%-1.5rem-0.375rem)] translate-x-0' : ''}
               `}
            ></div>
          </div>

          {/* Right Label */}
          <span
            onClick={() => handleRedirect('right')}
            className={`justify-self-start font-poppins font-light text-lg tracking-wide text-white cursor-pointer transition-opacity duration-300 ${togglePosition === 'right' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            Klint Studios
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* Outer container handles centering - Inner handles animation to prevent transform overwrite */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3 opacity-40 animate-bounce-slow">
          {/* mr-[-0.3em] optically centers the text by neutralizing the trailing tracking space */}
          <span className="text-[9px] uppercase tracking-[0.3em] font-light mr-[-0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};