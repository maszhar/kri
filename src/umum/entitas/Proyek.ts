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
}

export interface ParameterBuatProyek {
  nama?: string
  koleksiSistem?: Sistem[]
}
