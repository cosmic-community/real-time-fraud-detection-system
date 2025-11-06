import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fraud Detection System',
  description: 'Real-time credit card fraud detection and monitoring dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en" className="dark">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={`${inter.className} bg-dark-300 text-gray-100`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto custom-scrollbar">
              {children}
            </main>
          </div>
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}