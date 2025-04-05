import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources.mjs'

export class KontrolChatAi {
  private client = new OpenAI({
    apiKey: process.env['OPEN_API_KEY'],
    baseURL: 'https://api.deepseek.com'
  })

  constructor(
    private laporkanKemajuan: (idPesan: string, potonganPesan: string) => void,
    private laporkanSelesai: (idPesan: string) => void,
    private laporkanGalat: (idPesan: string, galat: string) => void
  ) {}

  private tataPesanDariWeb(pesan: any): ChatCompletionMessageParam {
    return {
      role: pesan.role,
      content: pesan.content
    }
  }

  async chat(idPesan: string, koleksiPesan: any[]): Promise<void> {
    try {
      const stream = await this.client.chat.completions.create({
        model: 'deepseek-chat',
        messages: koleksiPesan.map((pesan) => this.tataPesanDariWeb(pesan)),
        stream: true
      })

      for await (const chunk of stream) {
        const pecahanPesan = chunk.choices[0]?.delta?.content || ''
        if (pecahanPesan) {
          this.laporkanKemajuan(idPesan, pecahanPesan)
        }
      }

      this.laporkanSelesai(idPesan)
    } catch (e: any) {
      this.laporkanGalat(idPesan, e.message)
    }
  }
}
