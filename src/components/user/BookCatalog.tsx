import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';

export const BookCatalog = () => {
  const { books, loans, issueBook } = useLibrary();
  const { user } = useAuth();

  const userActiveLoans = loans.filter(
    loan => loan.userId === user?.id && loan.status === 'active'
  );

  const canBorrow = (bookId: string) => {
    return !userActiveLoans.some(loan => loan.bookId === bookId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-sm mb-2">ISBN: {book.isbn}</p>
            <p className="text-sm mb-4">
              Available: {book.available} of {book.quantity}
            </p>
            <button
              onClick={() => user && issueBook(book.id, user.id)}
              disabled={!canBorrow(book.id) || book.available === 0}
              className={`w-full py-2 px-4 rounded ${
                canBorrow(book.id) && book.available > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {!canBorrow(book.id)
                ? 'Already Borrowed'
                : book.available === 0
                ? 'Not Available'
                : 'Borrow Book'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};