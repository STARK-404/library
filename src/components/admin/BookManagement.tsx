import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import type { Book as BookType } from '../../types';

export const BookManagement = () => {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [newBook, setNewBook] = useState<Partial<BookType>>({
    title: '',
    author: '',
    quantity: 1,
    available: 1,
    isbn: '',
    coverUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook({ ...editingBook, ...newBook } as BookType);
      setEditingBook(null);
    } else {
      addBook(newBook as Omit<BookType, 'id'>);
    }
    setNewBook({
      title: '',
      author: '',
      quantity: 1,
      available: 1,
      isbn: '',
      coverUrl: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          {editingBook ? 'Edit Book' : 'Add New Book'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={e => setNewBook({ ...newBook, title: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={e => setNewBook({ ...newBook, author: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newBook.quantity}
              onChange={e => setNewBook({ ...newBook, quantity: parseInt(e.target.value), available: parseInt(e.target.value) })}
              className="border rounded p-2"
              required
              min="1"
            />
            <input
              type="text"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={e => setNewBook({ ...newBook, isbn: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="url"
              placeholder="Cover URL"
              value={newBook.coverUrl}
              onChange={e => setNewBook({ ...newBook, coverUrl: e.target.value })}
              className="border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </button>
          {editingBook && (
            <button
              type="button"
              onClick={() => {
                setEditingBook(null);
                setNewBook({
                  title: '',
                  author: '',
                  quantity: 1,
                  available: 1,
                  isbn: '',
                  coverUrl: ''
                });
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Book Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book.id} className="border rounded-lg p-4 space-y-2">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Available: {book.available} / {book.quantity}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingBook(book)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};