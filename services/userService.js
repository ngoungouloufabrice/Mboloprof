export const userService = {
    getAllProfiles: async () => {
        // API call to /api/user
        const response = await fetch('/api/user');
        return response.json();
    },
    getAllTeachers: async () => {
        const response = await fetch('/api/user?role=PROF');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des professeurs');
        }
        return response.json();
    },
    getAllStudents: async () => {
        const response = await fetch('/api/user?role=ELEVE');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des élèves');
        }
        return response.json();
    },
    getMyProfile: async (id) => {
        // API call to /api/user
        const response = await fetch(`/api/user?id=${id}`);
        return response.json();
    },
    updateMyProfile: async (id, userData) => {
        // API call to /api/user (PUT)
        const response = await fetch(`/api/user?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    },
    deleteMyProfile: async (id) => {
        // API call to /api/user (DELETE)
        const response = await fetch(`/api/user?id=${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
};
