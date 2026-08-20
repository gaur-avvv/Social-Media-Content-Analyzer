'use client';

import React, { useState } from 'react';
import { GraphNode, SEED_NODES } from '@/lib/graph/knowledge-base';
import { Network, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

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
          return 'bg-blue-500/15 border-blue-500/80 text-blue-300 shadow-sm shadow-blue-500/20';
        case 'COPYWRITING_MATRIX':
          return 'bg-purple-500/15 border-purple-500/80 text-purple-300 shadow-sm shadow-purple-500/20';
        case 'LAYOUT_RULE':
          return 'bg-emerald-500/15 border-emerald-500/80 text-emerald-300 shadow-sm shadow-emerald-500/20';
        case 'STRATEGY_RULE':
          return 'bg-amber-500/15 border-amber-500/80 text-amber-300 shadow-sm shadow-amber-500/20';
      }
    }
    switch (type) {
      case 'PLATFORM':
        return 'bg-[#0b1120] border-slate-800 text-blue-400 hover:border-blue-700/60';
      case 'COPYWRITING_MATRIX':
        return 'bg-[#0b1120] border-slate-800 text-purple-400 hover:border-purple-700/60';
      case 'LAYOUT_RULE':
        return 'bg-[#0b1120] border-slate-800 text-emerald-400 hover:border-emerald-700/60';
      case 'STRATEGY_RULE':
        return 'bg-[#0b1120] border-slate-800 text-amber-400 hover:border-amber-700/60';
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
    <div className="bg-[#0f172a]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                Knowledge Graph & Adjacency Mesh
              </h3>
              <p className="text-[11px] text-slate-400">
                Topological rule relations & multi-hop traversal paths mapped for social optimization
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 bg-[#0b0f19] p-1 rounded-xl border border-slate-800">
          {['ALL', 'PLATFORM', 'COPYWRITING_MATRIX', 'LAYOUT_RULE', 'STRATEGY_RULE'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 text-[10px] font-mono font-medium rounded-lg transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-slate-800 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
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
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Knowledge Graph Nodes ({filteredNodes.length})</span>
            <span className="text-emerald-400 flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Traversal Lineage Highlighted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const isActive = activeNodeIds.includes(node.id) || node.id.includes(selectedPlatform);
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${getNodeColor(
                    node.nodeType,
                    isActive
                  )} ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500/50' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 font-semibold text-xs text-white">
                      {getNodeIcon(node.nodeType)}
                      <span className="truncate">{node.label}</span>
                    </div>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        TRAVERSED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate font-mono">
                    ID: {node.id}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
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
            <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-3.5 space-y-2 shadow-inner">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Active Multi-Hop Traversal Path:
              </div>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-300">
                {activeEdges.map((edge, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-[#080c14] rounded text-blue-300 border border-slate-800">
                      {edge.source_node || edge.sourceNode}
                    </span>
                    <span className="text-emerald-400 font-bold">→ [{edge.relationship}] →</span>
                    <span className="px-2 py-0.5 bg-[#080c14] rounded text-purple-300 border border-slate-800">
                      {edge.target_node || edge.targetNode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Node Details Inspector */}
        <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between space-y-4 shadow-md">
          {selectedNode ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.nodeType)}
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {selectedNode.nodeType}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-[#080c14] px-2.5 py-1 rounded-lg border border-slate-800">
                  {selectedNode.id}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white font-mono">{selectedNode.label}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedNode.metadata.name ||
                    selectedNode.metadata.platformName ||
                    selectedNode.metadata.action ||
                    selectedNode.metadata.instruction}
                </p>
              </div>

              {/* Metadata Attributes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Node Hyperparameters & Constraints:
                </div>
                <div className="bg-[#080c14] border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-[10px] max-h-[180px] overflow-y-auto">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 text-slate-300">
                      <span className="text-slate-400 font-semibold">{key}:</span>
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
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              Select any graph node on the left to inspect its strategic parameters.
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Index: HNSW Vector Cosine</span>
            <span className="text-emerald-400 font-bold">Latency: 0.04 ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
