import { createBucketClient } from '@cosmicjs/sdk';
import { 
  Transaction, 
  FraudAlert, 
  User, 
  Merchant, 
  ModelMetrics,
  hasStatus 
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Fetch all transactions
export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'transactions' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(2);
    
    // Sort by timestamp manually
    const transactions = (response.objects as Transaction[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.timestamp || '').getTime();
      const dateB = new Date(b.metadata?.timestamp || '').getTime();
      return dateB - dateA;
    });
    
    return transactions;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching transactions:', error);
    return [];
  }
}

// Fetch fraud alerts
export async function getFraudAlerts(): Promise<FraudAlert[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'fraud-alerts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(2);
    
    // Sort by alert timestamp manually
    const alerts = (response.objects as FraudAlert[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.alert_timestamp || '').getTime();
      const dateB = new Date(b.metadata?.alert_timestamp || '').getTime();
      return dateB - dateA;
    });
    
    return alerts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching fraud alerts:', error);
    return [];
  }
}

// Fetch users
export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'slug', 'title', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as User[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching users:', error);
    return [];
  }
}

// Fetch merchants
export async function getMerchants(): Promise<Merchant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'merchants' })
      .props(['id', 'slug', 'title', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as Merchant[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching merchants:', error);
    return [];
  }
}

// Fetch model metrics
export async function getModelMetrics(): Promise<ModelMetrics | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'model-metrics' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const metrics = response.objects as ModelMetrics[];
    
    if (metrics.length === 0) {
      return null;
    }
    
    // Sort by timestamp and return the latest
    const sortedMetrics = metrics.sort((a, b) => {
      const dateA = new Date(a.metadata?.timestamp || '').getTime();
      const dateB = new Date(b.metadata?.timestamp || '').getTime();
      return dateB - dateA;
    });
    
    return sortedMetrics[0] || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching model metrics:', error);
    return null;
  }
}

// Calculate dashboard stats
export async function getDashboardStats() {
  const [transactions, alerts, modelMetrics] = await Promise.all([
    getTransactions(),
    getFraudAlerts(),
    getModelMetrics()
  ]);
  
  const totalTransactions = transactions.length;
  const fraudulentTransactions = transactions.filter(t => t.metadata?.is_fraudulent).length;
  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.metadata?.status?.value === 'Active').length;
  
  const fraudRate = totalTransactions > 0 
    ? (fraudulentTransactions / totalTransactions) * 100 
    : 0;
  
  const totalAmount = transactions.reduce((sum, t) => sum + (t.metadata?.amount || 0), 0);
  
  return {
    totalTransactions,
    fraudulentTransactions,
    totalAlerts,
    activeAlerts,
    fraudRate,
    totalAmount,
    modelAccuracy: modelMetrics?.metadata?.accuracy || 0,
    modelPrecision: modelMetrics?.metadata?.precision || 0,
    modelRecall: modelMetrics?.metadata?.recall || 0,
    modelF1Score: modelMetrics?.metadata?.f1_score || 0
  };
}