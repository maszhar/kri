import { Koordinat } from './Koordinat'

export class Elemen {
  public posisi: Koordinat

  constructor(parameter: ParameterBuatElemen = {}) {
    this.posisi = parameter.posisi ?? new Koordinat()
  }
}

interface ParameterBuatElemen {
  posisi?: Koordinat
}
