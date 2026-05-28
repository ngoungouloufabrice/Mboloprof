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
import { userService } from '@/services/userService';

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
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        totalAds: 0,
        totalTeachers: 0,
        totalStudents: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const allAds = await adService.getAll();
                setAds(allAds);
                const allTeachers = await userService.getAllTeachers();
                setTeachers(allTeachers);
                const allStudents = await userService.getAllStudents();
                setStudents(allStudents);

                setStats({
                    totalAds: allAds.length,
                    totalTeachers: allTeachers.length,
                    totalStudents: allStudents.length,
                });
            } catch (err) {
                console.error("Erreur dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const recentAds = ads.slice(0, 3);
    const recentTeachers = teachers.slice(0, 3);
    const recentStudents = students.slice(0, 3);

    return (
        <Box>
            <Box className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Box>
                    <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                        Tableau de bord Admin
                    </Typography>
                    <Typography className="text-gray-500 font-medium">
                        Bienvenue, <span className="text-[#2463eb] font-bold">{"M. " + user?.name}</span>. Voici un aperçu de l'activité sur MboloProf.
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Total des Annonces"
                        value={stats.totalAds}
                        icon={<AdsIcon className="text-blue-600" />}
                        color="bg-blue-50"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Total des Professeurs"
                        value={stats.totalTeachers}
                        icon={<TrendingIcon className="text-indigo-600" />}
                        color="bg-indigo-50"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Total des Etudiants"
                        value={stats.totalStudents}
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
                            <Link href="/admindashboard/ads" className="text-[#2463eb] font-bold text-sm no-underline hover:underline">
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
                                        Aucune annonce n'a été trouvée.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 min-h-[450px]">
                        <Box className="flex items-center justify-between mb-8">
                            <Typography className="text-xl font-black text-[#111827]">
                                Professeurs Récentes
                            </Typography>
                            <Link href="/admindashboard/teachers" className="text-[#2463eb] font-bold text-sm no-underline hover:underline">
                                Tout voir
                            </Link>
                        </Box>

                        <Box className="space-y-4">
                            {loading ? (
                                <Typography className="text-gray-400 text-center py-10">Chargement...</Typography>
                            ) : recentTeachers.length > 0 ? (
                                recentTeachers.map((teacher) => (
                                    <Box key={teacher._id} className="p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
                                        <Box>
                                            <Typography className="font-bold text-[#111827] group-hover:text-[#2463eb] transition-colors">
                                                {teacher.name}
                                            </Typography>
                                            <Typography className="text-[12px] text-gray-500">
                                                {teacher.email} • {teacher.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box className="flex flex-col items-center justify-center py-12 text-center">
                                    <Box className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <AdsIcon className="text-gray-300 text-3xl" />
                                    </Box>
                                    <Typography className="text-gray-400 font-medium">
                                        Aucun professeur n'a été trouvé.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 min-h-[450px]">
                        <Box className="flex items-center justify-between mb-8">
                            <Typography className="text-xl font-black text-[#111827]">
                                Élèves Récentes
                            </Typography>
                            <Link href="/admindashboard/students" className="text-[#2463eb] font-bold text-sm no-underline hover:underline">
                                Tout voir
                            </Link>
                        </Box>

                        <Box className="space-y-4">
                            {loading ? (
                                <Typography className="text-gray-400 text-center py-10">Chargement...</Typography>
                            ) : recentStudents.length > 0 ? (
                                recentStudents.map((student) => (
                                    <Box key={student._id} className="p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
                                        <Box>
                                            <Typography className="font-bold text-[#111827] group-hover:text-[#2463eb] transition-colors">
                                                {student.name}
                                            </Typography>
                                            <Typography className="text-[12px] text-gray-500">
                                                {student.email} • {student.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box className="flex flex-col items-center justify-center py-12 text-center">
                                    <Box className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <AdsIcon className="text-gray-300 text-3xl" />
                                    </Box>
                                    <Typography className="text-gray-400 font-medium">
                                        Aucun élève n'a été trouvé.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
