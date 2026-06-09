export interface Employee {
    employee_id: string | number;
    full_name: string;
    email: string;
    position_title: string;
    role_name: string;
    hire_date: string;
    manager_id?: string | number | null;
    created_at: string;
}