# MasterCheckAI Backend

FastAPI backend for MasterCheckAI enterprise healthcare platform.

## 🚀 Quick Start

### 1. Create Virtual Environment

```powershell
cd C:\Users\nagap\Desktop\MasterCheckAI\backend
python -m venv venv
venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Initialize Database

```powershell
python init_database.py
```

This creates `mastercheck.db` with:
- Admin users table (demo: admin@vijaycare.com / vijay123)
- Tables for all 17 modules
- Staff credentials table

### 4. Run Backend

```powershell
python main.py
```

Server starts at: **http://localhost:8000**

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔌 API Endpoints

### Authentication
- `POST /admin/login` - Admin login with email/password

### Organizations
- `GET /admin/organizations` - Get all organizations
- `POST /hospitals` - Create hospital
- `POST /schools` - Create school
- `POST /districts` - Create district
- `DELETE /hospitals/{id}` - Delete hospital
- `DELETE /schools/{id}` - Delete school
- `DELETE /districts/{id}` - Delete district

### Health
- `GET /` - API status
- `GET /health` - Health check

## 📊 Database Tables

- `admin_users` - Admin login credentials
- `hospitals` - Hospital organizations
- `schools` - School organizations
- `districts` - District organizations
- `phcs` - Primary Health Centers
- `police_orgs` - Police departments
- `women_maternal_centers` - Women & maternal health
- `employee_health_programs` - Employee wellness
- `child_health_centers` - Pediatric centers
- `senior_citizen_centers` - Elderly care
- `mobile_medical_vans` - Mobile clinics
- `telemedicine_centers` - Telemedicine hubs
- `public_health_centers` - Public health offices
- `lab_centers` - Laboratory centers
- `emergency_centers` - Emergency response
- `staff_credentials` - Staff login accounts

## 🔐 Default Admin

```
Email: admin@vijaycare.com
Password: vijay123
```

## 🛠️ Environment Variables

Edit `.env` file:
```
DATABASE_URL=sqlite:///mastercheck.db
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True
```

## 📝 Example Requests

### Login
```bash
POST http://localhost:8000/admin/login
{
  "email": "admin@vijaycare.com",
  "password": "vijay123"
}
```

### Create Hospital
```bash
POST http://localhost:8000/hospitals
{
  "name": "City Hospital",
  "email": "admin@cityhospital.com",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "num_doctors": 50,
  "num_beds": 200
}
```

## 🐛 Troubleshooting

**Port 8000 already in use:**
```powershell
# Change port in main.py line 123:
uvicorn.run(app, host="0.0.0.0", port=8001)
```

**Database locked:**
```powershell
# Delete mastercheck.db and restart:
rm mastercheck.db
python init_database.py
python main.py
```

**Module not found:**
```powershell
# Reinstall dependencies:
pip install -r requirements.txt --force-reinstall
```

---

**Backend is ready!** Now connect your frontend to this API. 🚀
