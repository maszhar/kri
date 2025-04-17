import type { ProyekLangsungLama } from '../umum/entitas/ProyekLangsungLama'

export class ChatAiPengguna {
  private proyek: ProyekLangsungLama
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
  proyek: ProyekLangsungLama
  pesan: string
}
