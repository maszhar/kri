import type { ProyekLangsung } from '../umum/entitas/ProyekLangsung'

export class ChatAiPengguna {
  private proyek: ProyekLangsung
  private pesan: string

  constructor(parameter: ParameterBuatChatAiPengguna) {
    this.proyek = parameter.proyek
    this.pesan = parameter.pesan
  }

  render(): string {
    return JSON.stringify({
      m: this.pesan,
      d: this.proyek.bungkusUntukAi()
    })
  }
}

interface ParameterBuatChatAiPengguna {
  proyek: ProyekLangsung
  pesan: string
}
