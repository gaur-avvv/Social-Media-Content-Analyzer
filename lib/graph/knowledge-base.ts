export interface GraphNode {
  id: string;
  nodeType: 'PLATFORM' | 'COPYWRITING_MATRIX' | 'LAYOUT_RULE' | 'STRATEGY_RULE';
  label: string;
  metadata: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  sourceNode: string;
  targetNode: string;
  relationship: 'OPTIMIZED_BY' | 'REQUIRES_FORMAT' | 'RECOMMENDS_CTA' | 'CONSTRAINED_BY' | 'INFLUENCES';
  weight?: number;
}

export interface TraversalPath {
  path: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  summary: string;
}

export const SEED_NODES: GraphNode[] = [
  {
    id: 'platform:linkedin',
    nodeType: 'PLATFORM',
    label: 'LinkedIn Feed Algorithm',
    metadata: {
      platformName: 'LinkedIn',
      maxChar: 3000,
      optimalCharRange: '1200 - 1800',
      hookPosition: 'first_3_lines (under 140 chars)',
      ctaRule: 'Place high-value links in the first comment to avoid reach throttling',
      recommendedTone: 'Authoritative, vulnerable, data-backed, executive',
      algorithmFocus: 'Dwell time, meaningful comment depth, reposts with thoughts',
      lineBreakStyle: 'Double spaced between micro-paragraphs',
    },
  },
  {
    id: 'platform:instagram',
    nodeType: 'PLATFORM',
    label: 'Instagram Carousel & Post',
    metadata: {
      platformName: 'Instagram',
      maxChar: 2200,
      optimalCharRange: '500 - 1000',
      visualPriority: 'high',
      ctaRule: 'Link in Bio or "Comment KEYWORD to get DM breakdown"',
      recommendedTone: 'Visual, punchy, conversational, energetic',
      algorithmFocus: 'Saves, DMs, shares to story, carousel slide completion',
      lineBreakStyle: 'Clean bullet blocks with visual emojis',
    },
  },
  {
    id: 'platform:twitter_x',
    nodeType: 'PLATFORM',
    label: 'X (Twitter) Viral Thread',
    metadata: {
      platformName: 'X / Twitter',
      maxChar: 280,
      threadLength: '4 - 7 tweets',
      hookPosition: 'Line 1 (contrarian or quantified statement)',
      ctaRule: 'Final tweet CTA for newsletter/retweet/bookmark',
      recommendedTone: 'Sharp, contrarian, no fluff, high signal-to-noise',
      algorithmFocus: 'Bookmarks, profile visits, replies, quotes',
      lineBreakStyle: 'Single tweet punchlines',
    },
  },
  {
    id: 'platform:threads',
    nodeType: 'PLATFORM',
    label: 'Meta Threads Feed',
    metadata: {
      platformName: 'Threads',
      maxChar: 500,
      hookPosition: 'First 2 lines',
      ctaRule: 'Direct conversational prompt to drive replies',
      recommendedTone: 'Casual, candid, unpolished insider perspective',
      algorithmFocus: 'Conversational replies, quote threads',
    },
  },
  {
    id: 'platform:youtube_community',
    nodeType: 'PLATFORM',
    label: 'YouTube Community Tab',
    metadata: {
      platformName: 'YouTube Community',
      maxChar: 5000,
      hookPosition: 'First 100 characters',
      ctaRule: 'Clickable link to premiering/featured video or poll',
      recommendedTone: 'Community-centric, direct viewer connection',
      algorithmFocus: 'Poll votes, thumbnail clicks, community comments',
    },
  },
  {
    id: 'framework:pas',
    nodeType: 'COPYWRITING_MATRIX',
    label: 'Problem-Agitate-Solve (PAS)',
    metadata: {
      name: 'Problem-Agitate-Solve',
      focus: 'Pinpoints an intense operational or emotional bottleneck, expands on why ignoring it will cause severe pain, and presents a systematic resolution.',
      stages: [
        '1. Problem: State a glaring reality or friction point your audience faces daily',
        '2. Agitate: Amplify the hidden costs, missed revenue, stress, or lost time',
        '3. Solve: Reveal the precise framework, blueprint, or step-by-step fix',
      ],
      conversionMultiplier: '1.45x',
    },
  },
  {
    id: 'framework:aida',
    nodeType: 'COPYWRITING_MATRIX',
    label: 'Attention-Interest-Desire-Action (AIDA)',
    metadata: {
      name: 'Attention-Interest-Desire-Action',
      focus: 'High-velocity hook into narrative proof and concrete call to action.',
      stages: [
        '1. Attention: Bold counter-intuitive statistic or provocative question',
        '2. Interest: Engaging context, real-world case study, or insider breakdown',
        '3. Desire: The tangible transformation or competitive edge gained',
        '4. Action: Exact next step (comment, download, share, implement)',
      ],
      conversionMultiplier: '1.38x',
    },
  },
  {
    id: 'framework:bab',
    nodeType: 'COPYWRITING_MATRIX',
    label: 'Before-After-Bridge (BAB)',
    metadata: {
      name: 'Before-After-Bridge',
      focus: 'Transformation narrative contrasting the struggle of the past with the clarity of the present.',
      stages: [
        '1. Before: The chaotic, manual, or flawed starting condition',
        '2. After: The optimized, automated, or high-performing future state',
        '3. Bridge: The exact strategy, tool, or mindset that bridged the gap',
      ],
      conversionMultiplier: '1.40x',
    },
  },
  {
    id: 'framework:storybrand',
    nodeType: 'COPYWRITING_MATRIX',
    label: 'StoryBrand 7-Part Script',
    metadata: {
      name: 'StoryBrand Protocol',
      focus: 'Positions the reader as the hero and the creator/brand as the trusted guide with a plan.',
      stages: ['Hero in trouble', 'Meets a Guide with empathy', 'Given a 3-step Plan', 'Called to Action to avoid failure'],
    },
  },
  {
    id: 'layout:high-density',
    nodeType: 'LAYOUT_RULE',
    label: 'High-Density Structural Formatting',
    metadata: {
      action: 'Deconstruct massive walls of dense text into modular, visually digestible bullet blocks, clean line spacing, and strategic bold emphasis.',
      lineBreakInterval: 'Every 1 - 2 sentences',
      useBulletClusters: true,
      maxSentenceLength: 22,
    },
  },
  {
    id: 'layout:visual-first',
    nodeType: 'LAYOUT_RULE',
    label: 'Visual-First & Carousel Formatting',
    metadata: {
      action: 'Structure copy with visual markers, emoji anchors, numbered sequences, and high scan-speed layout.',
      visualAnchors: ['→', '📌', '💡', '⚡', '✓'],
      spacingMultiplier: 'Generous',
    },
  },
  {
    id: 'layout:bite-sized',
    nodeType: 'LAYOUT_RULE',
    label: 'Bite-Sized Micro-Pacing',
    metadata: {
      action: 'Enforce strict 1-sentence punchlines with high tension and rapid read-through velocity.',
      maxWordsPerParagraph: 20,
    },
  },
  {
    id: 'rule:hook_first_3_lines',
    nodeType: 'STRATEGY_RULE',
    label: 'Above-the-Fold Hook Constraint',
    metadata: {
      instruction: 'Must capture complete curiosity or value proposition in first 140 characters before the platform folds text behind "...see more".',
      priority: 1,
      ruleCode: 'HOOK_ABOVE_FOLD',
    },
  },
  {
    id: 'rule:link_in_comments',
    nodeType: 'STRATEGY_RULE',
    label: 'Zero-Outbound Link Reach Shield',
    metadata: {
      instruction: 'Never insert outbound external links inside the primary post body. Direct viewers to the top comment to protect organic algorithmic distribution.',
      priority: 1,
      ruleCode: 'LINK_IN_COMMENTS_SHIELD',
    },
  },
  {
    id: 'rule:carousel_pacing',
    nodeType: 'STRATEGY_RULE',
    label: 'Multi-Slide Swipe Velocity',
    metadata: {
      instruction: 'Organize insights across a 5 to 7 slide arc with teaser hooks on each page boundary.',
      priority: 2,
      ruleCode: 'CAROUSEL_SWIPE_ARC',
    },
  },
];

