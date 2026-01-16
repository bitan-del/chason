import { useState, useRef, MouseEvent } from 'react';

export function Services() {
    const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({});
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [glowingCards, setGlowingCards] = useState<Set<number>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.service-card');
        const newPositions: { [key: number]: { x: number; y: number } } = {};
        const newGlowingCards = new Set<number>();

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check if mouse is within the card bounds (including some margin for gaps)
            const margin = 30; // pixels of margin to detect gaps
            const isNearCard =
                e.clientX >= rect.left - margin &&
                e.clientX <= rect.right + margin &&
                e.clientY >= rect.top - margin &&
                e.clientY <= rect.bottom + margin;

            if (isNearCard) {
                newGlowingCards.add(index);
                newPositions[index] = { x, y };
            }
        });

        setMousePositions(newPositions);
        setGlowingCards(newGlowingCards);
    };

    const handleMouseLeave = () => {
        setGlowingCards(new Set());
        setHoveredCard(null);
    };

    const services = [
        {
            number: '01',
            title: 'Website Development',
            category: 'WEB DEVELOPMENT',
            videoId: 'dQw4w9WgXcQ' // Replace with actual video ID
        },
        {
            number: '02',
            title: 'AI Content Creation',
            category: 'AI CONTENT',
            videoId: 'dQw4w9WgXcQ' // Replace with actual video ID
        },
        {
            number: '03',
            title: 'Social Media Marketing',
            category: 'SOCIAL MEDIA',
            videoId: 'dQw4w9WgXcQ' // Replace with actual video ID
        }
    ];

    return (
        <section className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-thin mb-4 tracking-tight">
                            <span className="text-white font-poppins font-thin">our </span>
                            <span className="text-[#eaff80] font-ogg font-thin">services</span>
                        </h2>
                    </div>

                    {/* Services Grid */}
                    <div
                        ref={containerRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {services.map((service, index) => {
                            const isGlowing = glowingCards.has(index);
                            const isHovered = hoveredCard === index;

                            return (
                                <div
                                    key={service.number}
                                    className={`service-card group cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                                        }`}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className="relative border border-white/10 rounded-3xl p-8 h-full bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-white/30 overflow-hidden">
                                        {/* Mouse-following glow effect - shows when mouse is near (including gaps) */}
                                        <div
                                            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${isGlowing ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            style={{
                                                background: mousePositions[index]
                                                    ? `radial-gradient(800px circle at ${mousePositions[index].x}px ${mousePositions[index].y}px, rgba(255,255,255,0.15), transparent 40%)`
                                                    : undefined
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-4 mb-6">
                                                <span className={`text-6xl font-thin transition-colors duration-500 ${isGlowing ? 'text-white/60' : 'text-white/40'
                                                    }`}>
                                                    {service.number}
                                                </span>
                                                <span className="text-xs text-white/40 mt-2">/ services</span>
                                            </div>

                                            <h3 className={`text-2xl font-thin mb-4 transition-colors duration-300 ${isGlowing ? 'text-white' : 'text-white/90'
                                                }`}>
                                                {service.title}
                                            </h3>

                                            <p className="text-sm text-white/60 uppercase tracking-wider mb-6">
                                                {service.category}
                                            </p>

                                            {/* Video Embed */}
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${service.videoId}?controls=1&modestbranding=1&rel=0`}
                                                    title={service.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="absolute inset-0 w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
