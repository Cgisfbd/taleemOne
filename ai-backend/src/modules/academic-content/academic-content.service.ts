import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { ACADEMIC_DESCRIPTION_URDU_SYSTEM_PROMPT } from '@/prompts/academic-description-urdu.prompt';
import { ACADEMIC_DESCRIPTION_HINDI_SYSTEM_PROMPT } from '@/prompts/academic-description-hindi.prompt';

export interface DescriptionTranslationResult {
  result: string;
  provider: string;
  model: string;
  durationMs: number;
}

@Injectable()
export class AcademicContentService {
  private readonly logger = new Logger(AcademicContentService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Translates English description/notice into authentic academic Urdu.
   */
  async translateDescriptionToUrdu(
    text: string,
  ): Promise<DescriptionTranslationResult> {
    return this.executeCascade(
      text,
      ACADEMIC_DESCRIPTION_URDU_SYSTEM_PROMPT,
      'Urdu Description',
    );
  }

  /**
   * Translates English description/notice into formal academic Hindi.
   */
  async translateDescriptionToHindi(
    text: string,
  ): Promise<DescriptionTranslationResult> {
    return this.executeCascade(
      text,
      ACADEMIC_DESCRIPTION_HINDI_SYSTEM_PROMPT,
      'Hindi Description',
    );
  }

  /**
   * 4-Tier Cascading Engine (Groq ➔ OpenRouter ➔ Gemini ➔ OpenAI).
   */
  private async executeCascade(
    text: string,
    systemPrompt: string,
    label: string,
  ): Promise<DescriptionTranslationResult> {
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
                `✨ [Tier 1 - Groq] ${label} translated in ${durationMs}ms`,
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
                `✨ [Tier 2 - OpenRouter] ${label} translated in ${durationMs}ms`,
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
                `✨ [Tier 3 - Gemini] ${label} translated in ${durationMs}ms`,
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
                `✨ [Tier 4 - OpenAI] ${label} translated in ${durationMs}ms`,
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
          `⚠️ [Provider Failover] ${provider.toUpperCase()} failed for ${label}: ${errorMsg}. Cascading to next provider...`,
        );
        errors.push({ provider, error: errorMsg });
      }
    }

    this.logger.error(
      `❌ All AI providers in fallback chain failed for ${label}. Errors: ${JSON.stringify(errors)}`,
    );

    throw new InternalServerErrorException(
      `All AI providers in the fallback chain were unable to process the ${label} request. Please check API keys in .env.`,
    );
  }

  // ── Tier 1: Groq Cloud ─────────────────────────────────────────────────────
  private async callGroq(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!apiKey || apiKey.trim() === '') return null;

    const model =
      this.configService.get<string>('GROQ_MODEL') || 'qwen/qwen3.8-27b';

    const client = new Groq({ apiKey });
    const response = await client.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Please translate and adapt the following academic holiday notice / description into the target language:\n\n${text}`,
        },
      ],
    });

    const result = this.cleanDescriptionOutput(
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
    if (!apiKey || apiKey.trim() === '') return null;

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
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Please translate and adapt the following academic holiday notice / description into the target language:\n\n${text}`,
        },
      ],
    });

    const result = this.cleanDescriptionOutput(
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
    if (!apiKey || apiKey.trim() === '') return null;

    const model =
      this.configService.get<string>('GEMINI_MODEL') || 'gemini-2.0-flash';

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: `${systemPrompt}\n\nPlease translate and adapt the following academic holiday notice / description into the target language:\n\n${text}`,
    });

    const result = this.cleanDescriptionOutput(response.text || '');
    if (!result) return null;

    return { result, provider: 'gemini', model };
  }

  // ── Tier 4: OpenAI ─────────────────────────────────────────────────────────
  private async callOpenAi(
    text: string,
    systemPrompt: string,
  ): Promise<{ result: string; provider: string; model: string } | null> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey || apiKey.trim() === '') return null;

    const model =
      this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';

    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Please translate and adapt the following academic holiday notice / description into the target language:\n\n${text}`,
        },
      ],
    });

    const result = this.cleanDescriptionOutput(
      response.choices[0]?.message?.content || '',
    );
    if (!result) return null;

    return { result, provider: 'openai', model };
  }

  /**
   * Sanitizes output for descriptive paragraphs without stripping valid punctuation or brackets.
   */
  private cleanDescriptionOutput(rawText: string): string {
    return rawText
      .replace(/^```[a-z]*\s*/i, '')
      .replace(/\s*```$/i, '')
      .replace(/^["'«»]\s*/, '')
      .replace(/\s*["'«»]$/, '')
      .replace(
        /^(Urdu Description|Hindi Description|ترجمہ|تفصیل|अनुवाद|विवरण):\s*/i,
        '',
      )
      .trim();
  }
}
