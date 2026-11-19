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
      {/* BACKGROUND: Zoomed-out campus images starting from outer sides and racing towards the centre like angled perspective rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center [perspective:1400px]">
        
        {/* Left Campus Ray - Anchored to left edge, zoomed out, racing inwards to centre */}
        <div
          className="absolute inset-y-0 left-0 w-[52%] flex items-center justify-center overflow-hidden origin-left"
          style={{
            transform: 'rotateY(18deg) rotateZ(-2deg) scale(0.9)',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/images/niche_campus_left.jpg"
            alt="Noorul Islam Campus Left"
            className="w-full h-auto max-h-[88vh] object-cover rounded-sm opacity-50 transition-opacity duration-500"
            style={{
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in',
            }}
          />
          {/* Subtle light streak along the ray path */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/[0.06] via-transparent to-transparent pointer-events-none"
            style={{
              clipPath: 'polygon(0% 15%, 100% 40%, 100% 60%, 0% 85%)',
            }}
          />
        </div>

        {/* Right Campus Ray - Anchored to right edge, zoomed out, racing inwards to centre */}
        <div
          className="absolute inset-y-0 right-0 w-[52%] flex items-center justify-center overflow-hidden origin-right"
          style={{
            transform: 'rotateY(-18deg) rotateZ(2deg) scale(0.9)',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/images/niche_campus_right.jpg"
            alt="Noorul Islam Campus Right"
            className="w-full h-auto max-h-[88vh] object-cover rounded-sm opacity-50 transition-opacity duration-500"
            style={{
              maskImage:
                'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in',
            }}
          />
          {/* Subtle light streak along the ray path */}
          <div
            className="absolute inset-0 bg-gradient-to-l from-white/[0.06] via-transparent to-transparent pointer-events-none"
            style={{
              clipPath: 'polygon(100% 15%, 0% 40%, 0% 60%, 100% 85%)',
            }}
          />
        </div>

        {/* Center Convergence Seam - Where both rays meet and join */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-32 bg-gradient-to-r from-transparent via-black/40 to-transparent pointer-events-none" />

        {/* Deep Black Overwhelming Dominance */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-radial from-black/95 via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* FOREGROUND CONTENT: Exact Montserrat Typography, Alignments, and Sign In */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Title in one uniform size across all words */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.22em] sm:tracking-[0.28em] text-zinc-100 uppercase leading-relaxed max-w-4xl drop-shadow-md">
          NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.35em] sm:tracking-[0.45em] text-zinc-400 uppercase drop-shadow-sm">
          PLACEMENT READINESS PLATFORM
        </p>

        {/* Sign In Option */}
        <div className="pt-8 sm:pt-10">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-block px-10 py-3.5 border border-zinc-800 hover:border-zinc-300 text-zinc-300 hover:text-white transition-all duration-300 text-xs tracking-[0.25em] uppercase font-light bg-black/60 hover:bg-white hover:text-black shadow-lg"
            >
              Enter Platform
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-10 py-3.5 border border-zinc-800 hover:border-zinc-300 text-zinc-300 hover:text-white transition-all duration-300 text-xs tracking-[0.25em] uppercase font-light bg-black/60 hover:bg-white hover:text-black shadow-lg"
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
