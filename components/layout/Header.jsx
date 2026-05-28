'use client';

import { AppBar, Box, Container, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, ListItemButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Header() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid',
                borderColor: 'grey.100',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
        >
            <Container maxWidth="lg" >
                <Toolbar disableGutters className="flex justify-between items-center h-20">

                    {/* Bloc Gauche : Logo */}
                    <Link href="/" className="flex items-center gap-2 no-underline">
                        <span className="text-xl font-bold tracking-tight text-[#2463eb]">
                            Mboloprof
                        </span>
                    </Link>


                    {/* Bloc Droite : Actions Desktop */}
                    <Box className="hidden md:flex items-center gap-4">

                        {!user ? (
                            <>
                                <Link href="/login" className="no-underline">
                                    <button className="bg-[#f3f4f6] text-gray-800 px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-gray-200 transition-all">
                                        Se connecter
                                    </button>
                                </Link>
                                <Link href="/register" className="no-underline">
                                    <button className="text-[#2463eb] border border-[#2463eb] px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-50 transition-all">
                                        S'inscrire
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                {user.role === "PROF" ? (
                                    <>
                                        <Link href="/dashboard" className="no-underline">
                                            <button className="flex items-center gap-2 bg-[#2463eb] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-700 transition-all shadow-md">
                                                <DashboardIcon className="text-[18px]" />
                                                <span>Dashboard</span>
                                            </button>
                                        </Link>
                                        <Box className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-600">
                                                {user.name}
                                            </span>
                                            <IconButton className="text-gray-400 hover:text-[#2463eb] transition-colors">
                                                <AccountCircleIcon className="text-[32px]" />
                                            </IconButton>
                                            <button
                                                onClick={logout}
                                                className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors ml-2"
                                            >
                                                Se deconnecter
                                            </button>
                                        </Box>

                                    </>
                                ) : (
                                    <>
                                        {user.role === "ADMIN" ? (
                                            <>
                                                <Link href="/admindashboard" className="no-underline">
                                                    <button className="flex items-center gap-2 bg-[#2463eb] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-700 transition-all shadow-md">
                                                        <DashboardIcon className="text-[18px]" />
                                                        <span>Dashboard</span>
                                                    </button>
                                                </Link>
                                                <Box className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        {user.name}
                                                    </span>
                                                    <IconButton className="text-gray-400 hover:text-[#2463eb] transition-colors">
                                                        <AccountCircleIcon className="text-[32px]" />
                                                    </IconButton>
                                                    <button
                                                        onClick={logout}
                                                        className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors ml-2"
                                                    >
                                                        Se deconnecter
                                                    </button>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {user.name}
                                                </span>
                                                <IconButton component={Link} href="/profile" className="text-gray-400 hover:text-[#2463eb] transition-colors">
                                                    <AccountCircleIcon className="text-[32px]" />
                                                </IconButton>
                                                <button
                                                    onClick={logout}
                                                    className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors ml-2"
                                                >
                                                    Se deconnecter
                                                </button>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                    </Box>

                    {/* Mobile Menu Button */}
                    <IconButton
                        onClick={toggleMobileMenu}
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            color: 'grey.600'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Mobile Drawer */}
                    <Drawer
                        anchor="right"
                        open={mobileMenuOpen}
                        onClose={toggleMobileMenu}
                        PaperProps={{
                            sx: { width: '80%', maxWidth: '300px' }
                        }}
                    >
                        <Box className="p-6 flex flex-col h-full">
                            <Box className="flex justify-between items-center mb-8">
                                <span className="text-xl font-bold tracking-tight text-[#2463eb]">
                                    Mboloprof
                                </span>
                                <IconButton onClick={toggleMobileMenu}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <List className="space-y-2">
                                {!user ? (
                                    <>
                                        <ListItem disablePadding>
                                            <Button
                                                component={Link}
                                                href="/login"
                                                fullWidth
                                                variant="outlined"
                                                onClick={toggleMobileMenu}
                                                className="rounded-xl py-3 normal-case font-bold"
                                                sx={{ borderColor: '#2463eb', color: '#2463eb' }}
                                            >
                                                Se connecter
                                            </Button>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <Button
                                                component={Link}
                                                href="/register"
                                                fullWidth
                                                variant="contained"
                                                onClick={toggleMobileMenu}
                                                className="rounded-xl py-3 normal-case font-bold bg-[#2463eb]"
                                            >
                                                S'inscrire
                                            </Button>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem disablePadding className="mb-4">
                                            <Box className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl w-full">
                                                <AccountCircleIcon className="text-gray-400 text-4xl" />
                                                <Box>
                                                    <p className="text-[14px] font-bold text-gray-900 leading-none mb-1">{user.name}</p>
                                                    <p className="text-[12px] text-gray-500 leading-none uppercase">{user.role}</p>
                                                </Box>
                                            </Box>
                                        </ListItem>

                                        {user.role === "PROF" && (
                                            <ListItem disablePadding>
                                                <ListItemButton component={Link} href="/dashboard" onClick={toggleMobileMenu} className="rounded-xl">
                                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                                    <ListItemText primary="Dashboard" primaryTypographyProps={{ className: "font-bold text-gray-700" }} />
                                                </ListItemButton>
                                            </ListItem>
                                        )}

                                        {user.role === "ADMIN" && (
                                            <ListItem disablePadding>
                                                <ListItemButton component={Link} href="/admindashboard" onClick={toggleMobileMenu} className="rounded-xl">
                                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                                    <ListItemText primary="Dashboard Admin" primaryTypographyProps={{ className: "font-bold text-gray-700" }} />
                                                </ListItemButton>
                                            </ListItem>
                                        )}

                                        <Divider className="my-4" />

                                        <ListItem disablePadding>
                                            <ListItemButton onClick={handleLogout} className="rounded-xl text-red-500">
                                                <ListItemIcon><LogoutIcon className="text-red-500" /></ListItemIcon>
                                                <ListItemText primary="Se déconnecter" primaryTypographyProps={{ className: "font-bold" }} />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Box>
                    </Drawer>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
