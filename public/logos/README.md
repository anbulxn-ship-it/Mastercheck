# Logo Files

This directory should contain the brand logos for MasterCheckAI.

## Required Files

### 1. Vijay.jpeg
**Source:** Copy from your existing Vijay Care project
```
From: c:\bhai health\public\logos\Vijay.jpeg
To: C:\Users\nagap\Desktop\MasterCheckAI\public\logos\Vijay.jpeg
```

**Usage:**
- Login page header (64x64px)
- Dashboard sidebar (40x40px)
- Dashboard header (50x50px)

### 2. Macvaar.jpg
**Source:** Copy from your existing Vijay Care project
```
From: c:\bhai health\LOGO\Macvaar.jpg
To: C:\Users\nagap\Desktop\MasterCheckAI\public\logos\Macvaar.jpg
```

**Usage:**
- Dashboard header "Powered by" section (32x32px)

## How to Add Logos

### Option 1: Copy from Existing Project
```bash
# Copy Vijay logo
copy "c:\bhai health\public\logos\Vijay.jpeg" "C:\Users\nagap\Desktop\MasterCheckAI\public\logos\Vijay.jpeg"

# Copy Macvaar logo
copy "c:\bhai health\LOGO\Macvaar.jpg" "C:\Users\nagap\Desktop\MasterCheckAI\public\logos\Macvaar.jpg"
```

### Option 2: Manual Copy
1. Navigate to `c:\bhai health\public\logos\` (or `c:\bhai health\LOGO\`)
2. Copy `Vijay.jpeg` and `Macvaar.jpg`
3. Paste into `C:\Users\nagap\Desktop\MasterCheckAI\public\logos\`

## Verified Locations in Code

The following files reference these logos:

1. **app/page.jsx** (Login Page)
   ```javascript
   <img src="/logos/Vijay.jpeg" ... />
   ```

2. **app/dashboard/layout.jsx** (Dashboard Header)
   ```javascript
   <img src="/logos/Vijay.jpeg" ... />
   <img src="/logos/Macvaar.jpg" ... />
   ```

Once logos are in place, they will automatically appear in:
- ✅ Login page header
- ✅ Sidebar (collapsed mode)
- ✅ Dashboard top bar
- ✅ "Powered by MacvaarAI" section

## Logo Specifications

### Vijay.jpeg
- Format: JPEG
- Recommended size: 64x64px minimum
- Used in: Login, Sidebar, Header (various sizes handled by CSS)
- Border: Yellow (#fbbf24)

### Macvaar.jpg
- Format: JPG
- Recommended size: 32x32px minimum
- Used in: Dashboard header "Powered by" section
- Border: Yellow (#fbbf24)

## Troubleshooting

If logos don't appear:

1. Check file names match exactly (case-sensitive on some servers)
2. Verify files are in: `public/logos/`
3. Restart Next.js dev server
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check browser console for 404 errors

## Next Steps

1. Add the logo files to this directory
2. Restart the development server: `npm run dev`
3. Logos will automatically appear in the application
4. No code changes needed!

---

**MasterCheckAI** - Enterprise Healthcare Platform
