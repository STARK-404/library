import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';

export const LoanManagement = () => {
  const { loans, books, returnBook, updateLoanFine } = useLibrary();
  const [fines, setFines] = useState<Record<string, number>>({});

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  };

  const calculateOverdueDays = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = now.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleFineChange = (loanId: string, amount: number) => {
    setFines(prev => ({
      ...prev,
      [loanId]: amount
    }));
  };

  const handleSendFine = (loanId: string) => {
    const fineAmount = fines[loanId] || 0;
    if (fineAmount > 0) {
      updateLoanFine(loanId, fineAmount);
      setFines(prev => {
        const newFines = { ...prev };
        delete newFines[loanId];
        return newFines;
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Active Loans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans
              .filter(loan => loan.status === 'active')
              .map(loan => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getBookTitle(loan.bookId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {calculateOverdueDays(loan.dueDate) > 0 ? (
                      <span className="text-red-600">
                        Overdue by {calculateOverdueDays(loan.dueDate)} days
                      </span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₹</span>
                        <input
                          type="number"
                          placeholder="Fine amount"
                          className="border rounded px-2 py-1 w-24 pl-6"
                          value={fines[loan.id] || ''}
                          onChange={(e) => handleFineChange(loan.id, Number(e.target.value))}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        onClick={() => handleSendFine(loan.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:bg-yellow-300"
                        disabled={!fines[loan.id] || fines[loan.id] <= 0}
                      >
                        Send Fine
                      </button>
                      <button
                        onClick={() => {
                          returnBook(loan.id, fines[loan.id]);
                          setFines(prev => {
                            const newFines = { ...prev };
                            delete newFines[loan.id];
                            return newFines;
                          });
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Return
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};