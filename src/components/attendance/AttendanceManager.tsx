import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Search, 
  Filter, 
  Check, 
  X, 
  Clock, 
  Save,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const mockStudents = [
  { id: '1', name: 'Zoe Campbell', rollNo: '101', status: 'present' },
  { id: '2', name: 'Liam Dawson', rollNo: '102', status: 'absent' },
  { id: '3', name: 'Ava Fischer', rollNo: '103', status: 'present' },
  { id: '4', name: 'Noah Geller', rollNo: '104', status: 'late' },
  { id: '5', name: 'Emma Hayes', rollNo: '105', status: 'present' },
];

export const AttendanceManager = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState(mockStudents);

  const toggleStatus = (id: string, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const stats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mark Attendance</h1>
          <p className="text-slate-500 mt-1">Daily attendance management for students and staff.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <Save className="w-5 h-5" />
            Save Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              Quick Filters
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Academic Year</label>
              <select className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm">
                <option>2023 - 2024</option>
                <option>2024 - 2025</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Class / Section</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm"
              >
                <option>Grade 8-B</option>
                <option>Grade 9-A</option>
                <option>Grade 10-A</option>
                <option>Grade 10-B</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider mb-6">Today's Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Present</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold">{stats.present}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Absent</span>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-lg text-sm font-bold">{stats.absent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Late / Half Day</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-bold">{stats.late}</span>
                </div>
                <div className="w-full h-[1px] bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-xs opacity-60">Completion</span>
                  <span className="text-xl font-bold">85%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full translate-x-12 -translate-y-12" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">Student List</h3>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedClass}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                <span className="text-sm font-bold text-slate-900 mx-2">Today</span>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={student.id} 
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-500 italic">{student.rollNo}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
                          <span className="text-sm font-bold text-slate-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => toggleStatus(student.id, 'present')}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              student.status === 'present' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-slate-50 text-slate-400 grayscale hover:grayscale-0 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200"
                            )}
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => toggleStatus(student.id, 'absent')}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              student.status === 'absent' ? "bg-rose-600 text-white shadow-lg shadow-rose-100" : "bg-slate-50 text-slate-400 grayscale hover:grayscale-0 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
                            )}
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => toggleStatus(student.id, 'late')}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              student.status === 'late' ? "bg-amber-500 text-white shadow-lg shadow-amber-100" : "bg-slate-50 text-slate-400 grayscale hover:grayscale-0 hover:bg-amber-50 hover:text-amber-500 border border-slate-200"
                            )}
                          >
                            <Clock className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-slate-500">
              <p className="text-sm font-medium">Showing 5 students of 42 total in class 10-A</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-bold hover:text-slate-900 transition-colors">Mark all Present</button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Bulk Action</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
