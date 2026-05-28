import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

/**
 * API pour la connexion utilisateur
 * Méthode : POST
 */
export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        // 1. Vérification des champs requis
        if (!email || !password) {
            return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
        }

        // 2. Recherche de l'utilisateur en base de données par son email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Email incorrect' }, { status: 401 });
        }

        // 3. Comparaison du mot de passe fourni avec le hash stocké
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
        }

        // 4. Génération d'un Token JWT (valable 7 jours) avec 'jose'
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ id: user._id.toString(), role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        // 5. Préparation des données de l'utilisateur (on enlève le mot de passe)
        const userSansPassword = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };


        // 6. Création de la réponse et configuration du Cookie sécurisé (HttpOnly)
        const response = NextResponse.json({
            message: `Bienvenue, ${user.name} !`,
            user: userSansPassword,
            token
        }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true, // Empêche l'accès au token via JavaScript côté client
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60, // 7 jours en secondes
            path: '/',
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Erreur serveur lors de la connexion', error: error.message }, { status: 500 });
    }
}