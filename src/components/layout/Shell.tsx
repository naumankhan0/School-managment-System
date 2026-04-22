import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  CreditCard, 
  Library, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  BrainCircuit,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
  key?: string | number;
}

const SidebarItem = ({ icon: Icon, label, href, active, onClick }: SidebarItemProps) => (
  <Link
    to={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-indigo-600/10 text-indigo-400 shadow-sm" 
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-indigo-400" : "text-slate-500 opacity-80 group-hover:text-slate-200")} />
    <span className="font-medium">{label}</span>
    {active && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
      />
    )}
  </Link>
);

export const Shell = ({ children, role = 'admin' }: { children: React.ReactNode, role?: string }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Academics', icon: BookOpen, href: '/academics' },
    { label: 'Students', icon: Users, href: '/students' },
    { label: 'Attendance', icon: CheckSquare, href: '/attendance' },
    { label: 'Examinations', icon: FileText, href: '/exams' },
    { label: 'AI Generator', icon: BrainCircuit, href: '/ai-tools' },
    { label: 'Fees & Finance', icon: CreditCard, href: '/finance' },
    { label: 'Library', icon: Library, href: '/library' },
    { label: 'Communication', icon: MessageSquare, href: '/communication' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '0px', x: isSidebarOpen ? 0 : -280 }}
        className={cn(
          "bg-[#0F172A] border-r border-slate-800 flex flex-col z-50 fixed lg:relative h-full overflow-hidden text-slate-400",
          !isSidebarOpen && "lg:w-0 border-none"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">EduNext <span className="text-slate-500 font-normal italic">Pro</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</div>
          {navigation.map((item) => (
            <SidebarItem 
              key={item.href}
              {...item}
              active={location.pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center font-bold text-white">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-[10px] uppercase text-slate-500 font-bold truncate tracking-wider">{role}</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-[#F8FAFC] flex justify-between items-center px-8 border-none">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col ml-2">
              <h1 className="text-2xl font-bold text-slate-900">Institute Overview</h1>
              <p className="text-slate-500 text-sm">Academic Session: 2024-2025 • Term 2</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center opacity-40 group-focus-within:opacity-100 transition-opacity">
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Global search..." 
                className="bg-white border border-slate-200 rounded-full px-10 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
              />
            </div>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors shadow-sm relative">
              <Bell className="w-5 h-5 opacity-80" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 transition-colors bg-white p-0.5 shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full rounded-full" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
