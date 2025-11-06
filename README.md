# Real-Time Fraud Detection System

![Fraud Detection Dashboard](https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=300&fit=crop&auto=format,compress)

A professional-grade real-time credit card fraud detection system built with Next.js, TypeScript, and Cosmic CMS. Monitor transactions, detect fraud patterns, and manage alerts through an intuitive dark-themed dashboard.

## ✨ Features

- **Live Transaction Stream**: Real-time monitoring of credit card transactions
- **Fraud Detection**: ML-powered fraud probability scoring with explainable AI
- **Interactive Map**: Animated visualization of transaction locations
- **Alert Management**: Track and manage fraud alerts with severity levels
- **Performance Metrics**: Monitor model accuracy and performance
- **Dark Theme UI**: Professional security monitoring interface
- **Responsive Design**: Optimized for all device sizes

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690c1e58fb7423bbdde4b904&clone_repository=690c237cfb7423bbdde4b963)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Build a **real-time Credit Card Fraud Detection System** project that looks and behaves like a professional production system.
>
> **Requirements:**
>
> * **Backend:** Python (FastAPI) with LightGBM model for fraud prediction.
> * **Streaming Layer:** Kafka or simulated real-time transaction stream.
> * **Database:** PostgreSQL for storing transactions and fraud results.
> * **Frontend:** React.js with TailwindCSS and animated components using Framer Motion, Chart.js, or D3.js.
> * **Containerization:** Docker + Docker Compose setup for all services.
>
> **Features to include:**
>
> 1. **Live Transaction Stream:** Continuously show incoming transactions with animated scrolling.
> 2. **Fraud Detection Model:** Predict fraud probability using transaction data (amount, time, merchant, device, etc.).
> 3. **Fraud Probability Gauge:** Animated circular meter that updates with each new prediction.
> 4. **Fraud Map Animation:** Show user and merchant locations with animated lines highlighting fraudulent transactions in red.
> 5. **Real-Time Charts:** Animated line and bar charts displaying fraud trends, detection rates, and total alerts.
> 6. **Alert Animation:** Red pulse or blinking effect for detected fraudulent transactions.
> 7. **Model Explainability:** Display SHAP feature importance bars with fade-in animation for top influencing factors.
> 8. **APIs:**
>
>    * `/predict` → returns fraud probability.
>    * `/stream` → real-time feed endpoint for frontend updates.
>    * `/metrics` → model performance metrics for monitoring.
> 9. **Dashboard Design:**
>
>    * Dark theme interface.
>    * Live transaction feed section.
>    * Fraud probability gauge.
>    * Animated fraud statistics.
>    * Geolocation map animation.
> 10. **Data Generator:** Simulate streaming credit card transactions in Kafka topic or local script.
> 11. **Monitoring:** Optional Grafana/Prometheus integration for performance metrics.
> 12. **Deliverables:**
>
> * Full project folder structure (backend, frontend, stream, database).
> * Docker Compose file to run all services together.
> * Fully animated, real-time web dashboard accessible at `localhost:3000`.
>
> **Goal:**
> Create a visually appealing, animated, and fully functional real-time fraud detection system combining machine learning, data streaming, and interactive dashboard design.

### Code Generation Prompt

> Based on the content model I created for the fraud detection system, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Charts**: Recharts
- **Maps**: React Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with configured bucket
- Environment variables configured

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📡 Cosmic SDK Examples

### Fetching Transactions
```typescript
const { objects: transactions } = await cosmic.objects
  .find({ type: 'transactions' })
  .props(['title', 'metadata'])
  .depth(2)
```

### Fetching Fraud Alerts
```typescript
const { objects: alerts } = await cosmic.objects
  .find({ type: 'fraud-alerts' })
  .props(['title', 'metadata'])
  .depth(2)
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic CMS to manage:

- **Transactions**: Credit card transaction records with fraud scores
- **Users**: Customer profiles with risk assessments
- **Merchants**: Business information with risk levels
- **Fraud Alerts**: Alert tracking and management
- **Model Metrics**: ML model performance tracking

## 🚀 Deployment Options

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Configure environment variables in your deployment platform's dashboard.

---

Built with [Cosmic](https://www.cosmicjs.com/docs) - The API-first CMS
<!-- README_END -->