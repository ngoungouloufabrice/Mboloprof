export const authService = {
    login: async (credentials) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        // Si la connexion réussit, on stocke l'utilisateur
        if (response.ok && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            // Optionnel : stocker le token si tu n'utilises pas les cookies
            localStorage.setItem('token', data.token);
        }

        return data;
    },

    register: async (userData) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    logout: async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error("Erreur logout API:", err);
        }
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Rediriger vers l'accueil
        window.location.href = '/login';
    },

    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    },
};