export const SEED_EDGES: GraphEdge[] = [
  { id: 'edge-1', sourceNode: 'platform:linkedin', targetNode: 'framework:pas', relationship: 'OPTIMIZED_BY', weight: 0.95 },
  { id: 'edge-2', sourceNode: 'platform:linkedin', targetNode: 'framework:bab', relationship: 'OPTIMIZED_BY', weight: 0.88 },
  { id: 'edge-3', sourceNode: 'platform:linkedin', targetNode: 'layout:high-density', relationship: 'REQUIRES_FORMAT', weight: 0.92 },
  { id: 'edge-4', sourceNode: 'platform:linkedin', targetNode: 'rule:hook_first_3_lines', relationship: 'CONSTRAINED_BY', weight: 0.98 },
  { id: 'edge-5', sourceNode: 'platform:linkedin', targetNode: 'rule:link_in_comments', relationship: 'RECOMMENDS_CTA', weight: 0.94 },

  { id: 'edge-6', sourceNode: 'platform:instagram', targetNode: 'framework:aida', relationship: 'OPTIMIZED_BY', weight: 0.96 },
  { id: 'edge-7', sourceNode: 'platform:instagram', targetNode: 'layout:visual-first', relationship: 'REQUIRES_FORMAT', weight: 0.91 },
  { id: 'edge-8', sourceNode: 'platform:instagram', targetNode: 'rule:carousel_pacing', relationship: 'CONSTRAINED_BY', weight: 0.89 },

  { id: 'edge-9', sourceNode: 'platform:twitter_x', targetNode: 'framework:bab', relationship: 'OPTIMIZED_BY', weight: 0.93 },
  { id: 'edge-10', sourceNode: 'platform:twitter_x', targetNode: 'framework:pas', relationship: 'OPTIMIZED_BY', weight: 0.90 },
  { id: 'edge-11', sourceNode: 'platform:twitter_x', targetNode: 'layout:bite-sized', relationship: 'REQUIRES_FORMAT', weight: 0.95 },
  { id: 'edge-12', sourceNode: 'platform:twitter_x', targetNode: 'rule:hook_first_3_lines', relationship: 'CONSTRAINED_BY', weight: 0.97 },

  { id: 'edge-13', sourceNode: 'platform:threads', targetNode: 'framework:pas', relationship: 'OPTIMIZED_BY', weight: 0.86 },
  { id: 'edge-14', sourceNode: 'platform:threads', targetNode: 'layout:bite-sized', relationship: 'REQUIRES_FORMAT', weight: 0.90 },

  { id: 'edge-15', sourceNode: 'platform:youtube_community', targetNode: 'framework:storybrand', relationship: 'OPTIMIZED_BY', weight: 0.87 },
  { id: 'edge-16', sourceNode: 'platform:youtube_community', targetNode: 'layout:high-density', relationship: 'REQUIRES_FORMAT', weight: 0.85 },

  { id: 'edge-17', sourceNode: 'layout:high-density', targetNode: 'framework:pas', relationship: 'REQUIRES_FORMAT', weight: 0.89 },
  { id: 'edge-18', sourceNode: 'layout:high-density', targetNode: 'rule:hook_first_3_lines', relationship: 'CONSTRAINED_BY', weight: 0.94 },
  { id: 'edge-19', sourceNode: 'layout:visual-first', targetNode: 'framework:aida', relationship: 'REQUIRES_FORMAT', weight: 0.90 },
];

