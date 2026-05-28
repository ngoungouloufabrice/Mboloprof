'use client';

import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import {
    Visibility as ViewsIcon,
    LocationOn as LocationIcon,
    ListAlt as AdsIcon,
    TrendingUp as TrendingIcon,
    AddCircle as AddIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { adService } from '@/services/adService';

function StatCard({ title, value, icon, color }) {
    return (
        <Paper elevation={0} className="p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Box className="flex items-center gap-4">
                <Box className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    {icon}
                </Box>
                <Box>
                    <Typography className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                        {title}
                    </Typography>
                    <Typography className="text-2xl font-black text-[#111827]">
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [ads, setAds] = useState([]);
    const [stats, setStats] = useState({
        totalAds: 0,
        subjectsCount: 0,
        citiesCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (user?.id) {
                try {
                    setLoading(true);
                    const allAds = await adService.getAll();
                    
                    // Vérifier que la réponse est bien un tableau
                    const adsArray = Array.isArray(allAds) ? allAds : [];
                    const myAds = adsArray.filter(ad => ad.teacher?._id === user.id || ad.teacher === user.id);

                    setAds(myAds);

                    // Calcul des stats
                    const uniqueSubjects = new Set(myAds.map(ad => ad.subject?._id || ad.subject));
                    const uniqueCities = new Set(myAds.map(ad => ad.city));

                    setStats({
                        totalAds: myAds.length,
                        subjectsCount: uniqueSubjects.size,
                        citiesCount: uniqueCities.size
                    });
                } catch (err) {
                    console.error("Erreur dashboard data:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchDashboardData();
    }, [user]);

    const recentAds = ads.slice(0, 3);

    return (
        <Box>
            <Box className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Box>
                    <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                        Tableau de bord
                    </Typography>
                    <Typography className="text-gray-500 font-medium">
                        Bienvenue, <span className="text-[#2463eb] font-bold">{"M. " + user?.name}</span>. Voici un aperçu de votre activité.
                    </Typography>
                </Box>
                <Link href="/publish" className="no-underline">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        className="bg-[#2463eb] hover:bg-blue-700 px-6 py-3 rounded-xl text-[14px] font-black normal-case shadow-lg shadow-blue-200 w-full md:w-auto"
                    >
                        Nouvelle Annonce
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Annonces Actives"
                        value={stats.totalAds}
                        icon={<AdsIcon className="text-blue-600" />}
                        color="bg-blue-50"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Matières"
                        value={stats.subjectsCount}
                        icon={<TrendingIcon className="text-indigo-600" />}
                        color="bg-indigo-50"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Villes Couvertes"
                        value={stats.citiesCount}
                        icon={<LocationIcon className="text-emerald-600" />}
                        color="bg-emerald-50"
                    />
                </Grid>

                {/* Main Content Area */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 min-h-[450px]">
                        <Box className="flex items-center justify-between mb-8">
                            <Typography className="text-xl font-black text-[#111827]">
                                Annonces Récentes
                            </Typography>
                            <Link href="/dashboard/ads" className="text-[#2463eb] font-bold text-sm no-underline hover:underline">
                                Tout voir
                            </Link>
                        </Box>

                        <Box className="space-y-4">
                            {loading ? (
                                <Typography className="text-gray-400 text-center py-10">Chargement...</Typography>
                            ) : recentAds.length > 0 ? (
                                recentAds.map((ad) => (
                                    <Box key={ad._id} className="p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
                                        <Box>
                                            <Typography className="font-bold text-[#111827] group-hover:text-[#2463eb] transition-colors">
                                                {ad.title}
                                            </Typography>
                                            <Typography className="text-[12px] text-gray-500">
                                                {ad.subject?.name || ad.subject} • {ad.level}
                                            </Typography>
                                        </Box>
                                        <Box className="text-right">
                                            <Typography className="font-black text-[#111827]">
                                                {ad.price?.toLocaleString('fr-FR')} FCFA
                                            </Typography>
                                            <Typography className="text-[11px] text-gray-400">par mois</Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box className="flex flex-col items-center justify-center py-12 text-center">
                                    <Box className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <AdsIcon className="text-gray-300 text-3xl" />
                                    </Box>
                                    <Typography className="text-gray-400 font-medium">
                                        Vous n'avez pas encore d'annonces. <br /> commencez par en créer une !
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>

              {/* <Grid item xs={12} md={4}>
                    <Box className="space-y-6">
                        <Paper elevation={0} className="p-6 rounded-[24px] border border-gray-100 shadow-sm bg-[#1e293b] text-white">
                            <Typography className="text-[12px] font-black uppercase tracking-[2px] opacity-60 mb-4">
                                Conseil Pro
                            </Typography>
                            <Typography className="font-bold mb-4 leading-relaxed">
                                Les professeurs qui répondent en moins de 2h obtiennent 2x plus d'élèves.
                            </Typography>
                            <Link href="/dashboard/profile" className="text-blue-400 font-black text-[13px] no-underline hover:underline inline-flex items-center gap-1">
                                Optimiser mon profil <TrendingIcon sx={{ fontSize: 16 }} />
                            </Link>
                        </Paper>

                        <Paper elevation={0} className="p-6 rounded-[24px] border border-gray-100 shadow-sm">
                            <Typography className="text-[15px] font-black text-[#111827] mb-4">
                                Prochaines Étapes
                            </Typography>
                            <Box className="space-y-4">
                                <Box className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <Box className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2463eb]">
                                        <ViewsIcon sx={{ fontSize: 20 }} />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[13px] font-black text-[#111827]">Vérifier mes vues</Typography>
                                        <Typography className="text-[11px] text-gray-400 font-medium">Suivez votre visibilité</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <Box className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                        <MessagesIcon sx={{ fontSize: 20 }} />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[13px] font-black text-[#111827]">Messages (Nouveau)</Typography>
                                        <Typography className="text-[11px] text-gray-400 font-medium">Répondre aux parents</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Grid> */}
            </Grid>
        </Box>
    );
}
