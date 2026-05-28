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
    Breadcrumbs,
    IconButton
} from '@mui/material';
import {
    NavigateNext as NextIcon,
    Visibility as ViewIcon,
    Save as SaveIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { adService } from '@/services/adService';
import { subjectService } from '@/services/subjectService';

const PROVINCES = [
    "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ogooué-Maritime", "Ngounié", "Nyanga", "Ogooué-Ivindo", "Ogooué-Lolo", "Woleu-Ntem"
];

const CITIES = [
    "Libreville", "Owendo", "Akanda", "Ntoum", "Port-Gentil", "Omboué", "Gamba", "Franceville", "Moanda", "Mounana", "Bongoville", "Lékoni", "Okondja", "Lambaréné", "Ndjolé", "Mouila", "Fougamou", "Ndendé", "Oyem", "Mitzic", "Bitam", "Minvoul", "Médouneu", "Koulamoutou", "Lastoursville", "Pana", "Tchibanga", "Moabi", "Makokou", "Booué", "Ovan", "Mékambo"
];

const LEVELS = ["Lycée/Collège", "Université", "Primaire"];

export default function EditAdPage() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
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
        const loadData = async () => {
            try {
                const [subjectsData, adData] = await Promise.all([
                    subjectService.getAll(),
                    adService.getById(id)
                ]);
                setSubjects(subjectsData);
                setFormData({
                    title: adData.title,
                    subject: adData.subject?._id || adData.subject,
                    price: adData.price,
                    level: adData.level,
                    province: adData.province,
                    city: adData.city,
                    description: adData.description
                });
            } catch (err) {
                console.error("Erreur chargement:", err);
                setError("Impossible de charger les données de l'annonce.");
            } finally {
                setFetching(false);
            }
        };
        loadData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await adService.update(id, formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError("Erreur lors de la mise à jour de l'annonce.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Box className="flex justify-center py-20">
                <CircularProgress sx={{ color: '#2463eb' }} />
            </Box>
        );
    }

    return (
        <Box>
            {/* Breadcrumbs et bouton Voir Profil */}
            <Box className="mb-8 flex items-center justify-between">
                <Breadcrumbs separator={<NextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 no-underline text-[14px] font-bold">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/ads" className="text-gray-400 hover:text-gray-600 no-underline text-[14px] font-bold">
                        Mes Annonces
                    </Link>
                    <Typography className="text-[#111827] text-[14px] font-bold">Modifier l'annonce</Typography>
                </Breadcrumbs>

                <Link href={`/ad/${id}`} className="no-underline">
                    <Button
                        variant="outlined"
                        startIcon={<ViewIcon />}
                        className="border-gray-200 text-[#2463eb] font-black px-6 py-2 rounded-xl normal-case hover:bg-gray-50"
                    >
                        Voir l'annonce publique
                    </Button>
                </Link>
            </Box>

            <Box className="mb-10">
                <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                    Modifier l'annonce
                </Typography>
                <Typography className="text-gray-500 font-medium">
                    Mettez à jour les détails de votre cours pour attirer plus d'étudiants.
                </Typography>
            </Box>

            {success && (
                <Alert severity="success" className="mb-8 rounded-2xl font-bold">
                    Annonce mise à jour avec succès !
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Paper elevation={0} className="p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-50/50">
                    <Grid container spacing={5}>
                        {/* Titre */}
                        <Grid item xs={12}>
                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Titre de l'annonce</label>
                            <TextField
                                fullWidth
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                            />
                            <Typography className="text-[12px] text-gray-400 font-medium mt-1 ml-1">
                                Un titre clair aide les étudiants à trouver vos cours facilement.
                            </Typography>
                        </Grid>

                        {/* Matière et Prix */}
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
                            >
                                {subjects.map((sub) => (
                                    <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Prix mensuel (FCFA)</label>
                            <TextField
                                fullWidth
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">/ mois</InputAdornment>,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                            />
                        </Grid>

                        {/* Localisation */}
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

                        <Grid item xs={12} md={4}>
                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Niveau scolaire</label>
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

                        {/* Description */}
                        <Grid item xs={12}>
                            <label className="block text-[13px] font-bold text-[#111827] mb-2 ml-1">Description complète</label>
                            <TextField
                                fullWidth
                                multiline
                                rows={8}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
                            />
                        </Grid>

                        {/* Footer / Actions */}
                        <Grid item xs={12}>
                            <Box className="flex items-center justify-between pt-6 border-t border-gray-100">
                                <Button
                                    startIcon={<DeleteIcon />}
                                    className="text-red-500 font-bold normal-case px-4 hover:bg-red-50"
                                    onClick={() => router.push('/dashboard/ads')}
                                >
                                    Supprimer l'annonce
                                </Button>

                                <Box className="flex gap-4">
                                    <Button
                                        variant="outlined"
                                        className="border-gray-200 text-gray-500 font-bold px-8 py-3 rounded-xl normal-case"
                                        onClick={() => router.back()}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={<SaveIcon />}
                                        className="bg-[#2463eb] hover:bg-blue-700 px-10 py-3 rounded-xl text-[16px] font-black normal-case shadow-xl shadow-blue-200"
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Mettre à jour l\'annonce'}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </form>

            {/* Aide Contextuelle */}
            <Box className="mt-8 p-6 bg-blue-50/50 border border-blue-100 rounded-[24px] flex gap-4">
                <Box className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Typography className="text-[#2463eb] text-[12px] font-black">i</Typography>
                </Box>
                <Typography className="text-[13px] text-gray-400 font-medium leading-relaxed">
                    Vos modifications seront auditées pour garantir la qualité de la plateforme. Cela prend généralement moins de 2 heures avant que la version mise à jour ne soit en ligne. Besoin d'aide ? <Link href="#" className="text-[#2463eb] font-black no-underline">Contactez le support</Link>
                </Typography>
            </Box>
        </Box>
    );
}
