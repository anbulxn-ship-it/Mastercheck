import sqlite3
import bcrypt
import os

DATABASE_PATH = "mastercheck.db"

def init_database():
    """Initialize MasterCheckAI database with all required tables"""

    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Admin users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Organizations table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS organizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT,
            org_type TEXT,
            allocated_models TEXT,
            admin_name TEXT,
            admin_email TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Hospitals
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hospitals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT,
            admin_name TEXT,
            num_doctors INTEGER,
            num_beds INTEGER,
            allocated_models TEXT,
            username TEXT UNIQUE,
            password TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Schools
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS schools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Districts
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS districts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            district TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # PHCs
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS phcs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            village TEXT,
            district TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Police Organizations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS police_orgs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Women & Maternal Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS women_maternal_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Employee Health Programs
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employee_health_programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            organization_type TEXT,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Child Health Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS child_health_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Senior Citizen Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS senior_citizen_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            contact_name TEXT,
            members INTEGER,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Mobile Medical Vans
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mobile_medical_vans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            operating_area TEXT,
            state TEXT,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Telemedicine Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS telemedicine_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Public Health Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS public_health_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Lab Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lab_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Emergency Centers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS emergency_centers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            city TEXT,
            state TEXT,
            allocated_models TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Staff Credentials
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS staff_credentials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            org_id INTEGER NOT NULL,
            org_type TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()

    # Insert default admin if not exists
    cursor.execute("SELECT COUNT(*) FROM admin_users WHERE email = ?", ("admin@vijaycare.com",))
    if cursor.fetchone()[0] == 0:
        hashed_password = bcrypt.hashpw(b"vijay123", bcrypt.gensalt(12)).decode()
        cursor.execute('''
            INSERT INTO admin_users (email, password, name, role)
            VALUES (?, ?, ?, ?)
        ''', ("admin@vijaycare.com", hashed_password, "Vijay Care Admin", "admin"))
        conn.commit()
        print("✅ Default admin created: admin@vijaycare.com / vijay123")

    conn.close()
    print(f"✅ Database initialized: {DATABASE_PATH}")

if __name__ == "__main__":
    init_database()
