'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    CircularProgress,
    Alert,
    InputAdornment,
    Container
} from '@mui/material';
import {
    Person as ProfileIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Work as WorkIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.id) {
                try {
                    const data = await userService.getMyProfile(user.id);
                    setFormData({
                        name: data.name || '',
                        phone: data.phone || '',
                        email: data.email || '',
                    });
                } catch (err) {
                    console.error("Erreur profile:", err);
                    setError("Impossible de charger votre profil.");
                } finally {
                    setFetching(false);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await userService.updateMyProfile(user.id, formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

            // Optionnel : recharger la page ou rafraîchir l'AuthContext si nécessaire
        } catch (err) {
            setError("Erreur lors de la mise à jour du profil.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching || authLoading) {
        return (
            <Box className="flex justify-center py-20">
                <CircularProgress sx={{ color: '#2463eb' }} />
            </Box>
        );
    }

    return (
        <Box>
            <Container maxWidth="lg">
            <Box className="mt-10 mb-10">
                <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                    Mon Profil
                </Typography>
                <Typography className="text-gray-500 font-medium">
                    Gérez vos informations personnelles.
                </Typography>
            </Box>

            {success && (
                <Alert severity="success" className="mb-8 rounded-2xl font-bold">
                    Profil mis à jour avec succès !
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Box className="flex flex-col gap-8">
                    {/* Compartiment Haut : Résumé Profil */}
                    <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50">
                        <Box className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <Box className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative shrink-0">
                                <ProfileIcon sx={{ fontSize: 64, color: '#2463eb' }} />
                                <Box className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-[12px] font-black">
                                    Modifier
                                </Box>
                            </Box>
                            <Box className="flex-1">
                                <Typography className="text-2xl font-black text-[#111827] mb-1">
                                    {formData.name}
                                </Typography>

                                <Box className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                    <Box className="flex items-center gap-3 text-gray-500">
                                        <EmailIcon sx={{ fontSize: 18 }} />
                                        <Typography className="text-[14px] font-medium">{user?.email}</Typography>
                                    </Box>
                                    <Box className="flex items-center gap-3 text-gray-500">
                                        <PhoneIcon sx={{ fontSize: 18 }} />
                                        <Typography className="text-[14px] font-medium">{formData.phone}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Compartiment Bas : Formulaire d'édition */}
                    <Paper elevation={0} className="p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50">
                        <Box className="space-y-8">
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Nom complet</label>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Numéro de téléphone</label>
                                    <TextField
                                        fullWidth
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                    />
                                </Grid>
                            </Grid>

                            <Box>
                                <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Email</label>
                                <TextField
                                    fullWidth
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
                                />
                            </Box>

                            <Box className="pt-4 flex justify-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={<SaveIcon />}
                                    className="h-14 bg-[#2463eb] hover:bg-blue-700 px-10 rounded-2xl text-[16px] font-black normal-case shadow-xl shadow-blue-200"
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Enregistrer les modifications'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </form>
            </Container>
        </Box>
    );
}
