-- ==============================================================================
-- ENTERPRISE SOCIAL MEDIA KNOWLEDGE GRAPH SCHEMA & SEED MIGRATION
-- Compatible with Supabase PostgreSQL + pgvector extension
-- ==============================================================================

-- Enable vector extension for spatial embedding matches
create extension if not exists vector;

-- Drop existing tables if recreating
drop table if exists graph_edges;
drop table if exists graph_nodes;

-- 1. Nodes represent operational platforms, copywriting matrices, layout rules, and heuristics
create table graph_nodes (
  id varchar(64) primary key, 
  node_type varchar(32) not null, -- 'PLATFORM', 'COPYWRITING_MATRIX', 'LAYOUT_RULE', 'STRATEGY_RULE'
  label varchar(128) not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(768)          -- Spatial embedding for semantic vector matches
);

-- 2. Edges map direct topological dependencies across strategic properties
create table graph_edges (
  id uuid primary key default gen_random_uuid(),
  source_node varchar(64) references graph_nodes(id) on delete cascade,
  target_node varchar(64) references graph_nodes(id) on delete cascade,
  relationship varchar(64) not null, -- 'OPTIMIZED_BY', 'REQUIRES_FORMAT', 'RECOMMENDS_CTA', 'CONSTRAINED_BY'
  weight float default 1.0
);

-- Optimize routing operations using high-performance HNSW index
create index on graph_nodes using hnsw (embedding vector_cosine_ops) with (m = 16, ef_construction = 64);

-- 3. Seed production-grade corporate rules into the knowledge architecture
insert into graph_nodes (id, node_type, label, metadata) values
  ('platform:linkedin', 'PLATFORM', 'LinkedIn Feed Architecture', '{"max_char": 3000, "hook_position": "first_3_lines", "cta": "Put link in the comments", "recommended_tone": "authoritative, professional, insightful", "algorithm_focus": "dwell_time, comments, reposts"}'),
  ('platform:instagram', 'PLATFORM', 'Instagram Grid & Carousel', '{"max_char": 2200, "visual_priority": "high", "cta": "Link in bio / Comment for DM", "recommended_tone": "visual, punchy, conversational", "algorithm_focus": "saves, shares, carousel_swipes"}'),
  ('platform:twitter_x', 'PLATFORM', 'X / Twitter Thread', '{"max_char": 280, "hook_position": "line_1", "cta": "Retweet the first tweet / Bookmark", "recommended_tone": "sharp, contrarian, data-driven", "algorithm_focus": "bookmarks, replies, quote_tweets"}'),
  ('platform:threads', 'PLATFORM', 'Meta Threads', '{"max_char": 500, "hook_position": "first_2_lines", "cta": "Reply to join discussion", "recommended_tone": "casual, authentic, direct", "algorithm_focus": "replies, quote_shares"}'),
  ('platform:youtube_community', 'PLATFORM', 'YouTube Community Tab', '{"max_char": 5000, "hook_position": "first_line", "cta": "Watch full video / Vote on poll", "recommended_tone": "community-driven, enthusiastic", "algorithm_focus": "poll_engagement, video_clicks"}'),
  
  ('framework:pas', 'COPYWRITING_MATRIX', 'Problem-Agitate-Solve (PAS)', '{"name": "Problem-Agitate-Solve", "focus": "Pain points, emotional agitation, and direct conversion drives", "structure": ["Identify root problem", "Agitate the consequences of inaction", "Deliver clear tactical solution"]}'),
  ('framework:aida', 'COPYWRITING_MATRIX', 'Attention-Interest-Desire-Action (AIDA)', '{"name": "Attention-Interest-Desire-Action", "focus": "High-intensity hooks leading to curiosity and immediate action", "structure": ["Grab Attention", "Spark Interest with data/story", "Build Desire through outcomes", "Drive clear Call to Action"]}'),
  ('framework:bab', 'COPYWRITING_MATRIX', 'Before-After-Bridge (BAB)', '{"name": "Before-After-Bridge", "focus": "Transformation stories and case studies", "structure": ["Current painful state", "Desired ideal outcome", "The bridge mechanism to get there"]}'),
  ('framework:storybrand', 'COPYWRITING_MATRIX', 'StoryBrand Framework', '{"name": "StoryBrand 7-Part Framework", "focus": "Customer as the hero, brand as the guide", "structure": ["Character", "Problem", "Guide with Plan", "Call to Action", "Avoid Failure / Achieve Success"]}'),
  
  ('layout:high-density', 'LAYOUT_RULE', 'High Density Text Breakdown', '{"action": "Convert massive text walls into clear bullet sequences and micro-paragraphs under 2 lines", "line_break_frequency": "high", "visual_anchors": true}'),
  ('layout:visual-first', 'LAYOUT_RULE', 'Visual-First Formatting', '{"action": "Emphasize visual scanning, numbered lists, and emoji bullet points with ample white space", "line_break_frequency": "very_high"}'),
  ('layout:bite-sized', 'LAYOUT_RULE', 'Bite-Sized Micro-Pacing', '{"action": "Keep each paragraph strictly under 25 words with single-sentence punchlines", "pacing": "rapid"}'),
  
  ('rule:hook_first_3_lines', 'STRATEGY_RULE', 'Above-The-Fold Hook Rule', '{"instruction": "Must capture attention within first 140 characters before the See More cutoff", "priority": 1}'),
  ('rule:link_in_comments', 'STRATEGY_RULE', 'Algorithm Reach Protection', '{"instruction": "Never place external links in the main body text; instruct readers to check the comments", "priority": 2}'),
  ('rule:carousel_pacing', 'STRATEGY_RULE', 'Multi-Slide Content Pacing', '{"instruction": "Break insights into 5-7 clear swipeable steps with a summary slide", "priority": 1}');

-- 4. Seed relationships between platforms, frameworks, and layout rules
insert into graph_edges (source_node, target_node, relationship) values
  ('platform:linkedin', 'framework:pas', 'OPTIMIZED_BY'),
  ('platform:linkedin', 'framework:bab', 'OPTIMIZED_BY'),
  ('platform:linkedin', 'layout:high-density', 'REQUIRES_FORMAT'),
  ('platform:linkedin', 'rule:hook_first_3_lines', 'CONSTRAINED_BY'),
  ('platform:linkedin', 'rule:link_in_comments', 'RECOMMENDS_CTA'),

  ('platform:instagram', 'framework:aida', 'OPTIMIZED_BY'),
  ('platform:instagram', 'layout:visual-first', 'REQUIRES_FORMAT'),
  ('platform:instagram', 'rule:carousel_pacing', 'CONSTRAINED_BY'),

  ('platform:twitter_x', 'framework:bab', 'OPTIMIZED_BY'),
  ('platform:twitter_x', 'framework:pas', 'OPTIMIZED_BY'),
  ('platform:twitter_x', 'layout:bite-sized', 'REQUIRES_FORMAT'),

  ('platform:threads', 'framework:pas', 'OPTIMIZED_BY'),
  ('platform:threads', 'layout:bite-sized', 'REQUIRES_FORMAT'),

  ('platform:youtube_community', 'framework:storybrand', 'OPTIMIZED_BY'),
  ('platform:youtube_community', 'layout:high-density', 'REQUIRES_FORMAT'),

  ('layout:high-density', 'framework:pas', 'REQUIRES_FORMAT'),
  ('layout:high-density', 'rule:hook_first_3_lines', 'CONSTRAINED_BY');
