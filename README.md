# Primerch Client

Frontend application for Primerch - an e-commerce merchandise platform built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **React**: 19.2.3
- **TypeScript**: ^5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui (New York style)
- **State Management**: 
  - React Context (Auth, Cart, Theme)
  - TanStack Query for server state
  - SWR for data fetching
- **Form Handling**: React Hook Form patterns
- **HTTP Client**: Axios with automatic token refresh
- **Notifications**: Sonner
- **Icons**: Lucide React + React Icons
- **Theme**: next-themes (dark mode support)

## Features

- 🛍️ E-commerce product browsing and filtering
- 🔐 JWT authentication with automatic token refresh
- 🛒 Shopping cart management
- 💳 Checkout and order processing
- 👤 User profile with order history
- ⭐ Product reviews and ratings
- 💝 Product likes and bookmarks
- 📦 Product collections/categories
- 🎨 Dark mode support
- 🔍 Advanced product filtering (category, gender, price, search)
- 🖼️ Image upload with drag-and-drop
- 👨‍💼 Admin dashboard for product management

## Prerequisites

- Node.js 20+ or [Bun](https://bun.sh/) (latest version)
- Running backend server (see `../server/README.md`)

## Installation

1. Install dependencies:

```bash
bun install
```

2. Configure environment:

The app is configured to connect to `http://localhost:8000` for the API. To change this, update `helpers/api/api.ts`.

## Development

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production

Build for production:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Project Structure

```
client/
├── app/
│   ├── (root)/              # Main app routes
│   │   ├── (admin)/         # Admin dashboard
│   │   │   └── admin/       # Admin pages
│   │   │       ├── products/    # Product management
│   │   │       ├── categories/  # Category management
│   │   │       ├── orders/      # Order management
│   │   │       └── users/       # User management
│   │   ├── (auth)/          # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (index)/         # Public pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── products/        # Product listing & details
│   │   │   ├── collections/     # Category pages
│   │   │   ├── checkout/        # Checkout flow
│   │   │   └── profile/         # User profile
│   │   │       ├── orders/      # Order history
│   │   │       ├── liked/       # Liked products
│   │   │       └── bookmarked/  # Bookmarked products
│   │   └── _components/     # Shared components (cart, sidebar)
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── breadcrumb.tsx
│   ├── login-form.tsx
│   ├── no-item.tsx
│   └── loading.tsx
├── helpers/
│   ├── api/                 # Axios instance with interceptors
│   ├── context/             # React context providers
│   │   ├── auth/            # Authentication context
│   │   ├── cart/            # Shopping cart context
│   │   ├── theme/           # Theme (dark mode) context
│   │   ├── query/           # TanStack Query provider
│   │   └── debounce/        # Debounce hook
│   ├── request/             # API request functions
│   ├── type/                # TypeScript types
│   └── generated/           # Generated types (Prisma)
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
└── next.config.ts           # Next.js configuration
```

## Key Pages and Routes

### Public Routes
- `/` - Home page with featured products
- `/products` - Product listing with filters
- `/products/[slug]` - Product detail page
- `/collections` - Category listing
- `/collections/[slug]` - Products by category
- `/login` - User login
- `/register` - User registration

### User Routes (Authenticated)
- `/checkout` - Checkout and order placement
- `/profile` - User profile overview
- `/profile/orders` - Order history
- `/profile/orders/[id]` - Order details with review option
- `/profile/liked` - Liked products
- `/profile/bookmarked` - Bookmarked products

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/products/create` - Create new product
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/users` - User management

## Context Providers

The app uses several React context providers:

### AuthProvider
Manages user authentication state and provides login/logout functionality.

### CartProvider
Manages shopping cart state with optimistic updates.

### ThemeProvider
Handles dark/light mode with system preference detection.

### QueryProvider
TanStack Query wrapper for server state management.

## API Integration

The app communicates with the backend API using Axios with automatic:
- Bearer token authentication
- Access token refresh on 401 errors
- Request/response interceptors
- Cookie-based token storage

API base URL: `http://localhost:8000`

## UI Components

Built with shadcn/ui (New York style) and Radix UI primitives:
- Alert Dialog
- Badge
- Breadcrumb
- Button
- Dialog
- Dropzone (file upload)
- Field (form input)
- Input
- Label
- Select
- Separator
- Sheet (drawer)
- Slider
- Spinner
- Textarea
- Toast (via Sonner)

## Styling

- **Tailwind CSS v4** with CSS variables for theming
- **Inter font** from Google Fonts
- **Stone color scheme** as base
- Dark mode support via next-themes

## Features in Detail

### Product Filtering
Advanced filtering options include:
- Category selection
- Gender (Male, Female, Unisex)
- Price range slider
- Search by name
- Sort by (newest, price, rating)

### Shopping Cart
- Add/remove products
- Increment/decrement quantity
- Real-time price calculation
- Persistent across sessions

### Checkout Flow
- Order summary
- Shipping information form
- Payment method selection
- Order confirmation

### Product Reviews
- Rate products (1-5 stars)
- Write reviews
- View all reviews with ratings
- Only available for purchased products

### Admin Features
- Product CRUD operations
- Image upload via Cloudinary
- Product variant management (size, color)
- Category management
- Order tracking
- User management

## Development Notes

- Uses Next.js App Router with route groups
- TypeScript strict mode enabled
- Path alias `@/*` configured for imports
- Remote image optimization enabled for all HTTPS sources
- React 19 features utilized

## License

Private project - All rights reserved
