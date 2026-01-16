import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  { id: 1, title: 'Aesop', category: 'E-Commerce', year: '2023', image: 'https://picsum.photos/1200/1000?grayscale&random=1' },
  { id: 2, title: 'Mono', category: 'Branding', year: '2024', image: 'https://picsum.photos/1200/1000?grayscale&random=2' },
  { id: 3, title: 'Vogue', category: 'Art Direction', year: '2022', image: 'https://picsum.photos/1200/1000?grayscale&random=3' },
  { id: 4, title: 'Type', category: 'Web Design', year: '2023', image: 'https://picsum.photos/1200/1000?grayscale&random=4' },
];

export const Projects: React.FC = () => {
  return (
    <section id="work" className="">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Header Cell */}
        <div className="p-6 md:p-12 border-b-grid md:border-r-grid flex flex-col justify-between min-h-[300px]">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight uppercase">Selected<br />Works</h2>
          <span className="text-sm text-secondary uppercase tracking-widest mt-8 block">2021 — 2024</span>
        </div>

        {/* Philosophy Cell */}
        <div className="p-6 md:p-12 border-b-grid flex flex-col justify-center min-h-[300px] bg-white text-black">
          <p className="text-2xl md:text-3xl leading-tight font-medium">
            "We believe in the power of subtraction. By stripping away the non-essential, we reveal the core essence of a brand."
          </p>
        </div>

        {/* Project Grid */}
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`group cursor-pointer border-b-grid ${index % 2 === 0 ? 'md:border-r-grid' : ''} relative overflow-hidden h-[600px]`}
          >
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest bg-black text-white px-3 py-1">{project.category}</span>
                <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-2">{project.title}</h3>
                <span className="text-sm text-gray-300">{project.year}</span>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
            
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      
      <div className="p-12 text-center border-b-grid hover:bg-white hover:text-black transition-colors cursor-pointer">
        <span className="text-lg uppercase tracking-widest font-bold">View All Archive</span>
      </div>
    </section>
  );
};