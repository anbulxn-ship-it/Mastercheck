'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Upload, Phone, Video, Music, Loader } from 'lucide-react';

const HospitalAIDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState('emergency');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      type: 'text',
      content: 'Hello! I am Emergency AI Triage Assistant. Describe patient symptoms for severity assessment.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('P001');
  const [isLoading, setIsLoading] = useState(false);

  // Hospital Agents
  const agents = [
    {
      id: 'emergency',
      name: 'Emergency AI',
      icon: '🚨',
      description: 'Triage & severity assessment',
      color: '#dc2626'
    },
    {
      id: 'icu',
      name: 'ICU AI',
      icon: '🖥️',
      description: 'Critical care monitoring',
      color: '#2563eb'
    },
    {
      id: 'cardiology',
      name: 'Cardiology AI',
      icon: '❤️',
      description: 'Heart disease assessment',
      color: '#ec4899'
    },
    {
      id: 'stroke',
      name: 'Stroke AI',
      icon: '⚡',
      description: 'FAST assessment & response',
      color: '#f97316'
    },
    {
      id: 'radiology',
      name: 'Radiology AI',
      icon: '🖼️',
      description: 'Medical image analysis',
      color: '#06b6d4'
    },
    {
      id: 'laboratory',
      name: 'Laboratory AI',
      icon: '🧪',
      description: 'Test result analysis',
      color: '#8b5cf6'
    },
    {
      id: 'admission',
      name: 'Admission AI',
      icon: '📋',
      description: 'Patient admission workflow',
      color: '#10b981'
    },
    {
      id: 'discharge',
      name: 'Discharge AI',
      icon: '📤',
      description: 'Discharge planning & care',
      color: '#6366f1'
    }
  ];

  // Mock patients
  const patients = [
    { id: 'P001', name: 'John Doe', age: 45, status: 'Emergency' },
    { id: 'P002', name: 'Jane Smith', age: 62, status: 'ICU' },
    { id: 'P003', name: 'Mike Johnson', age: 38, status: 'Ward' }
  ];

  const currentAgent = agents.find(a => a.id === selectedAgent);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedFile) return;

    setIsLoading(true);

    // Add user message
    const userMsg = {
      id: chatMessages.length + 1,
      sender: 'user',
      type: uploadedFile ? 'image' : 'text',
      content: inputMessage,
      file: uploadedFile,
      timestamp: new Date()
    };

    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);

    try {
      // Prepare chat history (only text messages)
      const history = chatMessages
        .filter(m => m.type === 'text')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content
        }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: selectedAgent,
          message: inputMessage,
          patient_id: selectedPatient,
          history: history
        })
      });

      const data = await response.json();

      const agentResponse = {
        id: newMessages.length + 1,
        sender: 'agent',
        type: 'text',
        content: data.response || data.message || 'Service error. Try again.',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse = {
        id: newMessages.length + 1,
        sender: 'agent',
        type: 'text',
        content: `Error: ${error.message}. Make sure backend is running at ${process.env.NEXT_PUBLIC_API_URL}`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
      setUploadedFile(null);
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        type: file.type,
        size: file.size
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white p-8 rounded-lg shadow-sm border-b-4 border-red-600">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Hospital AI Dashboard</h1>
          <p className="text-slate-600 text-center">Advanced healthcare management with AI-powered diagnostics</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Active Patients</p>
          <p className="text-2xl font-bold text-slate-900">247</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border-b-2 border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">AI Agents</p>
          <p className="text-2xl font-bold text-slate-900">8</p>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Agent Selection & Patient Selection */}
        <div className="space-y-6">
          {/* Agent Selector */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Hospital Agents</h3>
            <div className="space-y-2">
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent.id);
                    setChatMessages([{
                      id: 1,
                      sender: 'agent',
                      type: 'text',
                      content: `Hello! I am ${agent.name}. ${agent.description}. How can I help you today?`,
                      timestamp: new Date()
                    }]);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedAgent === agent.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{agent.icon} {agent.name}</div>
                  <div className="text-xs text-slate-600">{agent.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Patients</h3>
            <div className="space-y-2">
              {patients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedPatient === patient.id
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{patient.name}</div>
                  <div className="text-xs text-slate-600">{patient.age} years • {patient.status}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Chat */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{currentAgent?.icon}</span>
                  {currentAgent?.name}
                </h2>
                <p className="text-sm text-slate-600 mt-1">{currentAgent?.description}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">
                  {patients.find(p => p.id === selectedPatient)?.name}
                </div>
                <div className="text-sm text-slate-600">
                  {patients.find(p => p.id === selectedPatient)?.status}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.file && (
                    <div className="mt-2 text-xs opacity-75">
                      📎 {msg.file.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-6 space-y-3">
            {uploadedFile && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-slate-700">
                📎 {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)}KB)
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Describe symptoms, test results, or medical findings..."
                disabled={isLoading}
                className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:bg-slate-400"
              >
                {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>

            {/* Upload Buttons */}
            <div className="flex gap-2">
              <label className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg cursor-pointer transition">
                <Upload size={18} />
                <span className="text-sm">Image</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition">
                <Video size={18} />
                <span className="text-sm">Video</span>
              </button>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition">
                <Music size={18} />
                <span className="text-sm">Audio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAIDashboard;
