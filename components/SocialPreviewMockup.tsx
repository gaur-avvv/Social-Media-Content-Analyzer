'use client';

import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, Bookmark, Heart, Share2, MoreHorizontal, CheckCircle, Smartphone } from 'lucide-react';

interface SocialPreviewMockupProps {
  content: string;
  platform: string;
}

export function cleanSocialPostText(rawContent: string): string {
  if (!rawContent) return '';

  // 1. Remove suggestions section if present
  let text = rawContent;
  const suggestionsIndex = text.indexOf('## IMPROVED ENGAGEMENT SUGGESTIONS');
  if (suggestionsIndex !== -1) {
    text = text.slice(0, suggestionsIndex).trim();
  }

  const suggestionsIndexAlt = text.indexOf('### IMPROVED ENGAGEMENT SUGGESTIONS');
  if (suggestionsIndexAlt !== -1) {
    text = text.slice(0, suggestionsIndexAlt).trim();
  }

  // 2. Strip bracketed graph node annotations e.g. [Graph Node: ...], [Node: ...], [Graph: ...]
  text = text.replace(/\[Graph Node:[^\]]+\]/gi, '');
  text = text.replace(/\[Graph:[^\]]+\]/gi, '');
  text = text.replace(/\[Node:[^\]]+\]/gi, '');
  text = text.replace(/Optimization Context:[^\n]+/gi, '');

  // 3. Clean up excessive blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

