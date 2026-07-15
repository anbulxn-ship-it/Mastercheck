from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import sqlite3
import bcrypt
import json
import os
import requests
from init_database import init_database

load_dotenv()

# Initialize database
try:
    init_database()
except Exception as e:
    print(f"[WARNING] Database initialization error: {e}")

app = FastAPI(
    title="MasterCheckAI Backend",
    description="Enterprise Healthcare Platform API",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    conn = sqlite3.connect("mastercheck.db")
    conn.row_factory = sqlite3.Row
    return conn

# Pydantic Models
class AdminLogin(BaseModel):
    email: str
    password: str

class HospitalCreate(BaseModel):
    name: str
    email: str
    phone: str = None
    address: str = None
    city: str = None
    state: str = None
    zip_code: str = None
    admin_name: str = None
    num_doctors: int = 0
    num_beds: int = 0
    allocated_models: list = []

class SchoolCreate(BaseModel):
    name: str
    email: str
    city: str = None
    state: str = None
    contact_name: str = None
    members: int = 0
    allocated_models: list = []

class DistrictCreate(BaseModel):
    name: str
    email: str
    district: str = None
    state: str = None
    contact_name: str = None
    members: int = 0
    allocated_models: list = []

class ChatMessage(BaseModel):
    agent_id: str
    message: str
    patient_id: str = None
    history: list = []

# Health check
@app.get("/")
async def root():
    return {
        "status": "ok",
        "app": "MasterCheckAI Backend",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Admin Login
@app.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM admin_users WHERE email = ?", (credentials.email,))
        admin = cursor.fetchone()

        if not admin:
            return {"status": "error", "message": "Invalid credentials"}

        if bcrypt.checkpw(credentials.password.encode(), admin['password'].encode()):
            return {
                "status": "success",
                "admin_id": admin['id'],
                "name": admin['name'],
                "role": admin['role'],
                "email": admin['email']
            }
        else:
            return {"status": "error", "message": "Invalid credentials"}

    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Get all organizations
@app.get("/admin/organizations")
async def get_organizations():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM hospitals")
        hospitals = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM schools")
        schools = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM districts")
        districts = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM police_orgs")
        police_orgs = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM women_maternal_centers")
        women_orgs = [dict(row) for row in cursor.fetchall()]

        cursor.execute("SELECT * FROM phcs")
        phcs = [dict(row) for row in cursor.fetchall()]

        return {
            "hospitals": hospitals,
            "schools": schools,
            "districts": districts,
            "police_orgs": police_orgs,
            "women_orgs": women_orgs,
            "phcs": phcs
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

# Create Hospital
@app.post("/hospitals")
async def create_hospital(hospital: HospitalCreate):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO hospitals (name, email, phone, address, city, state, admin_name, num_doctors, num_beds, allocated_models)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            hospital.name, hospital.email, hospital.phone, hospital.address,
            hospital.city, hospital.state, hospital.admin_name,
            hospital.num_doctors, hospital.num_beds, json.dumps(hospital.allocated_models)
        ))

        conn.commit()
        return {"status": "success", "message": "Hospital created"}

    except sqlite3.IntegrityError:
        return {"status": "error", "message": "Hospital already exists"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Create School
@app.post("/schools")
async def create_school(school: SchoolCreate):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO schools (name, email, city, state, contact_name, members, allocated_models)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            school.name, school.email, school.city, school.state,
            school.contact_name, school.members, json.dumps(school.allocated_models)
        ))

        conn.commit()
        return {"status": "success", "message": "School created"}

    except sqlite3.IntegrityError:
        return {"status": "error", "message": "School already exists"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Create District
@app.post("/districts")
async def create_district(district: DistrictCreate):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO districts (name, email, district, state, contact_name, members, allocated_models)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            district.name, district.email, district.district, district.state,
            district.contact_name, district.members, json.dumps(district.allocated_models)
        ))

        conn.commit()
        return {"status": "success", "message": "District created"}

    except sqlite3.IntegrityError:
        return {"status": "error", "message": "District already exists"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Delete Hospital
@app.delete("/hospitals/{hospital_id}")
async def delete_hospital(hospital_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM hospitals WHERE id = ?", (hospital_id,))
        conn.commit()
        return {"status": "success", "message": "Hospital deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Delete School
@app.delete("/schools/{school_id}")
async def delete_school(school_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM schools WHERE id = ?", (school_id,))
        conn.commit()
        return {"status": "success", "message": "School deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# Delete District
@app.delete("/districts/{district_id}")
async def delete_district(district_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM districts WHERE id = ?", (district_id,))
        conn.commit()
        return {"status": "success", "message": "District deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        conn.close()

# AI Chat Endpoint
AGENT_SYSTEM_PROMPTS = {
    "emergency": "You are Emergency AI - a medical triage specialist. Assess severity, ask clarifying questions, and provide immediate recommendations. Be concise and actionable.",
    "icu": "You are ICU AI - intensive care monitoring specialist. Analyze vital signs, assess patient stability, and provide clinical recommendations.",
    "cardiology": "You are Cardiology AI - cardiac specialist. Assess heart conditions, request relevant tests, and provide cardiac care recommendations.",
    "stroke": "You are Stroke AI - stroke detection specialist. Perform FAST test assessment, identify stroke risk, and recommend immediate actions.",
    "radiology": "You are Radiology AI - medical imaging specialist. Analyze medical images, identify abnormalities, and provide radiological reports.",
    "laboratory": "You are Laboratory AI - clinical pathology specialist. Interpret lab results, identify abnormalities, and provide clinical guidance.",
    "admission": "You are Admission AI - hospital workflow specialist. Guide patient registration, documentation, and room assignment process.",
    "discharge": "You are Discharge AI - discharge planning specialist. Assess discharge readiness, plan follow-up, and provide patient education."
}

def generate_smart_response(agent_id, user_message):
    """Fallback: Generate intelligent response when API fails"""
    msg = user_message.lower()

    responses = {
        "emergency": {
            "fever": "🌡️ **FEVER ASSESSMENT**\n\nSeverity: MODERATE\n\nFollow-up needed:\n• Duration of fever?\n• Other symptoms (cough, sore throat, body aches)?\n• Recent contact with sick persons?\n• Current medications?\n\n**Recommendation**: If fever >39°C or persistent >3 days, recommend ECG and blood work.",
            "chest pain": "❌ **CHEST PAIN - CARDIAC ALERT**\n\nRisk Level: HIGH\n\nCritical Assessment:\n• Pain type: Sharp/pressure/burning?\n• Radiation: Arm, neck, or jaw?\n• Shortness of breath?\n• Sweating or nausea?\n\n**IMMEDIATE**: 12-lead ECG, troponin panel, cardiac monitoring.",
            "breathing": "💨 **RESPIRATORY DISTRESS**\n\nUrgency: HIGH\n\nVital Assessment Needed:\n• Current O2 saturation?\n• Respiratory rate?\n• Associated cough or wheezing?\n• Acute or gradual onset?\n\n**Action**: Oxygen supplementation, chest X-ray, ABG analysis.",
            "default": "📋 **TRIAGE INTAKE**\n\nTo assess severity, provide:\n1. Chief complaint\n2. Symptom duration\n3. Severity (1-10)\n4. Associated symptoms\n5. Vital signs if available\n\nThis helps determine urgency and required tests."
        },
        "icu": {
            "vitals": "📊 **ICU VITAL SIGNS ANALYSIS**\n\nPlease provide:\n• Heart Rate (bpm)\n• Blood Pressure (systolic/diastolic)\n• Respiratory Rate (breaths/min)\n• O2 Saturation (%)\n• Temperature (°C/°F)\n• Glasgow Coma Scale\n\nFormat: HR 85, BP 120/80, RR 18, SpO2 97%, Temp 37°C",
            "default": "🏥 **ICU MONITORING STATUS**\n\nCurrent patient in ICU monitoring. Normal ranges:\n• HR: 60-100 bpm\n• BP: 90-120 / 60-80 mmHg\n• RR: 12-20 breaths/min\n• SpO2: >95%\n• Temp: 36.5-37.5°C\n\nProvide current vitals for analysis."
        },
        "cardiology": {
            "default": "❤️ **CARDIAC EVALUATION**\n\nTo assess cardiac risk:\n• Symptom history\n• Risk factors (HTN, DM, smoking)\n• Current medications\n• Previous cardiac events\n• ECG/troponin results\n\n**Recommended**: 12-lead ECG, echocardiogram."
        },
        "stroke": {
            "default": "⚡ **STROKE ALERT - FAST TEST**\n\nQuick assessment:\n• **F**ace - Drooping?\n• **A**rm - Weakness/drift?\n• **S**peech - Slurred/difficulty?\n• **T**ime - Note exact onset\n\nIf ANY positive → EMERGENCY\n→ STAT CT/MRI & Neurology consult"
        },
        "radiology": {
            "default": "🖼️ **MEDICAL IMAGE ANALYSIS**\n\nPlease provide:\n• Upload X-ray, CT, MRI, or Ultrasound\n• Image type?\n• Body region?\n• Clinical indication?\n• Prior images for comparison?\n\n→ AI will generate preliminary report"
        },
        "laboratory": {
            "default": "🧪 **LAB RESULT ANALYSIS**\n\nEnter test results:\n• Test type (CBC, BMP, Troponin)\n• Values and reference ranges\n• Patient age/gender\n• Clinical context\n\nExample: Hemoglobin 7.2 (normal 12-16)"
        },
        "admission": {
            "default": "📋 **ADMISSION WORKFLOW**\n\nRequired documentation:\n1. Patient demographics\n2. Insurance verification\n3. Chief complaint\n4. Medical history\n5. Medications\n6. Allergies\n7. Emergency contact\n\n→ Room assignment & nurse assignment"
        },
        "discharge": {
            "default": "📤 **DISCHARGE PLANNING**\n\nAssess discharge readiness:\n• Patient clinically stable?\n• Discharge destination?\n• Follow-up appointments?\n• Medications to prescribe?\n• Patient education complete?\n\n→ Generate discharge summary"
        }
    }

    agent_responses = responses.get(agent_id, {})

    # Check for keyword matches
    for keyword, response in agent_responses.items():
        if keyword != "default" and keyword in msg:
            return response

    # Return default response
    return agent_responses.get("default", "Please describe the patient's condition in detail.")

@app.post("/chat/agent")
async def chat_with_agent(chat: ChatMessage):
    try:
        hf_token = os.getenv("HF_TOKEN", "").strip()

        if not hf_token or hf_token == "your_huggingface_token_here":
            return {
                "status": "error",
                "message": "HF_TOKEN not configured. Get free token from https://huggingface.co/settings/tokens",
                "response": "Token not configured"
            }

        # Get agent system prompt
        system_prompt = AGENT_SYSTEM_PROMPTS.get(chat.agent_id, "You are a helpful medical AI assistant.")

        # Build conversation history
        messages = []
        if chat.history:
            for item in chat.history:
                messages.append({"role": item.get("role", "user"), "content": item.get("content", "")})

        messages.append({"role": "user", "content": chat.message})

        # Format prompt for Hugging Face
        prompt_text = f"{system_prompt}\n\n"
        for msg in messages:
            if msg["role"] == "user":
                prompt_text += f"User: {msg['content']}\n"
            else:
                prompt_text += f"Assistant: {msg['content']}\n"
        prompt_text += "Assistant:"

        # Call Hugging Face Inference API - Using a more stable model
        HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        headers = {"Authorization": f"Bearer {hf_token}"}

        payload = {
            "inputs": prompt_text,
            "parameters": {
                "max_new_tokens": 300,
                "temperature": 0.7,
                "top_p": 0.9,
                "do_sample": True
            }
        }

        print(f"[DEBUG] Calling HF API for agent: {chat.agent_id}")
        print(f"[DEBUG] Message: {chat.message}")

        try:
            response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=10)
        except Exception as hf_error:
            print(f"[FALLBACK] HF API connection failed: {str(hf_error)}")
            fallback_response = generate_smart_response(chat.agent_id, chat.message)
            return {
                "status": "success",
                "agent_id": chat.agent_id,
                "response": fallback_response,
                "role": "assistant",
                "source": "fallback"
            }

        print(f"[DEBUG] HF Response Status: {response.status_code}")
        print(f"[DEBUG] HF Response: {response.text[:500]}")

        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                generated_text = result[0].get("generated_text", "")
                # Extract only the assistant's response
                if "Assistant:" in generated_text:
                    ai_response = generated_text.split("Assistant:")[-1].strip()
                else:
                    ai_response = generated_text.strip()

                return {
                    "status": "success",
                    "agent_id": chat.agent_id,
                    "response": ai_response,
                    "role": "assistant"
                }

        # API failed - use smart fallback
        print(f"[FALLBACK] HF API unavailable, using smart response")
        fallback_response = generate_smart_response(chat.agent_id, chat.message)

        return {
            "status": "success",
            "agent_id": chat.agent_id,
            "response": fallback_response,
            "role": "assistant",
            "source": "fallback"
        }

    except requests.Timeout:
        print("[FALLBACK] Request timeout - using smart response")
        fallback_response = generate_smart_response(chat.agent_id, chat.message)
        return {
            "status": "success",
            "agent_id": chat.agent_id,
            "response": fallback_response,
            "role": "assistant",
            "source": "fallback"
        }
    except Exception as e:
        print(f"[FALLBACK] Exception: {str(e)} - using smart response")
        fallback_response = generate_smart_response(chat.agent_id, chat.message)
        return {
            "status": "success",
            "agent_id": chat.agent_id,
            "response": fallback_response,
            "role": "assistant",
            "source": "fallback"
        }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting MasterCheckAI Backend...")
    print("📍 API: http://localhost:8000")
    print("📍 Docs: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
