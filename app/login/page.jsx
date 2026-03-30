'use client';

import { useState } from 'react';
import { Box, Container, TextField, Button, IconButton, InputAdornment, Divider, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Google, Apple } from '@mui/icons-material';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';
import GoogleSVG from '@/components/layout/googleSVG';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await authService.login({ email, password });
            if (result.user) {
                // Redirection basée sur le rôle sans double affectation
                if (result.user.role === 'ADMIN') {
                    window.location.href = '/admindashboard';
                } else if (result.user.role === 'PROF') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/';
                }
            } else {
                setError(result.message || 'Erreur de connexion');
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    // Logout forcé si on arrive sur cette page (cas d'expiration du token)
    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                // Si on est sur login mais qu'on a encore des restes de session locale, 
                // cela signifie que le middleware nous a jeté car le cookie (token réel) a expiré.
                // On doit donc nettoyer le localStorage.
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                // Optionnellement on recharge pour que le context soit clean
                window.location.reload();
            }
        };
        checkAuth();
    }, []);

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Effet de fond subtil */}
                <Box className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />
                <Box className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />

                <Container maxWidth="sm" className="relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-[#111827] mb-3">Bienvenue</h1>
                        <p className="text-gray-500 font-medium">Connectez-vous pour commencer votre voyage d'apprentissage.</p>
                    </div>

                    <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
                        {/* Toggle Login/Sign up */}
                        <div className="p-2 bg-gray-50/50 border-b border-gray-100">
                            <div className="flex bg-gray-100 p-1 rounded-2xl">
                                <button className="flex-1 py-2.5 rounded-xl text-[14px] font-bold bg-white text-[#2463eb] shadow-sm">
                                    Se connecter
                                </button>
                                <Link href="/register" className="flex-1 py-2.5 rounded-xl text-[14px] font-bold text-gray-500 hover:text-gray-700 transition-colors no-underline text-center">
                                    S'inscrire
                                </Link>
                            </div>
                        </div>

                        <div className="p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Email</label>
                                    <TextField
                                        fullWidth
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                backgroundColor: '#fff',
                                                '&:hover fieldset': { borderColor: '#2463eb' },
                                            }
                                        }}
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="flex justify-between mb-2 ml-1">
                                        <label className="block text-[13px] font-bold text-[#111827]">Mot de passe</label>
                                        {/*<Link href="#" className="text-[12px] font-bold text-[#2463eb] no-underline hover:underline">
                                            Mot de passe oublié?
                                        </Link>*/}
                                    </div>
                                    <TextField
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                        {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                backgroundColor: '#fff',
                                                '&:hover fieldset': { borderColor: '#2463eb' },
                                            }
                                        }}
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-[13px] font-bold text-center bg-red-50 py-2 rounded-xl border border-red-100 italic">
                                        {error}
                                    </p>
                                )}

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    className="h-14 bg-[#2463eb] hover:bg-blue-700 rounded-2xl text-[16px] font-bold normal-case shadow-xl shadow-blue-200"
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
                                </Button>

                                <div className="relative my-8">
                                    <Divider>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">OU CONTINUE AVEC</span>
                                    </Divider>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<GoogleSVG />}
                                        className="h-12 border-gray-200 rounded-xl text-gray-600 font-bold normal-case hover:bg-gray-50"
                                    >
                                        Google
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Banner Tutor */}
                    <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-3xl p-8 text-center">
                        <h4 className="text-[16px] font-black text-[#2463eb] mb-1">Enseignant?</h4>
                        <p className="text-[13px] text-gray-500 mb-4 font-medium">Rejoignez notre réseau de professionnels et développez votre activité d'enseignement dès aujourd'hui.</p>
                        <Link href="/register?role=PROF" className="text-[14px] font-black text-[#2463eb] no-underline hover:underline hover:scale-105 transition-transform inline-block">
                            Devenir enseignant
                        </Link>
                    </div>

                    {/* Footer Auth */}
                    <div className="mt-12 flex justify-center gap-6 text-[12px] font-bold text-gray-400">
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Confidentialité</Link>
                        <span>•</span>
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Conditions d'utilisation</Link>
                        <span>•</span>
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Contactez-nous</Link>
                    </div>
                </Container>
            </Box>
        </main>
    );
}
