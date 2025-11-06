'use client';

import { FraudAlert } from '@/types';
import { formatNumber } from '@/lib/utils';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AlertStatsProps {
  alerts: FraudAlert[];
}

export default function AlertStats({ alerts }: AlertStatsProps) {
  const activeAlerts = alerts.filter(a => a.metadata?.status?.value === 'Active');
  const investigatingAlerts = alerts.filter(a => a.metadata?.status?.value === 'Investigating');
  const resolvedAlerts = alerts.filter(a => a.metadata?.status?.value === 'Resolved');
  const falsePositives = alerts.filter(a => a.metadata?.status?.value === 'False Positive');

  const stats = [
    {
      label: 'Active Alerts',
      value: formatNumber(activeAlerts.length),
      icon: AlertTriangle,
      color: 'from-red-500/20 to-red-600/20',
      iconColor: 'text-red-500'
    },
    {
      label: 'Investigating',
      value: formatNumber(investigatingAlerts.length),
      icon: Clock,
      color: 'from-yellow-500/20 to-yellow-600/20',
      iconColor: 'text-yellow-500'
    },
    {
      label: 'Resolved',
      value: formatNumber(resolvedAlerts.length),
      icon: CheckCircle,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500'
    },
    {
      label: 'False Positives',
      value: formatNumber(falsePositives.length),
      icon: XCircle,
      color: 'from-gray-500/20 to-gray-600/20',
      iconColor: 'text-gray-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-6 bg-gradient-to-br ${stat.color} border border-gray-800/50 backdrop-blur-sm`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg bg-dark-200/50 ${stat.iconColor}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}