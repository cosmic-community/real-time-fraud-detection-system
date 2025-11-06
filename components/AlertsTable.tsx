'use client';

import { FraudAlert, isTransaction } from '@/types';
import { getStatusColor, getStatusBgColor, cn, formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface AlertsTableProps {
  alerts: FraudAlert[];
}

export default function AlertsTable({ alerts }: AlertsTableProps) {
  return (
    <div className="bg-dark-200 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white">Alert Management</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-100 border-b border-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Alert ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Alert Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action Taken
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {alerts.map((alert) => {
              const transaction = isTransaction(alert.metadata?.transaction as any) 
                ? alert.metadata.transaction as any
                : null;

              return (
                <tr key={alert.id} className="hover:bg-dark-100/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={cn('w-4 h-4', getStatusColor(alert.metadata?.severity?.value || ''))} />
                      <span className="text-sm font-medium text-gray-200">
                        {alert.metadata?.alert_id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 text-xs rounded-full',
                      getStatusBgColor(alert.metadata?.severity?.value || ''),
                      getStatusColor(alert.metadata?.severity?.value || '')
                    )}>
                      {alert.metadata?.severity?.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {transaction?.metadata?.transaction_id || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white">
                      {transaction ? formatCurrency(transaction.metadata?.amount || 0) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 text-xs rounded-full',
                      getStatusBgColor(alert.metadata?.status?.value || ''),
                      getStatusColor(alert.metadata?.status?.value || '')
                    )}>
                      {alert.metadata?.status?.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">
                      {format(new Date(alert.metadata?.alert_timestamp || ''), 'MMM d, yyyy HH:mm')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300 line-clamp-2">
                      {alert.metadata?.action_taken || 'No action taken'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary hover:text-primary-dark transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}