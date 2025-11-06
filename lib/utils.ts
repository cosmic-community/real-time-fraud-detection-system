import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'critical':
      return 'text-red-500';
    case 'high':
      return 'text-orange-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    case 'active':
      return 'text-red-500';
    case 'investigating':
      return 'text-yellow-500';
    case 'resolved':
      return 'text-green-500';
    case 'false positive':
      return 'text-gray-500';
    default:
      return 'text-gray-400';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/10 border-red-500/20';
    case 'high':
      return 'bg-orange-500/10 border-orange-500/20';
    case 'medium':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'low':
      return 'bg-green-500/10 border-green-500/20';
    case 'active':
      return 'bg-red-500/10 border-red-500/20';
    case 'investigating':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'resolved':
      return 'bg-green-500/10 border-green-500/20';
    case 'false positive':
      return 'bg-gray-500/10 border-gray-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
}

export function getRiskColor(score: number): string {
  if (score >= 0.8) return 'text-red-500';
  if (score >= 0.6) return 'text-orange-500';
  if (score >= 0.4) return 'text-yellow-500';
  return 'text-green-500';
}

export function getRiskBgColor(score: number): string {
  if (score >= 0.8) return 'bg-red-500/10 border-red-500/20';
  if (score >= 0.6) return 'bg-orange-500/10 border-orange-500/20';
  if (score >= 0.4) return 'bg-yellow-500/10 border-yellow-500/20';
  return 'bg-green-500/10 border-green-500/20';
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}