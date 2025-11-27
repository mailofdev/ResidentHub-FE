# ResidentHub Frontend

A production-grade, framework-style React application for society management built with modern technologies.

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **Supabase Auth** - Authentication service
- **Firebase Storage** - File storage
- **PWA** - Progressive Web App support

## 📁 Project Structure

```
src/
├── api/              # API client and interceptors
├── components/       # Reusable UI components
│   ├── common/      # Common components (Button, Input, Modal, etc.)
│   └── modules/     # Module-specific components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
│   ├── auth/       # Authentication pages
│   ├── dashboard/  # Dashboard page
│   ├── society/    # Society management
│   ├── residents/  # Resident management
│   ├── maintenance/# Maintenance & payments
│   ├── complaints/ # Complaints management
│   ├── notices/    # Notice board
│   ├── profile/    # User profile
│   └── audit/      # Audit logs
├── router/          # Routing configuration
├── services/        # External service integrations
├── store/           # Zustand stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and Firebase credentials.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Authentication

The app supports two authentication methods:
- **Email/Password** - Traditional email-based login
- **Phone/OTP** - OTP-based phone authentication

User roles:
- **ADMIN** - Full access to all features
- **RESIDENT** - Limited access to resident features

## 🎨 Features

### ✅ Implemented

- [x] Complete folder structure
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Authentication system (Login/Signup)
- [x] Role-based access control (RBAC)
- [x] Protected routes
- [x] Zustand state management
- [x] API layer with Axios interceptors
- [x] Common UI components
- [x] Dark/Light mode
- [x] Responsive navigation (Navbar, Sidebar, BottomNav)
- [x] PWA support
- [x] Error boundary
- [x] Loading states
- [x] Module placeholders

### 🚧 Module Placeholders

All modules are scaffolded with:
- Page components
- Route definitions
- Empty state components
- Service file structure

Ready for implementation:
- Dashboard
- Society Management
- Resident Management
- Maintenance & Payments
- Complaints
- Notice Board
- Profile
- Audit Log

## 📱 PWA Features

- Service worker for offline support
- Install prompt
- Manifest configuration
- IndexedDB caching utility

## 🎯 Path Aliases

The project uses path aliases for cleaner imports:

```typescript
@components  → src/components
@pages       → src/pages
@api         → src/api
@store       → src/store
@hooks       → src/hooks
@utils       → src/utils
@services    → src/services
@config      → src/config
@layouts     → src/layouts
@router      → src/router
@types       → src/types
```

## 🔧 Development

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Type checking:** `npm run build` (includes TypeScript check)

## 📦 Deployment

The project is ready for deployment on Vercel:

1. Push to your repository
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 📝 License

MIT
