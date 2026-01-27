# AI Log Intelligence System

**AI Log Intelligence System** is a comprehensive solution designed to ingest, analyze, and visualize system logs using advanced AI & Machine Learning. It provides real-time insights, anomaly detection, and a modern dashboard for log management.

**[🚀 View Live Demo](https://ai-log-intelligence-frontend.vercel.app/)**

The system consists of three main components:
1. **Frontend**: A React-based dashboard for visualization and management.
2. **Intelligence Backend**: A Node.js API for handling data, auth, and real-time events.
3. **ML Service**: A Python-based service for AI inference and log analysis.

---

# AI Log Frontend

## 📱 Project Overview
**AI Log Frontend** is a modern, responsive single-page application built with **React** and **Vite**. It serves as the user interface for the AI Log system, providing a dashboard for managing projects, viewing system logs, and configuring AI settings. The application features a clean, block-based UI design with real-time updates.

## 🛠 Tech Stack
- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: Context API / Recoil
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Networking**: [Axios](https://axios-http.com/), [Socket.io-client](https://socket.io/)
- **Authentication**: Google OAuth (`@react-oauth/google`)

## 🏗 Architecture
The project follows a standard React folder structure:
- **`src/components`**: Reusable UI components.
- **`src/dashboard`**: Dashboard-specific views and layouts.
- **`src/layout`**: Main layout wrappers (Sidebar, Headers).
- **`src/pages`**: Page-level components for routing (Projects, Settings, etc.).
- **`src/assets`**: Static assets like images and styles.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- NPM or Yarn

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd ai-log-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production
Create an optimized production build:
```bash
npm run build
```
Preview the build locally:
```bash
npm run preview
```

## 🔑 Key Features
- **Dashboard**: Visual overview of system status and logs.
- **Real-time Logs**: Live updates of system events using Socket.io.
- **Project Management**: Create and manage AI projects.
- **Authentication**: Secure login via Google OAuth.
- **Responsive Design**: Optimized for desktop and mobile devices.

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
