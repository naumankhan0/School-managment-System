import React from 'react';
import { 
  Users, 
  UserCheck, 
  Backpack, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const stats = [
  { label: 'Total Students', value: '2,405', icon: Backpack, change: '+12%', trend: 'up', color: 'blue' },
  { label: 'Total Teachers', value: '142', icon: UserCheck, change: '+2', trend: 'up', color: 'indigo' },
  { label: 'Total Parents', value: '1,890', icon: Users, change: '+5%', trend: 'up', color: 'purple' },
  { label: 'Monthly Income', value: '$45,210', icon: DollarSign, change: '+8%', trend: 'up', color: 'emerald' },
  { label: 'Monthly Expense', value: '$22,150', icon: AlertCircle, change: '-4%', trend: 'down', color: 'rose' },
];

const data = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

const studentGrowth = [
  { year: '2019', students: 1200 },
  { year: '2020', students: 1500 },
  { year: '2021', students: 1800 },
  { year: '2022', students: 2100 },
  { year: '2023', students: 2405 },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number, key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
        <stat.icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {stat.change}
        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
      <h3 className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
    </div>
  </motion.div>
);

export const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
      {/* Metrics Row */}
      {stats.slice(0, 4).map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}

      {/* Main Bento Area */}
      <div className="lg:col-span-2 lg:row-span-2 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl group border border-white/5">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Question Studio</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-[280px] leading-relaxed">
              Generate automated test papers and quizzes from your syllabus files in seconds using EduNext AI.
            </p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-400 px-8 py-3 rounded-2xl font-bold text-sm transition-all w-fit shadow-xl shadow-indigo-500/20">
            Launch AI Studio
          </button>
        </div>
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />
        <div className="absolute top-10 right-10 text-8xl opacity-10 font-serif italic pointer-events-none group-hover:scale-110 transition-transform">AI</div>
      </div>

      <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-indigo-200 transition-colors">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-bold text-slate-900">Financial Health Index</h3>
            <p className="text-xs text-slate-400 font-medium">Monthly revenue stream vs target</p>
          </div>
          <div className="text-xs text-indigo-600 font-bold uppercase tracking-widest cursor-pointer hover:underline">
            Full Ledger
          </div>
        </div>
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="income" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={24} />
              <Bar dataKey="expense" fill="#e2e8f0" radius={[8, 8, 8, 8]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          {data.map(d => <span key={d.name} className="w-8 text-center">{d.name}</span>)}
        </div>
      </div>

      {/* Row 3 Activity & More */}
      <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-emerald-200 transition-colors">
        <h3 className="font-bold text-slate-900 mb-6">Recent Admission Inquiries</h3>
        <div className="space-y-5 flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-5 group/item cursor-pointer">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover/item:scale-110",
                i === 1 ? "bg-amber-50 text-amber-600" : i === 2 ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
              )}>
                {i === 1 ? <Users className="w-6 h-6" /> : i === 2 ? <UserCheck className="w-6 h-6" /> : <Backpack className="w-6 h-6" />}
              </div>
              <div className="flex-1 border-b border-slate-50 pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold text-slate-900">New Admission Request: Grade {i + 5}</div>
                    <div className="text-xs text-slate-400 font-medium">Front Desk • {i*12} mins ago</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/item:text-slate-900 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 flex flex-col justify-between relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="font-bold text-lg leading-tight mb-4">Generate Result Cards</h3>
          <div className="space-y-3">
            <div className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex items-center justify-between text-xs font-bold transition-colors cursor-pointer">
              <span>Primary Division</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex items-center justify-between text-xs font-bold transition-colors cursor-pointer">
              <span>Secondary Division</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="mt-8 relative z-10">
          <div className="text-[10px] opacity-60 font-bold uppercase tracking-widest mb-1">Status</div>
          <div className="text-xs font-bold">Awaiting Audit Approval</div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 border-dashed shadow-sm p-8 flex flex-col items-center justify-center text-center group hover:bg-slate-50 transition-colors cursor-pointer">
        <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 text-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
          +
        </div>
        <div className="text-sm font-bold text-slate-900">Quick Module</div>
        <div className="text-xs text-slate-400 font-medium mt-1">Pin your favorite module for easy access</div>
      </div>
    </div>
  );
};
