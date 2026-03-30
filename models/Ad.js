import mongoose from 'mongoose';

/**
 * Schéma d'une annonce (cours proposé par un professeur)
 */

const AdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le titre est requis"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "La description est requise"]
    },
    // RÉFÉRENCE à la collection Subject (Matière)
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, "La matière est requise"]
    },
    level: {
        type: String,
        enum: ["Lycée/Collège", "Université", "Primaire"],
        required: [true, "Le niveau est requis"]
    },
    price: {
        type: Number,
        required: [true, "Le prix est requis"]
    },
    province: {
        type: String,
        enum: ["Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ogooué-Maritime", "Ngounié", "Nyanga", "Ogooué-Ivindo", "Ogooué-Lolo", "Woleu-Ntem"],
        required: [true, "La province est requise"],
        default: "Estuaire"
    },
    city: {
        type: String,
        enum: ["Libreville", "Owendo", "Akanda", "Ntoum", "Port-Gentil", "Omboué", "Gamba", "Franceville", "Moanda", "Mounana", "Bongoville", "Lékoni", "Okondja", "Lambaréné", "Ndjolé", "Mouila", "Fougamou", "Ndendé", "Oyem", "Mitzic", "Bitam", "Minvoul", "Médouneu", "Koulamoutou", "Lastoursville", "Pana", "Tchibanga", "Moabi", "Makokou", "Booué", "Ovan", "Mékambo"],
        required: [true, "La ville est requise"],
        default: "Libreville"
    },
    // RÉFÉRENCE au professeur qui a créé l'annonce
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    // Gère automatiquement les dates de création et de modification
    timestamps: true
});

// Index composé : un professeur ne peut avoir qu'une seule annonce par matière et par niveau
AdSchema.index({ subject: 1, teacher: 1, level: 1 }, { unique: true });

const Ad = mongoose.models.Ad || mongoose.model('Ad', AdSchema);
export default Ad;
