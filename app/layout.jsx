import './globals.css'

export const metadata = {
  title: 'MasterCheckAI - Enterprise Health Platform',
  description: 'Comprehensive AI-driven healthcare platform for government institutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
