'use client';

import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, Bookmark, Heart, Share2, MoreHorizontal, CheckCircle, Smartphone } from 'lucide-react';

interface SocialPreviewMockupProps {
  content: string;
  platform: string;
}

export function cleanSocialPostText(rawContent: string): string {
  if (!rawContent) return '';

  let text = rawContent;
  const suggestionsIndex = text.indexOf('## IMPROVED ENGAGEMENT SUGGESTIONS');
  if (suggestionsIndex !== -1) {
    text = text.slice(0, suggestionsIndex).trim();
  }

  const suggestionsIndexAlt = text.indexOf('### IMPROVED ENGAGEMENT SUGGESTIONS');
  if (suggestionsIndexAlt !== -1) {
    text = text.slice(0, suggestionsIndexAlt).trim();
  }

  // Strip bracketed graph node annotations e.g. [Graph Node: ...], [Node: ...], [Graph: ...]
  text = text.replace(/\[Graph Node:[^\]]+\]/gi, '');
  text = text.replace(/\[Graph:[^\]]+\]/gi, '');
  text = text.replace(/\[Node:[^\]]+\]/gi, '');
  text = text.replace(/Optimization Context:[^\n]+/gi, '');

  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

export const SocialPreviewMockup: React.FC<SocialPreviewMockupProps> = ({ content, platform }) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const activePreviewTab = selectedTab ?? (platform || 'general');

  const postBody = cleanSocialPostText(content);
  const lines = postBody.split('\n');
  const shouldTruncate = lines.length > 5 || postBody.length > 280;
  const visibleLines = expanded || !shouldTruncate ? lines : lines.slice(0, 4);

  return (
    <div className="bg-[#0f172a]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
              Live Feed Emulator & Layout Preview
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time feed presentation across social channel algorithms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#0b0f19] p-1 rounded-xl border border-slate-800">
          {[
            { id: 'general', label: 'Universal' },
            { id: 'linkedin', label: 'LinkedIn' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'twitter_x', label: 'X / Twitter' },
            { id: 'threads', label: 'Threads' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activePreviewTab === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEED MOCKUP CONTAINER */}
      <div className="max-w-xl mx-auto">
        {/* UNIVERSAL / GENERAL MOCKUP */}
        {activePreviewTab === 'general' && (
          <div className="bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md ring-2 ring-blue-500/20">
                  VG
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-white">
                    <span>Vision Graph Copilot</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono">
                      Multi-Platform
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Cross-Channel Strategic Distribution
                  </div>
                  <div className="text-[10px] text-slate-500">Universal • 🌐 Public</div>
                </div>
              </div>
              <button type="button" className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors">
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </button>
            </div>

            {/* Post Content */}
            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
              {visibleLines.join('\n')}
              {shouldTruncate && !expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-blue-400 hover:text-blue-300 font-semibold ml-1.5 text-xs hover:underline cursor-pointer inline-block"
                >
                  ...see more
                </button>
              )}
            </div>

            {/* Universal Social Metrics & Action Bar */}
            <div className="border-t border-slate-800/80 pt-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">🚀</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">🔥</span>
                  <span className="font-medium text-slate-300">Omni-Channel Reach</span>
                </div>
                <div className="text-slate-400">Estimated Engagement: High</div>
              </div>

              <div className="grid grid-cols-4 gap-1 border-t border-slate-800/80 pt-2 text-center text-slate-400 text-xs font-semibold">
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <ThumbsUp className="w-3.5 h-3.5" /> React
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <MessageSquare className="w-3.5 h-3.5" /> Reply
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <Bookmark className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* LINKEDIN MOCKUP */}
        {activePreviewTab === 'linkedin' && (
          <div className="bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs shadow-md ring-2 ring-blue-500/20">
                  VG
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                    <span>Vision Graph Copilot</span>
                    <span className="text-[11px] text-slate-400 font-normal">• 1st</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Enterprise AI Architecture & Content Systems
                  </div>
                  <div className="text-[10px] text-slate-500">Just now • 🌐</div>
                </div>
              </div>
              <button type="button" className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors">
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </button>
            </div>

            {/* Post Content */}
            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
              {visibleLines.join('\n')}
              {shouldTruncate && !expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-blue-400 hover:text-blue-300 font-semibold ml-1.5 text-xs hover:underline cursor-pointer inline-block"
                >
                  ...see more
                </button>
              )}
            </div>

            {/* Social Metrics & Action Bar */}
            <div className="border-t border-slate-800/80 pt-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">👍</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">💡</span>
                  <span className="font-medium text-slate-300">142 reactions</span>
                </div>
                <div className="text-slate-400">38 comments • 14 reposts</div>
              </div>

              <div className="grid grid-cols-4 gap-1 border-t border-slate-800/80 pt-2 text-center text-slate-400 text-xs font-semibold">
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <ThumbsUp className="w-3.5 h-3.5" /> Like
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <MessageSquare className="w-3.5 h-3.5" /> Comment
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <Repeat className="w-3.5 h-3.5" /> Repost
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INSTAGRAM MOCKUP */}
        {activePreviewTab === 'instagram' && (
          <div className="bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-[#0b1120] rounded-full flex items-center justify-center font-bold text-white text-[11px]">
                    VG
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xs text-white">visiongraph.ai</div>
                  <div className="text-[10px] text-slate-400">Original audio</div>
                </div>
              </div>
              <button type="button" className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors">
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </button>
            </div>

            {/* Visual Carousel Card Preview */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#131c31] to-[#0b101e] border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span className="font-bold text-slate-300">SWIPE → [1/5]</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 text-[9px] font-semibold">
                  AI INSIGHTS
                </span>
              </div>
              <div className="text-sm font-bold text-white line-clamp-4 leading-snug">
                {lines[0] || 'High Engagement Social Framework'}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                <span>@visiongraph.ai</span>
                <span className="text-slate-300 font-sans">Save for later 📌</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3.5 text-slate-300">
                <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
                <MessageSquare className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Send className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              </div>
              <Bookmark className="w-4 h-4 hover:text-white cursor-pointer transition-colors text-slate-300" />
            </div>

            {/* Caption */}
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white mr-2">visiongraph.ai</span>
              <span className="whitespace-pre-wrap">{postBody.slice(0, 240)}...</span>
            </div>
          </div>
        )}

        {/* X / TWITTER MOCKUP */}
        {activePreviewTab === 'twitter_x' && (
          <div className="bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-sm border border-slate-700 shadow-sm">
                  𝕏
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-xs text-white">
                    <span>Vision Graph Copilot</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">@visiongraph_ai</div>
                </div>
              </div>
              <button type="button" className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors">
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </button>
            </div>

            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {postBody}
            </div>

            <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2.5 font-mono">
              9:41 AM • Aug 20, 2026 • <span className="text-white font-semibold">18.4K</span> Views
            </div>

            <div className="flex items-center justify-between text-slate-400 text-xs px-2 pt-1">
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> 24
              </span>
              <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition-colors">
                <Repeat className="w-3.5 h-3.5" /> 89
              </span>
              <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer transition-colors">
                <Heart className="w-3.5 h-3.5" /> 312
              </span>
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition-colors">
                <Bookmark className="w-3.5 h-3.5" /> 140
              </span>
              <Share2 className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        )}

        {/* THREADS MOCKUP */}
        {activePreviewTab === 'threads' && (
          <div className="bg-[#0b1120] text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                @
              </div>
              <div>
                <div className="font-bold text-xs text-white">visiongraph.ai</div>
                <div className="text-[10px] text-slate-500">2h ago</div>
              </div>
            </div>
            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {postBody}
            </div>
            <div className="flex items-center gap-4 text-slate-400 pt-2.5 border-t border-slate-800 text-xs">
              <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
              <MessageSquare className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Repeat className="w-4 h-4 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Send className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
