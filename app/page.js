'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import Header from '@/components/layout/Header';
import Hero from '@/components/hero/Hero';
import Sidebar from '@/components/layout/SideBar';
import AdCard from '@/components/card/AdCard';
import Footer from '@/components/layout/Footer';
import { adService } from '@/services/adService';
import { SearchOff } from '@mui/icons-material';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // États de filtrage
  const [filters, setFilters] = useState({
    subject: '',
    city: '',
    categories: [],
    priceRange: [10000, 500000]
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await adService.getAll();
        setAds(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Logique de filtrage locale (Premium UX : réactivité immédiate)
  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      const subjectName = ad.subject?.name || ad.subject || '';
      const matchSubject = !filters.subject ||
        subjectName.toLowerCase().includes(filters.subject.toLowerCase()) ||
        (ad.title || '').toLowerCase().includes(filters.subject.toLowerCase());

      const matchCity = !filters.city ||
        (ad.city || '').toLowerCase().includes(filters.city.toLowerCase());

      const matchCategories = filters.categories.length === 0 ||
        filters.categories.includes(subjectName);

      const price = ad.price || 0;
      const matchPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return matchSubject && matchCity && matchCategories && matchPrice;
    });
  }, [ads, filters]);

  const handleSearch = (subject, city) => {
    setFilters(prev => ({ ...prev, subject, city }));
  };

  const handleCategoryChange = (categories) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const handlePriceChange = (priceRange) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero onSearch={handleSearch} />

      <Box className="bg-[#f3f4f6] py-12">
        <Container maxWidth="lg">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Filtres à gauche */}
            <Sidebar
              selectedCategories={filters.categories}
              onCategoryChange={handleCategoryChange}
              priceRange={filters.priceRange}
              onPriceChange={handlePriceChange}
            />

            {/* Liste des annonces */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[18px] font-[900] text-[#111827]">
                  {loading ? "Recherche en cours..." : `${filteredAds.length} annonces trouvées`}
                </h2>
              </div>

              {loading ? (
                <Box className="flex flex-col items-center justify-center py-20 gap-4">
                  <CircularProgress size={40} thickness={5} sx={{ color: '#2463eb' }} />
                  <p className="text-gray-500 font-medium">Chargement des meilleures offres...</p>
                </Box>
              ) : filteredAds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAds.map(ad => (
                    <AdCard key={ad._id} ad={ad} />
                  ))}
                </div>
              ) : (
                <Box className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <SearchOff className=" text-gray-300 mb-4" sx={{ fontSize: 60 }} />
                  <p className="text-gray-500 font-bold text-lg">Aucune annonce ne correspond à vos critères.</p>
                  <p className="text-gray-400 text-sm">Essayez de modifier vos filtres ou effectuez une nouvelle recherche.</p>
                </Box>
              )}
            </div>
          </div>
        </Container>
      </Box>

      <Footer />
    </main>
  );
}
