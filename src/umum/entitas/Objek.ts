import { Klas } from './Klas'
import { KomponenSequenceDiagram } from './KomponenSequenceDiagram'

export class Objek extends KomponenSequenceDiagram {
  public klas?: Klas

  constructor(parameter: ParameterBuatObjek = {}) {
    super(parameter.nama || '')
    this.klas = parameter.klas
  }

  hasilkanTeksTampilan(): string {
    let teksTampilan = this.nama
    if (this.klas) {
      teksTampilan += ` : ${this.klas.nama}`
    }
    teksTampilan = teksTampilan.trim()
    return teksTampilan
  }
}

interface ParameterBuatObjek {
  nama?: string
  klas?: Klas
}
