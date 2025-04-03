import { ParameterOperasi } from './ParameterOperasi'

export class Operasi {
  nama: string
  koleksiParameter: ParameterOperasi[]
  tipeKeluaran?: string

  constructor(parameter: ParameterBuatOperasi) {
    this.nama = parameter.nama
    this.tipeKeluaran = parameter.tipeKeluaran
    this.koleksiParameter = parameter.koleksiParameter ?? []
  }

  bungkusData(): any {
    return {
      nama: this.nama,
      tipeKeluaran: this.tipeKeluaran,
      koleksiParameter: this.koleksiParameter
    }
  }

  static bongkarBungkusanData(data: any): Operasi {
    return new Operasi({
      nama: data.nama,
      tipeKeluaran: data.tipeKeluaran
    })
  }
}

export interface ParameterBuatOperasi {
  nama: string
  tipeKeluaran?: string
  koleksiParameter?: ParameterOperasi[]
}
