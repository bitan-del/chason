import React, { useState } from 'react';
import { ChevronDown, Menu, X, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isViewfinderOpen, setIsViewfinderOpen] = useState(false); // Desktop Mega Menu state

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
        <div className="relative w-full max-w-[1400px] flex flex-col items-center">

          {/* Floating Glass Pill Container */}
          <div className="w-full h-20 bg-[#080808]/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex justify-between items-center px-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 transition-all duration-300">

            {/* Logo Section */}
            <a href="#" className="flex items-center gap-4 group">
              {/* Logo Image */}
              <img
                src="/chason-logo-new.png"
                alt="Chason Logo"
                className="h-8 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
            </a>

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center gap-10">
              <button
                onClick={() => setIsViewfinderOpen(!isViewfinderOpen)}
                className={`text-[15px] font-sans font-thin text-white/90 hover:text-white transition-colors flex items-center gap-2 group tracking-wide outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${isViewfinderOpen ? 'text-white' : ''}`}
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                viewfinder
                <ChevronDown size={14} className={`text-white/60 transition-transform duration-300 ${isViewfinderOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
              </button>

              <button className="bg-white text-black px-7 py-3 rounded-lg text-sm font-semibold hover:bg-[#e0e0e0] transition-colors shadow-lg shadow-white/5">
                start a project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Viewfinder Mega Menu Dropdown */}
          {isViewfinderOpen && (
            <div className="hidden md:block absolute top-[calc(100%+12px)] w-full bg-black border border-[#222] rounded-3xl overflow-hidden shadow-2xl animate-slide-up origin-top z-40">

              {/* Close Button (Top Right) */}
              <button
                onClick={() => setIsViewfinderOpen(false)}
                className="absolute top-6 right-8 text-white/50 hover:text-white transition-colors z-50"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-2 min-h-[500px]">
                {/* Left Column: Menu Links */}
                <div className="border-r border-[#222] p-12 lg:p-16 flex flex-col justify-center space-y-6">
                  {['Work', 'Our Muse', 'Our Products', 'Services', 'Get Deck', 'Meet Our Team'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-3xl lg:text-4xl font-ogg font-thin text-white hover:text-neutral-400 transition-colors cursor-pointer leading-tight tracking-tight"
                      onClick={() => setIsViewfinderOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>

                {/* Right Column: Empty Void (as per reference) */}
                <div className="bg-black">
                  {/* This space is intentionally left blank to match the minimalist reference design */}
                </div>
              </div>

              {/* Footer Section of Dropdown */}
              <div className="border-t border-[#222] px-12 py-8 flex justify-between items-center bg-black">

                {/* Logo + Engineering Badge */}
                <div className="flex items-center gap-6 opacity-80">
                  <div className="flex items-center gap-3">
                    <img
                      src="/chason-logo-new.png"
                      alt="Chason Logo"
                      className="h-6 w-auto"
                    />
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-4 w-[1px] bg-[#333]"></div>

                  {/* Engineering Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-[1px] h-3 bg-white/30 rotate-12"></div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">Engineering</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-6">
                  <a href="#" className="text-white hover:text-gray-400 transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-white hover:text-gray-400 transition-colors"><Youtube size={20} /></a>
                  <a href="#" className="text-white hover:text-gray-400 transition-colors"><Linkedin size={20} /></a>
                </div>

              </div>
            </div>
          )}

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col gap-8 text-center">
          <a href="#work" onClick={() => setIsOpen(false)} className="text-5xl font-serif text-white hover:text-gray-400 transition-colors">Work</a>
          <a href="#studio" onClick={() => setIsOpen(false)} className="text-5xl font-serif text-white hover:text-gray-400 transition-colors">Studio</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-5xl font-serif text-white hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </div>
    </>
  );
};