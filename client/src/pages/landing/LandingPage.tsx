import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <main
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* BACKGROUND: Two images slightly tilted from both sides, combined at center, heavily faded into black */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {/* Container for the dual tilted images */}
        <div className="relative w-[120%] max-w-none h-full flex items-center justify-center">
          
          {/* Left Campus Image - Tilted slightly from left */}
          <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-end">
            <img
              src="/images/niche_campus_left.jpg"
              alt="Noorul Islam Campus"
              className="h-[85vh] sm:h-[95vh] w-auto max-w-none object-cover transform -rotate-3 sm:-rotate-4 origin-bottom-right scale-105 filter grayscale contrast-125 opacity-20 sm:opacity-25"
            />
          </div>

          {/* Right Campus Image - Tilted slightly from right */}
          <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-start">
            <img
              src="/images/niche_campus_right.jpg"
              alt="Noorul Islam Centre for Higher Education"
              className="h-[85vh] sm:h-[95vh] w-auto max-w-none object-cover transform rotate-3 sm:rotate-4 origin-bottom-left scale-105 filter grayscale contrast-125 opacity-20 sm:opacity-25"
            />
          </div>

          {/* Deep Black Overlays: heavy radial vignette + linear gradients so majority black is highly dominant */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/80 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black pointer-events-none" />
          {/* Subtle center blend seam */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 bg-gradient-to-r from-transparent via-black to-transparent pointer-events-none" />
        </div>
      </div>

      {/* FOREGROUND CONTENT: Pure Iconic Classic Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Title in one uniform size across all words */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.22em] sm:tracking-[0.28em] text-zinc-100 uppercase leading-relaxed max-w-4xl">
          NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.35em] sm:tracking-[0.45em] text-zinc-400 uppercase">
          PLACEMENT READINESS PLATFORM
        </p>

        {/* Sign In Option */}
        <div className="pt-8 sm:pt-10">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-block px-10 py-3.5 border border-zinc-800 hover:border-zinc-300 text-zinc-300 hover:text-white transition-all duration-300 text-xs tracking-[0.25em] uppercase font-light bg-black/60 hover:bg-white hover:text-black"
            >
              Enter Platform
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-10 py-3.5 border border-zinc-800 hover:border-zinc-300 text-zinc-300 hover:text-white transition-all duration-300 text-xs tracking-[0.25em] uppercase font-light bg-black/60 hover:bg-white hover:text-black"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </main>
  );
};

export default LandingPage;
