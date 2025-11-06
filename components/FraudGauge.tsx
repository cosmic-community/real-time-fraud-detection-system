'use client';

import { Transaction } from '@/types';
import { cn } from '@/lib/utils';

interface FraudGaugeProps {
  score: number;
  transaction?: Transaction | null;
}

export default function FraudGauge({ score, transaction }: FraudGaugeProps) {
  const percentage = Math.round(score * 100);
  const rotation = (score * 180) - 90;

  const getRiskLevel = () => {
    if (score >= 0.8) return 'CRITICAL';
    if (score >= 0.6) return 'HIGH';
    if (score >= 0.4) return 'MEDIUM';
    return 'LOW';
  };

  const getRiskColor = () => {
    if (score >= 0.8) return 'text-red-500';
    if (score >= 0.6) return 'text-orange-500';
    if (score >= 0.4) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white mb-6">Fraud Probability</h3>
      
      <div className="relative w-full aspect-square max-w-[250px] mx-auto mb-6">
        {/* Background arc */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-700"
            strokeDasharray={`${Math.PI * 40} ${Math.PI * 40}`}
            strokeDashoffset={Math.PI * 40 * 0.5}
          />
          {/* Animated progress arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * 40 * score} ${Math.PI * 80}`}
            strokeDashoffset={Math.PI * 40 * 0.5}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn('text-5xl font-bold', getRiskColor())}>
            {percentage}%
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {getRiskLevel()} RISK
          </div>
        </div>

        {/* Needle indicator */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-transparent to-white origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
            transition: 'transform 1s ease-out'
          }}
        />
      </div>

      {transaction && (
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Transaction ID</span>
            <span className="text-gray-200 font-medium">
              {transaction.metadata?.transaction_id}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="text-gray-200 font-medium">
              ${transaction.metadata?.amount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status</span>
            <span className={cn(
              'font-medium',
              transaction.metadata?.is_fraudulent ? 'text-red-500' : 'text-green-500'
            )}>
              {transaction.metadata?.is_fraudulent ? 'Fraudulent' : 'Legitimate'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}