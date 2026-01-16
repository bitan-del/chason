import { useEffect, useRef, useState, MouseEvent } from 'react';

interface ServiceDetail {
    number: string;
    title: string;
    description: string;
    features: string[];
    image?: string;
}

const services: ServiceDetail[] = [
    {
        number: '001',
        title: 'Brand Strategy',
        description: "Your brand's compass. It defines purpose, sharpens positioning, and ensures every decision you make resonates with your audience while driving business growth.",
        features: [
            'Research & Insights',
            'Go-to-Market Strategy (GTM)',
            'Brand Architecture',
            'Purpose, Mission, Vision',
            'Value Proposition',
            'Communication Strategy',
            'Verbal Identity',
            'Naming'
        ]
    },
    {
        number: '002',
        title: 'Brand Identity',
        description: 'The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.',
        features: [
            'Logotype & Symbol Design',
            'Typography & Color Systems',
            'Brand Book & Guidelines',
            'Illustrations & 3D Visuals',
            'Motion Graphics & Storytelling',
            'Art Direction',
            'Packaging Design'
        ]
    },
    {
        number: '003',
        title: 'Website',
        description: 'The digital face of your brand, we create websites that captivate, connect, and leave an unforgettable mark on every visitor.',
        features: [
            'UX Design',
            'Interactive UI Design',
            'Information Architecture',
            'Custom Web Development',
            'Scroll Based Animations & 3D',
            'Editorial Design & CMS',
            'Performance Optimization',
            'Website Maintenance & Support'
        ]
    },
    {
        number: '004',
        title: 'AI Content Creation',
        description: 'Harness the power of AI to create compelling, scalable content that resonates with your audience and drives engagement.',
        features: [
            'AI-Powered Copywriting',
            'Automated Content Generation',
            'Visual Content Creation',
            'Content Strategy & Planning',
            'SEO Optimization',
            'Multi-Platform Distribution'
        ]
    },
    {
        number: '005',
        title: 'E-commerce',
        description: "Your brand's digital marketplace. We create e-commerce experiences that are as effortless to shop as they are hard to forget.",
        features: [
            'Consulting & Strategy',
            'Custom Storefront Design & UX',
            'Technical & Compliances',
            'Engineering & Execution',
            'Optimisation & Growth',
            'Maintenance & Support'
        ]
    },
    {
        number: '006',
        title: 'Content Design',
        description: 'Strategic content that tells your story, engages your audience, and drives meaningful connections across all touchpoints.',
        features: [
            'Content Strategy',
            'Editorial Design',
            'Visual Storytelling',
            'Brand Messaging',
            'Social Media Content',
            'Campaign Development'
        ]
    }
];

export function ServiceSlides() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [slideProgress, setSlideProgress] = useState(0); // 0 to 1
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollProgress = -containerRect.top;

            // Each section is roughly 100vh
            const sectionHeight = window.innerHeight;
            const totalProgress = scrollProgress / sectionHeight;

            const newCurrentIndex = Math.min(services.length - 1, Math.max(0, Math.floor(totalProgress)));
            const newNextIndex = Math.min(services.length - 1, newCurrentIndex + 1);

            // Calculate slide progress (0 to 1 within current section)
            const progress = totalProgress - newCurrentIndex;

            setCurrentIndex(newCurrentIndex);
            setNextIndex(newNextIndex);
            setSlideProgress(Math.min(1, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderCard = (service: ServiceDetail, index: number, isNext: boolean = false) => {
        const opacity = isNext ? slideProgress : (1 - slideProgress);
        const translateY = isNext ? `${(1 - slideProgress) * 100}%` : `${-slideProgress * 30}%`;
        const scale = isNext ? 1 : (1 - slideProgress * 0.05);

        return (
            <div
                key={`card-${index}`}
                className="absolute inset-0 flex items-center justify-center py-8"
                style={{
                    opacity,
                    transform: `translateY(${translateY}) scale(${scale})`,
                    transition: 'none',
                    pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                }}
            >
                <div
                    className="w-full max-w-5xl group"
                    onMouseMove={(e) => {
                        handleMouseMove(e, index);
                        setActiveCard(index);
                    }}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    {/* Glassmorphic Card */}
                    <div
                        className="relative backdrop-blur-xl bg-black/80 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden hover:bg-black/70 transition-all duration-500"
                        style={{
                            backgroundImage: 'url(/logo/BG-GRAIN.svg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '700px', // Increased height to prevent button cutoff
                            maxHeight: '700px',
                        }}
                    >
                        {/* Lighter overlay for grain - more visible grain */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Mouse-following glow effect */}
                        <div
                            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${activeCard === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
                            }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content Grid */}
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 h-full overflow-y-auto">
                            {/* Left Column */}
                            <div>
                                <p className="text-sm text-white/40 mb-4">{service.number}</p>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
                                    {service.title}
                                </h3>

                                <p className="text-white/70 text-base leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="text-white/60 text-sm flex items-start gap-3 group/item"
                                        >
                                            <span className="text-[#eaff80] mt-1.5 group-hover/item:scale-125 transition-transform">•</span>
                                            <span className="group-hover/item:text-white transition-colors">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button className="mt-8 px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#eaff80]" />
                                    LET'S BEGIN
                                </button>
                            </div>

                            {/* Right Column - Placeholder for visual */}
                            <div className="flex items-center justify-center">
                                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-5xl font-light text-white/20">
                                        {service.number}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="relative bg-black text-white" ref={containerRef}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="pt-24 pb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-center">
                        <span className="font-poppins font-light text-white">our </span>
                        <span className="font-ogg italic text-[#eaff80]">services</span>
                    </h2>
                </div>

                {/* Sticky Container with Two Cards */}
                <div className="sticky top-24 h-screen relative">
                    {/* Current Card */}
                    {renderCard(services[currentIndex], currentIndex, false)}

                    {/* Next Card (only if not at the end) */}
                    {currentIndex < services.length - 1 && renderCard(services[nextIndex], nextIndex, true)}
                </div>

                {/* Spacers for scroll height */}
                {services.map((_, index) => (
                    <div key={`spacer-${index}`} className="h-screen" />
                ))}
            </div>
        </section>
    );
}
