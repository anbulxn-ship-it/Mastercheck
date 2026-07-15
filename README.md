# MasterCheckAI - Enterprise Healthcare Platform

A comprehensive, scalable AI-powered healthcare platform designed for government institutions, healthcare organizations, and public health agencies.

## 🏥 Platform Overview

**MasterCheckAI** provides 17 specialized healthcare modules, each with dedicated AI agents for specific medical domains:

### Core Modules (17 Total)

1. **State AI Dashboard** - High-level governance and surveillance
2. **District AI** - District-level health management
3. **Hospital AI** - Comprehensive hospital operations (20 AI agents)
4. **PHC AI** - Primary health centers
5. **School Health AI** - Student health and wellness (10 AI agents)
6. **Women & Maternal AI** - Maternal and women's health (13 AI agents)
7. **Police Health AI** - Occupational health for law enforcement (15 AI agents)
8. **Employee Health AI** - Corporate and government employee wellness
9. **Child Health AI** - Pediatric care and development
10. **Senior Citizen AI** - Geriatric care
11. **Mobile Medical Van AI** - Outreach healthcare delivery
12. **Telemedicine AI** - Remote consultation platform
13. **Public Health Surveillance AI** - Disease tracking and outbreak monitoring
14. **Laboratory AI** - Diagnostic testing and analysis
15. **Emergency AI** - Critical care and disaster response
16. **Marketplace AI** - AI model subscription hub
17. Plus specialized modules for specific regions/needs

