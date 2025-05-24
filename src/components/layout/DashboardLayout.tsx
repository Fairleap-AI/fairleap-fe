"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiDollarSign,
  FiMapPin,
  FiHeart,
  FiShield,
  FiLogOut,
  FiSettings,
  FiBell,
  FiMenu,
  FiX,
  FiMessageCircle,
  FiSend,
  FiHome,
  FiPieChart,
  FiCalendar,
  FiBookOpen,
  FiActivity
} from "react-icons/fi";

// Navigation menu items
const menuItems = [
  { icon: FiHome, label: "Dashboard", href: "/dashboard" },
  { icon: FiDollarSign, label: "Earnings Calculator", href: "/dashboard/earnings" },
  { icon: FiMapPin, label: "Route Planner", href: "/dashboard/route-planner" },
  { icon: FiHeart, label: "Wellness Check", href: "/dashboard/wellness" },
  { icon: FiShield, label: "Financial Advisor", href: "/dashboard/financial-advisor" },
  { icon: FiPieChart, label: "Analytics", href: "/dashboard/analytics" },
];

// Chatbot messages interface
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: {
    icon: React.ElementType;
    text: string;
  };
}

export default function DashboardLayout({ children, title, subtitle, badge }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Halo! Saya FairLeap AI Assistant. Bagaimana saya bisa membantu Anda hari ini?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }

    // Scroll detection for floating chatbot
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHeaderVisible(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/sign-in");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('penghasilan') || lowerMessage.includes('earning')) {
      return 'Berdasarkan data Anda, prediksi penghasilan hari ini adalah Rp 325K. Untuk meningkatkan earnings, saya sarankan fokus di area Menteng pada jam 17:00-19:00. Area ini memiliki demand tinggi dengan multiplier 1.2x.';
    } else if (lowerMessage.includes('rute') || lowerMessage.includes('route')) {
      return 'Untuk optimasi rute hari ini, hindari Jl. Sudirman pada jam 16:00-18:00 karena macet. Alternatif terbaik: Jl. Rasuna Said → Kuningan → Menteng. Estimasi peningkatan income 15-20%.';
    } else if (lowerMessage.includes('kesehatan') || lowerMessage.includes('wellness')) {
      return 'Wellness score Anda saat ini 75% - kondisi baik! Untuk menjaga stamina optimal, jangan lupa istirahat 15 menit setiap 2 jam kerja dan minum air minimal 8 gelas per hari.';
    } else if (lowerMessage.includes('bonus')) {
      return 'Untuk mencapai bonus mingguan Rp 150K, Anda perlu 12 trip hari ini. Berdasarkan pola kerja Anda, ini sangat achievable! Focus di peak hours dan area high-demand.';
    } else {
      return 'Terima kasih atas pertanyaannya! Saya bisa membantu dengan prediksi penghasilan, optimasi rute, wellness tips, dan strategi earnings. Ada yang spesifik ingin Anda tanyakan?';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 flex">
      {/* Left Sidebar */}
      <div className={`${leftSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white/80 backdrop-blur-sm border-r border-slate-200 h-screen fixed left-0 top-0 z-20 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          {leftSidebarOpen && (
            <div className="flex items-center space-x-2">
              <img src="/icon-only.png" alt="FairLeap" className="h-8 w-8" />
              <span className="font-bold text-slate-800">FairLeap</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="text-slate-600"
          >
            <FiMenu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu - Internal scroll */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${leftSidebarOpen ? 'px-4' : 'px-2'} ${
                    isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className={`h-5 w-5 ${leftSidebarOpen ? 'mr-3' : ''}`} />
                  {leftSidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            className={`w-full justify-start ${leftSidebarOpen ? 'px-4' : 'px-2'} text-red-600 hover:text-red-700 hover:bg-red-50`}
            onClick={handleLogout}
          >
            <FiLogOut className={`h-5 w-5 ${leftSidebarOpen ? 'mr-3' : ''}`} />
            {leftSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${leftSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>
            {subtitle && (
              <p className="text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {badge && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <badge.icon className="w-3 h-3 mr-1" />
                {badge.text}
              </Badge>
            )}
            
            <Button variant="ghost" size="sm">
              <FiBell className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <FiSettings className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="text-emerald-600"
            >
              <FiMessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Content Area with dynamic margin */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${rightSidebarOpen ? 'mr-80' : 'mr-0'}`}>
          {children}
        </div>
      </div>

      {/* Right Sidebar - Chatbot */}
      <div className={`${rightSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white/80 backdrop-blur-sm border-l border-slate-200 h-screen fixed right-0 top-0 z-30 flex flex-col overflow-hidden`}>
        {rightSidebarOpen && (
          <>
            {/* Chatbot Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-slate-800">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightSidebarOpen(false)}
                className="text-slate-600"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages - Internal scroll with fixed height */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-emerald-500 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input - Fixed at bottom with compact height */}
            <div className="border-t border-slate-200 bg-white flex-shrink-0">
              <div className="p-3 space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tanya seputar earnings, rute, wellness..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 text-sm h-9"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 h-9 px-3"
                    size="sm"
                  >
                    <FiSend className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick Actions - Compact */}
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage('Bagaimana cara meningkatkan penghasilan hari ini?')}
                    className="text-xs px-2 py-1 h-6"
                  >
                    💰
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage('Rute mana yang terbaik saat ini?')}
                    className="text-xs px-2 py-1 h-6"
                  >
                    🗺️
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage('Cek wellness score saya')}
                    className="text-xs px-2 py-1 h-6"
                  >
                    ❤️
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Chatbot Button - Shows when header is not visible */}
      {!isHeaderVisible && !rightSidebarOpen && (
        <Button
          onClick={() => setRightSidebarOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg z-50 flex items-center justify-center"
          size="sm"
        >
          <FiMessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
} 