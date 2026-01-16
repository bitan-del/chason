import React, { useState } from 'react';
import { generateCreativeConcept } from '../services/gemini';
import { Sparkles, Loader2, CornerDownLeft } from 'lucide-react';
import { GeminiResponse } from '../types';

export const ConceptGenerator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<GeminiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    const data = await generateCreativeConcept(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <section id="studio" className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border-b-grid">
      {/* Label Column */}
      <div className="lg:col-span-4 p-6 md:p-12 border-b-grid lg:border-b-0 lg:border-r-grid flex flex-col justify-between">
        <div>
           <span className="text-xs uppercase tracking-widest text-secondary mb-4 block">AI Experiment .01</span>
           <h2 className="text-4xl font-medium leading-tight mb-8 uppercase">Concept<br />Generator</h2>
           <p className="text-secondary text-sm leading-relaxed max-w-xs">
             Use our Gemini-powered engine to generate abstract architectural and branding concepts.
           </p>
        </div>
        <div className="mt-12 hidden lg:block">
           <Sparkles className="text-white opacity-50" size={48} />
        </div>
      </div>

      {/* Interactive Column */}
      <div className="lg:col-span-8 flex flex-col">
        {/* Output Display */}
        <div className="flex-grow p-8 md:p-12 bg-[#0e0e0e] min-h-[300px] flex flex-col justify-center relative border-b-grid">
            {loading && (
               <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                 <Loader2 className="animate-spin text-white" size={32} />
               </div>
            )}
            
            {result ? (
              <div className="animate-fade-in max-w-2xl">
                <span className="text-xs font-mono text-secondary mb-4 block">// OUTPUT_RECEIVED</span>
                <h3 className="text-3xl md:text-5xl font-light leading-tight text-white mb-8">"{result.tagline}"</h3>
                <p className="text-lg text-neutral-400 font-light mb-8 leading-relaxed">
                  {result.concept}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(result.keywords) && result.keywords.map((kw, i) => (
                    <span key={i} className="px-4 py-2 border border-neutral-800 text-xs uppercase tracking-wider text-neutral-300 bg-neutral-900">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center opacity-20">
                <span className="text-6xl font-light block mb-4">?</span>
                <p className="text-sm uppercase tracking-widest">Waiting for input</p>
              </div>
            )}
        </div>

        {/* Input Field */}
        <div className="p-0">
            <form onSubmit={handleGenerate} className="relative flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your vision (e.g. brutalist spa in Iceland)..."
                className="w-full bg-black text-white p-8 md:p-10 text-xl md:text-2xl focus:outline-none placeholder:text-neutral-700 font-light"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="px-10 border-l-grid hover:bg-white hover:text-black transition-colors flex items-center justify-center"
              >
                <CornerDownLeft size={24} />
              </button>
            </form>
        </div>
      </div>
    </section>
  );
};