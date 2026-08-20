import { NextRequest, NextResponse } from 'next/server';
import { graphEngine } from '@/lib/graph/knowledge-base';
import { getSupabaseConfig } from '@/lib/supabase/client';

export async function GET() {
  const nodes = graphEngine.getAllNodes();
  const edges = graphEngine.getAllEdges();
  const supabaseConfig = getSupabaseConfig();

  return NextResponse.json({
    nodes,
    edges,
    totalNodes: nodes.length,
    totalEdges: edges.length,
    databaseEngine: supabaseConfig.isConfigured ? 'Supabase PostgreSQL (Active)' : 'Embedded Topological Engine (HNSW-Ready)',
    indexType: 'HNSW Spatial Vector + Adjacency Tables',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { platform, density, customStartNodes } = await req.json();
    const startNodes = customStartNodes || [`platform:${platform || 'linkedin'}`, density === 'high-density' ? 'layout:high-density' : 'layout:visual-first'];
    const traversal = graphEngine.traverseMultiHop(startNodes, 2);

    return NextResponse.json({
      startNodes,
      traversal,
      nodeCount: traversal.nodes.length,
      edgeCount: traversal.edges.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
