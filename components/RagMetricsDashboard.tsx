'use client';

import React from 'react';
import { ShieldCheck, Cpu, Activity, CheckCircle2, XCircle, FileText } from 'lucide-react';

interface MetricsProps {
  metrics: {
    groundedness: number;
    hallucinationDetected: boolean;
    contextPrecision: number;
    ruleAdherence: number;
    passedQualityGate: boolean;
    auditReasoning: string;
    executionTier: string;
    durationMs: number;
    extractedFilesCount: number;
    visualDensity: string;
    timestamp?: string;
  };
  extractionLogs?: Array<{ file: string; status: string; tier: string; notes: string }>;
}

export const RagMetricsDashboard: React.FC<MetricsProps> = ({ metrics, extractionLogs = [] }) => {
  const groundednessPct = Math.round(metrics.groundedness * 100);
  const precisionPct = Math.round(metrics.contextPrecision * 100);
  const adherencePct = Math.round(metrics.ruleAdherence * 100);

  return (
    <div className="bg-[#0f172a]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                RAG Accuracy Telemetry & Quality Gate
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated Ragas-aligned evaluation suite running at inference time
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {metrics.passedQualityGate ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold font-mono shadow-sm shadow-emerald-900/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> QUALITY GATE PASSED
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full text-xs font-semibold font-mono shadow-sm shadow-rose-900/20">
              <XCircle className="w-3.5 h-3.5" /> QUALITY GATE REJECTED
            </span>
          )}
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Groundedness KPI */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span>Groundedness</span>
            <span className="text-[10px] text-emerald-400 font-mono">≥85% Target</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono tracking-tight ${groundednessPct >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {groundednessPct}%
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                groundednessPct >= 85 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${groundednessPct}%` }}
            />
          </div>
        </div>

        {/* Hallucination Detector */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span>Hallucination Audit</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            {!metrics.hallucinationDetected ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300">0 Hallucinations</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-rose-300">Flagged Anomalies</span>
              </div>
            )}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Source context facts verified against generation
          </div>
        </div>

        {/* Ingestion Tier Status */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span>Inference Routing</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
            {metrics.executionTier === 'GEMINI_2.5_CLOUD' || metrics.executionTier.includes('TIER_1') ? (
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold">
                GEMINI 2.5 CLOUD
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
                {metrics.executionTier.replace(/_/g, ' ')}
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
            <span>Layout: <strong className="text-slate-300">{metrics.visualDensity}</strong></span>
            <span className="text-emerald-400 font-bold">{metrics.durationMs}ms</span>
          </div>
        </div>

        {/* Context Precision & Rule Adherence */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span>Context Precision</span>
            <span className="text-xs font-bold text-white font-mono">{precisionPct}%</span>
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Rule Compliance:</span>
              <span className="font-bold text-emerald-400">{adherencePct}%</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Extracted Assets:</span>
              <span className="text-white font-medium">{metrics.extractedFilesCount} files</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono truncate">
            {metrics.timestamp ? new Date(metrics.timestamp).toLocaleTimeString() : 'Live evaluation'}
          </div>
        </div>
      </div>

      {/* Audit Reasoning Callout */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 font-mono">
          <ShieldCheck className="w-4 h-4" />
          LLM-As-A-Judge Audit Verdict & Verification
        </div>
        <p className="text-xs text-slate-200 leading-relaxed bg-[#080c14] p-3.5 rounded-lg border border-slate-800/80 font-mono">
          &ldquo;{metrics.auditReasoning}&rdquo;
        </p>
      </div>

      {/* Extraction Execution Logs */}
      {extractionLogs.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 font-mono">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Ingestion Pipeline Ingestion Logs ({extractionLogs.length})
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            {extractionLogs.map((log, idx) => (
              <div
                key={idx}
                className="bg-[#0b1120] border border-slate-800 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-200">
                    {log.tier}
                  </span>
                  <span className="text-slate-200 font-semibold">{log.file}</span>
                </div>
                <div className="text-[10px] text-slate-400 sm:text-right">{log.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
