import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-background text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-12 md:p-24 border-b-grid md:border-r-grid">
          <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none tracking-tighter mb-8">
            Start a<br />Project
          </h2>
          <a href="mailto:hello@chason.io" className="text-xl md:text-2xl text-secondary hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 inline-block">
            hello@chason.io
          </a>
        </div>
        
        <div className="grid grid-rows-2">
           <div className="p-12 border-b-grid flex flex-col justify-center">
             <h4 className="text-xs uppercase tracking-widest text-secondary mb-6">Studio</h4>
             <p className="text-lg">100 Broadway,<br />New York, NY 10005</p>
           </div>
           <div className="p-12 border-b-grid flex flex-col justify-center">
              <h4 className="text-xs uppercase tracking-widest text-secondary mb-6">Connect</h4>
              <div className="flex gap-8">
                <a href="#" className="text-lg hover:text-secondary transition-colors">Instagram</a>
                <a href="#" className="text-lg hover:text-secondary transition-colors">LinkedIn</a>
                <a href="#" className="text-lg hover:text-secondary transition-colors">Twitter</a>
              </div>
           </div>
        </div>
      </div>
      
      <div className="px-6 py-6 md:px-12 flex justify-between items-center text-[10px] uppercase tracking-widest text-secondary">
        <span>© 2024 Chason.io. All Rights Reserved.</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
};