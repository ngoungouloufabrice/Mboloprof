'use client';

import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Paper } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';

const FAQS = [
    {
        question: "Comment puis-je trouver un professeur ?",
        answer: "Vous pouvez utiliser la barre de recherche sur la page d'accueil pour filtrer par matière et par ville. Parcourez ensuite les profils et contactez le professeur qui vous convient."
    },
    {
        question: "Comment s'inscrire en tant que professeur ?",
        answer: "Cliquez sur 'Devenir professeur' ou 'S'inscrire' et choisissez le rôle 'Enseignant'. Remplissez vos informations et publiez votre première annonce pour être visible par les étudiants."
    },
    {
        question: "Est-ce que MboloProf est gratuit ?",
        answer: "L'inscription et la recherche de professeurs sont gratuites. Les tarifs des cours sont fixés directement par les professeurs sur leurs annonces respectives."
    },
    {
        question: "Comment se déroulent les paiements ?",
        answer: "Pour le moment, MboloProf facilite la mise en relation. Les paiements se font directement entre l'élève et le professeur selon les modalités qu'ils conviennent ensemble."
    }
];

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 pb-20">
                {/* Hero Section */}
                <Box className="bg-white py-20 border-b border-gray-100 relative overflow-hidden text-center">
                    <Box
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}
                    />
                    <Container maxWidth="lg" className="relative z-10">
                        <Typography variant="h2" className="text-4xl md:text-6xl font-black text-[#111827] mb-6 tracking-tight">
                            Centre d'assistance
                        </Typography>
                        <Typography className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Trouvez les réponses à vos questions ou explorez nos guides pour bien débuter.
                        </Typography>
                    </Container>
                </Box>

                <Container maxWidth="lg" className="mt-[-40px] relative z-20">
                    <Grid container spacing={4} className="mb-20">
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 text-center hover:translate-y-[-5px] transition-transform cursor-pointer">
                                <Box className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2463eb] mx-auto mb-6">
                                    <PersonIcon sx={{ fontSize: 32 }} />
                                </Box>
                                <Typography className="text-xl font-black text-[#111827] mb-2">Pour les Étudiants</Typography>
                                <Typography className="text-gray-500 text-[14px]">Apprenez à trouver le bon prof, gérer vos messages et vos cours.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 text-center hover:translate-y-[-5px] transition-transform cursor-pointer">
                                <Box className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                                    <SchoolIcon sx={{ fontSize: 32 }} />
                                </Box>
                                <Typography className="text-xl font-black text-[#111827] mb-2">Pour les Professeurs</Typography>
                                <Typography className="text-gray-500 text-[14px]">Découvrez comment optimiser votre profil et booster votre visibilité.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50 text-center hover:translate-y-[-5px] transition-transform cursor-pointer">
                                <Box className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                    <PaymentIcon sx={{ fontSize: 32 }} />
                                </Box>
                                <Typography className="text-xl font-black text-[#111827] mb-2">Sécurité & Paiement</Typography>
                                <Typography className="text-gray-500 text-[14px]">Informations sur la sécurité de vos données et les méthodes de paiement.</Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box className="max-w-4xl mx-auto">
                        <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-10 text-center">
                            Questions fréquentes (FAQ)
                        </Typography>

                        <Box className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <Accordion
                                    key={index}
                                    elevation={0}
                                    className="rounded-3xl border border-gray-100 before:hidden overflow-hidden shadow-sm hover:shadow-md transition-all"
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: '#2463eb' }} />}
                                        className="px-8 py-3"
                                    >
                                        <Typography className="font-bold text-[#111827]">{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className="px-8 pb-6 pt-0">
                                        <Typography className="text-gray-500 leading-relaxed">
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Footer />
        </main>
    );
}
