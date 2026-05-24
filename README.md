# My Skill - SMK Technical Skills Platform

My Skill adalah aplikasi fullstack untuk siswa Sekolah Menengah Kejuruan (SMK) bidang teknik sebagai wadah informasi hasil praktik yang pernah mereka lakukan selama sekolah. Aplikasi menyediakan konten bermanfaat berupa artikel dan video tutorial tentang berbagai bidang teknik.

## Fitur Aplikasi

### 1. Register Page
- Input: full name, email, password, confirm password, role
- Role tersedia: Student, Teacher, Public User
- Validasi password dan confirm password harus sama
- Setelah register berhasil, diarahkan ke halaman login

### 2. Login Page
- Input: email dan password
- Login menggunakan JWT (JSON Web Token)
- Token disimpan di localStorage
- Setelah login berhasil, diarahkan ke halaman Home
- Fitur remember me untuk menyimpan email

### 3. Home Page
- Hanya bisa diakses setelah login
- Navbar dengan logo My Skill dan menu navigasi
- Hero section dengan judul "Explore Technical Skills from SMK Practice Projects"
- Search bar untuk mencari konten
- Kategori: Automotive Repair, Welding, Electrical Installation, Home Repair, Mechanical Tools, Woodworking
- Grid konten tutorial dengan filter berdasarkan kategori dan search

### 4. Detail Content Page
- Hanya bisa diakses setelah login
- Menampilkan detail konten lengkap:
  - Judul, thumbnail, kategori, author
  - Duration, difficulty
  - Tools needed
  - Description
  - Step-by-step instructions
  - Safety tips
  - Related content
- Tombol Save Content

## Tech Stack

### Frontend
- React JS (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- bcryptjs (password hashing)
- CORS

## Struktur Folder

```
my-skill-app/
│
├── backend/
│   ├── config/
│   │   └── db.js              # Koneksi MongoDB
│   ├── controllers/
│   │   ├── authController.js  # Logic autentikasi
│   │   └── contentController.js # Logic konten
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT middleware
│   ├── models/
│   │   ├── User.js            # Model User
│   │   └── Content.js         # Model Content
│   ├── routes/
│   │   ├── authRoutes.js      # Routes autentikasi
│   │   └── contentRoutes.js   # Routes konten
│   ├── seed.js                # Seed data
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Konfigurasi Axios
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ContentCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Detail.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── .env.example
│
└── README.md
```

## Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- MongoDB (local atau Atlas)
- npm atau yarn

### 1. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Buat file .env dari .env.example
cp .env.example .env

# Edit file .env sesuai konfigurasi MongoDB Anda
# Contoh MONGO_URI=mongodb://localhost:27017/my-skill
```

### 2. Setup Frontend

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Buat file .env dari .env.example
cp .env.example .env

# Edit VITE_API_URL jika backend tidak di localhost:5000
```

### 3. Jalankan Backend

```bash
cd backend

# Jalankan seed data (opsional, untuk mengisi data awal)
npm run seed

# Jalankan server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 4. Jalankan Frontend

```bash
cd frontend

npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 5. Membuat File .env

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/my-skill
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Cara Menjalankan Seed Data

Seed data berfungsi untuk mengisi database dengan data tutorial awal.

```bash
cd backend
npm run seed
```

Seed data akan membuat 8 konten tutorial dengan kategori:
1. How to Change Motorcycle Oil (Automotive Repair)
2. Basic Welding for Metal Frame (Welding)
3. Installing a Simple Light Switch (Electrical Installation)
4. Repairing a Leaking Faucet (Home Repair)
5. Making a Simple Tool Box (Woodworking)
6. Basic Engine Maintenance (Automotive Repair)
7. Installing PVC Pipes for Plumbing (Home Repair)
8. Basic MIG Welding Techniques (Welding)

## Akun Demo

Setelah register, Anda bisa membuat akun baru. Tidak ada akun demo default yang dibuat untuk keamanan.

## Daftar API Endpoint

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user baru | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/save/:contentId` | Save content | Yes |
| DELETE | `/api/auth/unsave/:contentId` | Unsave content | Yes |
| GET | `/api/auth/saved` | Get saved contents | Yes |

### Content Routes (`/api/contents`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/contents` | Get all contents | Yes |
| GET | `/api/contents/:id` | Get content by ID | Yes |
| GET | `/api/contents/categories` | Get all categories | Yes |
| GET | `/api/contents/:id/related/:category` | Get related contents | Yes |

### Query Parameters

**GET /api/contents**
- `search` - Search by title, description, or author
- `category` - Filter by category
- `type` - Filter by type (Video/Article)
- `difficulty` - Filter by difficulty

## Desain UI/UX

### Warna
- Primary: #2563EB (Blue)
- Accent: #F97316 (Orange)
- Background: #F8FAFC
- Text Primary: #0F172A
- Text Secondary: #64748B

### Font
- Inter (Google Fonts)

### Layout
- Responsive design untuk desktop dan mobile
- Card-based design dengan shadow dan rounded corners
- Modern dan clean interface

## Lisensi

MIT License
