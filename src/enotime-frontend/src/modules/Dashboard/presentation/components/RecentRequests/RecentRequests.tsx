// src/modules/dashboard/presentation/components/RecentRequests/RecentRequests.tsx
import React from "react";
import { HiOutlineArrowRight, HiOutlineArrowsPointingIn } from 'react-icons/hi2';
import { TableShared, type TableColumn } from '../../../../../shared/presentation/components/TableShared/TableShared';

interface RequestData {
    id: number;
    date: string;
    type: string;
    period: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    days: number;
}

const recentRequests: RequestData[] = [
    { id: 1, date: '06/03/2026', type: 'Vacation', period: '06/10/2026 - 06/14/2026', status: 'Pending', days: 5 },
    { id: 2, date: '05/28/2026', type: 'Compensatory', period: '07/05/2026', status: 'Approved', days: 2 },
    { id: 3, date: '05/20/2026', type: 'Vacation', period: '07/01/2026 - 07/03/2026', status: 'Rejected', days: 3 },
    { id: 4, date: '05/15/2026', type: 'Overtime', period: '05/14/2026', status: 'Pending', days: 1 },
    { id: 5, date: '05/10/2026', type: 'Vacation', period: '08/01/2026 - 08/15/2026', status: 'Approved', days: 10 },
];

interface RecentRequestsProps {
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

export const RecentRequests: React.FC<RecentRequestsProps> = ({ isExpanded = false, onToggleExpand }) => {
    
    // Fixed widths mapped to sum exactly the 600px minimum width of the table
    const baseColumns: TableColumn<RequestData>[] = [
        { key: 'date', title: 'Date', sortable: true, width: 20 }, 
        { key: 'type', title: 'Type', sortable: true, filterable: true, width: 20 }, 
        { key: 'period', title: 'Period', width: 20 }, 
        {
            key: 'status',
            width: 20, 
            title: 'Status',
            sortable: true,
            filterable: true,
            render: (row) => (
                <span className={`dashboard__status dashboard__status--${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
        },
        { key: 'days', title: 'Days', align: 'center', sortable: true, width: 5 }
    ];

    const displayedData = isExpanded ? recentRequests : recentRequests.slice(0, 3);

    const displayedColumns = baseColumns.map((col) => ({
        ...col,
        sortable: isExpanded ? col.sortable : false,
        filterable: isExpanded ? col.filterable : false,
        width: col.width
    }));

    return (
        <section className={`dashboard__requests ${isExpanded ? 'dashboard__requests--expanded' : ''}`}>
            <div className="dashboard__requests-card">
                <div className="dashboard__requests-header">
                    <h2 className="dashboard__section-title">Recent Requests</h2>

                    <button onClick={onToggleExpand} className="dashboard__requests-link-btn">
                        {isExpanded ? (
                            <>Return <HiOutlineArrowsPointingIn /></>
                        ) : (
                            <>View all requests <HiOutlineArrowRight /></>
                        )}
                    </button>
                </div>

                <TableShared<RequestData>
                    data={displayedData}
                    columns={displayedColumns}
                    rowKey={(item) => item.id}
                />
            </div>
        </section>
    );
};