import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Ad from '@/models/Ad';
import '@/models/User';    // Nécessaire pour que Mongoose enregistre le modèle avant populate()
import '@/models/Subject'; // Idem pour Subject
import { jwtVerify } from 'jose';
import mongoose from 'mongoose';


/**
 * Fonction utilitaire pour extraire et vérifier l'utilisateur à partir du Token JWT
 * @param {Request} request 
 * @returns {Object|null} Les données de l'utilisateur ou null si invalide
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
 * GET : Récupérer les annonces
 * Supporte : 
 * - Récupération par ID (?id=...)
 * - Filtrage par ville (?city=...)
 * - Filtrage par province (?province=...)
 * - Filtrage par matière (?subject=...)
 */
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const city = searchParams.get('city');
        const province = searchParams.get('province');
        const subject = searchParams.get('subject');
        const teacher = searchParams.get('teacher');

        // Cas 1 : Recherche d'une annonce spécifique par son ID
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return NextResponse.json({ message: "Format d'ID invalide" }, { status: 400 });
            }

            const annonce = await Ad.findById(id)
                .populate('teacher', 'name email phone experience about')
                .populate('subject', 'name');
            
            if (!annonce) {
                return NextResponse.json({ message: "Annonce non trouvée" }, { status: 404 });
            }
            return NextResponse.json(annonce, { status: 200 });
        }

        // Cas 2 : Liste filtrée d'annonces
        let filter = {};
        if (city) filter.city = city;
        if (province) filter.province = province;
        if (subject) {
            if (mongoose.Types.ObjectId.isValid(subject)) {
                filter.subject = subject;
            }
        }
        if (teacher) {
            if (mongoose.Types.ObjectId.isValid(teacher)) {
                filter.teacher = teacher;
            }
        }

        const annonces = await Ad.find(filter)
            .populate('teacher', 'name email')
            .populate('subject', 'name')
            .sort({ createdAt: -1 }); // Tri du plus récent au plus ancien

        return NextResponse.json(annonces, { status: 200 });
    } catch (error) {
        console.error("Erreur GET ads:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * POST : Créer une nouvelle annonce
 * Restriction : Seuls les PROF peuvent créer des annonces
 */
export async function POST(request) {
    try {
        const user = await getAuthUser(request);
        if (!user || user.role !== 'PROF')
            return NextResponse.json({ message: "Seuls les professeurs peuvent publier des annonces" }, { status: 403 });

        await connectDB();
        const data = await request.json();
        
        // Validation basique avant insertion
        if (!data.title || !data.subject || !data.price || !data.level || !data.description) {
            return NextResponse.json({ 
                message: "Tous les champs obligatoires (titre, matière, prix, niveau, description) doivent être remplis" 
            }, { status: 400 });
        }

        // Préparation du prix (en s'assurant qu'on a bien un nombre)
        const priceValue = Number(data.price.toString().replace(/\s/g, '')); // Enlève les espaces
        if (isNaN(priceValue)) {
            return NextResponse.json({ message: "Le prix doit être un nombre valide" }, { status: 400 });
        }
        
        let teacherId = user.id;
        
        // Sécurité au cas où l'ID serait un objet (pb de sérialisation JWT)
        if (typeof teacherId === 'object' && teacherId !== null) {
            console.log("Cas spécial : teacherId est un objet, tentative de récupération du buffer");
            // Si c'est l'objet avec buffer vu dans l'erreur
            if (teacherId.buffer) {
                teacherId = mongoose.Types.ObjectId.createFromHexString(
                    Buffer.from(Object.values(teacherId.buffer)).toString('hex')
                ).toString();
            } else {
                teacherId = teacherId.toString();
            }
        }

        const nouvelleAnnonce = await Ad.create({
            ...data,
            price: priceValue,
            teacher: teacherId
        });

        console.log("Annonce créée :", nouvelleAnnonce);

        return NextResponse.json({ 
            message: "Annonce créée avec succès !", 
            annonce: nouvelleAnnonce 
        }, { status: 201 });

    } catch (error) {
        console.error("Erreur création annonce :", error);

        // Gestion des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ message: `Erreur de validation : ${messages.join(', ')}` }, { status: 400 });
        }

        // Gestion des erreurs de type (ex: ID de matière invalide)
        if (error.name === 'CastError') {
            return NextResponse.json({ message: `Donnée invalide pour le champ ${error.path}` }, { status: 400 });
        }

        // Gestion spécifique des erreurs d'unicité (E11000)
        if (error.code === 11000) {
            return NextResponse.json({ 
                message: "Vous avez déjà publié une annonce pour cette matière et ce niveau." 
            }, { status: 400 });
        }

        return NextResponse.json({ message: "Erreur serveur : " + error.message }, { status: 500 });
    }
}


/**
 * PUT : Modifier une annonce existante
 * Restriction : Seul l'AUTEUR de l'annonce peut la modifier
 */
export async function PUT(request) {
    try {
        const user = await getAuthUser(request);
        if (!user) return NextResponse.json({ message: "Authentification requise" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "ID manquant ou invalide" }, { status: 400 });
        }

        const data = await request.json();

        // 1. Recherche de l'annonce originale
        const annonce = await Ad.findById(id);
        if (!annonce) return NextResponse.json({ message: "Annonce non trouvée" }, { status: 404 });

        // 2. Vérification de propriété (Seul l'auteur peut modifier)
        let userId = user.id;
        if (typeof userId === 'object' && userId !== null) {
            userId = userId.toString();
        }

        if (annonce.teacher.toString() !== userId) {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à modifier cette annonce" }, { status: 403 });
        }


        // 3. Filtrage des données (SÉCURITÉ)
        // On ne permet pas de modifier le "teacher"
        const allowedUpdates = {
            title: data.title,
            description: data.description,
            subject: data.subject,
            level: data.level,
            price: data.price ? Number(data.price) : undefined,
            province: data.province,
            city: data.city
        };

        // Supprimer les champs undefined pour éviter d'écraser avec null
        Object.keys(allowedUpdates).forEach(key => allowedUpdates[key] === undefined && delete allowedUpdates[key]);

        // 4. Mise à jour
        const updated = await Ad.findByIdAndUpdate(id, allowedUpdates, { new: true, runValidators: true })
            .populate('subject', 'name');

        return NextResponse.json({ 
            message: "Annonce mise à jour avec succès", 
            annonce: updated 
        }, { status: 200 });

    } catch (error) {
        console.error("Erreur PUT ad:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ message: "Erreur de validation", errors: messages }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * DELETE : Supprimer une annonce
 * Restriction : Seul l'AUTEUR de l'annonce peut la supprimer
 */
export async function DELETE(request) {
    try {
        const user = await getAuthUser(request);
        if (!user) return NextResponse.json({ message: "Authentification requise" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "ID manquant ou invalide" }, { status: 400 });
        }

        // 1. Recherche de l'annonce
        const annonce = await Ad.findById(id);
        if (!annonce) return NextResponse.json({ message: "Annonce non trouvée" }, { status: 404 });

        // 2. Vérification de propriété
        let userId = user.id;
        if (typeof userId === 'object' && userId !== null) {
            userId = userId.toString();
        }

        if (annonce.teacher.toString() !== userId) {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à supprimer cette annonce" }, { status: 403 });
        }


        // 3. Suppression
        await Ad.findByIdAndDelete(id);
        return NextResponse.json({ message: "Annonce supprimée avec succès" }, { status: 200 });
    } catch (error) {
        console.error("Erreur DELETE ad:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