export class KnowledgeGraphEngine {
  private nodes: Map<string, GraphNode> = new Map();
  private adjacency: Map<string, GraphEdge[]> = new Map();
  private reverseAdjacency: Map<string, GraphEdge[]> = new Map();

  constructor(initialNodes: GraphNode[] = SEED_NODES, initialEdges: GraphEdge[] = SEED_EDGES) {
    initialNodes.forEach((node) => this.nodes.set(node.id, node));
    initialEdges.forEach((edge) => {
      if (!this.adjacency.has(edge.sourceNode)) {
        this.adjacency.set(edge.sourceNode, []);
      }
      this.adjacency.get(edge.sourceNode)!.push(edge);

      if (!this.reverseAdjacency.has(edge.targetNode)) {
        this.reverseAdjacency.set(edge.targetNode, []);
      }
      this.reverseAdjacency.get(edge.targetNode)!.push(edge);
    });
  }

  getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  getAllEdges(): GraphEdge[] {
    const allEdges: GraphEdge[] = [];
    this.adjacency.forEach((edges) => allEdges.push(...edges));
    return allEdges;
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Multi-Hop topological graph traversal starting from specified primary sources
   * (e.g. `platform:linkedin` and `layout:high-density`)
   */
  traverseMultiHop(startNodeIds: string[], maxDepth: number = 2): TraversalPath {
    const visitedNodes = new Set<string>();
    const visitedEdges: GraphEdge[] = [];
    const queue: { nodeId: string; depth: number }[] = [];

    startNodeIds.forEach((id) => {
      if (this.nodes.has(id)) {
        visitedNodes.add(id);
        queue.push({ nodeId: id, depth: 0 });
      }
    });

    while (queue.length > 0) {
      const { nodeId, depth } = queue.shift()!;
      if (depth >= maxDepth) continue;

      const outEdges = this.adjacency.get(nodeId) || [];
      for (const edge of outEdges) {
        visitedEdges.push(edge);
        if (!visitedNodes.has(edge.targetNode)) {
          visitedNodes.add(edge.targetNode);
          queue.push({ nodeId: edge.targetNode, depth: depth + 1 });
        }
      }
    }

    const nodeObjects = Array.from(visitedNodes)
      .map((id) => this.nodes.get(id))
      .filter((n): n is GraphNode => Boolean(n));

    const pathSummaries = visitedEdges.map(
      (e) => `[${e.sourceNode}] --${e.relationship}--> [${e.targetNode}]`
    );

    return {
      path: Array.from(visitedNodes),
      nodes: nodeObjects,
      edges: visitedEdges,
      summary: pathSummaries.join(' | '),
    };
  }

  /**
   * Find most relevant graph rules given target platform and document extraction flags
   */
  resolveStrategyNodes(platform: string, visualDensity: 'normal' | 'high-density'): {
    strategicNodes: GraphNode[];
    traversalLineage: string[];
    serializedContext: string;
  } {
    const platformNodeId = `platform:${platform.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
    const densityNodeId = visualDensity === 'high-density' ? 'layout:high-density' : 'layout:visual-first';

    const traversal = this.traverseMultiHop([platformNodeId, densityNodeId], 2);

    const serializedContext = traversal.nodes
      .map(
        (node) =>
          `NODE [${node.id}] (${node.nodeType} - ${node.label}):\nConfig: ${JSON.stringify(
            node.metadata,
            null,
            2
          )}`
      )
      .join('\n\n');

    const lineage = traversal.edges.map(
      (edge) => `${edge.sourceNode} --[${edge.relationship}]--> ${edge.targetNode}`
    );

    return {
      strategicNodes: traversal.nodes,
      traversalLineage: lineage,
      serializedContext,
    };
  }
}

// Global shared graph instance
export const graphEngine = new KnowledgeGraphEngine();
