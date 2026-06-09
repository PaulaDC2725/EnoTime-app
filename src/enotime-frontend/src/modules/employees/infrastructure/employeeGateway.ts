import type { Employee } from '../domain/employeeTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const employeeGateway = {
    getAll: async (): Promise<Employee[]> => {
        const token = localStorage.getItem('enotime_token');
        const response = await fetch(`${API_URL}/api/employees`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch employees');
        return data;
    },

    update: async (id: string | number, payload: any): Promise<{ message: string }> => {
        const token = localStorage.getItem('enotime_token');
        const response = await fetch(`${API_URL}/api/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to update employee');
        return data;
    }
};