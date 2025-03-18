import { Model } from './Model'

export class DiagramKlas extends Model {
  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super({
      nama: parameter.nama ?? 'DiagramKlas1'
    })
  }
}

interface ParameterBuatDiagramKlas {
  nama?: string
}
