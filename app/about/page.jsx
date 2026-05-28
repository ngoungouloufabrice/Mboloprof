'use client';

import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1">
                {/* Hero Section */}
                <Box className="bg-white py-20 border-b border-gray-100 relative overflow-hidden">
                    <Box
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}
                    />
                    <Container maxWidth="lg" className="relative z-10 text-center">
                        <Typography variant="h2" className="text-4xl md:text-6xl font-black text-[#111827] mb-6 tracking-tight">
                            Notre Mission
                        </Typography>
                        <Typography className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
                            MboloProf est la plateforme n°1 au Gabon pour connecter les meilleurs professeurs particuliers avec les élèves et étudiants en quête d'excellence.
                        </Typography>
                    </Container>
                </Box>

                {/* Content Section */}
                <Container maxWidth="lg" className="py-20">
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-6">
                                Pourquoi MboloProf ?
                            </Typography>
                            <Typography className="text-gray-600 mb-6 leading-relaxed text-lg">
                                Nous croyons que chaque élève a le potentiel de réussir s'il bénéficie du bon accompagnement. MboloProf a été créé pour briser les barrières de l'apprentissage en facilitant l'accès à un soutien scolaire de qualité, partout au Gabon.
                            </Typography>
                            <Typography className="text-gray-600 leading-relaxed text-lg">
                                Notre plateforme offre une interface simple et sécurisée permettant aux parents et étudiants de trouver l'expert qui correspond exactement à leurs besoins, que ce soit pour une remise à niveau, une préparation d'examen ou l'apprentissage d'une nouvelle compétence.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="grid grid-cols-1 gap-6">
                                <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 flex gap-6">
                                    <Box className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2463eb] shrink-0">
                                        <SchoolIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-xl font-black text-[#111827] mb-2">Excellence Académique</Typography>
                                        <Typography className="text-gray-500">Nous sélectionnons rigoureusement nos professeurs pour garantir un niveau d'enseignement supérieur.</Typography>
                                    </Box>
                                </Paper>
                                <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 flex gap-6">
                                    <Box className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                        <GroupIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-xl font-black text-[#111827] mb-2">Communauté de Confiance</Typography>
                                        <Typography className="text-gray-500">Une plateforme bâtie sur les avis et le succès de milliers d'étudiants satisfaits.</Typography>
                                    </Box>
                                </Paper>
                                <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 flex gap-6">
                                    <Box className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shrink-0">
                                        <FavoriteIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-xl font-black text-[#111827] mb-2">Passion d'Enseigner</Typography>
                                        <Typography className="text-gray-500">Nos professeurs ne sont pas seulement des experts, ils sont passionnés par la transmission du savoir.</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Footer />
        </main>
    );
}
