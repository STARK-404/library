export interface Book {
  id: string;
  title: string;
  author: string;
  quantity: number;
  available: number;
  coverUrl: string;
  isbn: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  fine?: number;
}