import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { jwtVerify } from 'jose';

/**
 * Fonction utilitaire pour vérifier l'identité de l'utilisateur
 */
const getAuthUser = async (request) => {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) return null;
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
};

/**
 * GET : Liste des utilisateurs ou Profil spécifique
 */
export async function GET(request) {
    const roles = ['PROF', 'ELEVE'];
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const role = searchParams.get('role')?.toUpperCase();

        // Cas 1 : Profil d'un utilisateur spécifique
        if (id) {
            const user = await User.findById(id).select('-password');
            if (!user) return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
            return NextResponse.json(user, { status: 200 });
        }

        // Cas 2 : Liste des utilisateurs par rôle
        if (role && roles.includes(role)) {
            const users = await User.find({ role }).select('-password');
            if (!users) return NextResponse.json({ message: "Aucun utilisateur de ce type n'a été trouvé." }, { status: 404 });
            return NextResponse.json(users, { status: 200 });
        }

        // Cas 3 : Liste globale (ex: pour un administrateur)
        const users = await User.find().select('-password');
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * PUT : Modifier son propre profil
 * Restriction : On ne peut modifier QUE son propre compte
 */
export async function PUT(request) {
    try {
        const authUser = await getAuthUser(request);
        if (!authUser) return NextResponse.json({ message: "Authentification requise" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const updateData = await request.json();

        // 🛡️ Sécurité : vérification que l'ID à modifier est celui de l'utilisateur connecté
        if (id !== authUser.id) {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à modifier ce profil" }, { status: 403 });
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * DELETE : Supprimer son propre profil
 * Restriction : On ne peut supprimer QUE son propre compte
 */
export async function DELETE(request) {
    try {
        const authUser = await getAuthUser(request);
        if (!authUser) return NextResponse.json({ message: "Authentification requise" }, { status: 401 });

        await connectDB();
        const { id } = await request.json();

        // 🛡️ Sécurité : vérification que l'ID à supprimer est le bon
        if (id !== authUser.id) {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à supprimer ce profil" }, { status: 403 });
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "Utilisateur supprimé définitivement" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



