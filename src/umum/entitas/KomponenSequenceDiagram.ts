import { Komponen } from './Komponen'

export class KomponenSequenceDiagram extends Komponen {
  constructor(parameter: ParameterBuatKomponenSequenceDiagram = {}) {
    super({ id: parameter.id, nama: parameter.nama || 'KomponenBaru' })
  }
}

interface ParameterBuatKomponenSequenceDiagram {
  id?: number
  nama?: string
}
