import { useState, useEffect, useCallback } from 'react';
import { employeeGateway } from '../infrastructure/employeeGateway';
import type { Employee } from '../domain/employeeTypes';
import { toast } from 'sonner';

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchEmployees = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await employeeGateway.getAll();
            setEmployees(data);
        } catch (error: any) {
            toast.error('Error loading team data', { description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateEmployeeData = async (id: string | number, payload: any, onSuccess: () => void) => {
        setIsLoading(true);
        try {
            await employeeGateway.update(id, payload);
            toast.success('Employee updated successfully!');
            onSuccess();
            fetchEmployees();
        } catch (error: any) {
            toast.error('Update Error', { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return { employees, isLoading, refetchEmployees: fetchEmployees, updateEmployeeData };
};