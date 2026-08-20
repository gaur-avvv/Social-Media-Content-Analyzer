-- Relational Adjacency Knowledge Graph Seed Schema (GraphRAG)
-- Used by the Vision-Graph AI Engagement Compass

-- 1. Create Knowledge Graph Nodes Table
CREATE TABLE IF NOT EXISTS graph_nodes (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    metadata JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Knowledge Graph Edges (Relationships) Table
CREATE TABLE IF NOT EXISTS graph_edges (
    source_node TEXT REFERENCES graph_nodes(id) ON DELETE CASCADE,
    target_node TEXT REFERENCES graph_nodes(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL,
    weight FLOAT DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (source_node, target_node)
);

-- 3. Seed Platform Constraints & Algorithmic Heuristics
INSERT INTO graph_nodes (id, category, metadata) VALUES
(
    'platform:linkedin',
    'platform',
    '{"max_chars": 3000, "hook_limit": 140, "first_comment_link": true, "recommended_paragraphs": 4, "tone": "authoritative_professional"}'
),
(
    'platform:instagram',
    'platform',
    '{"max_chars": 2200, "hook_limit": 125, "hashtag_limit": 5, "first_comment_link": false, "tone": "visual_storytelling"}'
),
(
    'platform:twitter',
    'platform',
    '{"max_chars": 280, "hook_limit": 90, "thread_eligible": true, "first_comment_link": false, "tone": "punchy_concise"}'
),
(
    'platform:threads',
    'platform',
    '{"max_chars": 500, "hook_limit": 100, "conversation_starter": true, "tone": "conversational_open"}'
),
(
    'framework:pas',
    'copywriting',
    '{"name": "Problem-Agitate-Solution", "structure": ["Identify Core Pain", "Amplify Real-World Cost", "Present Solution as Resolution"], "retention_target": 0.88}'
),
(
    'framework:aida',
    'copywriting',
    '{"name": "Attention-Interest-Desire-Action", "structure": ["Pattern Interrupt Hook", "Curiosity Data Point", "Transformation Promise", "Single Clear CTA"], "retention_target": 0.85}'
),
(
    'layout:high-density',
    'layout',
    '{"bullet_frequency": "high", "max_sentence_length": 18, "whitespace_ratio": 0.40, "skimmability_score": 92}'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Relational Constraints (Edges)
INSERT INTO graph_edges (source_node, target_node, relationship, weight) VALUES
('platform:linkedin', 'framework:pas', 'OPTIMIZED_FOR', 1.0),
('platform:linkedin', 'layout:high-density', 'REQUIRES_LAYOUT', 0.95),
('platform:instagram', 'framework:aida', 'OPTIMIZED_FOR', 0.90),
('platform:twitter', 'framework:pas', 'OPTIMIZED_FOR', 0.85),
('platform:threads', 'framework:aida', 'OPTIMIZED_FOR', 0.85)
ON CONFLICT (source_node, target_node) DO NOTHING;
