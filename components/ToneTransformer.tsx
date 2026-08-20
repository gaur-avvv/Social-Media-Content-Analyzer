'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Flame,
  Briefcase,
  BookOpen,
  Volume2,
  Compass,
  Laptop,
  Check,
  Copy,
  RefreshCw,
  Zap,
  ArrowRight,
  SplitSquareVertical,
} from 'lucide-react';

interface ToneTransformerProps {
  content: string;
  platform: string;
  onApplyTransformation?: (newContent: string) => void;
}

const TONE_PERSONAS = [
  {
    id: 'elon_musk',
    name: 'Elon Musk / Tech Disruptor',
    category: 'First Principles & Mars Vision',
    icon: Rocket,
    color: 'from-blue-600 to-cyan-600',
    description: 'First principles physics, unfiltered conviction, Martian stakes, and high-velocity iteration.',
    sampleTag: 'First Principles',
  },
  {
    id: 'gen_z_viral',
    name: 'Gen-Z / TikTok Viral Slang',
    category: 'High Dopamine & Main Character',
    icon: Flame,
    color: 'from-rose-500 to-amber-500',
    description: 'No cap, fr fr, high-energy dopamine bursts, aesthetic pacing, and rapid-fire conversational hooks.',
    sampleTag: 'Viral Hype',
  },
  {
    id: 'corporate_executive',
    name: 'Corporate Executive (McKinsey / C-Suite)',
    category: 'ROI & Enterprise Scalability',
    icon: Briefcase,
    color: 'from-indigo-600 to-blue-700',
    description: 'Executive Briefing format, boardroom ROI alignment, operational frameworks, and high signal.',
    sampleTag: 'Boardroom ROI',
  },
  {
    id: 'cinematic_storyteller',
    name: 'Cinematic Storyteller / Novelist Thriller',
    category: 'Atmospheric Suspense & Stakes',
    icon: BookOpen,
    color: 'from-purple-600 to-indigo-600',
    description: 'Sensory worldbuilding, emotional stakes, impending danger, and breath-catching cliffhanger arcs.',
    sampleTag: 'Novel & Gaming',
  },
  {
    id: 'mrbeast_retention',
    name: 'MrBeast High-Energy Hook',
    category: 'Max Scroll-Stop Retention',
    icon: Zap,
    color: 'from-amber-500 to-rose-600',
    description: 'Extreme countdown urgency, impossible challenges, micro-rewards, and zero fluff.',
    sampleTag: 'Retention King',
  },
  {
    id: 'naval_stoic',
    name: 'Naval Ravikant / Stoic Philosopher',
    category: 'Compounding Leverage & Clarity',
    icon: Compass,
    color: 'from-emerald-600 to-teal-600',
    description: 'High signal-to-noise aphorisms, timeless mental models, and uncompromising clarity.',
    sampleTag: 'Aphorisms',
  },
  {
    id: 'steve_jobs',
    name: 'Steve Jobs Keynote Drama',
    category: 'Simplicity & "One More Thing"',
    icon: Laptop,
    color: 'from-slate-700 to-slate-900',
    description: 'Dramatic storytelling, revolutionary simplicity, poetic vision, and emotional catharsis.',
    sampleTag: 'Keynote Vision',
  },
];

export const ToneTransformer: React.FC<ToneTransformerProps> = ({
  content,
  platform,
  onApplyTransformation,
}) => {
  const [selectedTone, setSelectedTone] = useState<string>('elon_musk');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [transformedOutput, setTransformedOutput] = useState<string>('');
  const [transformedPersona, setTransformedPersona] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const executeTransformation = async (toneIdToUse?: string) => {
    if (!content || !content.trim()) return;
    const tone = toneIdToUse || selectedTone;
    setLoading(true);

    try {
      const res = await fetch('/api/transform-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          toneId: tone,
          customPrompt: tone === 'custom' ? customPrompt : undefined,
          platform,
          enableWebSearch: true,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTransformedOutput(data.transformedText || '');
      setTransformedPersona(data.personaName || '');
    } catch (err) {
      console.warn('Tone transformation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    if (!transformedOutput) return;
    navigator.clipboard.writeText(transformedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Tone & Psychological Sentiment Transformer
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-bold">
                1-CLICK VOICE REWRITE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly rewrite your content into iconic psychological personas and viral voices.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Tone Personas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {TONE_PERSONAS.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedTone === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => {
                setSelectedTone(persona.id);
                executeTransformation(persona.id);
              }}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#0f172a] border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10'
                  : 'bg-[#0b1120] hover:bg-[#0e1628] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${persona.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                    {persona.sampleTag}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                    {persona.name}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {persona.description}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className={isSelected ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                  {isSelected ? 'Active Persona' : 'Click to Rewrite'}
                </span>
                <ArrowRight
                  className={`w-3 h-3 transition-transform ${
                    isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}

        {/* Custom Persona Card */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
            selectedTone === 'custom'
              ? 'bg-[#0f172a] border-blue-500 ring-2 ring-blue-500/20'
              : 'bg-[#0b1120] border-slate-800'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20">
                Custom
              </span>
            </div>
            <div className="font-bold text-xs text-white">Custom Style Prompt</div>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Sarcastic Gordon Ramsay, Victorian Poet..."
              className="w-full bg-[#080c14] border border-slate-800 text-xs px-2.5 py-1.5 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedTone('custom');
              executeTransformation('custom');
            }}
            disabled={!customPrompt.trim()}
            className="w-full mt-3 py-1.5 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Apply Custom Style
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-10 text-center space-y-3 bg-[#0b1120] border border-slate-800 rounded-2xl animate-pulse">
          <RefreshCw className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-white font-mono">
            Rewriting Content into Persona Archetype...
          </div>
          <p className="text-[11px] text-slate-400">
            Applying psychological pacing, vocabulary anchors, and emotional cadence.
          </p>
        </div>
      )}

      {/* Transformed Result Box */}
      {transformedOutput && !loading && (
        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Transformed Output:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold">
                {transformedPersona || selectedTone}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyOutput}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Post</span>
                  </>
                )}
              </button>

              {onApplyTransformation && (
                <button
                  type="button"
                  onClick={() => onApplyTransformation(transformedOutput)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20 active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Replace in Editor</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#080c14] border border-slate-800 rounded-xl p-5 text-sm text-slate-100 leading-relaxed whitespace-pre-wrap font-sans selection:bg-purple-600">
            {transformedOutput}
          </div>
        </div>
      )}
    </div>
  );
};
