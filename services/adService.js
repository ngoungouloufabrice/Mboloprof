export const adService = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`/api/ad${query ? '?' + query : ''}`);
        
        return response.json();
    },
    getByTeacher: async (teacherId) => {
        const response = await fetch(`/api/ad?teacher=${teacherId}`);
        
        return response.json();
    },
    getById: async (id) => {
        const response = await fetch(`/api/ad?id=${id}`);
        
        return response.json();
    },
    create: async (adData) => {
        const response = await fetch('/api/ad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adData),
        });
        
        return response.json();
    },
    update: async (id, adData) => {
        const response = await fetch(`/api/ad?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adData),
        });
        
        return response.json();
    },
    delete: async (id) => {
        const response = await fetch(`/api/ad?id=${id}`, { method: 'DELETE' });
        
        return response.json();
    }
};