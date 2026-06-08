// src/modules/Dashboard/presentation/components/VacationChart/VacationChart.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'; // Para el gradiente de color
import { HiOutlineArrowsPointingIn, HiOutlineArrowsPointingOut, HiOutlineInformationCircle } from 'react-icons/hi2';
interface VacationChartProps {
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

export const VacationChart: React.FC<VacationChartProps> = ({ isExpanded = false, onToggleExpand }) => {
    // Configuración exacta de ECharts para igualar el Mockup
    const chartOptions = {
        grid: { top: 40, right: 10, bottom: 20, left: 30 },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#8a8a8b', fontSize: 10, margin: 15 }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 20,
            interval: 5,
            splitLine: { lineStyle: { color: '#f0f0f0' } }, // Líneas horizontales suaves
            axisLabel: { color: '#8a8a8b', fontSize: 10 }
        },
        series: [{
            data: [4, 8, 7.5, 7, 8, 10, 12, 13, 12, 16, 15, 15.5], // Datos simulados
            type: 'line',
            smooth: false, // Líneas rectas como en el mockup
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: '#7209b6' }, // Color primary
            lineStyle: { color: '#7209b6', width: 2 },
            areaStyle: {
                // Gradiente para el área debajo de la línea
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(114, 9, 182, 0.25)' },
                    { offset: 1, color: 'rgba(114, 9, 182, 0.02)' }
                ])
            }
        }]
    };

    return (
        <section className={`dashboard__chart-section ${isExpanded ? 'dashboard__chart-section--expanded' : ''}`}>
            <div className="dashboard__chart-card">

                <div className="dashboard__chart-header">
                    <h2 className="dashboard__chart-title">Annual Vacation Usage</h2>
                    <div className="dashboard__chart-actions">
                        <select className="dashboard__chart-select">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                        <button onClick={onToggleExpand} className="dashboard__chart-expand-btn">
                            {isExpanded ? <HiOutlineArrowsPointingIn /> : <HiOutlineArrowsPointingOut />}
                        </button>
                    </div>
                </div>

                <div className="dashboard__chart-legend">
                    <span className="dashboard__chart-legend-line"></span>
                    <span className="dashboard__chart-legend-text">Days used</span>
                </div>

                <ReactECharts
                    option={chartOptions}
                    style={{ height: isExpanded ? '100%' : '240px', width: '100%', flex: isExpanded ? 1 : 'none' }}
                    opts={{ renderer: 'svg' }}
                />

                <div className="dashboard__chart-footer">
                    <HiOutlineInformationCircle className="dashboard__chart-footer-icon" />
                    <p className="dashboard__chart-footer-text">
                        Annual usage is calculated based on the total available business days.
                    </p>
                </div>
            </div>
        </section>
    );
};