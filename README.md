# Currency Exchange Simulator

A fullstack application built with **NestJS** (backend) and **Next.js + TailwindCSS** (frontend) that fetches the current EUR to PLN exchange rate from a dummy API and simulates a currency exchange transaction.

## Tech Stack

- **Frontend:** Next.js 14, React, TailwindCSS
- **Backend:** NestJS, Axios, CacheManager
- **Testing:** Jest
- **API Provider:** Dummy Exchange API (secured with API key)

## 📦 Project Structure

currency-exchange-app/
├── backend/ # NestJS app (port 3001)
│ └── src/
│ ├── exchange/ # Business logic & endpoints
│ └── app.module.ts # Main module
├── frontend/ # Next.js app (port 3000)
│ └── pages/
│ └── index.tsx # UI for rate display + transaction form

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/currency-exchange-app.git
cd currency-exchange-app
```

### 2. Start the Backend (NestJS)

```bash
cd currency-exchange-backend
npm install
npm run start:dev
```

### 3. Start the Frontend (Next.js)

```bash
cd currency-exchange-frontend
npm install
npm run dev
```

### 4. Running Tests

```bash
cd backend
npm run test
```
