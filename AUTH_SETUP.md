# Laravel Sanctum Authentication Setup

This document describes the Laravel Sanctum authentication implementation for the COLTECH application.

## Overview

The authentication system uses Laravel Sanctum for token-based authentication. The frontend (Next.js) communicates with the Laravel backend API to handle user registration, login, logout, and profile management.

## Backend Setup (Laravel)

Your backend is already configured with:

- `AuthController` with signup, login, logout, and profile endpoints
- API routes at `/api/auth/*`
- Laravel Sanctum installed and configured

### Backend Endpoints

```
POST /api/auth/signup         - Register new user
POST /api/auth/login          - Login user
POST /api/auth/logout         - Logout user (requires auth)
GET  /api/auth/profile        - Get user profile (requires auth)
```

### Laravel Sanctum Configuration

Make sure your Laravel `.env` has:

```env
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

And in `config/cors.php`:

```php
'supports_credentials' => true,
```

## Frontend Setup (Next.js)

### 1. Files Created

```
lib/api/implementations/laravel/LaravelAuthService.ts  - Auth service implementation
contexts/AuthContext.tsx                               - React context for auth state
components/auth/ProtectedRoute.tsx                     - Protected route component
app/login/page.tsx                                     - Login page
app/signup/page.tsx                                    - Signup page
```

### 2. Updated Files

```
lib/api/serviceFactory.ts      - Added AuthService to factory
app/layout.tsx                 - Wrapped app with AuthProvider
components/layout/Header.tsx   - Added auth UI (login/logout/user menu)
```

## Usage

### Using Authentication in Components

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Creating Protected Routes

**Option 1: Using the ProtectedRoute component**

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>Your profile content</div>
    </ProtectedRoute>
  );
}
```

**Option 2: Using the useAuth hook**

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <div>Protected content</div>;
}
```

### Making Authenticated API Calls

The `LaravelAuthService` automatically stores the token in localStorage. To make authenticated requests:

```tsx
const token = localStorage.getItem('auth_token');

const response = await fetch(`${API_URL}/some-endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
```

## Features

### Authentication Context (`useAuth`)

The `useAuth` hook provides:

```typescript
{
  user: IUser | null;              // Current user object
  token: string | null;            // Auth token
  isLoading: boolean;              // Loading state
  isAuthenticated: boolean;        // Whether user is logged in
  login: (email, password) => Promise<void>;
  register: (data) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
```

### Header Navigation

The header automatically shows:

- **Logged Out**: Login and Sign Up buttons
- **Logged In**: User dropdown with:
  - My Profile
  - My Orders
  - My Licenses
  - Logout

### Mobile Support

The mobile menu includes all auth functionality with responsive design.

## Testing

### Test Registration

1. Navigate to `/signup`
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: +254712345678
   - Password: password123
3. Submit the form
4. You should be logged in and redirected to home

### Test Login

1. Navigate to `/login`
2. Enter credentials
3. Submit the form
4. You should be logged in and redirected to home

### Test Logout

1. Click on your name in the header
2. Click "Logout"
3. You should be logged out and the header should show Login/Sign Up buttons

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage (client-side). For production, consider using httpOnly cookies.

2. **Password Requirements**: Passwords must be at least 8 characters long (enforced on both frontend and backend).

3. **Token Validation**: The AuthContext automatically validates the token on app load and refreshes the user data.

4. **Error Handling**: All auth operations include proper error handling and display user-friendly error messages.

## Next Steps

To further enhance the auth system, consider:

1. **Password Reset**: Implement forgot password functionality
2. **Email Verification**: Add email verification flow
3. **OAuth**: Add social login (Google, Facebook, etc.)
4. **2FA**: Add two-factor authentication
5. **Session Management**: Add ability to view/revoke active sessions
6. **Role-Based Access**: Implement role-based routing and permissions

## Troubleshooting

### CORS Errors

If you get CORS errors, ensure:

1. Laravel CORS is configured correctly in `config/cors.php`
2. Your API URL in `.env.local` is correct: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
3. Laravel is running on the correct port

### Token Not Persisting

If users are logged out on refresh:

1. Check browser console for errors
2. Ensure localStorage is accessible
3. Check that the AuthProvider is wrapping your app in `layout.tsx`

### 401 Unauthorized Errors

If API calls return 401:

1. Check that the token is being sent in the Authorization header
2. Verify the token is valid in Laravel
3. Check that Sanctum middleware is applied to the route
