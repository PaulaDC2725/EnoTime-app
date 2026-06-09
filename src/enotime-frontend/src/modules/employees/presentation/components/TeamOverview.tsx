import React, { useState } from 'react';
import { useEmployees } from '../../application/useEmployees';
import type { Employee } from '../../domain/employeeTypes';
import { TableShared, type TableColumn } from '../../../../shared/presentation/components/TableShared/TableShared';
import { Register } from '../../../auth/presentation/components/Register';
import { EditEmployee } from './EditEmployee';
import { HiOutlinePlus, HiOutlineArrowLeft, HiOutlinePencilSquare } from 'react-icons/hi2';
import '../styles/teamOverview.scss';

export const TeamOverview: React.FC = () => {
    const { employees, isLoading, refetchEmployees } = useEmployees();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

    const columns: TableColumn<Employee>[] = [
        { key: 'full_name', title: 'Full Name', sortable: true, filterable: true },
        { key: 'email', title: 'Email address', sortable: true, filterable: true },
        { key: 'position_title', title: 'Position', sortable: true, filterable: true },
        { key: 'role_name', title: 'Role', sortable: true, filterable: true },
        { 
            key: 'hire_date', 
            title: 'Contract Start', 
            sortable: true,
            render: (item) => item.hire_date ? new Date(item.hire_date).toLocaleDateString() : 'N/A'
        },
        {
            key: 'employee_id' as any,
            title: 'Actions',
            align: 'center',
            render: (item) => (
                <button 
                    onClick={() => { setEmployeeToEdit(item); setIsRegistering(false); }}
                    style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: '4px' }}
                >
                    <HiOutlinePencilSquare size={18} />
                </button>
            )
        }
    ];

    const isShowingForm = isRegistering || employeeToEdit !== null;

    return (
        <div className="eno-team-overview">
            <div className="eno-team-overview__header">
                <div>
                    <h1 className="eno-team-overview__title">
                        {isRegistering ? 'Register New Employee' : employeeToEdit ? 'Edit Employee' : 'Team Overview'}
                    </h1>
                    <p className="eno-team-overview__subtitle">
                        {isShowingForm 
                            ? 'Update directory records and system permissions.' 
                            : 'Manage your team members and access levels.'}
                    </p>
                </div>
                
                <button 
                    className="btn-1 eno-team-overview__action-btn"
                    onClick={() => {
                        if (isShowingForm) { setIsRegistering(false); setEmployeeToEdit(null); } 
                        else { setIsRegistering(true); }
                    }}
                >
                    {isShowingForm ? <><HiOutlineArrowLeft /> Back to Directory</> : <><HiOutlinePlus /> Add Employee</>}
                </button>
            </div>

            <div className="eno-team-overview__content">
                {isRegistering ? (
                    <Register availableManagers={employees} onSuccessComplete={() => { setIsRegistering(false); refetchEmployees(); }} />
                ) : employeeToEdit ? (
                    <EditEmployee employee={employeeToEdit} availableManagers={employees} onCancel={() => { setEmployeeToEdit(null); refetchEmployees(); }} />
                ) : (
                    isLoading ? <div className="eno-team-overview__loading">Loading team data...</div> : <TableShared data={employees} columns={columns} rowKey={(item) => item.employee_id} />
                )}
            </div>
        </div>
    );
};