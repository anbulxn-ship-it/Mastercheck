'use client';

import Link from 'next/link';
import { MASTERCHECK_MODULES } from '@/app/data/modules';
import { BarChart3, Users, Zap } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Modules', value: MASTERCHECK_MODULES.length, icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { label: 'AI Agents', value: MASTERCHECK_MODULES.reduce((sum, m) => sum + m.aiAgents.length, 0), icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Active Deployments', value: '1', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="gradient-hero rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to MasterCheckAI</h2>
        <p className="text-slate-300">
          Enterprise AI-powered healthcare platform for government institutions and healthcare organizations
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                <Icon size={24} className="opacity-50" />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Modules Grid */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Healthcare Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTERCHECK_MODULES.map((module) => (
            <Link
              key={module.id}
              href={`/dashboard/modules/${module.id}`}
              className="module-card group"
              style={{ borderLeftColor: module.color }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {module.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{module.subtitle}</p>
                </div>
                <span className="text-3xl">{module.icon}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4">{module.description}</p>

              {/* AI Agents Count */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-xs font-semibold text-slate-500">
                  {module.aiAgents.length} AI Agents
                </span>
                <span className="text-lg group-hover:translate-x-2 transition">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Platform Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{MASTERCHECK_MODULES.length}</p>
            <p className="text-xs text-slate-600">Healthcare Modules</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{MASTERCHECK_MODULES.reduce((sum, m) => sum + m.aiAgents.length, 0)}</p>
            <p className="text-xs text-slate-600">Specialized AI Agents</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">500+</p>
            <p className="text-xs text-slate-600">Healthcare Features</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">24/7</p>
            <p className="text-xs text-slate-600">Platform Availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
