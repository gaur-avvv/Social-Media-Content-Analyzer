import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Vision Graph Copilot | Enterprise Social Media Content Analyzer',
  description: 'Enterprise-grade hybrid edge & cloud social media content analyzer and RAG copilot powered by LlamaIndex, Google Gemini, Knowledge Graph routing, and automated LLM-as-a-judge evaluation.',
  openGraph: {
    title: 'Vision Graph Copilot | Enterprise Social Media Content Analyzer',
    description: 'Enterprise-grade hybrid edge & cloud social media content analyzer and RAG copilot powered by LlamaIndex, Google Gemini, Knowledge Graph routing, and automated LLM-as-a-judge evaluation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Graph Copilot | Enterprise Social Media Content Analyzer',
    description: 'Enterprise-grade hybrid edge & cloud social media content analyzer and RAG copilot powered by LlamaIndex, Google Gemini, Knowledge Graph routing, and automated LLM-as-a-judge evaluation.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
