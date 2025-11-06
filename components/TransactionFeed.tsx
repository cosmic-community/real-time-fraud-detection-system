'use client';

import { Transaction, isUser, isMerchant } from '@/types';
import { formatCurrency, getRiskColor, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface TransactionFeedProps {
  transactions: Transaction[];
}

export default function TransactionFeed({ transactions }: TransactionFeedProps) {
  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Live Transaction Feed</h3>
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {transactions.map((transaction, index) => {
          const user = isUser(transaction.metadata?.user) ? transaction.metadata.user : null;
          const merchant = isMerchant(transaction.metadata?.merchant) ? transaction.metadata.merchant : null;
          const isF raud = transaction.metadata?.is_fraudulent;

          return (
            <div
              key={transaction.id}
              className={cn(
                'p-4 rounded-lg border transition-all duration-300 animate-fade-in',
                isF raud
                  ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                  : 'bg-dark-100/50 border-gray-800 hover:border-gray-700'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isF raud ? 'bg-red-500/10' : 'bg-green-500/10'
                  )}>
                    {isF raud ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-white">
                        {transaction.metadata?.transaction_id}
                      </p>
                      {isF raud && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full animate-pulse">
                          FRAUD
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {user?.metadata?.full_name || 'Unknown User'} → {merchant?.metadata?.business_name || 'Unknown Merchant'}
                    </p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{format(new Date(transaction.metadata?.timestamp || ''), 'HH:mm:ss')}</span>
                      </span>
                      <span>{transaction.metadata?.transaction_type?.value}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {formatCurrency(transaction.metadata?.amount || 0, transaction.metadata?.currency?.value)}
                  </p>
                  <p className={cn('text-sm mt-1', getRiskColor(transaction.metadata?.fraud_score || 0))}>
                    Risk: {((transaction.metadata?.fraud_score || 0) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}