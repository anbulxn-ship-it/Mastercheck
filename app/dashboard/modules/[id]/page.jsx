'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getModuleById, MASTERCHECK_MODULES } from '@/app/data/modules';
import { ArrowLeft, Zap, Users, Target } from 'lucide-react';
import { useState } from 'react';

export default function ModuleDetailPage() {
  const { id } = useParams();
  const module = getModuleById(id);
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (!module) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Module not found</p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white p-8 rounded-lg shadow-sm border-b-4" style={{ borderBottomColor: module.color }}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">{module.title}</h1>
              <p className="text-slate-600 text-center">{module.subtitle}</p>
            </div>
            {module.id === 'hospital' && (
              <Link
                href="/dashboard/hospital-ai"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition whitespace-nowrap ml-6"
              >
                🏥 Open AI Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Users</p>
          <p className="text-2xl font-bold text-slate-900">—</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">AI Agents</p>
          <p className="text-2xl font-bold text-slate-900">{module.aiAgents.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Allocated Models</p>
          <p className="text-2xl font-bold text-slate-900">19</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Status</p>
          <p className="text-lg font-bold text-slate-900">Active</p>
        </div>
      </div>

      {/* AI Agents */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Specialized AI Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {module.aiAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer border-l-4"
              style={{ borderLeftColor: module.color }}
              onClick={() => setSelectedAgent(agent)}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">{agent.name}</h3>
              <p className="text-sm text-slate-600">{agent.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                <span>View Details</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedAgent.name}</h3>
          <p className="text-slate-700 mb-6">{selectedAgent.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Capabilities</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Real-time analysis and monitoring</li>
                <li>✓ Pattern recognition and prediction</li>
                <li>✓ Integration with existing systems</li>
                <li>✓ Mobile and offline support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3">Benefits</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Improved accuracy and efficiency</li>
                <li>✓ Data-driven decision making</li>
                <li>✓ Reduced operational costs</li>
                <li>✓ Enhanced patient outcomes</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setSelectedAgent(null)}
            className="mt-6 px-6 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400 transition"
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}
