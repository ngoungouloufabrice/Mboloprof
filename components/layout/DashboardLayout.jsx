'use client';

import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Drawer, IconButton } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ListAlt as AdsIcon,
    EventAvailable as AvailabilityIcon,
    RateReview as ReviewsIcon,
    Person as ProfileIcon,
    ExitToApp as LogoutIcon,
    Star as PremiumIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { useState } from 'react';

const MENU_ITEMS = [
    { text: 'Vue d\'ensemble', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Mes Annonces', icon: <AdsIcon />, path: '/dashboard/ads' },
    //{ text: 'Disponibilités', icon: <AvailabilityIcon />, path: '/dashboard/availability' },
    //{ text: 'Avis', icon: <ReviewsIcon />, path: '/dashboard/reviews' },
    { text: 'Mon Profil', icon: <ProfileIcon />, path: '/dashboard/profile' },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        authService.logout();
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

    const SidebarContent = (
        <Box className="flex flex-col h-full bg-white">
            {/* Logo Section */}
            <Box className="p-8 pb-4">
                <Link href="/" className="no-underline">
                    <span className="text-2xl font-black tracking-tight text-[#2463eb]">
                        Mboloprof
                    </span>
                </Link>
                <Typography className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mt-6 mb-2">
                    Tableau de bord
                </Typography>
            </Box>

            {/* Navigation Menu */}
            <List className="flex-1 px-4 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                    return (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`rounded-xl px-4 py-3 transition-colors ${isActive
                                    ? 'bg-blue-50 text-[#2463eb]'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <ListItemIcon className={`min-w-0 mr-4 ${isActive ? 'text-[#2463eb]' : 'text-gray-400'}`}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        className: `text-[14px] font-bold ${isActive ? 'text-[#2463eb]' : 'text-gray-500'}`
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box className="p-6 pt-0">
                <Divider className="my-6 border-gray-100" />
                <ListItemButton
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                >
                    <ListItemIcon className="min-w-0 mr-4 text-red-400">
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Déconnexion"
                        primaryTypographyProps={{ className: "text-[14px] font-bold" }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar Desktop */}
            <Box
                component="nav"
                className="hidden lg:block w-[280px] border-r border-gray-100 flex-shrink-0 fixed h-screen z-20"
            >
                {SidebarContent}
            </Box>

            {/* Sidebar Mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {SidebarContent}
            </Drawer>

            {/* Main Content */}
            <Box className="flex-1 lg:ml-[280px] min-h-screen">
                {/* Dashboard Header */}
                <Box className="h-16 bg-white border-b border-gray-100 flex items-center justify-between lg:justify-end px-4 md:px-8 sticky top-0 z-10">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { lg: 'none' }, mr: 2, color: 'grey.600' }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box className="flex items-center gap-4">
                        <Box className="text-right hidden sm:block">
                            <Typography className="text-[14px] font-black text-[#111827]">
                                {user.name}
                            </Typography>
                        </Box>
                        <Box className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#2463eb] font-black overflow-hidden border-2 border-white shadow-sm">
                            <ProfileIcon />
                        </Box>
                    </Box>
                </Box>

                <Box className="p-4 md:p-10">
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
