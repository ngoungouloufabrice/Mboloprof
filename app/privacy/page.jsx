'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 py-20">
                <Container maxWidth="md">
                    <Paper elevation={0} className="p-8 md:p-16 rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-100/50">
                        <Typography variant="h3" className="text-3xl font-black text-[#111827] mb-8">
                            Politique de confidentialité
                        </Typography>

                        <div className="prose prose-blue max-w-none text-gray-600 space-y-8 font-medium">
                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">1. Collecte des données</h2>
                                <p>Nous collectons les informations que vous nous fournissez lors de la création de votre compte, notamment votre nom, adresse email, numéro de téléphone et, pour les professeurs, les détails de votre profil professionnel.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">2. Utilisation des informations</h2>
                                <p>Vos données sont utilisées pour assurer le bon fonctionnement du service, vous permettre de communiquer avec d'autres utilisateurs et améliorer votre expérience sur la plateforme.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">3. Partage des données</h2>
                                <p>MboloProf ne vend pas vos données personnelles à des tiers. Les informations de votre profil public sont visibles par les autres utilisateurs afin de faciliter la mise en relation.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">4. Sécurité</h2>
                                <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification ou destruction.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">5. Vos droits</h2>
                                <p>Conformément aux lois en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ces droits depuis les paramètres de votre compte ou en nous contactant.</p>
                            </section>

                            <p className="pt-8 text-sm text-gray-400">Dernière mise à jour : 24 Février 2026</p>
                        </div>
                    </Paper>
                </Container>
            </Box>

            <Footer />
        </main>
    );
}
