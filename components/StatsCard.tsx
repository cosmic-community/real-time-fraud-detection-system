'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

export default function StatsCard({ title, value, icon, trend, color = 'primary' }: StatsCardProps) {
  const isPositiveTrend = trend && trend > 0;

  const colorClasses = {
    primary: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
    secondary: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
    danger: 'from-red-500/10 to-red-600/10 border-red-500/20',
    success: 'from-green-500/10 to-green-600/10 border-green-500/20',
    warning: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20',
  };

  const iconColorClasses = {
    primary: 'text-blue-500',
    secondary: 'text-purple-500',
    danger: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl p-6 bg-gradient-to-br border backdrop-blur-sm',
      colorClasses[color],
      'card-hover'
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {trend && (
            <div className="flex items-center space-x-1">
              {isPositiveTrend ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                'text-sm font-medium',
                isPositiveTrend ? 'text-green-500' : 'text-red-500'
              )}>
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg bg-dark-200/50', iconColorClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}