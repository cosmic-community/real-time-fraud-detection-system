'use client';

import { FraudAlert } from '@/types';
import { getStatusColor, getStatusBgColor, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface AlertPanelProps {
  alerts: FraudAlert[];
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Alerts</h3>
        <p className="text-gray-400 text-center py-8">No active alerts</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Alerts</h3>
        <span className="text-sm text-gray-400">{alerts.length} Active</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]',
              getStatusBgColor(alert.metadata?.severity?.value || ''),
              alert.metadata?.status?.value === 'Active' && 'animate-pulse-slow'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                <AlertTriangle className={cn('w-4 h-4 mt-0.5', getStatusColor(alert.metadata?.severity?.value || ''))} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {alert.metadata?.alert_id}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(alert.metadata?.alert_timestamp || ''), 'MMM d, HH:mm')}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={cn(
                      'px-2 py-0.5 text-xs rounded-full',
                      getStatusBgColor(alert.metadata?.severity?.value || ''),
                      getStatusColor(alert.metadata?.severity?.value || '')
                    )}>
                      {alert.metadata?.severity?.value}
                    </span>
                    <span className={cn(
                      'px-2 py-0.5 text-xs rounded-full',
                      getStatusBgColor(alert.metadata?.status?.value || ''),
                      getStatusColor(alert.metadata?.status?.value || '')
                    )}>
                      {alert.metadata?.status?.value}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}