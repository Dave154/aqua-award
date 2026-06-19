'use client';

import dynamic from 'next/dynamic';

const PaystackWrapper = dynamic(() => import('@/components/VotingForm'), {
  ssr: false,
  loading: () => <div>Loading voting form...</div>,
});



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#6da5ff]/30 text-slate-800">
      
      {/* Hero Section with exact Ticketly gradient & ripple effect */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#6bb291] via-[#4B99F5] to-white pt-6 pb-32">
        
        {/* Central Glowing/Ripple Rings matching the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {/* Inner solid glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/20 blur-3xl"></div>
          {/* Middle ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full border border-white/30"></div>
          {/* Outer ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full border border-white/10"></div>
        </div>

        {/* Top Navigation */}
        <header className="relative z-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-2xl"></span>
          
          <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
           AQUA AWARD
          </div>
          
          <div className="flex items-center gap-4">
            {/* <button className="text-white text-sm font-medium hidden sm:block hover:text-white/80">Sign in</button>
            <button className="px-6 py-2 rounded-full bg-white text-[#6da5ff] text-sm font-bold shadow-sm hover:shadow-md transition">
              Sign Up
            </button> */}
          </div>
        </header>

        {/* Main Hero Content */}
        <main className="relative z-20 max-w-4xl mx-auto px-4 mt-20 sm:mt-32 text-center">
          
          {/* Pill Badge */}
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-medium text-white shadow-sm">
            World no. 1 department event platform
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Cast Your Votes!
          </h1>
          
          <div className="my-16"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#vote" className="px-8 py-3.5 rounded-full bg-white text-[#6da5ff] font-bold text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all flex items-center gap-2">
              Start Voting ↗
            </a>
            
          </div>
          <div className="my-16"></div>

        </main>
      </div>

      {/* Voting Section (Clean White Area matching the bottom of the image) */}
      <section id="vote" className="relative z-30 max-w-4xl mx-auto px-4 -mt-10 sm:-mt-20 pb-32">
        
        {/* Soft shadow card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] p-6 sm:p-12 border border-slate-50">
          
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#6da5ff]/10 text-[#6da5ff] text-sm font-semibold mb-4">
              Our Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight capitalize">
              Find the latest nominees
            </h2>
          </div>

          <PaystackWrapper />
          
        </div>
      </section>

      {/* Global Styles for Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
}