import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Middleware de sécurité s'exécutant avant chaque requête
 * Sert à protéger les pages et les API contre les accès non autorisés
 */
export async function middleware(request) {
    // Récupération du token JWT stocké dans les cookies
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // 1. Définition des routes protégées (Interface Utilisateur)
    const isProtectedRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/publish') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/admindashboard');

    // 2. Définition des routes API protégées (Actions sensibles)
    // On laisse passer les GET (lecture seule) mais on protège le reste
    const isApiProtectedRoute = (pathname.startsWith('/api/ad') && request.method !== 'GET') ||
        (pathname.startsWith('/api/user') && request.method !== 'GET') ||
        pathname.startsWith('/api/subject');

    // 3. Logique de vérification si la route est protégée
    if (isProtectedRoute || isApiProtectedRoute) {
        // Si aucun token n'est présent
        if (!token) {
            // Pour l'API, on renvoie une erreur JSON
            if (isApiProtectedRoute) {
                return NextResponse.json({ message: 'Authentification requise' }, { status: 401 });
            }
            // Pour l'interface, on redirige vers la page de connexion
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Conversion du secret JWT pour la bibliothèque 'jose'
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            // Vérification de la validité du token
            await jwtVerify(token, secret);
            // Si c'est valide, on laisse passer la requête
            return NextResponse.next();
        } catch (error) {
            console.error('Erreur Middleware JWT :', error.message);
            // Si le token est invalide ou expiré
            if (isApiProtectedRoute) {
                return NextResponse.json({ message: 'Session expirée ou invalide' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Pour toutes les autres routes (publiques), on continue normalement
    return NextResponse.next();
}

/**
 * Configuration du matcher pour appliquer le middleware uniquement sur certaines routes
 */
export const config = {
    matcher: [
        '/admindashboard/:path*',
        '/dashboard/:path*',
        '/publish/:path*',
        '/profile/:path*',
        '/api/ad/:path*',
        '/api/user/:path*',
        '/api/subject/:path*'
    ],
};
