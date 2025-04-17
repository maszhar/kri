import { Sistem } from './Sistem'

export class Proyek {
  protected nama: string
  protected koleksiSistem: Sistem[]

  constructor(parameter: ParameterBuatProyek = {}) {
    this.nama = parameter.nama ?? 'Proyek Baru'
    this.koleksiSistem = parameter.koleksiSistem ?? []
  }

  aturNama(nama: string): void {
    this.nama = nama
  }

  buatSistem(objekLama?: Sistem): Sistem {
    let idSistemTerbesar = 0
    if (this.koleksiSistem.length > 0) {
      idSistemTerbesar = Math.max(...this.koleksiSistem.map((sistem) => sistem.dapatkanId()))
    }

    const sistemBaru = objekLama ?? new Sistem()
    sistemBaru.aturId(idSistemTerbesar + 1)
    this.koleksiSistem.push(sistemBaru)
    return sistemBaru
  }
}

export interface ParameterBuatProyek {
  nama?: string
  koleksiSistem?: Sistem[]
}
