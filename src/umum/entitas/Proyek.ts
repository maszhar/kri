import { Sistem } from './Sistem'

export class Proyek {
  nama: string
  koleksiSistem: Sistem[]

  constructor(parameter: ParameterBuatProyek = {}) {
    this.nama = parameter.nama ?? 'Proyek Baru'
    this.koleksiSistem = parameter.koleksiSistem ?? []
  }
}

interface ParameterBuatProyek {
  nama?: string
  koleksiSistem?: Sistem[]
}
