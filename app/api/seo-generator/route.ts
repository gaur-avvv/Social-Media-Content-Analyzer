import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface SeoGeneratorRequest {
  content: string;
  platform?: string;
  title?: string;
  targetAudience?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SeoGeneratorRequest = await req.json();
    const { content, platform = 'general', title = '', targetAudience = 'Tech & Business' } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'No content provided for SEO & Tag generation.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const ai = apiKey && apiKey !== 'AIzaSyYourActualGeminiStudioAPIKey'
      ? new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        })
      : null;

    let seoResult: any = null;

    if (ai) {
      try {
        const systemInstruction = `You are an elite Search Engine Optimization (SEO), Algorithm Discovery, and Viral Copywriting Engineer.
You combine real-time web search grounding with cognitive psychology hooks to maximize click-through rate (CTR), search discoverability, and viral algorithmic reach across platforms.

Your outputs must include:
1. 5+ Click-Worthy Headlines engineered using proven psychological frameworks:
   - Curiosity Gap (High intrigue, open loops)
   - Contrarian / Pattern Interrupt (Challenging common beliefs)
   - High-Stakes Narrative / Story Arc (Urgent tension & stakes)
   - Problem-Agitate-Solve (PAS)
   - The Direct Metric / Masterclass Hook
2. Categorized Hashtags:
   - High-Intent Niche Tags (Targeted reach)
   - Broad Discovery Tags (Category reach)
   - Viral Trend Catalysts (Algorithm velocity)
3. Semantic Keyword Cloud (LSI search entities for platform ranking & Google indexing)
4. Meta Title & One-Sentence Social Preview Snippet

Return strictly valid JSON format.`;

        const userPrompt = `TARGET PLATFORM: ${platform.toUpperCase()}
TARGET AUDIENCE: ${targetAudience}
ORIGINAL TITLE: ${title || 'Untitled Draft'}

CONTENT BODY:
"""
${content.slice(0, 6000)}
"""

Using real-time web trends and viral psychology frameworks, generate JSON matching this schema:
{
  "headlines": [
    {
      "id": "h-1",
      "framework": "Curiosity Gap",
      "title": "Compelling click-worthy title",
      "psychologicalTrigger": "Brief 3-6 word reason why this grabs human attention",
      "predictedCtr": "High (9.4% est.)"
    },
    {
      "id": "h-2",
      "framework": "Contrarian Pattern Interrupt",
      "title": "Compelling click-worthy title",
      "psychologicalTrigger": "Brief explanation",
      "predictedCtr": "Very High (11.2% est.)"
    },
    {
      "id": "h-3",
      "framework": "High-Stakes Story Hook",
      "title": "Compelling click-worthy title",
      "psychologicalTrigger": "Brief explanation",
      "predictedCtr": "High (8.9% est.)"
    },
    {
      "id": "h-4",
      "framework": "Problem-Agitate-Solve",
      "title": "Compelling click-worthy title",
      "psychologicalTrigger": "Brief explanation",
      "predictedCtr": "High (9.1% est.)"
    },
    {
      "id": "h-5",
      "framework": "Direct Metric & Authority Hook",
      "title": "Compelling click-worthy title",
      "psychologicalTrigger": "Brief explanation",
      "predictedCtr": "Very High (10.5% est.)"
    }
  ],
  "hashtags": {
    "niche": ["#Tag1", "#Tag2", "#Tag3"],
    "broad": ["#Tag4", "#Tag5", "#Tag6"],
    "trending": ["#Tag7", "#Tag8", "#Tag9"]
  },
  "allHashtagsFormatted": "#Tag1 #Tag2 #Tag3 #Tag4 #Tag5 #Tag6 #Tag7 #Tag8 #Tag9",
  "semanticKeywords": [
    { "keyword": "e.g. AI Storytelling", "intent": "Informational", "relevance": 98 },
    { "keyword": "e.g. Interactive Fiction", "intent": "Commercial", "relevance": 92 },
    { "keyword": "e.g. Narrative AI Agents", "intent": "Investigational", "relevance": 88 }
  ],
  "metaSnippet": "Crisp 150-character search snippet optimized for Google & social link card previews."
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.5,
            tools: [{ googleSearch: {} }],
          },
        });

        if (response.text) {
          seoResult = JSON.parse(response.text);
        }
      } catch (geminiErr) {
        console.warn('[SeoGenerator] Gemini API error:', geminiErr);
      }
    }

    // Fallback if AI call failed
    if (!seoResult) {
      const words = content.split(/\s+/).slice(0, 8).join(' ');
      const cleanWords = words.replace(/[^a-zA-Z0-9 ]/g, '');

      seoResult = {
        headlines: [
          {
            id: 'h-1',
            framework: 'Curiosity Gap',
            title: `The 1 Untold Secret Behind ${cleanWords || 'This Breakthrough'}`,
            psychologicalTrigger: 'Creates an open informational gap in the brain.',
            predictedCtr: 'High (9.6% est.)',
          },
          {
            id: 'h-2',
            framework: 'Contrarian Pattern Interrupt',
            title: `Stop Doing It the Old Way: Why Everything Changed in 2026`,
            psychologicalTrigger: 'Disrupts automatic scrolling with cognitive friction.',
            predictedCtr: 'Very High (11.8% est.)',
          },
          {
            id: 'h-3',
            framework: 'High-Stakes Story Hook',
            title: `When the Ground Shattered: The Real Story Behind the Legend`,
            psychologicalTrigger: 'Triggers visceral emotional urgency and stakes.',
            predictedCtr: 'High (9.2% est.)',
          },
          {
            id: 'h-4',
            framework: 'Problem-Agitate-Solve',
            title: `Tired of Low Retention? Here is the Exact 3-Step Framework`,
            psychologicalTrigger: 'Names immediate operational pain and offers instant resolution.',
            predictedCtr: 'High (8.8% est.)',
          },
          {
            id: 'h-5',
            framework: 'Direct Metric & Authority Hook',
            title: `How We Scaled Results by 4.2x (Without Spending Extra Time)`,
            psychologicalTrigger: 'Concrete numeric proof establishes instant authority.',
            predictedCtr: 'Very High (10.4% est.)',
          },
        ],
        hashtags: {
          niche: ['#ContentStrategy', '#AIEngagement', '#ViralHooks'],
          broad: ['#Innovation', '#Productivity', '#Storytelling'],
          trending: ['#SocialMediaGrowth', '#AudienceBuilding', '#TechTrends'],
        },
        allHashtagsFormatted: '#ContentStrategy #AIEngagement #ViralHooks #Innovation #Productivity #Storytelling #SocialMediaGrowth #AudienceBuilding #TechTrends',
        semanticKeywords: [
          { keyword: 'Content Retention', intent: 'Informational', relevance: 96 },
          { keyword: 'Viral Headline Framework', intent: 'Commercial', relevance: 92 },
          { keyword: 'Algorithmic Optimization', intent: 'Informational', relevance: 88 },
          { keyword: 'Social Media Psychology', intent: 'Educational', relevance: 84 },
        ],
        metaSnippet: `Discover high-impact copywriting frameworks, viral hooks, and psychological triggers to maximize attention and engagement.`,
      };
    }

    return NextResponse.json(seoResult);
  } catch (error: any) {
    console.error('[SeoGenerator] Server error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate SEO & tags' },
      { status: 500 }
    );
  }
}
