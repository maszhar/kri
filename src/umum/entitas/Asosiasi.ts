import { Kelas } from './Kelas'

export class Asosiasi {
  asal: Kelas
  tujuan: Kelas

  constructor(parameter: ParameterBuatAsosiasi) {
    this.asal = parameter.asal
    this.tujuan = parameter.tujuan
  }
}
interface ParameterBuatAsosiasi {
  asal: Kelas
  tujuan: Kelas
}
