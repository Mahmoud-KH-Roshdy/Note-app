# 📝 Notes App

> A full-stack notes application built to practice modern React patterns and real-time data sync — featuring secure authentication, bilingual support, and a responsive mobile-first UI.

You can sign up, switch seamlessly between **English** and **Egyptian Arabic**, write notes, edit them, delete them, and everything stays in sync with Firestore.

🔗 **Live Demo:** [note-app-tau-opal.vercel.app](https://note-app-tau-opal.vercel.app)

## ✨ Features

* 🌍 **Bilingual & i18n Ready** — Full support for English and Egyptian Arabic (UI, toasts, and validation messages) via `react-i18next`.

* 🔐 **Full Auth Flow** — Secure sign up, login, logout, and account deletion (linked with Firestore cleanup to remove user data).

* ⚡ **Real-time CRUD** — Create, read, update, and delete notes, seamlessly synced with Firestore.

* 🔗 **URL-Driven State** — Each note has its own URL (`/note/:id`), making it bookmarkable and refresh-proof.

* ⌨️ **Keyboard Shortcuts** — Press `CTRL` to quickly save notes for smooth UX.

* 📱 **Responsive Mobile Layout** — Designed like a native app where the notes list and editor take turns on mobile screens.

* 🔔 **Polished UX** — Global toast notifications (`react-hot-toast`) and clean empty states for all actions and errors.

## 🛠 Tech Stack

| Category | Technology | 
| ----- | ----- | 
| **Frontend Framework** | React 19 + TypeScript | 
| **Routing** | React Router v7 | 
| **Data Fetching & State** | TanStack Query (React Query v5) | 
| **Form Handling** | React Hook Form | 
| **Styling** | Tailwind CSS | 
| **Backend & Auth** | Firebase (Auth & Firestore) | 
| **Internationalization** | react-i18next | 
| **UI Feedback** | react-hot-toast | 

## 📐 Architecture

The codebase is strictly organized by **feature** for better maintainability and code structure:

```
src/
├── features/
│   ├── auth/       # Auth-related hooks, services, and components
│   ├── note/       # Note CRUD hooks, services, and components
│   └── setting/    # Settings components and i18n preferences
├── components/     # Shared, reusable UI (ConfirmDeleteModal, FormError, etc.)
├── pages/          # Route-level pages
└── services/       # Firebase configuration & global services

```

## 🚀 Getting Started & Deployment

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Mahmoud-KH-Roshdy/Note-app.git
   cd Note-app
   
   ```

2. **Install dependencies:**

   ```
   npm install
   
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of your project based on your Firebase project credentials.

   > ⚠️ **Note:** Never commit your actual API keys to version control. Use the format below:

   ```
   VITE_FIREBASE_API_KEY="your_firebase_api_key_here"
   VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_project_id.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   VITE_FIREBASE_MEASUREMENT_ID="your_measurement_id"
   
   ```

4. **Run the development server:**

   ```
   npm run dev
   
   ```

### 🌐 Deployment on Vercel

The app is configured to be easily deployed on **Vercel**.
When deploying your own clone to Vercel, make sure to add all the corresponding Environment Variables (`VITE_FIREBASE_*`) in your Vercel Project Settings under **Environment Variables** so the build and Firebase connection work correctly.

## 💡 Engineering Insights & Key Learnings

> 💡 **Race Condition Fix:** Spent time debugging a race condition between a form and a query that wasn't done loading yet — turns out the fix wasn't `reset()`, it was conditional rendering until the data was ready.
>
> 💡 **URL as Single Source of Truth:** Switched from storing "the active note" in Context to reading it straight from the URL parameter. This made notes refresh-proof, shareable, and greatly reduced state sync bugs.
>
> 💡 **Internationalization Architecture:** Built a clean `i18n` abstraction handling RTL/LTR layout shifts and dynamic error translation for Firebase auth codes.

## 📌 Roadmap

* \[ \] Search & Filtering
