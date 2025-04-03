import { Klas } from './Klas'

export class Asosiasi {
  asal: Klas
  tujuan: Klas

  constructor(parameter: ParameterBuatAsosiasi) {
    this.asal = parameter.asal
    this.tujuan = parameter.tujuan
  }
}
interface ParameterBuatAsosiasi {
  asal: Klas
  tujuan: Klas
}