export const SocialPreviewMockup: React.FC<SocialPreviewMockupProps> = ({ content, platform }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<string>(platform || 'linkedin');
  const [expanded, setExpanded] = useState<boolean>(false);

  const postBody = cleanSocialPostText(content);
  const lines = postBody.split('\n');
  const shouldTruncate = lines.length > 4 || postBody.length > 250;
  const visibleLines = expanded || !shouldTruncate ? lines : lines.slice(0, 3);

  return (
    <div className="bg-[#0A0A0A]/95 border border-[#1F2937] rounded-xl p-5 space-y-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] font-mono">
              Live Feed Emulator & Layout Preview
            </h3>
            <p className="text-[10px] text-[#9CA3AF] font-mono">
              Visual verification before publishing to feed algorithms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#111827] p-1 rounded border border-[#1F2937]">
          {[
            { id: 'linkedin', label: 'LinkedIn' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'twitter_x', label: 'X / Twitter' },
            { id: 'threads', label: 'Threads' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePreviewTab(tab.id)}
              className={`px-2.5 py-1 text-[10px] font-mono font-medium rounded transition-colors cursor-pointer ${
                activePreviewTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEED MOCKUP CONTAINER */}
      <div className="max-w-xl mx-auto">
        {/* LINKEDIN MOCKUP */}
        {activePreviewTab === 'linkedin' && (
          <div className="bg-[#111827] text-gray-100 rounded-xl border border-[#1F2937] p-4 shadow-2xl space-y-3 font-sans">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  VG
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                    <span>Vision Graph Copilot</span>
                    <span className="text-[10px] text-[#9CA3AF] font-normal">• 1st</span>
                  </div>
                  <div className="text-[10px] text-[#9CA3AF]">
                    Enterprise AI Architecture & Growth Systems
                  </div>
                  <div className="text-[9px] text-[#6B7280]">Just now • 🌐</div>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#9CA3AF] cursor-pointer" />
            </div>

            {/* Post Content */}
            <div className="text-xs text-[#E5E7EB] leading-relaxed whitespace-pre-wrap font-sans">
              {visibleLines.join('\n')}
              {shouldTruncate && !expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-[#9CA3AF] hover:text-white font-semibold ml-1 text-xs underline cursor-pointer"
                >
                  ...see more
                </button>
              )}
            </div>

            {/* Social Metrics & Action Bar */}
            <div className="border-t border-[#1F2937] pt-2.5 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
                <div className="flex items-center gap-1">
                  <span className="p-1 rounded-full bg-blue-500/20 text-blue-400">👍</span>
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">💡</span>
                  <span>142 reactions</span>
                </div>
                <div>38 comments • 14 reposts</div>
              </div>

              <div className="grid grid-cols-4 gap-1 border-t border-[#1F2937] pt-1 text-center text-[#9CA3AF] text-xs font-semibold">
                <button className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-[#1F2937] rounded transition-colors cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" /> Like
                </button>
                <button className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-[#1F2937] rounded transition-colors cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" /> Comment
                </button>
                <button className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-[#1F2937] rounded transition-colors cursor-pointer">
                  <Repeat className="w-3.5 h-3.5" /> Repost
                </button>
                <button className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-[#1F2937] rounded transition-colors cursor-pointer">
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INSTAGRAM MOCKUP */}
        {activePreviewTab === 'instagram' && (
          <div className="bg-[#111827] text-gray-100 rounded-xl border border-[#1F2937] p-4 shadow-2xl space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-white text-[10px]">
                    VG
                  </div>
                </div>
                <div className="font-bold text-xs text-white">visiongraph.ai</div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
            </div>

            {/* Visual Carousel Card Preview */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#0B0F19] to-[#050505] border border-[#1F2937] rounded-lg p-5 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center text-[10px] text-[#9CA3AF] font-mono">
                <span>SWIPE → [1/5]</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                  AI INSIGHTS
                </span>
              </div>
              <div className="text-sm font-bold text-white line-clamp-4 leading-snug">
                {lines[0] || 'High Engagement Social Framework'}
              </div>
              <div className="text-[10px] text-[#9CA3AF] flex items-center justify-between font-mono">
                <span>@visiongraph.ai</span>
                <span>Save for later 📌</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Heart className="w-4 h-4 hover:text-red-500 cursor-pointer" />
                <MessageSquare className="w-4 h-4 hover:text-white cursor-pointer" />
                <Send className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
              <Bookmark className="w-4 h-4 hover:text-white cursor-pointer" />
            </div>

            {/* Caption */}
            <div className="text-xs text-[#D1D5DB] leading-relaxed">
              <span className="font-bold text-white mr-1.5">visiongraph.ai</span>
              <span className="whitespace-pre-wrap">{postBody.slice(0, 240)}...</span>
            </div>
          </div>
        )}

        {/* X / TWITTER MOCKUP */}
        {activePreviewTab === 'twitter_x' && (
          <div className="bg-[#050505] text-gray-100 rounded-xl border border-[#1F2937] p-4 shadow-2xl space-y-3 font-sans">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#111827] flex items-center justify-center font-bold text-white text-xs border border-[#1F2937]">
                  𝕏
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-xs text-white">
                    <span>Vision Graph Copilot</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  </div>
                  <div className="text-[10px] text-[#6B7280]">@visiongraph_ai</div>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#6B7280]" />
            </div>

            <div className="text-xs text-[#E5E7EB] leading-relaxed whitespace-pre-wrap">
              {postBody}
            </div>

            <div className="text-[10px] text-[#6B7280] border-b border-[#1F2937] pb-2 font-mono">
              9:41 AM • Aug 20, 2026 • <span className="text-white font-semibold">18.4K</span> Views
            </div>

            <div className="flex items-center justify-between text-[#9CA3AF] text-xs px-2 pt-1">
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5" /> 24
              </span>
              <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer">
                <Repeat className="w-3.5 h-3.5" /> 89
              </span>
              <span className="flex items-center gap-1.5 hover:text-red-400 cursor-pointer">
                <Heart className="w-3.5 h-3.5" /> 312
              </span>
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer">
                <Bookmark className="w-3.5 h-3.5" /> 140
              </span>
              <Share2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
            </div>
          </div>
        )}

        {/* THREADS MOCKUP */}
        {activePreviewTab === 'threads' && (
          <div className="bg-[#050505] text-gray-100 rounded-xl border border-[#1F2937] p-4 shadow-2xl space-y-3 font-sans">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center font-bold text-white text-xs">
                @
              </div>
              <div className="font-bold text-xs text-white">visiongraph.ai</div>
            </div>
            <div className="text-xs text-[#E5E7EB] leading-relaxed whitespace-pre-wrap">
              {postBody}
            </div>
            <div className="flex items-center gap-4 text-[#9CA3AF] pt-2 border-t border-[#1F2937] text-xs">
              <Heart className="w-4 h-4 hover:text-red-500 cursor-pointer" />
              <MessageSquare className="w-4 h-4 hover:text-white cursor-pointer" />
              <Repeat className="w-4 h-4 hover:text-emerald-400 cursor-pointer" />
              <Send className="w-4 h-4 hover:text-white cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

