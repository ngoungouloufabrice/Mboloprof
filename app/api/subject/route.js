import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subject from '@/models/Subject';

/**
 * Fonction utilitaire pour transformer "Maths & Physique" en "maths-physique"
 * Cela permet d'avoir des URLs propres et lisibles.
 */
const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Enlève les accents
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')     // Remplace les espaces par des tirets (-)
        .replace(/[^\w-]+/g, ''); // Enlève tout ce qui n'est pas alphanumérique
};

/**
 * POST : Créer une nouvelle matière
 */
export async function POST(request) {
    try {
        await connectDB();
        const { name } = await request.json();

        if (!name) {
            return NextResponse.json({ message: "Le nom de la matière est requis" }, { status: 400 });
        }

        // On génère le slug automatiquement à partir du nom
        const slug = generateSlug(name);

        const nouvelleMatiere = await Subject.create({
            name,
            slug
        });

        return NextResponse.json({
            message: "Matière créée avec succès !",
            matiere: nouvelleMatiere
        }, { status: 201 });

    } catch (error) {
        // 11000 est le code d'erreur de MongoDB pour une violation de contrainte d'unicité (unique: true)
        if (error.code === 11000) {
            return NextResponse.json({ message: "Cette matière existe déjà" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * GET : Liste toutes les matières
 */
export async function GET() {
    try {
        await connectDB();
        // Tri par nom pour un affichage alphabétique dans les listes déroulantes
        const matieres = await Subject.find().sort({ name: 1 });
        return NextResponse.json(matieres, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * PUT : Modifier une matière
 */
export async function PUT(request) {
    try {
        await connectDB();
        const { id, name } = await request.json();

        // Si le nom change, on régénère aussi le slug
        const updateData = { name };
        if (name) updateData.slug = generateSlug(name);

        const subject = await Subject.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(subject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * DELETE : Supprimer une matière
 */
export async function DELETE(request) {
    try {
        await connectDB();
        const { id } = await request.json();
        await Subject.findByIdAndDelete(id);
        return NextResponse.json({ message: "Matière supprimée" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
