export const subjectService = {
    getAll: async () => {
        const response = await fetch('/api/subject');
        return response.json();
    },
    create: async (subjectData) => {
        const response = await fetch('/api/subject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subjectData),
        });
        return response.json();
    },
    update: async (id, subjectData) => {
        const response = await fetch(`/api/subject/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subjectData),
        });
        return response.json();
    },
    delete: async (id) => {
        const response = await fetch(`/api/subject/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};
