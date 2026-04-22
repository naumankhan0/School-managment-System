import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Upload, 
  FileText, 
  Sparkles, 
  History, 
  Settings2,
  CheckCircle2,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// Gemini Initialization
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface GeneratedQuestion {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export const AIQuestionGenerator = () => {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [settings, setSettings] = useState({
    subject: 'General',
    grade: 'Grade 10',
    difficulty: 'Medium',
    count: 5,
    type: 'Multiple Choice'
  });

  const handleGenerate = async () => {
    if (!prompt && inputMode === 'text') return;
    setIsGenerating(true);

    try {
      const systemInstruction = `You are an expert academic examiner. 
      Generate ${settings.count} ${settings.difficulty} difficulty ${settings.type} questions for ${settings.grade} in the subject of ${settings.subject}.
      Base the questions on the provided context if available, otherwise use general knowledge.
      Return the response in a structured JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: `Context: ${prompt}` },
          { text: `Requirements: Generate ${settings.count} questions.` }
        ],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "Options for multiple choice, omit if not applicable"
                },
                answer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["question", "answer", "explanation"]
            }
          }
        }
      });

      const result = JSON.parse(response.text || "[]");
      setQuestions(result);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            AI Question Generator
          </h1>
          <p className="text-slate-500 mt-1">Generate high-quality academic questions in seconds using AI.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setInputMode('text')}
            className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-all", inputMode === 'text' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
          >
            Text Prompt
          </button>
          <button 
            onClick={() => setInputMode('file')}
            className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-all", inputMode === 'file' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
          >
            Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-slate-400" />
              Generation Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input 
                  type="text" 
                  value={settings.subject}
                  onChange={(e) => setSettings({...settings, subject: e.target.value})}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-slate-900"
                  placeholder="e.g. Physics, History"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Grade Level</label>
                <select 
                  value={settings.grade}
                  onChange={(e) => setSettings({...settings, grade: e.target.value})}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-slate-900"
                >
                  <option>Primary</option>
                  <option>Grade 6</option>
                  <option>Grade 10</option>
                  <option>College</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
                  <select 
                    value={settings.difficulty}
                    onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-slate-900"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Q-Count</label>
                  <input 
                    type="number" 
                    value={settings.count}
                    onChange={(e) => setSettings({...settings, count: parseInt(e.target.value) || 1})}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Question Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Multiple Choice', 'True / False', 'Short Answer'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setSettings({...settings, type: t})}
                      className={cn(
                        "text-left px-4 py-2 rounded-lg text-sm transition-all border",
                        settings.type === t ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt & Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            {inputMode === 'text' ? (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-900">Enter Topic or Content</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-40 bg-slate-50 border-slate-200 rounded-3xl p-6 text-sm focus:ring-slate-900 transition-all resize-none shadow-inner"
                  placeholder="Paste your lesson content or describe the topic..."
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-4 hover:border-indigo-400 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX, Images (Max 10MB)</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 transition-all"
              >
                {isGenerating ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Questions
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Generated Questions
            </h3>

            {questions.length === 0 && !isGenerating && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center">
                <Sparkles className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">Your generated questions will appear here.</p>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-4">
                    <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-50 rounded-full w-1/2" />
                      <div className="h-3 bg-slate-50 rounded-full w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {questions.map((q, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">Question {idx + 1}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded bg-slate-50"><Copy className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded bg-slate-50"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="font-bold text-slate-900 mb-4">{q.question}</p>
                
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl text-sm border border-slate-100 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Correct Answer
                  </p>
                  <p className="text-sm font-bold text-emerald-900">{q.answer}</p>
                  <p className="text-xs text-emerald-600 italic mt-2">{q.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
