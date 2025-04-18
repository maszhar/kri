import { Koordinat } from './Koordinat'

export class Elemen {
  public id: number
  public posisi: Koordinat

  constructor(parameter: ParameterBuatElemen = {}) {
    this.id = parameter.id ?? 0
    this.posisi = parameter.posisi ?? new Koordinat()
  }

  dapatkanId(): number {
    return this.id
  }

  aturId(id: number): void {
    this.id = id
  }
}

interface ParameterBuatElemen {
  id?: number
  posisi?: Koordinat
}
