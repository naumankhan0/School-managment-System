import React, { useState } from 'react';
import { BookOpen, User, Shield, GraduationCap, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const Login = ({ onLogin }: { onLogin: (role: string) => void }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    { id: 'admin', label: 'Administrator', icon: Shield, color: 'slate' },
    { id: 'teacher', label: 'Teacher', icon: GraduationCap, color: 'indigo' },
    { id: 'student', label: 'Student', icon: User, color: 'blue' },
    { id: 'parent', label: 'Parent', icon: Users, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-900 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900 rounded-full blur-[120px] opacity-20" />

      <div className="max-w-[480px] w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2 uppercase">EduNext <span className="font-light italic text-slate-500 font-serif lowercase">Pro</span></h1>
          <p className="text-slate-400 font-medium">Academic Excellence through Digital Innovation</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111111] border border-white/10 p-8 rounded-[32px] shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold text-white mb-2">Access Portal</h2>
          <p className="text-sm text-slate-500 mb-8">Select your role to continue to the system.</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-300 text-left group flex flex-col gap-3",
                  selectedRole === role.id 
                    ? "bg-white border-white text-black" 
                    : "bg-[#161616] border-white/5 text-slate-400 hover:border-white/20 hover:bg-[#1a1a1a]"
                )}
              >
                <role.icon className={cn("w-6 h-6", selectedRole === role.id ? "text-black" : "text-slate-500 group-hover:text-white")} />
                <span className="font-bold text-sm tracking-tight">{role.label}</span>
              </button>
            ))}
          </div>

          <button 
            disabled={!selectedRole}
            onClick={() => selectedRole && onLogin(selectedRole)}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl shadow-white/5"
          >
            Authenticate Profile
          </button>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-xs text-slate-600 font-medium tracking-widest uppercase">Secured by Biometric Cloud</p>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-slate-600 font-medium">
          © 2024 EduNext Digital Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};
