'use client';

import { Transaction, isUser, isMerchant } from '@/types';
import { MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrency } from '@/lib/utils';

// Fix for default markers
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface FraudMapProps {
  transactions: Transaction[];
}

export default function FraudMap({ transactions }: FraudMapProps) {
  // Filter transactions with location data
  const transactionsWithLocation = transactions.filter(t => 
    t.metadata?.user_location && t.metadata?.merchant_location
  );

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white">Transaction Locations</h3>
        <p className="text-sm text-gray-400 mt-1">
          Showing {transactionsWithLocation.length} transactions with location data
        </p>
      </div>

      <div className="h-[600px] rounded-xl overflow-hidden">
        <MapContainer
          center={[40.7128, -74.0060]} // Default to New York
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className="fraud-map"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {transactionsWithLocation.map((transaction) => {
            const userLocation = transaction.metadata?.user_location;
            const merchantLocation = transaction.metadata?.merchant_location;
            const isFraud = transaction.metadata?.is_fraudulent;
            const user = isUser(transaction.metadata?.user) ? transaction.metadata.user : null;
            const merchant = isMerchant(transaction.metadata?.merchant) ? transaction.metadata.merchant : null;

            if (!userLocation || !merchantLocation) return null;

            return (
              <div key={transaction.id}>
                {/* User location marker */}
                <CircleMarker
                  center={[userLocation.lat, userLocation.lng]}
                  radius={8}
                  fillColor="#3B82F6"
                  fillOpacity={0.8}
                  stroke={true}
                  color="#60A5FA"
                  weight={2}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{user?.metadata?.full_name || 'Unknown User'}</p>
                      <p className="text-gray-600">User Location</p>
                    </div>
                  </Popup>
                </CircleMarker>

                {/* Merchant location marker */}
                <CircleMarker
                  center={[merchantLocation.lat, merchantLocation.lng]}
                  radius={8}
                  fillColor="#10B981"
                  fillOpacity={0.8}
                  stroke={true}
                  color="#34D399"
                  weight={2}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{merchant?.metadata?.business_name || 'Unknown Merchant'}</p>
                      <p className="text-gray-600">Merchant Location</p>
                    </div>
                  </Popup>
                </CircleMarker>

                {/* Connection line */}
                <Polyline
                  positions={[
                    [userLocation.lat, userLocation.lng],
                    [merchantLocation.lat, merchantLocation.lng]
                  ]}
                  color={isFraud ? '#EF4444' : '#10B981'}
                  weight={isFraud ? 3 : 1}
                  opacity={isFraud ? 0.8 : 0.3}
                  dashArray={isFraud ? '10, 10' : undefined}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">Transaction {transaction.metadata?.transaction_id}</p>
                      <p>Amount: {formatCurrency(transaction.metadata?.amount || 0)}</p>
                      <p className={isFraud ? 'text-red-600' : 'text-green-600'}>
                        {isFraud ? 'Fraudulent' : 'Legitimate'}
                      </p>
                      <p>Risk Score: {((transaction.metadata?.fraud_score || 0) * 100).toFixed(0)}%</p>
                    </div>
                  </Popup>
                </Polyline>
              </div>
            );
          })}
        </MapContainer>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-400">User Location</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400">Merchant Location</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-0.5 bg-red-500"></div>
          <span className="text-gray-400">Fraudulent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-0.5 bg-green-500"></div>
          <span className="text-gray-400">Legitimate</span>
        </div>
      </div>
    </div>
  );
}