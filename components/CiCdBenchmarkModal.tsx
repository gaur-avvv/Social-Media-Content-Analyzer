'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2, RefreshCw, X, Terminal } from 'lucide-react';

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CiCdBenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  if (!isOpen) return null;

  const runSuite = async () => {
    setRunning(true);
    try {
      const res = await fetch('/api/eval/benchmark');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Benchmark execution failed:', err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#080c14]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Automated CI/CD RAG Judge Test Suite (__tests__/rag.eval.test.ts)
              </h3>
              <p className="text-[11px] text-slate-400">
                Continuous Integration accuracy gating & multi-tier resilience regression runner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Summary / Action Row */}
          <div className="bg-[#080c14] border border-slate-800 rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="text-xs font-bold text-white font-mono">Continuous Accuracy Gate Benchmark</div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Enforces strict Groundedness Index (≥ 0.85), Hallucination Guardrails, and Multi-Hop Topological Resolution.
              </p>
            </div>
            <button
              onClick={runSuite}
              disabled={running}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-blue-600/20 cursor-pointer font-mono active:scale-95"
            >
              {running ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Executing Test Matrix...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Run Evaluation Suite
                </>
              )}
            </button>
          </div>

          {/* Test Results Display */}
          {results ? (
            <div className="space-y-4">
              {/* Overall Score Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#080c14] border border-slate-800 p-3.5 rounded-xl text-center font-mono shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Test Suite Status</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {results.suiteStatus}
                  </div>
                </div>
                <div className="bg-[#080c14] border border-slate-800 p-3.5 rounded-xl text-center font-mono shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Average Groundedness</div>
                  <div className="text-base font-black text-white mt-1">
                    {(results.averageGroundednessScore * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-[#080c14] border border-slate-800 p-3.5 rounded-xl text-center font-mono shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Pass Rate</div>
                  <div className="text-base font-black text-emerald-400 mt-1">
                    {results.passedTests} / {results.totalTests} Passed
                  </div>
                </div>
              </div>

              {/* Individual Tests */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Test Case Assertions
                </div>
                {results.tests.map((test: any) => (
                  <div
                    key={test.id}
                    className="bg-[#080c14] border border-slate-800 rounded-xl p-4 space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-white text-xs font-mono">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{test.name}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Score: {(test.score * 100).toFixed(0)}% (Req: {(test.threshold * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      {test.details}
                    </p>
                    <div className="pl-6 text-[10px] text-slate-500 font-mono flex items-center gap-3">
                      <span>Category: {test.category}</span>
                      <span>Latency: {test.durationMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3 text-slate-400 bg-[#080c14]">
              <Terminal className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-xs font-semibold text-white font-mono">
                Automated Test Engine Ready
              </div>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Click &quot;Run Evaluation Suite&quot; above to execute the continuous evaluation matrix and verify pipeline groundedness.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#080c14] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Jest Environment: node (ts-jest)</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all cursor-pointer font-sans text-xs active:scale-95"
          >
            Close Runner
          </button>
        </div>
      </div>
    </div>
  );
};
