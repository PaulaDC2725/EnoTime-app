// src/shared/presentation/components/TableShared/TableShared.tsx
import React, { useState, useMemo } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineFunnel } from 'react-icons/hi2';
import '../../styles/_tableShared.scss';

export interface TableColumn<T> {
    key: Extract<keyof T, string>;
    title: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: number | string;
}

interface TableSharedProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    rowKey: (item: T) => string | number;
}

export function TableShared<T>({ data, columns, rowKey }: TableSharedProps<T>) {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [activeFilterKey, setActiveFilterKey] = useState<string | null>(null);

    // Parses the width to pixel string if it's a number
    const getColumnWidthStyle = (width?: number | string) => {
        if (width === undefined) return undefined;
        return { width: typeof width === 'number' ? `${width}px` : width };
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const processedData = useMemo(() => {
        let result = [...data];

        Object.keys(filters).forEach((key) => {
            const filterValue = filters[key].toLowerCase();
            if (filterValue) {
                result = result.filter((item) => {
                    const itemValue = String(item[key as keyof T] || '').toLowerCase();
                    return itemValue.includes(filterValue);
                });
            }
        });

        if (sortConfig !== null) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof T];
                const bValue = b[sortConfig.key as keyof T];

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, sortConfig, filters]);

    return (
        <div className="eno-table__wrapper">
            <table className="eno-table">
                {/* Colgroup setup for structural integrity */}
                <colgroup>
                    {columns.map((col) => (
                        <col key={col.key} style={getColumnWidthStyle(col.width)} />
                    ))}
                </colgroup>

                <thead className="eno-table__thead">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`eno-table__th eno-table__th--${col.align || 'left'}`}
                                /* Adding the style directly to the <th> enforces the width on stubborn browsers */
                                style={getColumnWidthStyle(col.width)} 
                            >
                                <div className="eno-table__th-header">
                                    <div
                                        className={`eno-table__th-title ${col.sortable ? 'eno-table__th-title--sortable' : ''}`}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                    >
                                        {col.title}
                                        {col.sortable && sortConfig?.key === col.key && (
                                            sortConfig.direction === 'asc' ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />
                                        )}
                                    </div>

                                    {col.filterable && (
                                        <button
                                            className={`eno-table__filter-btn ${filters[col.key] ? 'eno-table__filter-btn--active' : ''}`}
                                            onClick={() => setActiveFilterKey(activeFilterKey === col.key ? null : col.key)}
                                        >
                                            <HiOutlineFunnel />
                                        </button>
                                    )}
                                </div>

                                {col.filterable && activeFilterKey === col.key && (
                                    <div className="eno-table__filter-box">
                                        <input
                                            type="text"
                                            className="eno-table__filter-input"
                                            placeholder="Search..."
                                            value={filters[col.key] || ''}
                                            onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                        />
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="eno-table__tbody">
                    {processedData.length > 0 ? (
                        processedData.map((item) => (
                            <tr key={rowKey(item)} className="eno-table__tr">
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`eno-table__td eno-table__td--${col.align || 'left'}`}
                                    >
                                        {col.render ? col.render(item) : String(item[col.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="eno-table__td eno-table__td--empty">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}