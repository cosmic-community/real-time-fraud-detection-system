// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  published_at?: string;
  status?: string;
  thumbnail?: string;
}

// User type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name: string;
    email: string;
    card_number_masked: string;
    account_created: string;
    risk_score?: {
      key: string;
      value: 'Low' | 'Medium' | 'High';
    };
    verification_status?: {
      key: string;
      value: 'Verified' | 'Pending' | 'Unverified';
    };
    device_fingerprints?: string[];
    home_location?: {
      lat: number;
      lng: number;
      city?: string;
    };
  };
}

// Merchant type
export interface Merchant extends CosmicObject {
  type: 'merchants';
  metadata: {
    business_name: string;
    category?: {
      key: string;
      value: 'Retail' | 'Grocery' | 'Restaurant' | 'Gas Station' | 'Online Services' | 'Entertainment';
    };
    risk_level?: {
      key: string;
      value: 'Low' | 'Medium' | 'High';
    };
    location?: {
      lat: number;
      lng: number;
      city?: string;
      address?: string;
    };
    monthly_volume?: number;
  };
}

// Transaction type
export interface Transaction extends CosmicObject {
  type: 'transactions';
  metadata: {
    transaction_id: string;
    amount: number;
    currency?: {
      key: string;
      value: 'USD' | 'EUR' | 'GBP';
    };
    timestamp: string;
    user?: User | string;
    merchant?: Merchant | string;
    transaction_type?: {
      key: string;
      value: 'Online' | 'Point of Sale' | 'ATM' | 'Transfer';
    };
    device_ip?: string;
    user_location?: {
      lat: number;
      lng: number;
    };
    merchant_location?: {
      lat: number;
      lng: number;
    };
    fraud_score: number;
    is_fraudulent: boolean;
    feature_importance?: Record<string, number>;
  };
}

// Fraud Alert type
export interface FraudAlert extends CosmicObject {
  type: 'fraud-alerts';
  metadata: {
    alert_id: string;
    severity?: {
      key: string;
      value: 'Critical' | 'High' | 'Medium' | 'Low';
    };
    transaction?: Transaction | string;
    alert_timestamp: string;
    status?: {
      key: string;
      value: 'Active' | 'Investigating' | 'Resolved' | 'False Positive';
    };
    action_taken?: string;
    resolution_notes?: string;
  };
}

// Model Metrics type
export interface ModelMetrics extends CosmicObject {
  type: 'model-metrics';
  metadata: {
    model_version: string;
    timestamp: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    feature_importance?: Record<string, number>;
    total_predictions: number;
    true_positives: number;
    false_positives: number;
  };
}

// Type guard functions
export function isUser(obj: CosmicObject | User | string): obj is User {
  return typeof obj === 'object' && 'type' in obj && obj.type === 'users';
}

export function isMerchant(obj: CosmicObject | Merchant | string): obj is Merchant {
  return typeof obj === 'object' && 'type' in obj && obj.type === 'merchants';
}

export function isTransaction(obj: CosmicObject): obj is Transaction {
  return obj.type === 'transactions';
}

export function isFraudAlert(obj: CosmicObject): obj is FraudAlert {
  return obj.type === 'fraud-alerts';
}

export function isModelMetrics(obj: CosmicObject): obj is ModelMetrics {
  return obj.type === 'model-metrics';
}

// Helper for Cosmic SDK errors
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}