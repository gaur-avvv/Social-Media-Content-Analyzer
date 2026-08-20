/**
 * LlamaCloud / LlamaParse API Integration Client
 * Supports official LlamaIndex Cloud & LlamaParse REST API endpoints with automated polling and fallback.
 */

export interface LlamaParseResult {
  text: string;
  markdown: string;
  jobId?: string;
  source: 'LLAMA_CLOUD_API' | 'EMULATED_GEMINI_LAYER';
  density?: 'normal' | 'high-density';
  metadata?: Record<string, any>;
}

export function getLlamaCloudApiKey(): string | null {
  return (
    process.env.LLAMA_CLOUD_API_KEY ||
    process.env.LLAMACLOUD_API_KEY ||
    process.env.LLAMAPARSE_API_KEY ||
    process.env.LLAMA_INDEX_API_KEY ||
    null
  );
}

export function isLlamaCloudConfigured(): boolean {
  const key = getLlamaCloudApiKey();
  return Boolean(key && key.trim().length > 0 && !key.includes('MY_LLAMA_CLOUD_API_KEY'));
}

/**
 * Parse a document using the official LlamaCloud / LlamaParse REST API
 */
export async function parseWithLlamaCloud(params: {
  fileName: string;
  mimeType: string;
  base64Data: string;
}): Promise<LlamaParseResult | null> {
  const apiKey = getLlamaCloudApiKey();
  if (!apiKey || apiKey.includes('MY_LLAMA_CLOUD_API_KEY')) {
    return null;
  }

  const { fileName, mimeType, base64Data } = params;

  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const blob = new Blob([buffer], { type: mimeType });

    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('parsing_instruction', 'Extract structured text, tables, headers, and bullet points preserving layout hierarchy.');

    const uploadRes = await fetch('https://api.cloud.llamaindex.ai/api/v1/parsing/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.warn(`[LlamaCloud API] Upload failed (${uploadRes.status}):`, errText);
      return null;
    }

    const uploadJson = await uploadRes.json();
    const jobId = uploadJson.id;

    if (!jobId) {
      console.warn('[LlamaCloud API] No job ID returned from upload');
      return null;
    }

    // Poll job status with max 6 attempts (up to 12s total)
    let markdown = '';
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusRes = await fetch(`https://api.cloud.llamaindex.ai/api/v1/parsing/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!statusRes.ok) continue;

      const statusJson = await statusRes.json();
      if (statusJson.status === 'SUCCESS') {
        const resultRes = await fetch(`https://api.cloud.llamaindex.ai/api/v1/parsing/job/${jobId}/result/markdown`, {
          headers: {
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          signal: AbortSignal.timeout(5000),
        });

        if (resultRes.ok) {
          const resultJson = await resultRes.json();
          markdown = resultJson.markdown || resultJson.text || '';
          break;
        }
      } else if (statusJson.status === 'ERROR') {
        console.warn('[LlamaCloud API] Parsing job returned ERROR status:', statusJson.error_message);
        return null;
      }
    }

    if (markdown.trim()) {
      const isHighDensity = markdown.length > 800 || (markdown.match(/\n/g) || []).length > 15;
      return {
        text: markdown,
        markdown,
        jobId,
        source: 'LLAMA_CLOUD_API',
        density: isHighDensity ? 'high-density' : 'normal',
      };
    }

    return null;
  } catch (err: any) {
    console.warn('[LlamaCloud API] Error calling LlamaCloud parsing endpoint:', err?.message);
    return null;
  }
}
