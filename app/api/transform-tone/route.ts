import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface ToneTransformRequest {
  content: string;
  toneId: string;
  customPrompt?: string;
  platform?: string;
  enableWebSearch?: boolean;
}

const PERSONA_INSTRUCTIONS: Record<string, { name: string; styleGuide: string }> = {
  elon_musk: {
    name: 'Elon Musk / First-Principles Futurist',
    styleGuide: `Write in the iconic voice of Elon Musk on X (Twitter):
- First principles physics thinking, questioning assumptions from ground up.
- Punchy, short sentences mixed with grand planetary or galactic stakes.
- Raw, unfiltered, high-conviction, occasional dry wit or meme references.
- Emphasize speed of iteration, engineering truth, and bold futurism.
- Use line breaks generously. Avoid corporate fluff or sanitized buzzwords.`,
  },
  gen_z_viral: {
    name: 'Gen-Z / TikTok Viral Hype',
    styleGuide: `Write in authentic, high-velocity Gen-Z / TikTok creator vernacular:
- Use phrases like "no cap", "fr fr", "main character energy", "it's giving", "this is insane", "cooked", "locked in", "the lore goes crazy".
- High dopamine pacing, fast-moving thoughts, relatable urgency.
- Break sentences into rapid-fire 1-line bursts.
- Extremely high energy, emotionally expressive, impossible to look away from.`,
  },
  corporate_executive: {
    name: 'Corporate Executive / McKinsey & Fortune 500',
    styleGuide: `Write in the polished, high-signal voice of a McKinsey Senior Partner or Fortune 500 C-Suite Executive:
- Executive Summary structure with structured strategic pillars.
- ROI metrics, risk mitigation, operational efficiency, and enterprise scalability.
- Crisp, authoritative, balanced, and data-grounded.
- Bullet points with bold categorical anchors.
- Professional, persuasive, and board-ready.`,
  },
  cinematic_storyteller: {
    name: 'Cinematic Storyteller / Novelist Thriller',
    styleGuide: `Write like a master thriller novelist (e.g. Neil Gaiman meets Michael Crichton):
- Atmospheric tension, vivid sensory details (sound of the wind, glowing symbols, the edge of the precipice).
- High stakes: every moment feels like life-or-death decision making.
- Rhythmic pacing: short, breath-catching sentences during action, poetic cadence during discovery.
- Cliffhanger hooks that make it irresistible to stop reading.`,
  },
  mrbeast_retention: {
    name: 'MrBeast High-Energy Retention Hook',
    styleGuide: `Write using the world's most retention-optimized YouTube creator pacing (MrBeast style):
- Irresistible opening hook with impossible stakes in the first 5 words.
- Constant escalation: every 2 lines introduces a new twist, milestone, or challenge.
- Extreme clarity: a 10-year-old and a CEO understand it instantly.
- Countdown urgency, exclamation energy, and immediate payoff.`,
  },
  naval_stoic: {
    name: 'Naval Ravikant / Stoic Philosopher',
    styleGuide: `Write in the timeless, aphoristic voice of Naval Ravikant:
- High signal-to-noise ratio. Maximum insight per syllable.
- First principles, compounding leverage, mental models, peace of mind.
- Calm, detached clarity. No manufactured hype—pure timeless wisdom.
- Micro-essays or numbered aphorisms that feel like ancient proverbs for the modern digital era.`,
  },
  steve_jobs: {
    name: 'Steve Jobs / Keynote Drama',
    styleGuide: `Write in the dramatic, visionary voice of Steve Jobs on stage:
- "Every once in a while, a revolutionary product comes along..."
- Simple words with immense weight. Dramatic pacing.
- Contrasting the old clunky way vs the magical, intuitive future.
- "And one more thing..." climax.
- Passionate, elegant, and uncompromising on excellence.`,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: ToneTransformRequest = await req.json();
    const {
      content,
      toneId = 'elon_musk',
      customPrompt = '',
      platform = 'general',
      enableWebSearch = true,
    } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'No content provided to transform.' },
        { status: 400 }
      );
    }

    const personaConfig = PERSONA_INSTRUCTIONS[toneId];
    const personaName = personaConfig ? personaConfig.name : (customPrompt ? 'Custom Style' : 'Refined Style');
    const styleInstructions = personaConfig ? personaConfig.styleGuide : (customPrompt || 'Transform into a highly engaging, persuasive style.');

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

    let transformedText = '';
    let psychologicalAnalysis = '';

    if (ai) {
      try {
        const systemInstruction = `You are a master of Human Linguistic Psychology, Literary Adaptation, and Social Media Voice Cloning.
You rewrite source content into specific iconic personas and psychological archetypes while preserving 100% of the core factual truth and narrative essence.

VOICE ARCHETYPE: ${personaName}
PERSONA GUIDELINES:
${styleInstructions}

PLATFORM CONSTRAINTS: ${platform.toUpperCase()}
- Hook within the first 2-3 lines.
- Format with generous line breaks suited for social feeds.
- Remove all robotic tags. Output only the pure publication-ready rewritten copy.
- At the very end, include a short 2-sentence breakdown explaining the psychological attention triggers applied:
'## PSYCHOLOGICAL ATTENTION TRIGGERS'`;

        const userPrompt = `SOURCE CONTENT TO TRANSFORM:
"""
${content.slice(0, 6000)}
"""

Rewrite this content completely into the persona: "${personaName}".
Capture human psychology, emotional tension, and platform virality.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.75,
            tools: enableWebSearch ? [{ googleSearch: {} }] : undefined,
          },
        });

        if (response.text) {
          transformedText = response.text.trim();
        }
      } catch (geminiErr) {
        console.warn('[ToneTransformer] Gemini API error:', geminiErr);
      }
    }

    // Fallback if AI call failed
    if (!transformedText) {
      if (toneId === 'elon_musk') {
        transformedText = `First principles matter. Most people look at this and see a standard problem.\n\n` +
          `They're thinking in analogies instead of physics.\n\n` +
          `Here is what is actually happening:\n` +
          `• ${content.slice(0, 150).replace(/\n/g, ' ')}...\n\n` +
          `If we don't fix the fundamental constraint, nothing else matters.\n` +
          `Iterate 10x faster. The future won't build itself.\n\n` +
          `## PSYCHOLOGICAL ATTENTION TRIGGERS\n` +
          `• Leveraged first-principles contrast to immediately trigger intellectual curiosity.\n` +
          `• Applied high-conviction urgency to spur immediate engagement.`;
      } else if (toneId === 'gen_z_viral') {
        transformedText = `no because why is nobody talking about this fr fr 😭💀\n\n` +
          `I was literally looking at this today and my jaw dropped:\n\n` +
          `👉 ${content.slice(0, 150).replace(/\n/g, ' ')}...\n\n` +
          `this is actually insane no cap. we are officially locked in.\n` +
          `drop a comment if you're experiencing this too because I need answers 🏃💨\n\n` +
          `## PSYCHOLOGICAL ATTENTION TRIGGERS\n` +
          `• Used high-dopamine conversational opener to break passive feed scrolling.\n` +
          `• Inserted relatable vulnerability to provoke spontaneous comment replies.`;
      } else {
        transformedText = `Executive Briefing: Strategic Value Optimization\n\n` +
          `Key Operational Synthesis:\n` +
          `• ${content.slice(0, 150).replace(/\n/g, ' ')}...\n\n` +
          `Strategic Implication: Enhancing distribution resilience and mitigating single-point failure yields measurable ROI.\n\n` +
          `## PSYCHOLOGICAL ATTENTION TRIGGERS\n` +
          `• Structured around executive clarity and ROI justification.\n` +
          `• Clean scannable hierarchy maximizes executive retention.`;
      }
    }

    return NextResponse.json({
      toneId,
      personaName,
      transformedText,
    });
  } catch (error: any) {
    console.error('[ToneTransformer] Server error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to transform tone' },
      { status: 500 }
    );
  }
}
