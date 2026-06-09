import React, { useState } from 'react';
import { Header } from '../../../../shared/presentation/components/Header';
import { BalanceCarousel } from './BalanceCarousel/BalanceCarousel';
import { VacationChart } from './VacationChart/VacationChart';
import { RecentRequests } from './RecentRequests/RecentRequests';
import { TeamOverview } from './TeamOverview/TeamOverview';
import type { User } from '../../../../modules/auth/domain/authTypes';
import '../styles/Dashboard.scss';

interface DashboardProps {
  isAdminView: boolean;
  setIsAdminView?: any;
  currentUser?: User | null;
}

type ExpandedWidget = 'none' | 'chart' | 'requests';

export const Dashboard: React.FC<DashboardProps> = ({ isAdminView, currentUser }) => {
  const [expandedWidget, setExpandedWidget] = useState<ExpandedWidget>('none');
  const displayName = currentUser?.fullName || currentUser?.email?.split('@')[0] || 'there';

  const toggleChartExpand = () => setExpandedWidget(prev => prev === 'chart' ? 'none' : 'chart');
  const toggleRequestsExpand = () => setExpandedWidget(prev => prev === 'requests' ? 'none' : 'requests');

  return (
    <section className={`dashboard ${expandedWidget !== 'none' ? 'dashboard--expanded-view' : ''}`}>
      <Header
        title={`Hello, ${displayName}!`}
        subtitle="Here is a summary of your information and request"
      />

      {expandedWidget === 'none' && (
        isAdminView ? <TeamOverview /> : <BalanceCarousel />
      )}

      <div className="dashboard__content-grid">
        {(expandedWidget === 'none' || expandedWidget === 'chart') && (
          <VacationChart
            isExpanded={expandedWidget === 'chart'}
            onToggleExpand={toggleChartExpand}
          />
        )}

        {(expandedWidget === 'none' || expandedWidget === 'requests') && (
          <RecentRequests
            isExpanded={expandedWidget === 'requests'}
            onToggleExpand={toggleRequestsExpand}
          />
        )}
      </div>
    </section>
  );
};      