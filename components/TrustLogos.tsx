import React, { useState, useEffect, useRef } from 'react';

// Logo positions - pushed 5% further out
const logoPositions = [
    // Row 1 - Top edge (4 logos)
    { id: 1, x: -508, y: -279 },
    { id: 2, x: -165, y: -279 },
    { id: 3, x: 165, y: -279 },
    { id: 4, x: 508, y: -279 },

    // Row 2 - Upper area (5 logos)
    { id: 5, x: -572, y: -140 },
    { id: 6, x: -287, y: -140 },
    { id: 7, x: 0, y: -170 },
    { id: 8, x: 287, y: -140 },
    { id: 9, x: 572, y: -140 },

    // Row 3 - Middle (5 logos - around text)
    { id: 10, x: -572, y: 0 },
    { id: 11, x: -287, y: 0 },
    { id: 12, x: 287, y: 0 },
    { id: 13, x: 572, y: 0 },
    { id: 14, x: 0, y: 110 },

    // Row 4 - Lower area (4 logos)
    { id: 15, x: -432, y: 165 },
    { id: 16, x: -140, y: 165 },
    { id: 17, x: 140, y: 165 },
    { id: 18, x: 432, y: 165 },

    // Row 5 - Bottom edge (2 logos)
    { id: 19, x: -229, y: 279 },
    { id: 20, x: 229, y: 279 },
];

export const TrustLogos: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-16 md:py-24 px-8 md:px-16 overflow-hidden"
            style={{
                backgroundImage: 'url(/logo/BG-GRAIN.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '80vh',
            }}
        >
            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h2 className="text-white text-center tracking-tight">
                    <span className="font-poppins font-thin text-lg md:text-xl lg:text-2xl">they</span>{' '}
                    <span className="font-ogg font-thin text-xl md:text-2xl lg:text-3xl" style={{ color: '#eaff80' }}>trust us</span>
                </h2>
            </div>

            {/* Desktop: Scattered Layout - Hidden on Mobile */}
            <div className="hidden md:block absolute inset-0">
                <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                        {logoPositions.map((pos, index) => {
                            return (
                                <div
                                    key={pos.id}
                                    className="absolute group"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: isVisible
                                            ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1)`
                                            : 'translate(-50%, -50%) scale(0.2)',
                                        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
                                        opacity: isVisible ? 1 : 0,
                                        transition: `all 1500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                                        zIndex: isVisible ? 1 : 0,
                                    }}
                                >
                                    <img
                                        src={`/logo/${pos.id}.png`}
                                        alt={`Brand ${pos.id}`}
                                        className={`w-auto object-contain transition-all duration-300 group-hover:scale-110 ${pos.id === 7 ? 'h-14 md:h-18 lg:h-21' :
                                            pos.id === 8 ? 'h-14 md:h-19 lg:h-22' :
                                                'h-18 md:h-24 lg:h-28'
                                            }`}
                                        style={{
                                            filter: 'grayscale(100%) brightness(0.8)',
                                            opacity: 0.7,
                                            transition: 'all 300ms ease-out',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(0%) brightness(1)';
                                            e.currentTarget.style.opacity = '1';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.filter = 'grayscale(100%) brightness(0.8)';
                                            e.currentTarget.style.opacity = '0.7';
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile: Simple Carousel - Hidden on Desktop */}
            <div className="md:hidden relative mt-32">
                <div className="overflow-hidden">
                    <div
                        className="flex gap-6 animate-scroll"
                        style={{
                            animation: 'scroll 25s linear infinite',
                        }}
                    >
                        {/* Duplicate logos twice for seamless loop */}
                        {[...logoPositions, ...logoPositions].map((pos, index) => (
                            <div
                                key={`${pos.id}-${index}`}
                                className="flex-shrink-0"
                            >
                                <img
                                    src={`/logo/${pos.id}.png`}
                                    alt={`Brand ${pos.id}`}
                                    className="h-10 w-auto object-contain"
                                    style={{
                                        filter: 'grayscale(100%) brightness(0.8)',
                                        opacity: 0.7,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </section>
    );
};
