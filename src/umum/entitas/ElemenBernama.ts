import { Elemen } from './Elemen'
import { Koordinat } from './Koordinat'

export class ElemenBernama extends Elemen {
  protected nama: string

  constructor(parameter: ParameterBuatElemenBernama = {}) {
    super({
      id: parameter.id,
      posisi: parameter.posisi
    })
    this.nama = parameter.nama ?? 'ElemenBaru'
  }

  dapatkanNama(): string {
    return this.nama
  }

  aturNama(nama: string): void {
    this.nama = nama
  }
}

export interface ParameterBuatElemenBernama {
  id?: number
  nama?: string
  posisi?: Koordinat
}
