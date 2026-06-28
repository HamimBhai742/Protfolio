# Modern Portfolio Website & CMS (Next.js 15 + MongoDB/Mongoose + Tailwind CSS v4)

A highly responsive, modern, full-stack portfolio website built with Next.js 15, featuring a personal blog, project showcase, and a fully-secured admin dashboard for content management (CMS).

🌐 **Live Demo**: [https://assignment-07-gamma.vercel.app](https://assignment-07-gamma.vercel.app)

---

## 📋 Project Overview

This application serves as a developer's personal portfolio and a comprehensive content management system. It features a modern, responsive design with dark/light mode support, an interactive user interface, and an admin dashboard to manage all content dynamically without code changes.

---

## ✨ Key Features

### 🎨 Public Frontend
- **Hero & Profile**: Engaging greeting with custom typewriter effects and a quick links section.
- **Project Showcase**: Display completed or in-progress projects with category filtering, technologies used, links to live sites, and GitHub repositories.
- **Blog System**: Browse articles categorized by technology, programming, and more. Features search functionality and read-time tracking.
- **Experience Timeline**: Vertical chronological layout highlighting professional experience and educational milestones.
- **Contact Form**: Interactive contact form with validation and automatic email dispatching.
- **Theme Switching**: Smooth dark and light mode toggle using `next-themes`.

### 🔐 Secured Admin Dashboard (`/dashboard`)
- **Route Protection**: Next.js Middleware blocks unauthorized visitors from accessing dashboard sub-routes.
- **Metric Overviews**: Quick analytics showing total projects, blogs, unread messages, and timeline entries.
- **Content CMS**:
  - **Blog Management**: Write, edit, delete, draft, and publish articles.
  - **Project Management**: Add, update, and manage portfolio items, select start/end dates, upload thumbnails, and add tags.
  - **Timeline Editor**: Add/update work experiences and education details.
  - **Inquiry Review Hub**: Read incoming contact messages from visitors and toggle read/unread status.
- **Profile Customizer**: Edit developer's bio, avatar, contact information, skills, and social links.

---

## 🛠️ Technology Stack

### Core Frameworks & Libraries
- **Framework**: [Next.js 15](https://nextjs.org) (App Router, Turbopack)
- **Runtime**: [React 19](https://react.dev) & [TypeScript](https://www.typescriptlang.org)
- **Database ORM**: [Mongoose](https://mongoosejs.com) (MongoDB integration)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [DaisyUI v5](https://daisyui.com) + [PostCSS](https://postcss.org)

### Form, Media & Utilities
- **State & Form Validation**: [React Hook Form](https://react-hook-form.com) & [Zod](https://zod.dev)
- **File Storage**: Cloudinary (Client-side upload using unsigned presets)
- **Email Delivery**: Nodemailer (via custom SMTP server settings)
- **UI Components**: Radix UI (Dropdown Menus, Slots)
- **Alerts & Visuals**: SweetAlert2, React Hot Toast, Typewriter-effect, Lucide Icons

---

## 📁 Project Structure

```
Protfolio/
├── src/
│   ├── actions/               # Server Actions (calls API routes internally)
│   │   ├── cleanObj.ts
│   │   ├── login.ts
│   │   ├── myBlogUpById.ts
│   │   └── myBlogs.ts
│   ├── app/                   # Next.js App Router Pages & API Routes
│   │   ├── (dashboard)/       # Dashboard/Admin layout and routes
│   │   ├── (public)/          # Public routes (home, about, blog, projects)
│   │   ├── api/v2/            # REST API Route Handlers (auth, blogs, messages, projects, etc.)
│   │   ├── login/             # Login Page
│   │   ├── globals.css        # Global CSS rules (Tailwind v4 imports)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # UI & Logic React Components
│   │   ├── models/            # Feature-specific components (Home, Profile, Projects, Dashboard)
│   │   ├── shared/            # Common layouts (Navbar, Footer, Sidebar, Skeleton cards)
│   │   └── ui/                # Reusable low-level widgets (Buttons, Badges)
│   ├── helpers/               # Utility functions (icon mappings, auth verifications)
│   ├── lib/                   # Integrations and utilities
│   │   ├── db.ts              # MongoDB connect client with retry logic
│   │   ├── mailer.ts          # SMTP transporter configuration
│   │   └── verifyAuth.ts      # JWT Authentication & role checker middleware helper
│   ├── types/                 # TypeScript interfaces and type definitions
│   └── upload/                # Cloudinary upload helpers
├── public/                    # Static assets
├── components.json            # UI system configuration
├── next.config.ts             # Next.js bundler settings
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Script definitions & npm dependencies
└── tsconfig.json              # TypeScript configuration
```

---

## ⚙️ Environment Variables Config

Create a `.env` file in the root folder of your project and configure the following variables:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Connection URL | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for signing admin authentication tokens | `your_super_secret_jwt_key` |
| `JWT_EXPIRES_IN` | Session cookie expiration time | `1d` |
| `NEXT_PUBLIC_API_URL` | Base endpoint URL for local/production API requests | `http://localhost:3000/api/v2` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary name for image uploads | `your_cloudinary_cloud_name` |
| `SMTP_HOST` | Hostname of SMTP server for contact notifications | `smtp.gmail.com` |
| `SMTP_PORT` | Port of SMTP server | `465` (SSL) / `587` (TLS) |
| `SMTP_USER` | Email username for sending SMTP mails | `example@gmail.com` |
| `SMTP_PASS` | Password/App Password for SMTP email client | `your_smtp_app_password` |
| `SMTP_FROM` | Custom display label showing sender in inbox | `"Portfolio Contact Form" <example@gmail.com>` |
| `ADMIN_EMAIL` | Inbox address where visitor contact submissions are sent | `owner@domain.com` |

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (version 18 or higher recommended)
- MongoDB instance (local server or MongoDB Atlas)
- Cloudinary Account (with an upload preset named `my_protfolio`)

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Protfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment variables**
   Create a `.env` file inside the root directory and copy/paste variables from the [Environment Variables Config](#️-environment-variables-config) table.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The dev server will run on [http://localhost:3000](http://localhost:3000).

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Start the Production Build**
   ```bash
   npm run start
   ```

---

## 🔌 API Endpoints Map (`/api/v2`)

Authentication middleware protects routes flagged with **[Admin Auth]**:

### Authentication
- `POST /api/v2/auth/login` - Authenticate admin & issue token cookie
- `POST /api/v2/auth/logout` - Clear token cookie
- `POST /api/v2/auth/verify` - Check current auth session

### Blogs
- `GET /api/v2/blog` - Retrieve all published blogs
- `GET /api/v2/blog/my-blog/[id]` - Retrieve single blog details **[Admin Auth]**
- `GET /api/v2/blog/my-blogs` - Retrieve all draft and published blogs for author **[Admin Auth]**
- `POST /api/v2/blog/create` - Create a new blog post **[Admin Auth]**
- `PUT /api/v2/blog/update/[id]` - Update existing blog **[Admin Auth]**
- `DELETE /api/v2/blog/delete/[id]` - Delete a blog post **[Admin Auth]**

### Projects
- `GET /api/v2/projects` - Get all projects
- `GET /api/v2/projects/my-projects` - Get all developer projects **[Admin Auth]**
- `POST /api/v2/projects/create` - Add new project card **[Admin Auth]**
- `PUT /api/v2/projects/update/[id]` - Edit project card **[Admin Auth]**
- `DELETE /api/v2/projects/delete/[id]` - Delete a project **[Admin Auth]**

### Inquiries / Messages
- `POST /api/v2/messages` - Submit contact form from landing page
- `GET /api/v2/messages` - View all submissions **[Admin Auth]**
- `PUT /api/v2/messages/update/[id]` - Toggle read/unread status **[Admin Auth]**

### Profiles / User Info
- `GET /api/v2/user` - Fetch public user profile and related projects
- `GET /api/v2/user/me` - Fetch details of logged-in admin **[Admin Auth]**
- `PUT /api/v2/user/update-profile` - Update bio, skills, socials, and photo **[Admin Auth]**

### Experience / Timeline
- `GET /api/v2/timeline` - Retrieve educational/work experiences
- `POST /api/v2/timeline` - Add timeline event **[Admin Auth]**
- `PUT /api/v2/timeline/[id]` - Edit timeline event **[Admin Auth]**
- `DELETE /api/v2/timeline/[id]` - Delete timeline event **[Admin Auth]**

---

*Built with ❤️ by Hamim.*
