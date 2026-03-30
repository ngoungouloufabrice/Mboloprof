import mongoose from "mongoose";

// Récupération de l'URI de connexion depuis les variables d'environnement
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI n'est pas défini dans le fichier .env.local");
}

/**
 * Global est utilisé ici pour maintenir une connexion mise en cache lors du rechargement à chaud (HMR) 
 * de Next.js pendant le développement. Cela évite d'épuiser les ressources de la base de données.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // Si une connexion existe déjà, on la retourne
    if (cached.conn) {
        return cached.conn;
    }

    // Si aucune promesse de connexion n'est en cours, on la crée
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            family: 4, // Force IPv4 to avoid some DNS issues
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Connexion RÉUSSIE à MongoDB");
            return mongoose;
        }).catch((err) => {
            console.error("Erreur de connexion à MongoDB :", err.message);
            throw err;
        });
    }

    // On attend que la promesse soit résolue pour stocker la connexion
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;