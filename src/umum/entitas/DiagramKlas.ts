import { ElemenKlas } from './ElemenKlas'
import { Model } from './Model'

export class DiagramKlas extends Model {
  koleksiElemenKlas: ElemenKlas[]

  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super({
      nama: parameter.nama ?? 'DiagramKlas1'
    })
    this.koleksiElemenKlas = parameter.koleksiElemenKlas ?? []
  }

  terapkanPerubahanKlas(indeks: number): void {
    this.koleksiElemenKlas[indeks] = this.koleksiElemenKlas[indeks].buatKlona()
  }

  // hapus
  hapusElemenKlas(indeks: number): void {
    this.koleksiElemenKlas.splice(indeks, 1)
  }
}

export interface ParameterBuatDiagramKlas {
  nama?: string
  koleksiElemenKlas?: ElemenKlas[]
}
