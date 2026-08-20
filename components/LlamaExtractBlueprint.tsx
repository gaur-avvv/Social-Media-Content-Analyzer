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
    <div className="bg-[#0A0A0A] border border-[#1F2937] rounded-xl p-5 sm:p-6 space-y-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white tracking-[0.15em] uppercase font-mono">
              LlamaExtract Schema Blueprint & Entity Extraction
            </h3>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-0.5 font-mono">
            Strict Pydantic-aligned schema verification extracted from multimodal asset payloads
          </p>
        </div>

        <button
          onClick={() => setViewJson(!viewJson)}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#E5E7EB] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer font-mono"
        >
          <Code className="w-3.5 h-3.5" />
          {viewJson ? 'Visual Schema View' : 'Raw JSON Blueprint'}
        </button>
      </div>

      {viewJson ? (
        <pre className="bg-[#050505] border border-[#1F2937] rounded-lg p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-96">
          {JSON.stringify(blueprint, null, 2)}
        </pre>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Topic & Target Audience */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              Core Topic & Persona
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[9px] text-[#6B7280] uppercase font-semibold font-mono">Identified Topic:</span>
                <div className="text-sm font-bold text-white mt-0.5 font-sans">{blueprint.coreTopic}</div>
              </div>

              <div>
                <span className="text-[9px] text-[#6B7280] uppercase font-semibold font-mono">Target Audience Persona:</span>
                <div className="text-xs text-[#D1D5DB] mt-0.5 flex items-center gap-1.5 font-sans">
                  <Users className="w-3 h-3 text-purple-400" />
                  {blueprint.targetAudience}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#1F2937]">
                <span className="text-[9px] text-[#6B7280] uppercase font-semibold font-mono">Tone & Sentiment:</span>
                <span className="px-2 py-0.5 bg-[#1F2937] rounded text-xs font-mono font-medium text-purple-300">
                  {blueprint.tone || 'Insightful'}
                </span>
                {blueprint.sentiment && (
                  <span className="px-2 py-0.5 bg-[#1F2937] rounded text-xs font-mono font-medium text-emerald-300">
                    {blueprint.sentiment}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Layout Density & CTA Status */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Ingestion Heuristics & Conversion
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-[#0A0A0A] border border-[#1F2937] rounded p-2.5 space-y-1">
                <div className="text-[9px] text-[#6B7280] uppercase font-semibold font-mono">Layout Density</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      blueprint.density === 'high-density' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  {blueprint.density === 'high-density' ? 'High Density' : 'Normal'}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#1F2937] rounded p-2.5 space-y-1">
                <div className="text-[9px] text-[#6B7280] uppercase font-semibold font-mono">Call To Action</div>
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

            <div className="text-[9px] text-[#9CA3AF] leading-relaxed bg-[#0A0A0A] p-2.5 rounded border border-[#1F2937] font-mono">
              {blueprint.density === 'high-density'
                ? '⚡ Document contains high-density information. Multi-hop knowledge graph triggered layout:high-density transformation rule.'
                : '✓ Document structure contains optimal spacing. Direct visual-first matrix applied.'}
            </div>
          </div>

          {/* Card 3: Detected Angles & Hooks */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
              <Anchor className="w-3.5 h-3.5 text-amber-400" />
              Detected High-Retention Hooks in Asset ({blueprint.detectedHooks?.length || 0})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(blueprint.detectedHooks || []).map((hook, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A0A0A] border border-[#1F2937] rounded p-3 text-xs text-[#E5E7EB] flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 border border-amber-500/30 font-mono">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{hook}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Key Claims & Quantitative Facts */}
          {blueprint.keyClaims && blueprint.keyClaims.length > 0 && (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-mono">
                <ListCheck className="w-3.5 h-3.5 text-emerald-400" />
                Validated Source Claims & Data Points ({blueprint.keyClaims.length})
              </div>

              <div className="space-y-1.5">
                {blueprint.keyClaims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0A0A0A] border border-[#1F2937] rounded px-3 py-2 text-xs text-[#D1D5DB] flex items-center gap-2"
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
