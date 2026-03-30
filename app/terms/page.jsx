'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Header />

            <Box className="flex-1 py-20">
                <Container maxWidth="md">
                    <Paper elevation={0} className="p-8 md:p-16 rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-100/50">
                        <Typography variant="h3" className="text-3xl font-black text-[#111827] mb-8">
                            Conditions d'utilisation
                        </Typography>

                        <div className="prose prose-blue max-w-none text-gray-600 space-y-8 font-medium">
                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">1. Acceptation des conditions</h2>
                                <p>En accédant et en utilisant la plateforme MboloProf, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">2. Description du service</h2>
                                <p>MboloProf est une plateforme de mise en relation entre des professeurs particuliers et des élèves au Gabon. Nous ne sommes pas un employeur ni une agence de recrutement. Les contrats de cours sont conclus directement entre le professeur et l'élève.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">3. Compte utilisateur</h2>
                                <p>Pour utiliser certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable du maintien de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">4. Comportement de l'utilisateur</h2>
                                <p>Les utilisateurs s'engagent à fournir des informations exactes et à ne pas utiliser la plateforme à des fins illégales ou abusives. Tout contenu inapproprié pourra être supprimé sans préavis.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">5. Limitation de responsabilité</h2>
                                <p>MboloProf ne saurait être tenu responsable des litiges survenant entre les utilisateurs, ni de la qualité des cours dispensés par les professeurs inscrits sur la plateforme.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider">6. Modifications</h2>
                                <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur le site.</p>
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
