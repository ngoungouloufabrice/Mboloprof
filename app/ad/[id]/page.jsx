'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, CircularProgress, Tab, Tabs } from '@mui/material';
import {
    LocationOn, School, AccessTime, Star,
    CheckCircle, Phone, WhatsApp,
} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { adService } from '@/services/adService';

// ─── Composant Étoiles ───────────────────────────────────────────────────────
function StarRating({ value = 5, size = 'sm' }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    sx={{
                        fontSize: size === 'sm' ? 16 : 20,
                        color: i <= value ? '#FBBF24' : '#E5E7EB'
                    }}
                />
            ))}
        </div>
    );
}

// ─── Composant Avis ──────────────────────────────────────────────────────────
function ReviewCard({ initials, name, subject, comment, rating, date }) {
    return (
        <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
            <div className="w-10 h-10 rounded-full bg-[#2463eb] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {initials}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <span className="font-bold text-[14px] text-[#111827]">{name}</span>
                        <span className="text-gray-400 text-[12px] ml-2">• {subject} • {date}</span>
                    </div>
                    <StarRating value={rating} size="sm" />
                </div>
                <p className="text-gray-600 text-[13px] leading-relaxed italic">"{comment}"</p>
            </div>
        </div>
    );
}

// ─── Page Principale ─────────────────────────────────────────────────────────
export default function AdDetailPage() {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (!id) return;
        const fetchAd = async () => {
            try {
                const data = await adService.getById(id);
                setAd(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAd();
    }, [id]);

    if (loading) return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <Box className="flex flex-col items-center justify-center py-40 gap-4">
                <CircularProgress size={40} thickness={5} sx={{ color: '#2463eb' }} />
                <p className="text-gray-500 font-medium">Chargement de l'annonce...</p>
            </Box>
            <Footer />
        </main>
    );

    if (error || !ad) return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <Box className="text-center py-40">
                <p className="text-red-500 font-bold text-lg">{error || 'Annonce introuvable'}</p>
                <Link href="/" className="text-[#2463eb] font-semibold mt-4 inline-block no-underline">
                    ← Retour à l'accueil
                </Link>
            </Box>
            <Footer />
        </main>
    );

    const subjectName = ad.subject?.name || ad.subject || 'Matière non précisée';
    const teacherName = ad.teacher?.name || 'Professeur';
    const experience = ad.teacher?.experience || null;
    const teacherInitial = teacherName.charAt(0).toUpperCase();

    // Construit un lien WhatsApp propre, quel que soit le format du numéro en base
    const getWhatsAppUrl = () => {
        if (!ad.teacher?.phone) return '#';
        // Supprime tout ce qui n'est pas un chiffre (espaces, tirets, +, etc.)
        let digits = ad.teacher.phone.replace(/\D/g, '');
        // Si le numéro commence déjà par 241, on ne l'ajoute pas
        if (!digits.startsWith('241')) {
            digits = '241' + digits;
        }
        return `https://wa.me/${digits}`;
    };

    // Contenu des onglets
    const tabContent = [
        {
            label: 'À propos',
            content: (
                <div>
                    <h2 className="text-[18px] font-bold text-[#111827] mb-3">À propos du cours</h2>
                    {ad.description ? (
                        <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                            {ad.description}
                        </p>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-400">
                            <InfoIcon sx={{ fontSize: 40, opacity: 0.4 }} />
                            <p className="mt-2 text-[14px]">Description non renseignée</p>
                        </div>
                    )}
                </div>
            )
        },
        {
            label: 'Expérience',
            content: (
                <div>
                    <h2 className="text-[18px] font-bold text-[#111827] mb-4">Expérience</h2>
                    {experience ? (
                        <div className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                            <p className="mt-2 text-[14px]">{experience}</p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-400">
                            <School sx={{ fontSize: 40, opacity: 0.4 }} />
                            <p className="mt-2 text-[14px]">Expérience non renseignée</p>
                        </div>
                    )}
                </div>
            )
        },
    ];

    return (
        <main className="min-h-screen bg-[#f9fafb]">
            <Header />

            <Container maxWidth="lg" className="py-8">
                {/* ── Fil d'Ariane ── */}
                <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-6">
                    <Link href="/" className="hover:text-[#2463eb] transition-colors no-underline text-gray-400">Accueil</Link>
                    <span>›</span>
                    <span className="text-gray-400">{subjectName}</span>
                    <span>›</span>
                    <span className="text-[#111827] font-semibold">{teacherName}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ══ COLONNE GAUCHE ══════════════════════════════════════ */}
                    <div className="flex-1 min-w-0">

                        {/* ── Profile Header ── */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 shadow-sm">
                            <div className="flex items-start gap-5">
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2463eb] to-blue-400 flex items-center justify-center text-white font-black text-3xl flex-shrink-0 shadow-lg shadow-blue-100">
                                    {teacherInitial}
                                </div>
                                <div className="flex-1">
                                    {/* Nom + badge vérifié */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-2xl font-black text-[#111827]">{teacherName}</h1>
                                    </div>
                                    {/* Spécialité */}
                                    <p className="text-[#2463eb] font-semibold text-[14px] mt-1">
                                        Professeur de {subjectName}
                                    </p>
                                </div>
                            </div>

                            {/* Badges info rapide */}
                            <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-50">
                                <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                                    <School sx={{ fontSize: 16, color: '#2463eb' }} />
                                    <span className="font-semibold">{ad.level}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                                    <LocationOn sx={{ fontSize: 16, color: '#2463eb' }} />
                                    <span>{ad.city}, {ad.province}</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Tab Navigation ── */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <Tabs
                                value={activeTab}
                                onChange={(_, v) => setActiveTab(v)}
                                sx={{
                                    borderBottom: '1px solid #f3f4f6',
                                    px: 2,
                                    '& .MuiTab-root': { fontWeight: 700, fontSize: '13px', textTransform: 'none', color: '#6B7280' },
                                    '& .Mui-selected': { color: '#2463eb !important' },
                                    '& .MuiTabs-indicator': { backgroundColor: '#2463eb' }
                                }}
                            >
                                {tabContent.map((tab, i) => (
                                    <Tab key={i} label={tab.label} />
                                ))}
                            </Tabs>
                            <div className="p-6 md:p-8">
                                {tabContent[activeTab].content}
                            </div>
                        </div>
                    </div>

                    {/* ══ COLONNE DROITE — Sticky Booking Card ════════════════ */}
                    <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            {/* Prix */}
                            <div className="mb-5">
                                <span className="text-3xl font-black text-[#111827]">
                                    {ad.price?.toLocaleString('fr-FR')}
                                </span>
                                <span className="text-gray-400 font-medium text-[14px] ml-1">FCFA / mois</span>
                            </div>

                            {/* Stats */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-[13px] text-gray-600">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <School sx={{ fontSize: 15, color: '#2463eb' }} />
                                    </div>
                                    <span>Niveau : <span className="font-bold text-[#111827]">{ad.level}</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px] text-gray-600">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <LocationOn sx={{ fontSize: 15, color: '#2463eb' }} />
                                    </div>
                                    <span>Zone : <span className="font-bold text-[#111827]">{ad.city}</span></span>
                                </div>
                            </div>

                            {/* Bouton Contact */}
                            <button onClick={() => window.open(getWhatsAppUrl(), '_blank')} className="w-full bg-[#2463eb] text-white py-3.5 rounded-xl text-[15px] font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                                <WhatsApp sx={{ fontSize: 25 }} />
                                Contacter Mr {teacherName.split(' ')[0]}
                            </button>

                            {/* Séparateur */}
                            <div className="border-t border-gray-100 my-5" />

                            {/* Zone de service */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-[13px] font-bold text-[#111827]">Zone de service</h3>
                                    <span className="text-[12px] text-gray-400">{ad.city}, {ad.province}</span>
                                </div>
                                {/* Carte stylisée (placeholder) */}
                                <div className="h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center border border-blue-100 relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2463eb 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    <div className="relative flex flex-col items-center gap-1">
                                        <LocationOn sx={{ fontSize: 28, color: '#2463eb' }} />
                                        <span className="text-[12px] font-bold text-[#2463eb]">{ad.city}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-2 text-center">
                                    Le professeur se déplace dans la zone de {ad.city}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>

            <Footer />
        </main>
    );
}
