'use client';

import { Transaction } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { TrendingUp, DollarSign, AlertTriangle, Shield } from 'lucide-react';

interface TransactionStatsProps {
  transactions: Transaction[];
}

export default function TransactionStats({ transactions }: TransactionStatsProps) {
  const totalAmount = transactions.reduce((sum, t) => sum + (t.metadata?.amount || 0), 0);
  const fraudulentTransactions = transactions.filter(t => t.metadata?.is_fraudulent);
  const fraudAmount = fraudulentTransactions.reduce((sum, t) => sum + (t.metadata?.amount || 0), 0);
  const avgFraudScore = transactions.reduce((sum, t) => sum + (t.metadata?.fraud_score || 0), 0) / (transactions.length || 1);

  const stats = [
    {
      label: 'Total Transactions',
      value: formatNumber(transactions.length),
      icon: TrendingUp,
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500'
    },
    {
      label: 'Total Amount',
      value: formatCurrency(totalAmount),
      icon: DollarSign,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500'
    },
    {
      label: 'Fraud Detected',
      value: formatNumber(fraudulentTransactions.length),
      icon: AlertTriangle,
      color: 'from-red-500/20 to-red-600/20',
      iconColor: 'text-red-500'
    },
    {
      label: 'Avg Risk Score',
      value: `${(avgFraudScore * 100).toFixed(1)}%`,
      icon: Shield,
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500'
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