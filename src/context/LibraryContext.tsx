import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, User, Loan } from '../types';

interface LibraryContextType {
  books: Book[];
  loans: Loan[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  issueBook: (bookId: string, userId: string) => void;
  returnBook: (loanId: string, fine?: number) => void;
  updateLoanFine: (loanId: string, fine: number) => void;
  getUserLoans: (userId: string) => Loan[];
  getBookById: (id: string) => Book | undefined;
}

const LibraryContext = createContext<LibraryContextType>({
  books: [],
  loans: [],
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  issueBook: () => {},
  returnBook: () => {},
  updateLoanFine: () => {},
  getUserLoans: () => [],
  getBookById: () => undefined,
});

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [];
  });

  const [loans, setLoans] = useState<Loan[]>(() => {
    const stored = localStorage.getItem('loans');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const issueBook = (bookId: string, userId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.available <= 0) return;

    const newLoan: Loan = {
      id: Math.random().toString(36).substr(2, 9),
      bookId,
      userId,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      status: 'active',
      fine: 0
    };

    setLoans([...loans, newLoan]);
    updateBook({ ...book, available: book.available - 1 });
  };

  const updateLoanFine = (loanId: string, fine: number) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          fine,
          status: 'overdue'
        };
      }
      return loan;
    }));
  };

  const returnBook = (loanId: string, fine?: number) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan || loan.status !== 'active') return;

    const book = books.find(b => b.id === loan.bookId);
    if (!book) return;

    setLoans(loans.map(l => {
      if (l.id === loanId) {
        return {
          ...l,
          returnDate: new Date().toISOString(),
          status: 'returned',
          fine: fine || l.fine || 0
        };
      }
      return l;
    }));

    updateBook({ ...book, available: book.available + 1 });
  };

  const getUserLoans = (userId: string) => {
    return loans.filter(loan => loan.userId === userId);
  };

  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  return (
    <LibraryContext.Provider value={{
      books,
      loans,
      addBook,
      updateBook,
      deleteBook,
      issueBook,
      returnBook,
      updateLoanFine,
      getUserLoans,
      getBookById,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};