# Cliniq Care360 - Frontend

React frontend for Cliniq Care360 healthcare management system, built with TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Modern UI**: Clean, professional interface with Tailwind CSS v4
- **Authentication**: Secure JWT-based authentication with refresh tokens
- **Role-Based Access**: Protected routes based on user roles
- **Responsive Design**: Works on desktop, tablet, and mobile
- **TypeScript**: Fully typed for better developer experience
- **Vite**: Fast development and build tool

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see server/README.md)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.sample` to `.env.local`:

   ```bash
   cp .env.sample .env.local
   ```

   Configure the API URL:

   ```
   VITE_API_URL=http://localhost:5000/api/v1
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and configurations
│   └── api.ts
├── pages/             # Page components
│   ├── Login.tsx
│   └── Dashboard.tsx
├── types/             # TypeScript type definitions
│   └── auth.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles (Tailwind v4)
```

## Key Features

### Authentication Flow

1. **Login**: User enters credentials
2. **Token Storage**: Access token stored in memory, refresh token in httpOnly cookie
3. **Auto Refresh**: Expired access tokens automatically refreshed using refresh token
4. **Logout**: Clears tokens and redirects to login

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```tsx
<ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
  <YourComponent />
</ProtectedRoute>
```

### API Client

The `api.ts` module provides an axios instance with:

- Automatic token injection
- Automatic token refresh on 401 errors
- CORS and credentials handling

### Tailwind CSS v4

This project uses Tailwind CSS v4 with:

- No PostCSS configuration needed
- Theme variables defined in CSS using `@theme`
- Custom color palette for medical UI
- Vite plugin for optimal performance

## Available Pages

### Login (`/login`)

- Professional login form
- Error handling
- Loading states
- Responsive design

### Dashboard (`/dashboard`)

- Protected route (requires authentication)
- Displays user information
- Role-based UI elements
- Quick actions

## Styling

The project uses a custom color scheme defined in `src/index.css`:

- **Primary**: Teal/Green medical colors
- **Secondary**: Gold/Yellow accents
- **Supporting**: Navy, burgundy, cream

Fonts:

- **Primary**: Lexend (clean, modern)
- **Secondary**: Merriweather (serif, elegant)

## Environment Variables

- `VITE_API_URL`: Backend API base URL

## Demo Credentials

Default admin user (seeded in backend):

- Username: `admin`
- Password: `Admin@123`

## Security Features

1. **Token Management**:

   - Access tokens stored in memory (not localStorage)
   - Refresh tokens in httpOnly cookies
   - Automatic token refresh

2. **Protected Routes**:

   - Role-based access control
   - Automatic redirect to login
   - Loading states during auth checks

3. **API Security**:
   - CORS enabled for specific origin
   - Credentials included in requests
   - Authorization headers

## Development Tips

- Use React DevTools for debugging
- Check browser console for API errors
- Verify backend is running before starting frontend
- Use network tab to inspect token refresh flow

## License

ISC
