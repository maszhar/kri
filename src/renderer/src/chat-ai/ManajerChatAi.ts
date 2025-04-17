import type { ProyekLangsungLama } from '../umum/entitas/ProyekLangsungLama'
import { ChatAi } from './ChatAi'
import { ChatAiPengguna } from './ChatAiPengguna'

export class ManajerChatAi {
  private static pesanSistem = new ChatAi({
    role: 'system',
    content:
      'Kamu adalah asisten perancang perangkat lunak. Tugasmu membantu membuat class diagram. ' +
      'Kamu akan menerima input terformat dan membuat output terformat. Format menggunakan JSON. ' +
      'Format dijelaskan dengan pola key=tipe data=penjelasan. ' +
      // Input
      'Input akan berisi m=string=Pesan dari pengguna; dan d=object=Data rancangan saat ini. ' +
      // d
      'd hanya disediakan di awal pesan pengguna. Adapun d pada pesan kedua dan seterusnya hanyalah ' +
      'perubahan data dari d di awal pesan. Isi data d yang tidak disebutkan pada pesan kedua dan seterusnya' +
      'berarti sama dengan yang pertama. ' +
      'isi dari d adalah dk=arrayOfObject=class diagram. ' +
      // class diagram
      'dk berisi k=arrayOfObject=koleksi class. ' +
      // object
      'k berisi p=objek=posisi gambar class pada class diagram; ' +
      'i=number=id class; dan n=string=nama class. ' +
      // Output
      'Sedangkan Output berisi p=arrayOfObject=daftar perintah yang harus dilakukan; dan m=pesan dari kamu. ' +
      'Karena keterbatasan versi aplikasi saat ini, isi p dengan array kosong saja.'
  })

  private koleksiPendengar: Map<string, (pesan: string) => void> = new Map()
  private dapatkanProyek?: () => ProyekLangsungLama

  private constructor() {
    window.web.chatai.laporkanKemajuan((idPesan: string, pesan: string): void => {
      const pendengarTerkait = this.koleksiPendengar.get(idPesan)
      if (pendengarTerkait) {
        pendengarTerkait(pesan)
      }
    })

    window.web.chatai.laporkanSelesai((idPesan: string): void => {
      const pendengarTerkait = this.koleksiPendengar.get(idPesan)
      if (pendengarTerkait) {
        this.koleksiPendengar.delete(idPesan)
      }
    })

    window.web.chatai.laporkanGalat((idPesan: string, galat: string): void => {
      const pendengarTerkait = this.koleksiPendengar.get(idPesan)
      if (pendengarTerkait) {
        this.koleksiPendengar.delete(idPesan)
        console.error('OpenApi: ' + galat)
      }
    })
  }

  static instance?: ManajerChatAi
  static getInstance(dapatkanProyek: () => ProyekLangsungLama): ManajerChatAi {
    if (!this.instance) {
      this.instance = new ManajerChatAi()
    }
    this.instance.dapatkanProyek = dapatkanProyek
    return this.instance
  }

  kirimPesan(pesanPengguna: string, laporkanKemajuan: (pesan: string) => void): void {
    if (!this.dapatkanProyek) {
      console.error('Fungsi dapatkan proyek pada ManajerChatAi belum diimplementasikan')
      return
    }

    let idPesan = ''

    const hasilkanIdPesan = (): void => {
      idPesan = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
    }
    hasilkanIdPesan()

    while (this.koleksiPendengar.has(idPesan)) {
      hasilkanIdPesan()
    }

    this.koleksiPendengar.set(idPesan, laporkanKemajuan)

    const chatAiPengguna = new ChatAiPengguna({
      proyek: this.dapatkanProyek(),
      pesan: pesanPengguna
    })

    const koleksiPesan: any = [
      ManajerChatAi.pesanSistem.bungkus(),
      new ChatAi({ content: chatAiPengguna.render() }).bungkus()
    ]

    window.mesin.chatAi(idPesan, koleksiPesan)
  }
}
