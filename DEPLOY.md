# Deployment Guide - My Skill App

Dokumentasi ini menjelaskan cara men-deploy aplikasi My Skill ke **Vercel** (frontend) dan **Render** (backend).

## Prerequisites

1. Akun [Vercel](https://vercel.com)
2. Akun [Render](https://render.com)
3. Akun [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (database cloud)

---

## Step 1: Setup MongoDB Atlas

1. Buka [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat cluster gratis (M0 Sandbox)
3. Buat database user
4. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/my-skill?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend ke Render

### Opsi A: Deploy via render.yaml (Recommended)

1. Push kode ke GitHub repository
2. Buka [Render Dashboard](https://dashboard.render.com)
3. Klik "New +" → "Blueprint"
4. Connect GitHub repo
5. Render akan membaca `render.yaml` dan otomatis deploy

### Opsi B: Deploy Manual

1. Buka [Render Dashboard](https://dashboard.render.com)
2. Klik "New +" → "Web Service"
3. Connect GitHub repository
4. Konfigurasi:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Singapore
   - **Plan**: Free

5. Tambahkan Environment Variables:
   ```
   NODE_ENV = production
   PORT = 10000
   MONGO_URI = mongodb+srv://...
   JWT_SECRET = your-super-secret-jwt-key
   ```

6. Klik "Create Web Service"

7. Setelah deploy, catat URL backend:
   ```
   https://my-skill-api.onrender.com
   ```

---

## Step 3: Deploy Frontend ke Vercel

### Opsi A: Deploy via Vercel Dashboard (Recommended)

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik "Add New..." → "Project"
3. Import GitHub repository
4. Konfigurasi:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`

5. Tambahkan Environment Variables:
   ```
   VITE_API_URL = https://my-skill-api.onrender.com
   ```

6. Klik "Deploy"

### Opsi B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (dari root project)
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? <your-username>
# - Link to existing project? N
# - Project name? my-skill-frontend
# - Directory? ./
# - Override settings? N

# Deploy to production
vercel --prod
```

---

## Step 4: Konfigurasi Frontend untuk Production

Update file `frontend/src/api/axios.js` untuk menggunakan environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

## Step 5: Verifikasi Deployment

1. Buka frontend di Vercel:
   ```
   https://my-skill-frontend.vercel.app
   ```

2. Register akun baru atau login

3. Test semua fitur:
   - [ ] Register & Login
   - [ ] View Home page dengan konten
   - [ ] Filter berdasarkan kategori
   - [ ] Search konten
   - [ ] View detail konten
   - [ ] Save content

---

## File Konfigurasi Deployment

### vercel.json (Root Project)

```json
{
  "framework": null,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd backend && npm install",
  "functions": {
    "backend/server.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    }
  ],
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "MONGO_URI": "@mongo_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### render.yaml (Backend)

```yaml
services:
  - type: web
    name: my-skill-api
    env: node
    region: singapore
    plan: free
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGO_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

---

## Troubleshooting

### CORS Error
Pastikan backend CORS whitelist sudah include Vercel URL:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}));
```

### API 404 Error
- Pastikan backend sudah running
- Cek environment variable `VITE_API_URL` di Vercel
- Pastikan URL tidak ada trailing slash

### Database Connection Error
- Cek `MONGO_URI` di Render
- Pastikan IP whitelist di MongoDB Atlas allow all (0.0.0.0/0)
- Cek retryWrites=true di connection string

---

## Alternative: Full Deploy ke Vercel

Jika ingin deploy semua ke Vercel (backend + frontend):

1. Buat `vercel.json` di root
2. Gunakan `@vercel/node` untuk backend
3. Tambahkan environment variables di Vercel dashboard

Note: Vercel free tier memiliki limit 100 hours/month untuk serverless functions.

---

## Links Penting

- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- GitHub Repo: https://github.com/your-username/my-skill-app
