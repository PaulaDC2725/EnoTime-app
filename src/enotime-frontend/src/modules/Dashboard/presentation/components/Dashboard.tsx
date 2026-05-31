import React, { useState } from 'react';
import { Header } from '../../../../shared/presentation/components/Header';
import { BalanceCarousel } from './BalanceCarousel/BalanceCarousel';
import { VacationChart } from './VacationChart/VacationChart';
import { RecentRequests } from './RecentRequests/RecentRequests';
import { TeamOverview } from './TeamOverview/TeamOverview';

import '../styles/Dashboard.scss';

interface DashboardProps {
  isAdminView: boolean;
  setIsAdminView?: any;
}

// Definimos los posibles estados de expansión
type ExpandedWidget = 'none' | 'chart' | 'requests';

export const Dashboard: React.FC<DashboardProps> = ({ isAdminView }) => {
  const [expandedWidget, setExpandedWidget] = useState<ExpandedWidget>('none');

  // Funciones para alternar estados
  const toggleChartExpand = () => setExpandedWidget(prev => prev === 'chart' ? 'none' : 'chart');
  const toggleRequestsExpand = () => setExpandedWidget(prev => prev === 'requests' ? 'none' : 'requests');

  return (
    <section className={`dashboard ${expandedWidget !== 'none' ? 'dashboard--expanded-view' : ''}`}>

      {/* El Header siempre se mantiene visible para dar contexto */}
      <Header
        title="Hello, Paula!"
        subtitle="Here is a summary of your information and request"
      />

      {/* Ocultamos los saldos si ALGO está expandido */}
      {expandedWidget === 'none' && (
        isAdminView ? <TeamOverview /> : <BalanceCarousel />
      )}

      {/* Mostramos la gráfica si no hay nada expandido, o si ELLA es la expandida */}
      {(expandedWidget === 'none' || expandedWidget === 'chart') && (
        <VacationChart
          isExpanded={expandedWidget === 'chart'}
          onToggleExpand={toggleChartExpand}
        />
      )}

      {/* Mostramos la tabla si no hay nada expandido, o si ELLA es la expandida */}
      {(expandedWidget === 'none' || expandedWidget === 'requests') && (
        <RecentRequests
          isExpanded={expandedWidget === 'requests'}
          onToggleExpand={toggleRequestsExpand}
        />
      )}

    </section>
  );
};