**Total: 200+ AI Agents across all modules**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (http://localhost:8000)

### Installation

```bash
# Navigate to project directory
cd MasterCheckAI

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

Application runs at: `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📋 Project Structure

```
MasterCheckAI/
├── app/
│   ├── layout.jsx              # Root layout
│   ├── page.jsx                # Login page
│   ├── globals.css             # Global styles & Tailwind
│   ├── data/
│   │   └── modules.js          # Module & AI agent configuration
│   └── dashboard/
│       ├── layout.jsx          # Dashboard sidebar navigation
│       ├── page.jsx            # Dashboard homepage
│       └── modules/
│           └── [id]/
│               └── page.jsx    # Module detail page
├── public/
│   └── logos/                  # Brand assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── .env.example
```

## 🔑 Key Features

### 1. Multi-Module Architecture
- 17 specialized healthcare modules
- Each module has custom AI agents
- Modular, scalable design
- Easy to add new modules

### 2. Comprehensive AI Agents
**Examples:**
- **Hospital Module**: Emergency Triage, Radiology Analysis, ECG Analysis, ICU Monitoring, Surgery Scheduling, etc.
- **School Module**: Nutrition Tracking, Growth Monitoring, Vision Screening, Mental Wellness, etc.
- **Women Module**: Maternal Health, Pregnancy Monitoring, Cancer Screening, PCOS Management, etc.
- **Police Module**: Annual Health Checks, Stress Management, Fitness Tracking, Substance Abuse Detection, etc.

### 3. Enterprise Features
- JWT-based authentication
- Bcrypt password hashing
- Role-based access control
- Real-time dashboards
- Data visualization
- Mobile-responsive design

### 4. Integration Ready
- REST API integration
- Backend API support
- Database flexibility
- Cloud-ready deployment

## 🎨 UI/UX Design

- **Modern Interface**: Clean, professional dashboard
- **Gradient Themes**: Color-coded modules for easy navigation
- **Responsive Design**: Mobile, tablet, and desktop support
- **Dark Sidebar Navigation**: Professional sidebar with all modules
- **Interactive Cards**: Hover effects and smooth transitions
- **Accessibility**: WCAG compliant

## 🔐 Authentication

### Login Flow
1. User enters email and password
2. Backend validates credentials
3. JWT token generated and stored
4. User redirected to dashboard
5. All subsequent requests include token

### Demo Credentials
```
Email: admin@vijaycare.com
Password: vijay123
```

## 📱 Modules in Detail

### State AI Dashboard
- Disease Heat Maps
- Cancer Surveillance
- NCD Dashboard
- Emergency Alerts
- Predictive Outbreak Detection
- District Performance Ranking

### Hospital AI (Most Complex)
- Emergency Department Management
- Medical Imaging Analysis
- Cardiac Monitoring
- Stroke Management
- Laboratory Test Analysis
- Bed Management
- Surgical Scheduling
- Patient Discharge Planning
- Mortality Risk Prediction

### School Health AI
- Nutrition Deficiency Tracking (Vitamin D, Iron, Calcium, etc.)
- Growth Monitoring (Height, Weight, BMI, Stunting)
- Vision Screening
- ENT Assessments
- Dental Health
- Mental Wellness Screening
- Lifestyle Tracking

### Women & Maternal AI
- Pregnancy Monitoring
- Maternal Health Tracking
- High-Risk Pregnancy Detection
- Breast Cancer Screening
- Cervical Cancer Prevention
- PCOS Management
- Postpartum Care

## 🔌 API Integration

### Backend Requirements
The platform expects a backend API with at least:
- `POST /admin/login` - Admin authentication
- `GET /admin/organizations` - Fetch organizations
- Database for storing user sessions

### Example Login Endpoint
```javascript
POST http://localhost:8000/admin/login
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "status": "success",
  "admin_id": 1,
  "name": "Admin Name",
  "role": "admin",
  "email": "admin@example.com"
}
```

## 🛠️ Technology Stack

**Frontend:**
- Next.js 14 (React framework)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- Client-side routing

**Build & Deployment:**
- Vite/Next.js build tool
- PostCSS for CSS processing
- Vercel-ready

**State Management:**
- localStorage for session management
- React hooks for component state

## 📊 Data Configuration

All modules and AI agents are defined in `app/data/modules.js`:

```javascript
{
  id: 'hospital',
  title: 'Hospital AI',
  icon: '🏥',
  color: '#dc2626',
  description: 'Comprehensive hospital management',
  aiAgents: [
    { id: 'emergency', name: 'Emergency AI', ... },
    { id: 'radiology', name: 'Radiology AI', ... },
    // ... more agents
  ]
}
```

Easy to:
- Add new modules
- Add/remove AI agents
- Change colors and icons
- Update descriptions

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Scalability

**Designed for:**
- ✅ Multiple organization types
- ✅ Thousands of concurrent users
- ✅ Real-time data processing
- ✅ High-load scenarios
- ✅ Mobile access
- ✅ Offline-capable modules

## 🔄 Development Workflow

1. **Add New Module**: Edit `app/data/modules.js`
2. **Create Module Page**: Add component in `app/dashboard/modules/[id]/`
3. **Implement AI Agents**: Add agent-specific UI
4. **Test**: Run development server
5. **Deploy**: Push to git, Vercel auto-deploys

## 📝 Environment Variables

**Required:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Optional:**
```
NEXT_PUBLIC_APP_NAME=MasterCheckAI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Create new feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review module configuration
3. Test API integration
4. Check browser console for errors

## 📄 License

This project is proprietary. All rights reserved.

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI model marketplace
- [ ] Video consultation integration
- [ ] IoT device support
- [ ] Machine learning pipelines
- [ ] Multi-language support
- [ ] Advanced reporting

## 🏆 Key Differentiators

✨ **17 Specialized Modules** - Purpose-built for different healthcare sectors
✨ **200+ AI Agents** - Comprehensive AI coverage
✨ **Enterprise Grade** - Security, scalability, reliability
✨ **Government Ready** - Compliance and interoperability
✨ **Modular Design** - Easy to customize and extend
✨ **Modern UI** - Professional, accessible interface

---

**Built with ❤️ for better healthcare**

*MasterCheckAI - Enterprise Healthcare Platform v1.0.0*
