import { graphEngine, GraphNode, GraphEdge } from '@/lib/graph/knowledge-base';

interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && !url.includes('placeholder')),
  };
};

/**
 * Resilient Supabase Knowledge Graph Adapter
 * Queries real Supabase postgres instance if credentials exist;
 * Otherwise uses the in-memory HNSW-ready KnowledgeGraphEngine.
 */
export async function queryGraphEdges(sourceNodes: string[]): Promise<{ target_node: string; source_node: string; relationship: string }[]> {
  const config = getSupabaseConfig();

  if (config.isConfigured && config.url && config.anonKey) {
    try {
      const response = await fetch(`${config.url}/rest/v1/graph_edges?source_node=in.(${sourceNodes.join(',')})&select=*`, {
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Supabase remote query failed, falling back to embedded graph engine:', err);
    }
  }

  // Resilient fallback using embedded KnowledgeGraphEngine
  const allEdges = graphEngine.getAllEdges();
  return allEdges
    .filter((e) => sourceNodes.includes(e.sourceNode))
    .map((e) => ({
      source_node: e.sourceNode,
      target_node: e.targetNode,
      relationship: e.relationship,
    }));
}

export async function queryGraphNodes(nodeIds: string[]): Promise<GraphNode[]> {
  const config = getSupabaseConfig();

  if (config.isConfigured && config.url && config.anonKey) {
    try {
      const response = await fetch(`${config.url}/rest/v1/graph_nodes?id=in.(${nodeIds.join(',')})&select=*`, {
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            nodeType: d.node_type || d.nodeType,
            label: d.label || d.id,
            metadata: d.metadata || {},
          }));
        }
      }
    } catch (err) {
      console.warn('Supabase nodes query fallback:', err);
    }
  }

  return nodeIds
    .map((id) => graphEngine.getNode(id))
    .filter((n): n is GraphNode => Boolean(n));
}
