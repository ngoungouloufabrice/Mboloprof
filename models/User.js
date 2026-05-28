import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est requis"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, "Le numéro de téléphone est requis"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minlength: [6, "Le mot de passe doit faire au moins 6 caractères"],
    },
    role: {
        type: String,
        enum: ['PROF', 'ELEVE','ADMIN'],
        required: true,
        default: 'ELEVE',
    },
    // Pour les profs
    about: {
        type: String,
        trim: true,
    },
    // Pour les profs
    experience: {
        type: String,
        trim: true,
    },
    // Pour les profs
    active: Boolean,
    
});

export default mongoose.models.User || mongoose.model('User', UserSchema);