'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, Home, BarChart3 } from 'lucide-react';
import { MASTERCHECK_MODULES } from '@/app/data/modules';
import Image from 'next/image';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('adminName') || 'Admin';
    setAdminName(name);
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 overflow-y-auto`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between gap-3">
            {sidebarOpen && (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 rounded-lg border-2 border-yellow-500 overflow-hidden">
                  <img
                    src="/logos/Vijay.jpeg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold">MasterCheckAI</h2>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition flex-shrink-0"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <Home size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* Hospital AI Demo */}
          <Link
            href="/dashboard/hospital-ai"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition text-red-300 hover:text-white"
            title="Hospital AI Demo"
          >
            <span className="text-lg">🏥</span>
            {sidebarOpen && <span className="font-semibold">Hospital AI</span>}
          </Link>

          {/* Modules */}
          {sidebarOpen && <div className="text-xs font-semibold text-slate-400 mt-6 mb-3 px-4">MODULES</div>}

          <div className={`space-y-1 ${sidebarOpen ? '' : 'space-y-3'}`}>
            {MASTERCHECK_MODULES.map((module) => (
              <Link
                key={module.id}
                href={`/dashboard/modules/${module.id}`}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm"
                title={!sidebarOpen ? module.title : ''}
              >
                <span className={`text-lg ${sidebarOpen ? '' : 'w-full text-center'}`}>{module.icon}</span>
                {sidebarOpen && <span className="truncate">{module.title}</span>}
              </Link>
            ))}
          </div>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-gray-900 via-yellow-900 to-gray-900 text-white border-b border-yellow-500 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/logos/Vijay.jpeg"
                alt="Logo"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full border-4 border-yellow-500 object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-yellow-400">MASTERCHECK AI</h1>
                <p className="text-yellow-300">AI-Driven Early Disease Detection & Identification</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-yellow-300">
                  Welcome, <span className="font-semibold">{mounted ? adminName : 'Admin'}</span>
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src="/logos/Macvaar.jpg"
                    alt="Macvaar AI"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full border-2 border-yellow-500 object-cover"
                  />
                  <div className="text-right">
                    <p className="text-xs text-yellow-300">Powered by</p>
                    <p className="text-sm font-bold text-yellow-400">MacvaarAI</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                title="Logout"
              >
                <LogOut size={24} className="text-white" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
