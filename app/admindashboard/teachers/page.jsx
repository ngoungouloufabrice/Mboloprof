'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    IconButton,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Visibility as ViewIcon,
    MoreVert as MoreIcon,
    ListAlt as AdsIcon,
    School as SchoolIcon
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import Link from 'next/link';

export default function TeachersPage() {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await userService.getAllTeachers();
                setTeachers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await userService.deleteTeacher(deleteId);
            setTeachers(teachers.filter(teacher => teacher._id !== deleteId));
            setDeleteId(null);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err) {
            console.error("Erreur suppression:", err);
        }
    };

    return (
        <Box>
            {success && (
                <Box className="mb-10 flex items-center justify-between">
                    <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                        Enseignant supprimée avec succès.
                    </Typography>
                </Box>
            )}
            <Box className="mb-10 flex items-center justify-between">
                <Box>
                    <Typography variant="h4" className="text-3xl font-black text-[#111827] mb-2">
                        Toutes les Enseignants.
                    </Typography>
                    <Typography className="text-gray-500 font-medium">
                        Gérez les Enseignants.
                    </Typography>
                </Box>
            </Box>

            {loading ? (
                <Box className="flex justify-center py-20">
                    <CircularProgress sx={{ color: '#2463eb' }} />
                </Box>
            ) : teachers.length === 0 ? (
                <Paper elevation={0} className="p-16 rounded-[32px] border border-gray-100 shadow-sm text-center">
                    <Box className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <SchoolIcon className="text-gray-300 text-4xl" />
                    </Box>
                    <Typography variant="h5" className="font-black text-[#111827] mb-2">
                        Aucun Enseignant.
                    </Typography>
                </Paper>
            ) : (
                <Box className="space-y-4">
                    {/* Header Table Stylisé */}
                    <Box className="hidden md:flex px-8 py-4 bg-gray-50 rounded-2xl mb-4">
                        <Typography className="flex-[2] text-[12px] font-black uppercase tracking-widest text-gray-400">Nom complet</Typography>
                        <Typography className="flex-1 text-[12px] font-black uppercase tracking-widest text-gray-400">Email</Typography>
                        <Typography className="flex-1 text-[12px] font-black uppercase tracking-widest text-gray-400 text-center">Téléphone</Typography>
                        <Typography className="flex-1 text-[12px] font-black uppercase tracking-widest text-gray-400 text-center">Actions</Typography>
                    </Box>

                    {teachers.map((teacher) => (
                        <Paper key={teacher._id} elevation={0} className="p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <Box className="flex flex-col md:flex-row items-center gap-6">
                                <Box className="flex-[2] flex gap-4 items-center">
                                    <Box className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2463eb] shrink-0">
                                        <SchoolIcon />
                                    </Box>
                                    <Box>
                                        <Typography className="text-[15px] font-black text-[#111827] line-clamp-1">
                                            {teacher.name}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="flex-1">
                                    <Chip
                                        label={teacher.phone}
                                        className="bg-indigo-50 text-indigo-600 font-bold text-[12px] rounded-lg"
                                    />
                                </Box>

                                <Box className="flex-1 text-center">
                                    <Typography className="text-[16px] font-black text-[#2463eb]">
                                        {teacher.email}
                                    </Typography>
                                </Box>

                                <Box className="flex-1 flex justify-center gap-2">
                                    <IconButton
                                        onClick={() => setDeleteId(teacher._id)}
                                        className="bg-red-50 text-red-500 hover:bg-red-100 p-2.5 rounded-xl"
                                    >
                                        <DeleteIcon sx={{ fontSize: 20 }} />
                                    </IconButton>

                                    {/*<Link href={`/ad/${teacher._id}`}>
                                        <IconButton className="bg-gray-50 text-gray-600 hover:bg-gray-100 p-2.5 rounded-xl">
                                            <ViewIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                    </Link>*/}
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}

            {/* Dialog de confirmation de suppression */}
            <Dialog
                open={Boolean(deleteId)}
                onClose={() => setDeleteId(null)}
                PaperProps={{ className: "rounded-[32px] p-4" }}
            >
                <DialogTitle className="font-black text-xl text-center">Supprimer l'enseignant ?</DialogTitle>
                <DialogContent>
                    <Typography className="text-gray-500 text-center font-medium">
                        Cette action est irréversible. Toutes les données associées à cet enseignant seront supprimées.
                    </Typography>
                </DialogContent>
                <DialogActions className="justify-center gap-4 pb-4">
                    <Button onClick={() => setDeleteId(null)} className="text-gray-500 font-bold bg-transparent px-8 py-3 normal-case hover:bg-gray-50">
                        Annuler
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className="bg-red-500 text-white font-black px-8 py-3 rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 normal-case"
                    >
                        Supprimer définitivement
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
