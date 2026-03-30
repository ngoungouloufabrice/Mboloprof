'use client';

import { Box, Slider } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Sidebar({ selectedCategories, onCategoryChange, priceRange, onPriceChange }) {

    const router = useRouter();
    const handleCategoryToggle = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        onCategoryChange(newCategories);
    };

    const handlePriceToggle = (event, newValue) => {
        onPriceChange(newValue);
    };

    const clearFilters = () => {
        onCategoryChange([]);
        onPriceChange([10000, 500000]);
    };

    return (
        <Box component="aside" className="w-full lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] text-gray-400 mb-5 lg:block hidden">Filtres</h3>
            <Box className="lg:hidden flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">Filtres</h3>
            </Box>

            {/* Price Range */}
            <div className="mb-8 ml-0">
                <label className="block text-[14px] font-bold text-[#111827] mb-2">Prix par mois (FCFA)</label>
                <div className="px-2 ml-0">
                    <Box sx={{ width: '100%' }}>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceToggle}
                            min={10000}
                            max={500000}
                            step={10000}
                            valueLabelDisplay="auto"
                            size="medium"
                            sx={{ color: '#2463eb' }}
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 font-bold mt-1">
                            <span>{priceRange[0].toLocaleString('fr-FR')}</span>
                            <span>{priceRange[1].toLocaleString('fr-FR')}</span>
                        </div>
                    </Box>
                </div>
            </div>

            <button
                onClick={clearFilters}
                className="w-full py-3 text-[13px] font-bold text-gray-700 hover:text-[#2463eb] transition-colors border border-gray-100 rounded-lg"
            >
                Effacer tous les filtres
            </button>

            {/* Promo Teacher Box */}
            <Box className="mt-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center">
                <h4 className="text-[14px] font-bold text-[#2463eb] mb-2">Êtes-vous un professeur?</h4>
                <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">Rejoignez notre communauté et commencez à gagner aujourd'hui.</p>
                <button onClick={() => router.push('/register?role=PROF')} className="w-full py-2.5 bg-[#2463eb] text-white text-[12px] font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-all">
                    Commencer maintenant
                </button>
            </Box>
        </Box>
    );
}
