import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

/**
 * API pour l'inscription d'un nouvel utilisateur
 * Méthode : POST
 */
export async function POST(request) {
    try {
        await connectDB();

        const { name, email, password, role, phone } = await request.json();

        // 1. Validation des champs obligatoires
        if (!name || !email || !password || !role || !phone) {
            return NextResponse.json({ message: 'Tous les champs sont requis (nom, email, mot de passe, rôle, téléphone)' }, { status: 400 });
        }

        // 2. Vérification si l'utilisateur existe déjà (doublon d'email ou téléphone)
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return NextResponse.json({ message: 'Cet utilisateur existe déjà (email ou téléphone déjà utilisé)' }, { status: 400 });
        }

        // 3. Hachage du mot de passe (on ne stocke jamais de mot de passe en clair !)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 4. Création de l'utilisateur dans MongoDB
        const user = await User.create({
            name,
            email,
            phone,
            password: passwordHash,
            role: role.toUpperCase() || "ELEVE"
        });

        // 5. Génération d'un Token JWT (7 jours) avec 'jose'
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ id: user._id.toString(), role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        // 6. Sécurité : on retire le mot de passe de l'objet avant de renvoyer la réponse
        const userSansPassword = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };


        const response = NextResponse.json({
            message: 'Utilisateur enregistré et connecté avec succès !',
            user: userSansPassword,
            token
        }, { status: 201 });

        // Configuration du Cookie sécurisé
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            message: 'Erreur lors de l\'enregistrement de l\'utilisateur',
            error: error.message
        }, { status: 500 });
    }
}

