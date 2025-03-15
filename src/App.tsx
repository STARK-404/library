import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { BookManagement } from './components/admin/BookManagement';
import { LoanManagement } from './components/admin/LoanManagement';
import { BookCatalog } from './components/user/BookCatalog';
import { UserLoans } from './components/user/UserLoans';

function MainApp() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {user?.role === 'admin' ? (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <BookManagement />
            <LoanManagement />
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Library Catalog</h1>
            <BookCatalog />
            <UserLoans />
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <MainApp />
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;