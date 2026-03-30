'use client';

import { Box, Container, InputBase, Divider, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

export default function Hero({ onSearch }) {
    const [subject, setSubject] = useState('');
    const [city, setCity] = useState('');

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        if (name === 'matiere') {
            setSubject(value);
            onSearch(value, city);
        } else if (name === 'ville') {
            setCity(value);
            onSearch(subject, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(subject, city);
    };

    return (
        <Box component="section" className="relative bg-white py-24 overflow-hidden">
            {/* Background avec petits points */}
            <Box
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />


            <Container maxWidth="lg" className="relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-[600] text-[#111827] mb-6 tracking-tight px-4">
                    Trouve le professeur <br className="hidden md:block" /> particulier qu'il te faut
                </h1>

                <p className="text-lg text-gray-500 mb-12 font-medium">
                    Découvre des professeurs particuliers qualifiés dans ta ville.
                </p>

                {/* Barre de Recherche Optimisée */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center bg-white p-1.5 border border-gray-200 rounded-2xl shadow-2xl max-w-4xl mx-auto"
                >
                    {/* Champ Matière */}
                    <Box className="flex items-center px-4 py-2 w-full">
                        <SearchIcon className="text-gray-400 mr-2" />
                        <InputBase
                            placeholder="Quelle matière ?"
                            name="matiere"
                            value={subject}
                            onChange={handleSearchChange}
                            fullWidth
                            className="text-gray-700 font-medium"
                        />
                    </Box>

                    {/* Séparateur vertical (uniquement sur desktop) */}
                    <Divider sx={{ height: 30, m: 1, display: { xs: 'none', md: 'block' } }} orientation="vertical" />

                    {/* Champ Ville */}
                    <Box className="flex items-center px-4 py-2 w-full border-t border-gray-100 md:border-t-0">
                        <LocationOnIcon className="text-gray-400 mr-2" />
                        <InputBase
                            placeholder="Dans quelle ville ?"
                            name="ville"
                            value={city}
                            onChange={handleSearchChange}
                            fullWidth
                            className="text-gray-700 font-medium"
                        />
                    </Box>

                    {/* Bouton Rechercher 
                    <Button
                        type="submit"
                        variant="contained"
                        className="w-full md:w-auto"
                        sx={{
                            backgroundColor: '#2463eb',
                            borderRadius: '12px',
                            padding: '12px 32px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#1d4ed8',
                            },
                            width: { xs: '100%', md: 'auto' },
                            margin: '4px'
                        }}
                    >
                        Rechercher
                    </Button>
                    */}

                </Box>
            </Container>
        </Box>
    );
}
