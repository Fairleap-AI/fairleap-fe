"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardWrapper } from "@/components/DashboardWrapper";
import { RefreshButton } from "@/components/RefreshButton";
import {
  FiDollarSign,
  FiHeart,
  FiShield,
  FiLogOut,
  FiSettings,
  FiBell,
  FiMenu,
  FiX,
  FiSend,
  FiHome,
  FiPieChart,
  FiCalendar,
  FiBookOpen,
  FiActivity,
  FiUser
} from "react-icons/fi";

// Navigation menu items
const menuItems = [
  { icon: FiHome, label: "Dashboard", href: "/dashboard" },
  { icon: FiDollarSign, label: "Earnings Calculator", href: "/dashboard/earnings" },
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages, isTyping]);

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
    if (!newMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    setNewMessage('');
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Simple AI responses based on keywords
    if (lowerMessage.includes('penghasilan') || lowerMessage.includes('earnings') || lowerMessage.includes('income')) {
      return "Untuk optimasi penghasilan, gunakan fitur Earnings Calculator kami. Anda juga bisa lihat pola penghasilan harian di dashboard analytics.";
    } else if (lowerMessage.includes('kesehatan') || lowerMessage.includes('wellness') || lowerMessage.includes('sehat')) {
      return "Sangat bagus bahwa Anda peduli dengan kesehatan! Coba fitur Wellness Check untuk monitor kondisi harian dan dapatkan tips kesehatan yang dipersonalisasi.";
    } else if (lowerMessage.includes('investasi') || lowerMessage.includes('financial') || lowerMessage.includes('uang')) {
      return "Untuk perencanaan finansial dan investasi, saya sarankan konsultasi dengan Financial Advisor kami. Mereka bisa membantu strategi investasi yang sesuai profil Anda.";
    } else if (lowerMessage.includes('analytics') || lowerMessage.includes('laporan') || lowerMessage.includes('data')) {
      return "Anda bisa lihat analytics lengkap penghasilan, pola kerja, dan performa di menu Analytics. Data real-time tersedia 24/7.";
    } else {
      return "Halo! Saya siap membantu Anda dengan informasi seputar penghasilan, kesehatan, investasi, dan analytics. Ada yang bisa saya bantu hari ini?";
    }
  };

  return (
    <DashboardWrapper>
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
          <div className="p-4 border-t border-slate-200 space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${leftSidebarOpen ? 'px-4' : 'px-2'} text-slate-600 hover:text-slate-800 hover:bg-slate-100`}
              onClick={() => router.push('/dashboard/profile')}
            >
              <FiUser className={`h-5 w-5 ${leftSidebarOpen ? 'mr-3' : ''}`} />
              {leftSidebarOpen && <span>Profile</span>}
            </Button>
            
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
          <header className={`h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300 ${
            rightSidebarOpen ? 'mr-80' : ''
          }`}>
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
              
              {/* Manual Refresh Button */}
              <RefreshButton showText={false} />
              
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
                className={`transition-colors duration-200 ${
                  rightSidebarOpen 
                    ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' 
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <img src="/Chatbot.png" alt="Chatbot" className="h-6 w-6" />
              </Button>
            </div>
          </header>

          {/* Main Content Area with dynamic margin */}
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${rightSidebarOpen ? 'mr-80' : ''}`}>
            {children}
          </div>
        </div>

        {/* Right Sidebar - Chatbot */}
        {rightSidebarOpen && (
          <div className="w-80 transition-all duration-300 bg-white/80 backdrop-blur-sm border-l border-slate-200 h-screen fixed right-0 top-0 z-30 flex flex-col overflow-hidden md:w-80">
            {/* Mobile Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
              onClick={() => setRightSidebarOpen(false)}
            />
            
            {/* Chatbot Content */}
            <div className="relative z-30 h-full flex flex-col bg-white md:bg-white/80 md:backdrop-blur-sm w-80 ml-auto">
              {/* Chatbot Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 flex-shrink-0 bg-gradient-to-r from-emerald-50 to-blue-50">
                <div className="flex items-center space-x-2">
                  <img src="/Chatbot.png" alt="Chatbot" className="h-8 w-8" />
                  <span className="font-semibold text-slate-800">AI Assistant</span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 text-xs">
                    Online
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightSidebarOpen(false)}
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                >
                  <FiX className="h-5 w-5" />
                </Button>
              </div>

              {/* Chat Messages - Scrollable area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-sm' 
                        : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-emerald-100' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-800 rounded-lg rounded-bl-sm p-3">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs text-slate-500 ml-2">AI sedang mengetik...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input - Fixed at bottom */}
              <div className="border-t border-slate-200 bg-white flex-shrink-0">
                <div className="p-3 space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tanya seputar earnings, rute, wellness..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
                      disabled={isTyping}
                      className="flex-1 text-sm h-9"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isTyping}
                      className="bg-emerald-600 hover:bg-emerald-700 h-9 px-3 disabled:opacity-50"
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
                      onClick={() => setNewMessage('Lihat analytics penghasilan saya')}
                      className="text-xs px-2 py-1 h-6"
                    >
                      📊
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
            </div>
          </div>
        )}

        {/* Floating Chatbot Button - Shows when header is not visible */}
        {!isHeaderVisible && !rightSidebarOpen && (
          <Button
            onClick={() => setRightSidebarOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg z-50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            size="sm"
          >
            <img src="/Chatbot.png" alt="Chatbot" className="h-8 w-8" />
          </Button>
        )}

        {/* Mobile: Close chatbot when clicking outside on mobile */}
        {rightSidebarOpen && (
          <div 
            className="fixed inset-0 bg-transparent z-25 md:hidden"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
      </div>
    </DashboardWrapper>
  );
} 