'use client';

import React, { useState } from 'react';
import { GraphNode, GraphEdge, SEED_NODES, SEED_EDGES } from '@/lib/graph/knowledge-base';
import { Network, Sparkles, Layers, ShieldCheck, Zap, Info, ChevronRight } from 'lucide-react';

interface KnowledgeGraphVisualizerProps {
  activeNodeIds?: string[];
  activeEdges?: any[];
  selectedPlatform?: string;
}

export const KnowledgeGraphVisualizer: React.FC<KnowledgeGraphVisualizerProps> = ({
  activeNodeIds = [],
  activeEdges = [],
  selectedPlatform = 'linkedin',
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(SEED_NODES[0]);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredNodes = SEED_NODES.filter((node) => {
    if (filterType === 'ALL') return true;
    return node.nodeType === filterType;
  });

  const getNodeColor = (type: GraphNode['nodeType'], isActive: boolean) => {
    if (isActive) {
      switch (type) {
        case 'PLATFORM':
          return 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
        case 'COPYWRITING_MATRIX':
          return 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
        case 'LAYOUT_RULE':
          return 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
        case 'STRATEGY_RULE':
          return 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      }
    }
    switch (type) {
      case 'PLATFORM':
        return 'bg-neutral-900/60 border-neutral-800 text-blue-400 hover:border-blue-700/60';
      case 'COPYWRITING_MATRIX':
        return 'bg-neutral-900/60 border-neutral-800 text-purple-400 hover:border-purple-700/60';
      case 'LAYOUT_RULE':
        return 'bg-neutral-900/60 border-neutral-800 text-emerald-400 hover:border-emerald-700/60';
      case 'STRATEGY_RULE':
        return 'bg-neutral-900/60 border-neutral-800 text-amber-400 hover:border-amber-700/60';
    }
  };

  const getNodeIcon = (type: GraphNode['nodeType']) => {
    switch (type) {
      case 'PLATFORM':
        return <Layers className="w-3.5 h-3.5" />;
      case 'COPYWRITING_MATRIX':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'LAYOUT_RULE':
        return <Zap className="w-3.5 h-3.5" />;
      case 'STRATEGY_RULE':
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#1F2937] rounded-xl p-5 sm:p-6 space-y-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2937] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white tracking-[0.15em] uppercase font-mono">
              Supabase Knowledge Graph & HNSW Adjacency Mesh
            </h3>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-0.5 font-mono">
            Topological rule relations & multi-hop traversal paths mapped for social optimization
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#111827] p-1 rounded border border-[#1F2937]">
          {['ALL', 'PLATFORM', 'COPYWRITING_MATRIX', 'LAYOUT_RULE', 'STRATEGY_RULE'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 text-[9px] font-mono font-medium rounded transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-[#1F2937] text-white shadow-sm font-bold'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Nodes and Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Node Matrix */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Knowledge Graph Nodes ({filteredNodes.length})</span>
            <span className="text-emerald-400 flex items-center gap-1 text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Active Traversal Lineage Highlighted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const isActive = activeNodeIds.includes(node.id) || node.id.includes(selectedPlatform);
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded border cursor-pointer transition-all ${getNodeColor(
                    node.nodeType,
                    isActive
                  )} ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500/50' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                      {getNodeIcon(node.nodeType)}
                      <span className="truncate">{node.label}</span>
                    </div>
                    {isActive && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        TRAVERSED
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-[#6B7280] truncate font-mono">
                    ID: {node.id}
                  </div>
                  <div className="mt-2 text-[10px] text-[#D1D5DB] line-clamp-2 leading-relaxed">
                    {node.metadata.focus ||
                      node.metadata.action ||
                      node.metadata.instruction ||
                      node.metadata.ctaRule ||
                      'Operational parameters'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Lineage Summary */}
          {activeEdges.length > 0 && (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3 space-y-1.5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Active Multi-Hop Traversal Path:
              </div>
              <div className="space-y-1 font-mono text-[9px] text-[#D1D5DB]">
                {activeEdges.map((edge, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-[#0A0A0A] rounded text-blue-300 border border-[#1F2937]">
                      {edge.source_node || edge.sourceNode}
                    </span>
                    <span className="text-emerald-400 font-bold">→ [{edge.relationship}] →</span>
                    <span className="px-1.5 py-0.5 bg-[#0A0A0A] rounded text-purple-300 border border-[#1F2937]">
                      {edge.target_node || edge.targetNode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Node Details Inspector */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between space-y-4">
          {selectedNode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-2.5">
                <div className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.nodeType)}
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {selectedNode.nodeType}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#9CA3AF] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#1F2937]">
                  {selectedNode.id}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white font-mono">{selectedNode.label}</h4>
                <p className="text-xs text-[#D1D5DB] mt-1 leading-relaxed">
                  {selectedNode.metadata.name ||
                    selectedNode.metadata.platformName ||
                    selectedNode.metadata.action ||
                    selectedNode.metadata.instruction}
                </p>
              </div>

              {/* Metadata Attributes */}
              <div className="space-y-2 pt-2 border-t border-[#1F2937]">
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#6B7280] font-mono">
                  Node Hyperparameters & Constraints:
                </div>
                <div className="bg-[#0A0A0A] border border-[#1F2937] rounded p-3 space-y-1.5 font-mono text-[9px] max-h-[180px] overflow-y-auto">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 text-[#D1D5DB]">
                      <span className="text-[#6B7280] font-semibold">{key}:</span>
                      <span className="text-emerald-300 font-sans break-words">
                        {Array.isArray(value)
                          ? value.join(' | ')
                          : typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#6B7280] text-xs font-mono">
              Select any graph node on the left to inspect its strategic parameters.
            </div>
          )}

          <div className="pt-3 border-t border-[#1F2937] text-[9px] text-[#6B7280] font-mono flex items-center justify-between">
            <span>Index: HNSW Vector Cosine</span>
            <span className="text-emerald-400 font-bold">Latency: 0.04 ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
