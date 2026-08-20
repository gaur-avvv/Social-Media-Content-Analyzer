'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Eye,
  Clock,
  Share2,
  ChevronRight,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface AiEngagementPredictorProps {
  content: string;
  platform: string;
  onApplyFix?: (fixPrompt: string) => void;
}

export const AiEngagementPredictor: React.FC<AiEngagementPredictorProps> = ({
  content,
  platform,
  onApplyFix,
}) => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    if (!content || !content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/engagement-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          platform,
          audience: 'Social Media Feed Audience',
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setScores(data);
    } catch (err: any) {
      console.warn('Engagement predictor fetch failed:', err);
      setError(err?.message || 'Could not fetch engagement prediction');
    } finally {
      setLoading(false);
    }
  }, [content, platform]);

  useEffect(() => {
    if (!content || content.trim().length <= 30) return;

    const timer = setTimeout(() => {
      fetchScore();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchScore, content]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 80) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                AI Human Engagement & Psychology Predictor
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                0-100 BENCHMARK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluates hook retention, cognitive ease, pattern interrupts, and platform viral velocity.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchScore}
          disabled={loading || !content}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer shrink-0 active:scale-95"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Evaluating Psychology...
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 fill-white" />
              Re-Score Content
            </>
          )}
        </button>
      </div>

      {loading && !scores && (
        <div className="p-12 text-center space-y-3 bg-[#0b1120] border border-slate-800 rounded-2xl animate-pulse">
          <RefreshCw className="w-7 h-7 text-blue-400 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-white font-mono">
            Simulating Human Attention Triggers & Scroll Retention...
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            Testing first 3 lines hook velocity, cognitive visual density, and dopamine pacing against active algorithms.
          </p>
        </div>
      )}

      {scores && (
        <div className="space-y-6">
          {/* Main Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Overall Score Dial Card */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Engagement Score
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${getScoreColor(
                    scores.overallScore
                  )}`}
                >
                  Grade: {scores.grade || 'A'}
                </span>
              </div>

              <div className="my-3 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono tracking-tight">
                  {scores.overallScore}
                </span>
                <span className="text-sm font-semibold text-slate-500 font-mono">/ 100</span>
                <span className="ml-auto text-xs font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {scores.viralPotential}
                </span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${getProgressColor(
                    scores.overallScore
                  )}`}
                  style={{ width: `${scores.overallScore}%` }}
                />
              </div>
            </div>

            {/* Scroll Stop Probability */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Scroll-Stop Rate
                </span>
                <Eye className="w-4 h-4 text-blue-400" />
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold text-white font-mono">
                  {scores.estimatedMetrics?.scrollStopProbability || '89%'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Likelihood a user pauses their feed scroll on the first 3 lines.
                </p>
              </div>
            </div>

            {/* Est Dwell Time */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Feed Dwell Time
                </span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold text-white font-mono">
                  {scores.estimatedMetrics?.dwellTimeSeconds || '38s'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Estimated attention span held by micro-pacing and bullet cadence.
                </p>
              </div>
            </div>

            {/* Save & Share Multiplier */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Save / Share Ratio
                </span>
                <Share2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <div className="text-2xl font-bold text-white font-mono">
                  {scores.estimatedMetrics?.saveShareRatio || '1 in 9'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  High utility & scannable insights trigger save bookmarking.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-scores Breakdown & Multi-Platform Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Granular Sub-Scores */}
            <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Cognitive Attention Sub-Dimensions
              </h4>

              <div className="space-y-3.5 text-xs">
                {/* Hook Retention */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">Hook Retention (First 3 Lines / 3 Seconds)</span>
                    <span className="font-mono font-bold text-slate-100">
                      {scores.subScores?.hookRetention || 88}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${scores.subScores?.hookRetention || 88}%` }}
                    />
                  </div>
                </div>

                {/* Cognitive Ease */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">Cognitive Ease & Visual Scannability</span>
                    <span className="font-mono font-bold text-slate-100">
                      {scores.subScores?.cognitiveEase || 90}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${scores.subScores?.cognitiveEase || 90}%` }}
                    />
                  </div>
                </div>

                {/* Emotional Resonance */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">Emotional Tension & High Stakes</span>
                    <span className="font-mono font-bold text-slate-100">
                      {scores.subScores?.emotionalResonance || 82}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${scores.subScores?.emotionalResonance || 82}%` }}
                    />
                  </div>
                </div>

                {/* Shareability */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">Viral Bookmark & Shareability Index</span>
                    <span className="font-mono font-bold text-slate-100">
                      {scores.subScores?.shareabilityIndex || 85}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${scores.subScores?.shareabilityIndex || 85}%` }}
                    />
                  </div>
                </div>

                {/* CTA Strength */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">Conversion & Comment Catalyst</span>
                    <span className="font-mono font-bold text-slate-100">
                      {scores.subScores?.conversionCta || 84}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${scores.subScores?.conversionCta || 84}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Multi-Platform Relative Index */}
            <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Cross-Platform Algorithm Suitability
              </h4>

              <div className="space-y-2.5 text-xs">
                {Object.entries(scores.platformScores || {}).map(([platKey, score]: any) => (
                  <div
                    key={platKey}
                    className="p-2.5 rounded-xl bg-[#080c14] border border-slate-800 flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-300 capitalize font-mono">
                      {platKey.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{score}%</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          score >= 85 ? 'bg-emerald-400' : score >= 75 ? 'bg-blue-400' : 'bg-amber-400'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Psychological Triggers & Attention Drop-Off Diagnostic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Triggers Verified */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Human Psychology Triggers Verified
              </h4>
              <div className="space-y-2 text-xs">
                {Object.entries(scores.psychologicalTriggers || {}).map(([key, val]: any) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-[#080c14] border border-slate-800/80 flex items-start gap-2.5"
                  >
                    {val.detected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-200 capitalize font-mono">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{val.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Fixes & Attention Drop-Offs */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                Attention Retention Fixes
              </h4>

              <div className="space-y-2.5 text-xs">
                {(scores.psychologicalFixes || []).map((fix: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#080c14] border border-slate-800/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-400 font-mono uppercase text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                        {fix.trigger}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-medium">{fix.action}</p>
                    <p className="text-[11px] text-slate-400 italic font-mono">{fix.issue}</p>
                  </div>
                ))}

                {scores.attentionDropOffPoints && scores.attentionDropOffPoints.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-300">
                    <span className="font-bold font-mono">⚠️ Potential Drop-off Zone:</span>{' '}
                    {scores.attentionDropOffPoints.join(' • ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
