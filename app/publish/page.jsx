'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    MenuItem,
    Typography,
    Paper,
    Grid,
    InputAdornment,
    CircularProgress,
    Alert,
    Breadcrumbs
} from '@mui/material';
import {
    Info,
    Description,
    Image as ImageIcon,
    CloudUpload,
    Place,
    School,
    AttachMoney
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { adService } from '@/services/adService';
import { subjectService } from '@/services/subjectService';
import { useAuth } from '@/context/AuthContext';

const PROVINCES = [
    "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ogooué-Maritime", "Ngounié", "Nyanga", "Ogooué-Ivindo", "Ogooué-Lolo", "Woleu-Ntem"
];

const CITIES = [
    "Libreville", "Owendo", "Akanda", "Ntoum", "Port-Gentil", "Omboué", "Gamba", "Franceville", "Moanda", "Mounana", "Bongoville", "Lékoni", "Okondja", "Lambaréné", "Ndjolé", "Mouila", "Fougamou", "Ndendé", "Oyem", "Mitzic", "Bitam", "Minvoul", "Médouneu", "Koulamoutou", "Lastoursville", "Pana", "Tchibanga", "Moabi", "Makokou", "Booué", "Ovan", "Mékambo"
];

const LEVELS = ["Lycée/Collège", "Université", "Primaire"];

export default function PublishPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetchingSubjects, setFetchingSubjects] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        price: '',
        level: 'Lycée/Collège',
        province: 'Estuaire',
        city: 'Libreville',
        description: ''
    });

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const data = await subjectService.getAll();
                setSubjects(data);
            } catch (err) {
                console.error("Erreur lors du chargement des matières:", err);
                setError("Impossible de charger les matières. Veuillez rafraîchir la page.");
            } finally {
                setFetchingSubjects(false);
            }
        };
        loadSubjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await adService.create(formData);
            if (result.annonce) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                setError(result.message || "Erreur lors de la publication");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

     if (!user || user.role !== 'PROF') {
            return (
                <Box className="flex items-center justify-center min-h-screen bg-gray-50">
                    <Typography variant="h6" className="font-bold text-gray-500">
                        Accès réservé aux professeurs.
                    </Typography>
                </Box>
            );
        }

    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 py-12 px-6">
                <Container maxWidth="md">
                    <Box className="mb-10 text-center">
                        <Typography variant="h3" className="text-4xl font-black text-[#111827] mb-3">
                            Publier une annonce
                        </Typography>
                        <p className="text-gray-500 font-medium">
                            Partagez votre connaissance et commencez à atteindre des étudiants aujourd'hui.
                        </p>
                    </Box>

                    {success ? (
                        <Alert severity="success" className="mb-6 rounded-2xl font-bold">
                            Annonce publiée avec succès ! Redirection...
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Box className="space-y-8">
                                {/* SECTION 1: BASIC INFORMATION */}
                                <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50">
                                    <Box className="flex items-center gap-3 mb-8">
                                        <Box className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Info className="text-[#2463eb] text-[18px]" />
                                        </Box>
                                        <Typography className="text-[12px] font-black uppercase tracking-widest text-[#111827]">
                                            Informations de base
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Titre de l'annonce</label>
                                            <TextField
                                                fullWidth
                                                name="title"
                                                placeholder="e.g. Intensive Mathematics for High School Exams"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                                helperText="Catchy titles work best. Mention your level or specific exam focus."
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Matière</label>
                                            <TextField
                                                select
                                                fullWidth
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                                disabled={fetchingSubjects}
                                            >
                                                {subjects.map((sub) => (
                                                    <MenuItem key={sub._id} value={sub._id}>
                                                        {sub.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Prix par mois</label>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="price"
                                                placeholder="25000"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">FCFA/m</InputAdornment>,
                                                }}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Niveau</label>
                                            <TextField
                                                select
                                                fullWidth
                                                name="level"
                                                value={formData.level}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            >
                                                {LEVELS.map((lvl) => (
                                                    <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Province</label>
                                            <TextField
                                                select
                                                fullWidth
                                                name="province"
                                                value={formData.province}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            >
                                                {PROVINCES.map((prov) => (
                                                    <MenuItem key={prov} value={prov}>{prov}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Ville</label>
                                            <TextField
                                                select
                                                fullWidth
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                            >
                                                {CITIES.map((city) => (
                                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                {/* SECTION 2: LESSON DETAILS */}
                                <Paper elevation={0} className="p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50">
                                    <Box className="flex items-center gap-3 mb-8">
                                        <Box className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Description className="text-[#2463eb] text-[18px]" />
                                        </Box>
                                        <Typography className="text-[12px] font-black uppercase tracking-widest text-[#111827]">
                                            Détails de l'annonce
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Description de l'annonce</label>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={6}
                                            name="description"
                                            placeholder="Describe your teaching methodology, your experience, and what students can expect from your lessons..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
                                        />
                                    </Box>
                                </Paper>

                                {/* ACTIONS */}
                                <Box className="flex items-center justify-between pt-4">
                                    <Box className="flex gap-4 items-center">
                                        <Button
                                            className="text-gray-500 font-bold normal-case px-6"
                                            onClick={() => router.back()}
                                        >
                                            Annuler
                                        </Button>
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        className="bg-[#2463eb] hover:bg-blue-700 px-10 py-4 rounded-2xl text-[16px] font-black normal-case shadow-xl shadow-blue-200"
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Publish Listing'}
                                    </Button>
                                </Box>

                                {error && (
                                    <Alert severity="error" className="rounded-2xl font-bold">
                                        {error}
                                    </Alert>
                                )}
                            </Box>
                        </form>
                    )}

                    {/* FOOTER */}

                </Container>
            </Box>
        </main>
    );
}
