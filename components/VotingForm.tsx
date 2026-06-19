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

export default function VotingForm() {
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
