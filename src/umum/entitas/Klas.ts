import { KomponenSequenceDiagram } from './KomponenSequenceDiagram'

export class Klas extends KomponenSequenceDiagram {
  constructor(parameter: ParameterBuatKlas = {}) {
    super(parameter.nama || 'KlasBaru')
  }
}

interface ParameterBuatKlas {
  nama?: string
}
