'use client';

import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const categoriesAndNominees = {
  // Award Categories
  'Mr NAFIS': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Miss NAFIS': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Best Course Rep': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Best Team Player': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most Famous': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most Handsome': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most Beautiful': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Biggest Baller of the Department': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most Influential Girl': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most Creativity and Innovation': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Best Artiste of the year': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Most influential female': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'NAFIS ICON': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  
  // Special Recognition
  'President Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Vice President Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Gen. Sec Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'PRO Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'AGS Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Fin. Sec Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Sports Dir. Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
  'Social Dir. Special Rec.': ['Nominee 1', 'Nominee 2', 'Nominee 3'],
};

const VOTE_PRICE = 100;

function VotingForm() {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNominee, setSelectedNominee] = useState('');

  const nominees =
    selectedCategory && selectedCategory in categoriesAndNominees
      ? categoriesAndNominees[selectedCategory as keyof typeof categoriesAndNominees]
      : [];

  const config = {
    reference: `${new Date().getTime()}`,
    email: email,
    amount: VOTE_PRICE * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    currency: 'NGN',
  };

  const initializePayment = usePaystackPayment({
    ...config,
    metadata: {
      custom_fields: [
        {
          display_name: 'Award Category',
          variable_name: 'category',
          value: selectedCategory,
        },
        {
          display_name: 'Selected Nominee',
          variable_name: 'nominee',
          value: selectedNominee,
        },
      ],
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !selectedCategory || !selectedNominee) {
      alert('Please fill in all required fields');
      return;
    }

    initializePayment({
      onSuccess: (response) => {
        alert(`Vote recorded! Transaction Reference: ${response.reference}`);
        setEmail('');
        setSelectedCategory('');
        setSelectedNominee('');
      },
      onClose: () => {
        console.log('Payment modal closed');
      },
    });
  };

  const isFormValid = email && selectedCategory && selectedNominee;

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      
      {/* 1. Voter Email */}
      <div className="text-center">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-3">
          1. Enter your email address
        </label>
        <div className="max-w-md mx-auto">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 placeholder-slate-400 rounded-full outline-none transition-all duration-300 focus:bg-white focus:border-[#6da5ff] focus:ring-4 focus:ring-[#6da5ff]/20 text-center shadow-sm"
          />
        </div>
      </div>

      {/* 2. Categories Grid */}
      <div>
        <label className="block text-center text-sm font-semibold text-slate-900 mb-6">
          2. Select an Award Category
        </label>
        <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(categoriesAndNominees).map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedNominee(''); 
                  }}
                  className={`p-4 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center justify-center text-center h-20 border ${
                    isSelected
                      ? 'bg-[#6da5ff] border-[#6da5ff] text-white shadow-md transform scale-[1.02]'
                      : 'bg-white border-slate-100 text-slate-900 hover:border-[#6da5ff]/30 hover:bg-slate-50 hover:text-[#6da5ff] shadow-sm'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Nominees Grid */}
      {selectedCategory && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-100">
          <label className="block text-center text-sm font-semibold text-[#6da5ff] mb-6">
            3. Select Nominee for {selectedCategory}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nominees.map((nominee: string) => {
              const isSelected = selectedNominee === nominee;
              return (
                <button
                  key={nominee}
                  type="button"
                  onClick={() => setSelectedNominee(nominee)}
                  className={`p-4 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#6da5ff] border-[#6da5ff] text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-[#6da5ff]/50 shadow-sm hover:shadow'
                  }`}
                >
                  {nominee}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 max-w-md mx-auto">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 ${
            isFormValid
              ? 'bg-[#6da5ff] text-white shadow-[0_8px_20px_rgba(109,165,255,0.4)] hover:shadow-[0_12px_25px_rgba(109,165,255,0.5)] hover:-translate-y-1'
              : 'bg-slate-100 text-slate-900 cursor-not-allowed'
          }`}
        >
          {isFormValid ? `Cast Vote • ₦${VOTE_PRICE}` : 'Complete Form'}
        </button>
      </div>
    </form>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#6da5ff]/30 text-slate-800">
      
      {/* Hero Section with exact Ticketly gradient & ripple effect */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#6bb291] via-[#91c5f5] to-white pt-6 pb-32">
        
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

          <VotingForm />
          
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