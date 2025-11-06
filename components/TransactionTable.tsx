'use client';

import { Transaction, isUser, isMerchant } from '@/types';
import { formatCurrency, getRiskColor, getRiskBgColor, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="bg-dark-200 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-white">Transaction History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-100 border-b border-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Merchant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {transactions.map((transaction) => {
              const user = isUser(transaction.metadata?.user) ? transaction.metadata.user : null;
              const merchant = isMerchant(transaction.metadata?.merchant) ? transaction.metadata.merchant : null;
              const isFraud = transaction.metadata?.is_fraudulent;

              return (
                <tr key={transaction.id} className="hover:bg-dark-100/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {isFraud ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm font-medium text-gray-200">
                        {transaction.metadata?.transaction_id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {user?.metadata?.full_name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {merchant?.metadata?.business_name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(transaction.metadata?.amount || 0, transaction.metadata?.currency?.value)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-dark-100 rounded-full h-2">
                        <div
                          className={cn('h-2 rounded-full', getRiskColor(transaction.metadata?.fraud_score || 0).replace('text-', 'bg-'))}
                          style={{ width: `${(transaction.metadata?.fraud_score || 0) * 100}%` }}
                        />
                      </div>
                      <span className={cn('text-sm', getRiskColor(transaction.metadata?.fraud_score || 0))}>
                        {((transaction.metadata?.fraud_score || 0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 text-xs rounded-full inline-flex items-center',
                      isFraud
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                    )}>
                      {isFraud ? 'Fraudulent' : 'Legitimate'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">
                      {format(new Date(transaction.metadata?.timestamp || ''), 'MMM d, yyyy')}
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