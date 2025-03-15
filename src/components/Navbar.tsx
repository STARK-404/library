import React from 'react';
import { Library, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Library className="h-6 w-6" />
          <span className="text-xl font-bold">Library Manager</span>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 hover:text-indigo-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};