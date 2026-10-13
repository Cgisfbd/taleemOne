import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { ACADEMIC_URDU_SYSTEM_PROMPT } from '@/prompts/academic-urdu.prompt';
import { ACADEMIC_HINDI_SYSTEM_PROMPT } from '@/prompts/academic-hindi.prompt';

export interface TranslationResult {
  result: string;
  provider: string;
  model: string;
  durationMs: number;
}

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Translates English/Roman text into authentic Urdu script using 4-Tier Failover.
   */
  async translateToUrdu(text: string): Promise<TranslationResult> {
    return this.executeCascade(text, ACADEMIC_URDU_SYSTEM_PROMPT, 'Urdu');
  }

  /**
   * Translates English/Roman text into authentic Hindi (Devanagari) script using 4-Tier Failover.
   */
  async translateToHindi(text: string): Promise<TranslationResult> {
    return this.executeCascade(text, ACADEMIC_HINDI_SYSTEM_PROMPT, 'Hindi');
  }

  /**
   * Universal 4-Tier Cascading Engine (Groq ➔ OpenRouter ➔ Gemini ➔ OpenAI).
   */
  private async executeCascade(
    text: string,
    systemPrompt: string,
    langLabel: 'Urdu' | 'Hindi',
  ): Promise<TranslationResult> {
    const rawChain =
      this.configService.get<string>('AI_FALLBACK_CHAIN') ||
      'groq,openrouter,gemini,openai';

    const providers = rawChain
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean);

    const errors: Array<{ provider: string; error: string }> = [];

    for (const provider of providers) {
      const startTime = Date.now();
      try {
        switch (provider) {
          case 'groq': {
            const res = await this.callGroq(text, systemPrompt);
            if (res) {
              const durationMs = Date.now() - startTime;
              this.logger.log(
                `✨ [Tier 1 - Groq] ${langLabel} conversion in ${durationMs}ms: "${text}" -> "${res.result}"`,
              );
              return { ...res, durationMs };
            }
            break;
          }
          case 'openrouter': {
            const res = await this.callOpenRouter(text, systemPrompt);
            if (res) {
              const durationMs = Date.now() - startTime;
              this.logger.log(
                `✨ [Tier 2 - OpenRouter] ${langLabel} conversion in ${durationMs}ms: "${text}" -> "${res.result}"`,
              );
              return { ...res, durationMs };
            }
            break;
          }
          case 'gemini': {
            const res = await this.callGemini(text, systemPrompt);
            if (res) {
              const durationMs = Date.now() - startTime;
              this.logger.log(
                `✨ [Tier 3 - Gemini] ${langLabel} conversion in ${durationMs}ms: "${text}" -> "${res.result}"`,
              );
              return { ...res, durationMs };
            }
            break;
          }
          case 'openai': {
            const res = await this.callOpenAi(text, systemPrompt);
            if (res) {
              const durationMs = Date.now() - startTime;
              this.logger.log(
                `✨ [Tier 4 - OpenAI] ${langLabel} conversion in ${durationMs}ms: "${text}" -> "${res.result}"`,
              );
              return { ...res, durationMs };
            }
            break;
          }
          default:
            this.logger.warn(`Unknown AI provider specified: "${provider}"`);
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : 'Unknown provider error';
        this.logger.warn(
          `⚠️ [Provider Failover] ${provider.toUpperCase()} failed for ${langLabel}: ${errorMsg}. Cascading to next provider...`,
        );
        errors.push({ provider, error: errorMsg });
      }
    }

    // If all configured providers failed
    this.logger.error(
      `❌ All AI providers in fallback chain failed for ${langLabel} text: "${text}". Errors: ${JSON.stringify(errors)}`,
    );

    throw new InternalServerErrorException(
      `All AI providers in the fallback chain were unable to process the ${langLabel} request. Please check API keys in .env.`,
    );
  }

  // ── Tier 1: Groq Cloud ─────────────────────────────────────────────────────
  private async callGroq(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }

    const model =
      this.configService.get<string>('GROQ_MODEL') || 'qwen/qwen3.8-27b';

    const client = new Groq({ apiKey });
    const response = await client.chat.completions.create({
      model,
      temperature: 0.1,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
    });

    const result = this.cleanOutput(
      response.choices[0]?.message?.content || '',
    );
    if (!result) return null;

    return { result, provider: 'groq', model };
  }

  // ── Tier 2: OpenRouter ─────────────────────────────────────────────────────
  private async callOpenRouter(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }

    const model =
      this.configService.get<string>('OPENROUTER_MODEL') ||
      'meta-llama/llama-3.3-70b-instruct:free';
    const baseURL =
      this.configService.get<string>('OPENROUTER_BASE_URL') ||
      'https://openrouter.ai/api/v1';

    const client = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders: {
        'HTTP-Referer': 'https://taleemone.com',
        'X-Title': 'TaleemOne ERP',
      },
    });

    const response = await client.chat.completions.create({
      model,
      temperature: 0.1,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
    });

    const result = this.cleanOutput(
      response.choices[0]?.message?.content || '',
    );
    if (!result) return null;

    return { result, provider: 'openrouter', model };
  }

  // ── Tier 3: Google Gemini ──────────────────────────────────────────────────
  private async callGemini(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }

    const model =
      this.configService.get<string>('GEMINI_MODEL') || 'gemini-2.0-flash';

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: `${systemPrompt}\n\nText to convert: "${text}"`,
    });

    const result = this.cleanOutput(response.text || '');
    if (!result) return null;

    return { result, provider: 'gemini', model };
  }

  // ── Tier 4: OpenAI ─────────────────────────────────────────────────────────
  private async callOpenAi(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }

    const model =
      this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';

    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model,
      temperature: 0.1,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
    });

    const result = this.cleanOutput(
      response.choices[0]?.message?.content || '',
    );
    if (!result) return null;

    return { result, provider: 'openai', model };
  }

  /**
   * Sanitizes output: removes quotes, brackets, and extra conversational artifacts.
   */
  private cleanOutput(rawText: string): string {
    return rawText
      .replace(/["'`«»\[\]{}()]/g, '')
      .replace(/^(Urdu|Hindi|Urdu Script|Hindi Script|Name|Output|Result):\s*/i, '')
      .trim();
  }
}
