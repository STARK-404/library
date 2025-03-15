import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';

export const UserLoans = () => {
  const { loans, getBookById } = useLibrary();
  const { user } = useAuth();

  const userLoans = user ? loans.filter(loan => loan.userId === user.id) : [];

  const calculateFine = (dueDate: string): number => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 50 : 0; // ₹50 per day
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Loans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fine
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userLoans.map(loan => {
              const book = getBookById(loan.bookId);
              const currentFine = loan.fine || (loan.status === 'active' ? calculateFine(loan.dueDate) : 0);
              
              return (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        loan.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : loan.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {currentFine > 0 ? (
                      <span className="text-red-600">₹{currentFine.toFixed(2)}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};