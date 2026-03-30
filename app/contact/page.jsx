'use client';

import { Box, Container, Typography, Grid, Paper, TextField, Button, InputAdornment } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'envoi de formulaire à implémenter si nécessaire
        alert("Message envoyé ! Nous vous répondrons dans les plus brefs délais.");
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1">
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
                            Contactez-nous
                        </Typography>
                        <Typography className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Vous avez une question ou besoin d'aide ? Notre équipe est là pour vous accompagner.
                        </Typography>
                    </Container>
                </Box>

                <Container maxWidth="lg" className="py-20">
                    <Grid container spacing={8}>
                        {/* Contact Info */}
                        <Grid item xs={12} md={5}>
                            <Typography variant="h4" className="text-2xl font-black text-[#111827] mb-8">
                                Nos coordonnées
                            </Typography>

                            <Box className="space-y-6">
                                <Paper elevation={0} className="p-6 rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 flex items-center gap-6">
                                    <Box className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2463eb] shrink-0">
                                        <EmailIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</Typography>
                                        <Typography className="text-[15px] font-bold text-[#111827]">contact@mboloprof.com</Typography>
                                    </Box>
                                </Paper>

                                <Paper elevation={0} className="p-6 rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 flex items-center gap-6">
                                    <Box className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                        <PhoneIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Téléphone</Typography>
                                        <Typography className="text-[15px] font-bold text-[#111827]">+241 077 00 00 00</Typography>
                                    </Box>
                                </Paper>

                                <Paper elevation={0} className="p-6 rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 flex items-center gap-6">
                                    <Box className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                        <LocationOnIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Localisation</Typography>
                                        <Typography className="text-[15px] font-bold text-[#111827]">Libreville, Gabon</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={7}>
                            <Paper elevation={0} className="p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-100/50">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Nom complet</label>
                                            <TextField
                                                fullWidth
                                                placeholder="Votre nom"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Email</label>
                                            <TextField
                                                fullWidth
                                                placeholder="votre@email.com"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box>
                                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Sujet</label>
                                        <TextField
                                            fullWidth
                                            placeholder="Comment pouvons-nous vous aider ?"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SubjectIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Box>

                                    <Box>
                                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Message</label>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={6}
                                            placeholder="Détaillez votre demande ici..."
                                            variant="outlined"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
                                        />
                                    </Box>

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SendIcon />}
                                        className="h-16 bg-[#2463eb] hover:bg-blue-700 rounded-2xl text-[16px] font-black normal-case shadow-xl shadow-blue-200 mt-4"
                                    >
                                        Envoyer le message
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Footer />
        </main>
    );
}
