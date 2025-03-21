# Library Management System

A modern, full-stack web application for managing library operations, built with React and TypeScript. This system provides a comprehensive solution for libraries to manage their books, users, and loan operations efficiently.

## 🚀 Features

### For Users
- 📚 Browse available books in the library catalog
- 📖 View book details including availability status
- 📱 Manage personal book loans
- 🔔 Track due dates and fine amounts
- 👤 Personal dashboard for loan history

### For Administrators
- 📊 Comprehensive admin dashboard
- ✏️ Manage books (add/edit/delete)
- 📋 Process book loans and returns
- 💰 Handle fine management
- 👥 View user details and loan history

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Context API** - State management
- **React Hooks** - Component logic
- **Vite** - Build tool and development server

### State Management
- Local Storage - Persistent data storage
- React Context - Application state management
- Custom hooks for business logic

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/         # Admin-specific components
│   ├── user/          # User-specific components
│   ├── Login.tsx      # Authentication component
│   └── Navbar.tsx     # Navigation component
├── context/
│   ├── AuthContext.tsx    # Authentication state
│   └── LibraryContext.tsx # Library operations state
├── types/
│   └── index.ts       # TypeScript type definitions
└── App.tsx            # Main application component
```

## 💻 Core Components

### Authentication System (`AuthContext.tsx`)
- Implements user authentication flow
- Manages user sessions using localStorage
- Handles role-based access (admin/user)
- Provides login/logout functionality
- Example usage:
```typescript
const { user, login, logout } = useAuth();
// Login user
login(email, password);
// Check user role
if (user?.role === 'admin') {
  // Show admin features
}
```

### Library Management (`LibraryContext.tsx`)
- Manages book inventory and loan operations
- Handles CRUD operations for books
- Tracks book availability
- Processes loan transactions
- Example usage:
```typescript
const { books, addBook, issueBook } = useLibrary();
// Add new book
addBook({
  title: 'Book Title',
  author: 'Author Name',
  quantity: 1,
  available: 1,
  isbn: '1234567890',
  coverUrl: 'https://example.com/cover.jpg'
});
```

### Book Management (`BookManagement.tsx`)
- Admin interface for book operations
- Form handling for book details
- Image URL management
- Inventory tracking
- Key features:
```typescript
// Book update logic
const updateBook = (book: Book) => {
  // Update book details
  // Update availability
  // Refresh inventory
};
```

### Loan System (`LoanManagement.tsx`)
- Processes book loans and returns
- Calculates due dates and fines
- Tracks loan status
- Implementation details:
```typescript
// Fine calculation
const calculateFine = (dueDate: string): number => {
  const diffDays = // Calculate overdue days
  return diffDays > 0 ? diffDays * 50 : 0; // ₹50 per day
};
```

### User Interface Components

#### Book Catalog (`BookCatalog.tsx`)
- Displays available books
- Handles borrowing requests
- Shows real-time availability
- Example structure:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {books.map(book => (
    <BookCard
      key={book.id}
      book={book}
      onBorrow={handleBorrow}
    />
  ))}
</div>
```

#### User Loans (`UserLoans.tsx`)
- Shows user's active loans
- Displays due dates and fines
- Tracks return status
- Implementation:
```typescript
const userLoans = loans.filter(loan => 
  loan.userId === user?.id
);
```

## 🔒 Security Implementation

### Authentication Flow
1. User submits credentials
2. System validates user role
3. Creates session in localStorage
4. Provides role-based access

### Protected Routes
- Admin routes check for admin role
- User routes verify authentication
- Unauthorized access prevention

## 💳 Fine Management System

### Calculation Logic
```typescript
const calculateFine = (dueDate: string): number => {
  const due = new Date(dueDate);
  const now = new Date();
  const diffDays = Math.ceil(
    (now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays > 0 ? diffDays * 50 : 0; // ₹50 per day
};
```

### Fine Processing
- Automatic calculation on overdue
- Admin notification system
- User fine tracking
- Payment status management

## 📱 Responsive Design Implementation

### Tailwind Classes
```typescript
// Mobile-first design
<div className="
  grid
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-6
">
```

### Breakpoint Structure
- Mobile: Default styles
- Tablet: md: prefix (768px)
- Desktop: lg: prefix (1024px)

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌟 Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Clean and maintainable code
- Comprehensive error handling

## 📚 Data Models

### Book
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  quantity: number;
  available: number;
  coverUrl: string;
  isbn: string;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}
```

### Loan
```typescript
interface Loan {
  id: string;
  bookId: string;
  userId: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.#   l i b r a r y  
 