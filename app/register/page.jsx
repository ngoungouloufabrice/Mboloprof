'use client';

import { useState, Suspense } from 'react';
import { Box, Container, TextField, Button, IconButton, InputAdornment, Divider, MenuItem, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone, Google, Apple } from '@mui/icons-material';
import { authService } from '@/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role'); // Pour pré-sélectionner PROF si on vient du bouton "Register as a tutor"

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: roleParam === 'PROF' ? 'PROF' : 'ELEVE'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const registerResult = await authService.register(formData);
            if (registerResult.user) {
                // Inscription réussie -> Redirection vers login ou auto-login
                const loginResult = await authService.login({ email: formData.email, password: formData.password });
                if (loginResult.user) {
                    // Forcer un rechargement pour mettre à jour l'état global ou rediriger simplement
                    window.location.href = loginResult.user.role === 'ADMIN' ? '/admindashboard' : '/';
                    window.location.href = loginResult.user.role === 'PROF' ? '/dashboard' : '/';
                } else {
                    setError("Connexion automatique échouée. Veuillez vous connecter manuellement.");
                }
            } else {
                setError(registerResult.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
            {/* Toggle Login/Sign up */}
            <div className="p-2 bg-gray-50/50 border-b border-gray-100">
                <div className="flex bg-gray-100 p-1 rounded-2xl">
                    <Link href="/login" className="flex-1 py-2.5 rounded-xl text-[14px] font-bold text-gray-500 hover:text-gray-700 transition-colors no-underline text-center">
                        Se connecter
                    </Link>
                    <button className="flex-1 py-2.5 rounded-xl text-[14px] font-bold bg-white text-[#2463eb] shadow-sm">
                        S'inscrire
                    </button>
                </div>
            </div>

            <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Je suis un...</label>
                        <TextField
                            select
                            fullWidth
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    '&:hover fieldset': { borderColor: '#2463eb' },
                                }
                            }}
                        >
                            <MenuItem value="ELEVE">Élève / Etudiant</MenuItem>
                            <MenuItem value="PROF">Enseignant</MenuItem>
                        </TextField>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Nom Complet</label>
                        <TextField
                            fullWidth
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    '&:hover fieldset': { borderColor: '#2463eb' },
                                }
                            }}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Adresse email</label>
                        <TextField
                            fullWidth
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
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
                                    '&:hover fieldset': { borderColor: '#2463eb' },
                                }
                            }}
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Numéro de Téléphone</label>
                        <TextField
                            fullWidth
                            name="phone"
                            placeholder="077 00 00 00"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    '&:hover fieldset': { borderColor: '#2463eb' },
                                }
                            }}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Mot de passe</label>
                        <TextField
                            fullWidth
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
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
                        className="h-14 bg-[#2463eb] hover:bg-blue-700 rounded-2xl text-[16px] font-bold normal-case shadow-xl shadow-blue-200 mt-4"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Créer un compte'}
                    </Button>

                    <p className="text-center text-[12px] text-gray-400 font-medium px-4">
                        En vous inscrivant, vous acceptez nos <span className="text-[#2463eb] font-bold cursor-pointer">Conditions</span> et <span className="text-[#2463eb] font-bold cursor-pointer">Politique de confidentialité</span>.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 flex flex-col items-center justify-center py-12 px-6 relative overflow-hidden">
                {/* Effet de fond subtil */}
                <Box className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />
                <Box className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />

                <Container maxWidth="sm" className="relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-[#111827] mb-3">Rejoignez Mboloprof</h1>
                        <p className="text-gray-500 font-medium">Commencez votre parcours avec les meilleurs éducateurs du Gabon.</p>
                    </div>

                    <Suspense fallback={
                        <Box className="flex justify-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-xl">
                            <CircularProgress sx={{ color: '#2463eb' }} />
                        </Box>
                    }>
                        <RegisterForm />
                    </Suspense>

                    {/* Footer Auth */}
                    <div className="mt-12 flex justify-center gap-6 text-[12px] font-bold text-gray-400">
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Politique de confidentialité</Link>
                        <span>•</span>
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Conditions d'utilisation</Link>
                        <span>•</span>
                        <Link href="#" className="hover:text-gray-600 no-underline transition-colors uppercase tracking-wider">Contact</Link>
                    </div>
                </Container>
            </Box>
        </main>
    );
}
