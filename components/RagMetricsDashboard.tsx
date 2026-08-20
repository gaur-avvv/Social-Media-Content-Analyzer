'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Cpu, Activity, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';

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

  const isTier1 = metrics.executionTier.includes('TIER_1') || metrics.executionTier.includes('CLOUD');

  return (
    <div className="bg-[#0A0A0A] border border-[#1F2937] rounded-xl p-5 sm:p-6 space-y-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white tracking-[0.15em] uppercase font-mono">
              RAG Accuracy Telemetry & LLM-As-A-Judge Gate
            </h3>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-0.5 font-mono">
            Automated Ragas-aligned evaluation suite running at inference time
          </p>
        </div>

        <div className="flex items-center gap-2">
          {metrics.passedQualityGate ? (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold font-mono shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-3.5 h-3.5" /> QUALITY GATE PASSED
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full text-xs font-bold font-mono shadow-[0_0_12px_rgba(244,63,94,0.2)]">
              <XCircle className="w-3.5 h-3.5" /> QUALITY GATE REJECTED
            </span>
          )}
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Groundedness KPI */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#6B7280] text-[9px] font-bold uppercase tracking-wider font-mono">
            <span>Groundedness Index</span>
            <span className="text-[9px] text-emerald-400 font-mono">≥ 85% Target</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${groundednessPct >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {groundednessPct}%
            </span>
            <span className="text-xs text-[#6B7280] font-mono">/ 100</span>
          </div>
          <div className="w-full bg-[#1F2937] rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                groundednessPct >= 85 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'
              }`}
              style={{ width: `${groundednessPct}%` }}
            />
          </div>
        </div>

        {/* Hallucination Detector */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#6B7280] text-[9px] font-bold uppercase tracking-wider font-mono">
            <span>Hallucination Audit</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            {!metrics.hallucinationDetected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <span className="text-emerald-300">0 Hallucinations</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
                <span className="text-rose-300">Flagged Anomalies</span>
              </>
            )}
          </div>
          <div className="text-[9px] text-[#9CA3AF] font-mono">
            Source context facts verified against generation
          </div>
        </div>

        {/* Ingestion Tier Status */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#6B7280] text-[9px] font-bold uppercase tracking-wider font-mono">
            <span>Inference Routing</span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
            {isTier1 ? (
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px]">
                TIER 1: Cloud LlamaParse
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]">
                TIER 2: Edge ML Fallback
              </span>
            )}
          </div>
          <div className="text-[9px] text-[#9CA3AF] flex items-center justify-between font-mono">
            <span>Layout: {metrics.visualDensity}</span>
            <span className="text-emerald-400 font-bold">{metrics.durationMs}ms</span>
          </div>
        </div>

        {/* Context Precision & Rule Adherence */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#6B7280] text-[9px] font-bold uppercase tracking-wider font-mono">
            <span>Context Precision</span>
            <span className="text-xs font-bold text-white font-mono">{precisionPct}%</span>
          </div>
          <div className="space-y-1 text-[9px] font-mono">
            <div className="flex justify-between text-[#D1D5DB]">
              <span>Rule Compliance:</span>
              <span className="font-bold text-emerald-400">{adherencePct}%</span>
            </div>
            <div className="flex justify-between text-[#D1D5DB]">
              <span>Extracted Assets:</span>
              <span className="text-white">{metrics.extractedFilesCount} files</span>
            </div>
          </div>
          <div className="text-[9px] text-[#6B7280] font-mono truncate">
            {metrics.timestamp ? new Date(metrics.timestamp).toLocaleTimeString() : 'Live evaluation'}
          </div>
        </div>
      </div>

      {/* Audit Reasoning Callout */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400 flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-4 h-4" />
          LLM-As-A-Judge Audit Verdict & Verification
        </div>
        <p className="text-xs text-[#E5E7EB] italic leading-relaxed bg-[#0F172A] p-3 rounded border border-[#1E293B] font-mono">
          &ldquo;{metrics.auditReasoning}&rdquo;
        </p>
      </div>

      {/* Extraction Execution Logs */}
      {extractionLogs.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B7280] flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5" />
            Ingestion Pipeline Ingestion Logs ({extractionLogs.length})
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            {extractionLogs.map((log, idx) => (
              <div
                key={idx}
                className="bg-[#111827] border border-[#1F2937] rounded p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#1F2937] text-white">
                    {log.tier}
                  </span>
                  <span className="text-[#E5E7EB] font-semibold">{log.file}</span>
                </div>
                <div className="text-[9px] text-[#9CA3AF] sm:text-right">{log.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
