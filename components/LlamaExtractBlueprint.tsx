'use client';

import React, { useState } from 'react';
import { Target, Users, Anchor, Volume2, CheckCircle2, XCircle, Code, ListCheck, Sparkles } from 'lucide-react';

interface BlueprintProps {
  blueprint: {
    coreTopic: string;
    targetAudience: string;
    detectedHooks: string[];
    density: string;
    hasCallToAction: boolean;
    tone: string;
    keyClaims: string[];
    sentiment?: string;
  };
}

export const LlamaExtractBlueprint: React.FC<BlueprintProps> = ({ blueprint }) => {
  const [viewJson, setViewJson] = useState(false);

  return (
    <div className="bg-[#0f172a]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                Schema Blueprint & Entity Extraction
              </h3>
              <p className="text-[11px] text-slate-400">
                Pydantic-aligned schema verification extracted from multimodal asset payloads
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setViewJson(!viewJson)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer font-mono shadow-sm active:scale-95"
        >
          <Code className="w-3.5 h-3.5" />
          {viewJson ? 'Visual Schema View' : 'Raw JSON Blueprint'}
        </button>
      </div>

      {viewJson ? (
        <pre className="bg-[#080c14] border border-slate-800 rounded-xl p-4.5 font-mono text-xs text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
          {JSON.stringify(blueprint, null, 2)}
        </pre>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Topic & Target Audience */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4.5 space-y-3.5 shadow-md">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <Target className="w-4 h-4 text-blue-400" />
              Core Topic & Persona
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Identified Topic:</span>
                <div className="text-sm font-bold text-white mt-0.5 font-sans">{blueprint.coreTopic}</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Target Audience Persona:</span>
                <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5 font-sans">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  {blueprint.targetAudience}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Tone:</span>
                <span className="px-2.5 py-0.5 bg-slate-800 rounded-full text-xs font-mono font-medium text-purple-300">
                  {blueprint.tone || 'Insightful'}
                </span>
                {blueprint.sentiment && (
                  <span className="px-2.5 py-0.5 bg-slate-800 rounded-full text-xs font-mono font-medium text-emerald-300">
                    {blueprint.sentiment}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Layout Density & CTA Status */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4.5 space-y-3.5 shadow-md">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              Ingestion Heuristics & Conversion
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#080c14] border border-slate-800 rounded-lg p-3 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Layout Density</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      blueprint.density === 'high-density' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  {blueprint.density === 'high-density' ? 'High Density' : 'Normal'}
                </div>
              </div>

              <div className="bg-[#080c14] border border-slate-800 rounded-lg p-3 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-semibold font-mono">Call To Action</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  {blueprint.hasCallToAction ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Present</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300">Needs Insertion</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 leading-relaxed bg-[#080c14] p-3 rounded-lg border border-slate-800 font-mono">
              {blueprint.density === 'high-density'
                ? '⚡ Document contains high-density information. Multi-hop knowledge graph triggered layout:high-density transformation rule.'
                : '✓ Document structure contains optimal spacing. Direct visual-first matrix applied.'}
            </div>
          </div>

          {/* Card 3: Detected Angles & Hooks */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4.5 space-y-3 md:col-span-2 shadow-md">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <Anchor className="w-4 h-4 text-amber-400" />
              Detected High-Retention Hooks in Asset ({blueprint.detectedHooks?.length || 0})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(blueprint.detectedHooks || []).map((hook, idx) => (
                <div
                  key={idx}
                  className="bg-[#080c14] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 flex items-start gap-3 shadow-inner"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 border border-amber-500/30 font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{hook}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Key Claims & Quantitative Facts */}
          {blueprint.keyClaims && blueprint.keyClaims.length > 0 && (
            <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4.5 space-y-3 md:col-span-2 shadow-md">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <ListCheck className="w-4 h-4 text-emerald-400" />
                Validated Source Claims & Data Points ({blueprint.keyClaims.length})
              </div>

              <div className="space-y-2">
                {blueprint.keyClaims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="bg-[#080c14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 flex items-center gap-2.5 shadow-inner"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{claim}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
