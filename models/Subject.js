import mongoose from 'mongoose';

/**
 * Schéma des matières enseignées (ex: Mathématiques, Français, etc.)
 */
const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom de la matière est requis"],
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Utilisé pour des URLs propres (ex: /ads/mathematiques)
    }
}, { timestamps: true })

export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);