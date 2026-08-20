'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Hash,
  Sparkles,
  Copy,
  Check,
  Globe,
  TrendingUp,
  RefreshCw,
  Zap,
  ArrowRight,
  Bookmark,
  Layers,
} from 'lucide-react';

interface SeoTagGeneratorProps {
  content: string;
  platform: string;
  onApplyHeadline?: (headline: string) => void;
  onAppendHashtags?: (hashtags: string) => void;
}

export const SeoTagGenerator: React.FC<SeoTagGeneratorProps> = ({
  content,
  platform,
  onApplyHeadline,
  onAppendHashtags,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSeoData = useCallback(async () => {
    if (!content || !content.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/seo-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          platform,
          targetAudience: 'Tech, B2B & Modern Creators',
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.warn('SEO Generator fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, [content, platform]);

  useEffect(() => {
    if (!content || content.trim().length <= 30) return;

    const timer = setTimeout(() => {
      fetchSeoData();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchSeoData, content]);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Automated SEO & Viral Tag Generator
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                <Globe className="w-3 h-3" /> Web Grounded
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates high-CTR curiosity headlines, categorized hashtags, and search engine LSI entities.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchSeoData}
          disabled={loading || !content}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-md shadow-emerald-600/20 cursor-pointer shrink-0 active:scale-95"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Generating Trends...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Regenerate SEO Matrix
            </>
          )}
        </button>
      </div>

      {loading && !data && (
        <div className="p-12 text-center space-y-3 bg-[#0b1120] border border-slate-800 rounded-2xl animate-pulse">
          <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-white font-mono">
            Searching Live Algorithm Trends & Viral Headline Blueprints...
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            Grounding search queries in real-time hashtags, open loop psychology, and semantic keywords.
          </p>
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* Section 1: Click-Worthy Headline Variations */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Click-Worthy & Psychological Headline Variations
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                Click any headline to copy or swap into your active draft
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {(data.headlines || []).map((h: any, idx: number) => (
                <div
                  key={h.id || idx}
                  className="p-4 rounded-xl bg-[#080c14] border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {h.framework}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        CTR: {h.predictedCtr || 'High'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {h.title}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {h.psychologicalTrigger}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyText(h.title, `h-${idx}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedId === `h-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {onApplyHeadline && (
                      <button
                        type="button"
                        onClick={() => onApplyHeadline(h.title)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                        title="Set as top hook in editor"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Use Hook</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Categorized Hashtags */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-400" />
                Optimized Algorithm Hashtag Matrix
              </h4>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyText(data.allHashtagsFormatted || '', 'all-tags')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === 'all-tags' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied All Tags</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All Tags</span>
                    </>
                  )}
                </button>
                {onAppendHashtags && (
                  <button
                    type="button"
                    onClick={() => onAppendHashtags(data.allHashtagsFormatted || '')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <ArrowRight className="w-3 h-3" />
                    <span>Append to Draft</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Niche Tags */}
              <div className="p-4 rounded-xl bg-[#080c14] border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono flex items-center justify-between">
                  <span>High-Intent Niche</span>
                  <span className="text-emerald-400 text-[10px]">Targeted Reach</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(data.hashtags?.niche || []).map((tag: string, i: number) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => copyText(tag, `tag-n-${i}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{tag}</span>
                      {copiedId === `tag-n-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                    </button>
                  ))}
                </div>
              </div>

              {/* Broad Discovery Tags */}
              <div className="p-4 rounded-xl bg-[#080c14] border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono flex items-center justify-between">
                  <span>Broad Discovery</span>
                  <span className="text-blue-400 text-[10px]">Category Reach</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(data.hashtags?.broad || []).map((tag: string, i: number) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => copyText(tag, `tag-b-${i}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{tag}</span>
                      {copiedId === `tag-b-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Catalysts */}
              <div className="p-4 rounded-xl bg-[#080c14] border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono flex items-center justify-between">
                  <span>Trending Catalysts</span>
                  <span className="text-amber-400 text-[10px]">Viral Velocity</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(data.hashtags?.trending || []).map((tag: string, i: number) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => copyText(tag, `tag-t-${i}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{tag}</span>
                      {copiedId === `tag-t-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Semantic SEO Keywords Cloud & Meta Snippet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Semantic Keywords */}
            <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-sm">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Semantic LSI Search Entities & Discoverability
              </h4>
              <div className="flex flex-wrap gap-2">
                {(data.semanticKeywords || []).map((item: any, i: number) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#080c14] border border-slate-800 flex items-center gap-2 text-xs"
                  >
                    <span className="text-slate-200 font-medium">{item.keyword}</span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      {item.relevance}% Rel
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Preview Snippet */}
            <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  Meta Link & Social Card Snippet
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed italic bg-[#080c14] p-3 rounded-xl border border-slate-800">
                  &ldquo;{data.metaSnippet}&rdquo;
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyText(data.metaSnippet || '', 'meta-snip')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                {copiedId === 'meta-snip' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Snippet</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Meta Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
